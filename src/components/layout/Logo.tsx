
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = ""
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center">
        <img 
          alt="Fintrix Logo" 
          className="h-8 w-8 object-contain" 
          src="/lovable-uploads/2896e87b-2981-4719-9992-e779d11475ce.png" 
          style={{
            backgroundColor: 'transparent'
          }}
        />
      </div>
      <span className="ml-2 text-xl text-white text-left px-[3px] py-0 font-extrabold">FINTRIX</span>
    </div>
  );
};

export default Logo;
