
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
      
      const response = await fetch('https://maestro007.app.n8n.cloud/webhook-test/d9f82c89-602e-4245-a833-5ee896a6c2aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get response from assistant: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response from API:', data);
      
      // Add bot response to chat - using direct data if available
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: data.message || data.response || data.answer || data.reply || data.text || "I'm sorry, I couldn't process your request.", 
          isUser: false 
        }]);
        setIsLoading(false);
      }, 800); // Small delay for better UX
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to the assistant');
      setIsLoading(false);
      
      // Add error message
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        isUser: false 
      }]);
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
