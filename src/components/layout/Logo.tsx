
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center bg-transparent">
        <img 
          src="/lovable-uploads/1098099e-b297-45ac-acaf-bd812ee21d6c.png" 
          alt="Fintrix Logo" 
          className="h-8 w-8 object-contain"
          style={{ 
            objectFit: 'contain',
            objectPosition: 'center',
            backgroundColor: 'transparent'
          }}
        />
      </div>
      <span className="ml-2 font-bold text-xl text-white">FINTRIX</span>
    </div>
  );
};

export default Logo;
