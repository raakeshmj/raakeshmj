import React from 'react';
import { motion } from 'framer-motion';

export const Spotify: React.FC = () => {
  return (
    <div className="flex items-center gap-4 bg-background/50 border border-primary/10 p-4 rounded-xl backdrop-blur-sm max-w-sm">
      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-black flex-shrink-0 group">
        <img 
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop" 
            alt="Album Art"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
        />
        <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
            <div className="w-[3px] h-3 bg-accent animate-bar-dance" style={{ animationDelay: '0s' }}></div>
            <div className="w-[3px] h-5 bg-accent animate-bar-dance" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-[3px] h-4 bg-accent animate-bar-dance" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-widest text-secondary mb-1">Recently Played</p>
        <div className="flex overflow-hidden">
            <motion.div 
                animate={{ x: [0, -100] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear", repeatType: "loop" }}
                className="whitespace-nowrap font-bold text-primary text-sm"
            >
                Stay Here 4 Life • A$AP Rocky • Stay Here 4 Life • A$AP Rocky •
            </motion.div>
        </div>
      </div>
      
      <a href="https://open.spotify.com" target="_blank" className="text-accent hover:text-primary transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM17.5 17.3C17.2 17.7 16.6 17.9 16.2 17.6C13.4 15.9 9.9 15.5 5.8 16.4C5.3 16.5 4.9 16.2 4.8 15.7C4.7 15.2 5 14.8 5.5 14.7C10 13.6 14 14.1 17.1 16C17.6 16.3 17.7 16.9 17.5 17.3ZM18.9 14C18.6 14.6 17.9 14.8 17.4 14.5C14.2 12.5 9.4 12 5.6 13.1C5 13.3 4.4 13 4.2 12.4C4 11.8 4.3 11.2 4.9 11C9.4 9.7 14.8 10.3 18.5 12.6C19 12.9 19.2 13.6 18.9 14ZM19.1 10.6C15.2 8.3 8.8 8.1 5.1 9.2C4.5 9.4 3.9 9 3.7 8.4C3.5 7.8 3.9 7.2 4.5 7C8.8 5.7 15.9 6 20.4 8.7C20.9 9 21.1 9.7 20.8 10.2C20.5 10.8 19.7 11 19.1 10.6Z"/>
        </svg>
      </a>
    </div>
  );
};