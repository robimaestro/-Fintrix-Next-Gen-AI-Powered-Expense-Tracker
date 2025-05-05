
import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-2xl ${
          isUser 
            ? 'bg-finance-accent text-white rounded-tr-none' 
            : 'glass-card rounded-tl-none'
        }`}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
