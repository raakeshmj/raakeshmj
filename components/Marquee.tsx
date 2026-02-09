import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  outline?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  text, 
  direction = 'left', 
  speed = 20,
  className = '',
  outline = false
}) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap py-4 select-none">
      <motion.div 
        className={`flex gap-8 ${className}`}
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span 
            key={i} 
            className={`text-8xl md:text-[10rem] font-display font-black uppercase leading-none ${outline ? 'text-outline hover:text-outline-accent' : 'text-white'}`}
          >
            {text} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};