import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [text, setText] = useState('INITIALIZING');
  
  useEffect(() => {
    const words = ["INITIALIZING", "LOADING ASSETS", "ESTABLISHING UPLINK", "WELCOME"];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < words.length) {
        setText(words[i]);
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative z-10">
        <motion.h1 
          key={text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-widest"
        >
            {text}
        </motion.h1>
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            className="h-1 bg-accent mt-4"
        />
      </div>
      
      {/* Background Matrix-like effect or noise */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
    </motion.div>
  );
};