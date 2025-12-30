import React from 'react';
import { ASSETS } from '../constants';

// Displays the logo image defined in constants
export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <img 
        src={ASSETS.LOGO_URL} 
        alt="Shelley Nails Logo" 
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );
};