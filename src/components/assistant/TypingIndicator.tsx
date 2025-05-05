
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="mb-4 flex justify-start">
      <div className="glass-card rounded-2xl rounded-tl-none p-3">
        <div className="flex items-center">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
