import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { Palette, Share2, Mail, X, Smartphone, Shuffle } from 'lucide-react';
import { useSound } from './SoundManager';

const ACCENT_COLORS = [
  '#cdff00', // Neon Lime (Default)
  '#00ff9d', // Neon Mint
  '#ff0055', // Neon Red
  '#00f3ff', // Cyan
  '#ffaa00', // Amber
  '#b300ff', // Purple
];

export const MobileFeatures: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Disabled by default for performance
  const [tiltEnabled, setTiltEnabled] = useState(false); 
  const controls = useDragControls();
  const { playSound } = useSound();
  const lastShakeRef = useRef(0);
  
  // Shake Detection Logic
  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const { x, y, z } = acceleration;
      if (x === null || y === null || z === null) return;

      const acc = Math.sqrt(x*x + y*y + z*z);
      const now = Date.now();

      // Shake threshold
      if (acc > 25 && now - lastShakeRef.current > 1000) {
        lastShakeRef.current = now;
        randomizeTheme();
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        playSound('success');
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion, { passive: true });
    }
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  // Removed continuous style updates for tilt as they were causing major FPS drops.
  // The tilt variable logic is kept if we want to re-enable it on specific elements later,
  // but updating root variables 60fps is bad practice.
  
  const randomizeTheme = () => {
    const color = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
    document.documentElement.style.setProperty('--accent', color);
    // Rough logic to update RGB var for glass effects
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  };

  const onDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y < -50) {
      setIsOpen(true);
      playSound('click');
    } else if (info.offset.y > 50) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Swipe Up Handle (Visible on Mobile Only) */}
      <motion.div 
        drag="y"
        dragControls={controls}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
        className="fixed bottom-0 left-0 right-0 h-12 z-[40] md:hidden flex justify-center items-center cursor-grab active:cursor-grabbing bg-gradient-to-t from-background to-transparent"
      >
         <div className="w-16 h-1 bg-white/20 rounded-full mb-2"></div>
         <span className="absolute bottom-1 text-[10px] text-white/30 font-bold uppercase tracking-widest">Swipe Up</span>
      </motion.div>

      {/* Bottom Sheet Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden"
            />
            <motion.div
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
               className="fixed bottom-0 left-0 right-0 bg-[#111] rounded-t-[2rem] z-[60] md:hidden border-t border-white/10 p-6 pb-12 shadow-2xl"
            >
               <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8"></div>
               
               <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { randomizeTheme(); if(navigator.vibrate) navigator.vibrate(20); }}
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 rounded-2xl active:scale-95 transition-transform"
                  >
                     <Shuffle className="w-6 h-6 text-accent" />
                     <span className="text-xs font-bold uppercase tracking-wider text-white">Remix Theme</span>
                  </button>

                  <button 
                    onClick={() => { setIsOpen(false); alert("3D Tilt temporarily disabled for performance optimization."); }}
                    className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl active:scale-95 transition-transform ${tiltEnabled ? 'bg-accent/20 border border-accent' : 'bg-white/5'}`}
                  >
                     <Smartphone className={`w-6 h-6 ${tiltEnabled ? 'text-accent' : 'text-white'}`} />
                     <span className="text-xs font-bold uppercase tracking-wider text-white">3D Tilt FX</span>
                  </button>

                  <a 
                    href="mailto:raakesh.mj7@gmail.com"
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 rounded-2xl active:scale-95 transition-transform"
                  >
                     <Mail className="w-6 h-6 text-white" />
                     <span className="text-xs font-bold uppercase tracking-wider text-white">Contact</span>
                  </a>

                  <button 
                     onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: 'Raakesh MJ Portfolio',
                                text: 'Check out this portfolio!',
                                url: window.location.href,
                            });
                        }
                     }}
                     className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 rounded-2xl active:scale-95 transition-transform"
                  >
                     <Share2 className="w-6 h-6 text-white" />
                     <span className="text-xs font-bold uppercase tracking-wider text-white">Share</span>
                  </button>
               </div>

               <div className="mt-8 text-center">
                  <p className="text-white/30 text-xs flex items-center justify-center gap-2">
                     <Smartphone size={12} /> Shake device to randomize theme
                  </p>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};