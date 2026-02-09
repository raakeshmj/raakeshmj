import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    // Time Logic (IST)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      // Format: HH:MM:SS
      setTime(now.toLocaleTimeString('en-GB', options));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Scroll Logic
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    // Note: Sound is handled by global SoundManager listener on <button> click
    // We add extra haptic feedback here for mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(20);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[40] flex flex-col items-end gap-3 pointer-events-none">
       {/* Scroll Button */}
       <AnimatePresence>
         {isVisible && (
           <motion.button
             initial={{ opacity: 0, scale: 0.5, y: 10 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.5, y: 10 }}
             onClick={handleClick}
             className="pointer-events-auto w-12 h-12 bg-accent text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(205,255,0,0.4)] hover:shadow-[0_0_30px_rgba(205,255,0,0.6)] hover:scale-110 transition-all group border border-accent"
             aria-label="Scroll to top"
           >
             <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
           </motion.button>
         )}
       </AnimatePresence>

       {/* IST Time Badge */}
       <motion.div 
         initial={{ opacity: 0, x: 20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 1, duration: 0.5 }}
         className="pointer-events-auto bg-[#111]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3 shadow-2xl hover:border-accent/50 transition-colors"
       >
          <div className="flex items-center gap-3">
             <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
             </div>
             <div className="flex flex-col leading-none">
                 <span className="text-[9px] font-bold text-secondary uppercase tracking-widest mb-1">Bangalore, IN</span>
                 <span className="text-sm font-mono font-bold text-white tracking-widest flex gap-1">
                    {time} <span className="text-accent text-[10px] self-end mb-[1px]">IST</span>
                 </span>
             </div>
          </div>
       </motion.div>
    </div>
  );
};