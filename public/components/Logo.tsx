import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", light = false }) => {
  const textColor = light ? "text-white" : "text-brand-charcoal";
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <path d="M35 25H65C73.2843 25 80 31.7157 80 40C80 48.2843 73.2843 55 65 55H50" stroke="#B0B0B0" strokeWidth="12" strokeLinecap="square"/>
        <path d="M65 75H35C26.7157 75 20 68.2843 20 60C20 51.7157 26.7157 45 35 45H50" stroke="#0ABAB5" strokeWidth="12" strokeLinecap="square"/>
      </svg>
      <span className={`font-serif text-2xl font-semibold tracking-tight ${textColor} whitespace-nowrap`}>
        Jane <span className="text-brand-teal italic">&</span> Company
      </span>
    </div>
  );
};

export default Logo;