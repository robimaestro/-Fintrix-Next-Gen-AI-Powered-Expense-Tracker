
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import ChatMessage from '@/components/assistant/ChatMessage';
import TypingIndicator from '@/components/assistant/TypingIndicator';
import { toast } from 'sonner';

interface Message {
  text: string;
  isUser: boolean;
}

// Mock responses for when API is unavailable
const mockResponses = [
  "Based on your spending patterns, your highest category of expenses is dining out, followed by transportation and entertainment.",
  "You've spent approximately 30% of your budget on housing, 20% on food, 15% on transportation, and the rest on miscellaneous expenses.",
  "Looking at your recent transactions, you might want to consider reducing spending in the entertainment category, which has increased by 15% from last month.",
  "Your spending in groceries this month is lower compared to last month, good job on the savings!",
  "Based on your current spending rate, you're on track to meet your monthly budget goals."
];

const getRandomResponse = (query: string) => {
  // Simple keyword matching for better responses
  if (query.toLowerCase().includes('category') || query.toLowerCase().includes('spend per')) {
    return "Your top spending categories are: Housing (35%), Food (25%), Transportation (15%), Entertainment (10%), and Others (15%).";
  }
  
  // Return a random response for other queries
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your finance assistant. Ask me anything about your spending patterns or financial habits.", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage;
    setInputMessage('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);
    
    try {
      console.log('Sending request to API:', userMessage);
      
      // Try to call the external API
      const response = await fetch('https://maestro007.app.n8n.cloud/webhook-test/d9f82c89-602e-4245-a833-5ee896a6c2aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        }),
        // Add a reasonable timeout to avoid waiting too long
        signal: AbortSignal.timeout(5000)
      });
      
      if (!response.ok) {
        // Log the error details
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response from API:', data);
      
      // Add bot response to chat - prioritizing the output property as specified
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: data.output || data.message || data.response || data.answer || data.reply || data.text || "I'm sorry, I couldn't process your request.", 
          isUser: false 
        }]);
        setIsLoading(false);
      }, 800); // Small delay for better UX
      
    } catch (error) {
      console.error('Error:', error);
      
      // Use a simulated response instead of showing an error message
      const simulatedResponse = getRandomResponse(userMessage);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: simulatedResponse,
          isUser: false 
        }]);
        setIsLoading(false);
        
        // Show a small toast notification that we're using simulated data
        toast.info("Using simulated responses - API connection unavailable", {
          duration: 3000,
        });
      }, 1000);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl flex flex-col h-[calc(100vh-104px)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Finance Assistant</h1>
        <p className="text-finance-gray">Ask me about your spending habits</p>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 scrollbar-none">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about your finances..."
          className="flex-1 bg-black/40 border-white/10 text-white"
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || !inputMessage.trim()}
          className="bg-finance-chart hover:bg-finance-chart/80 text-black"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default AssistantPage;
