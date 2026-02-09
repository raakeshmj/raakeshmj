import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundManager';

interface HeaderProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isPlaying, toggleSound } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-primary/5' : 'py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-display font-bold text-2xl tracking-tighter hover:text-accent transition-colors">
            RAAKESH MJ<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 mr-8">
                {navLinks.map((link) => (
                <a 
                    key={link.label}
                    href={link.href}
                    className="text-sm uppercase tracking-widest font-bold text-secondary hover:text-primary transition-colors relative group"
                >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                </a>
                ))}
            </div>

            <div className="flex items-center gap-4 border-l border-primary/10 pl-8">
                <button 
                    onClick={toggleSound}
                    className="p-2 rounded-full border border-primary/10 hover:border-accent hover:text-accent transition-colors flex items-center gap-2 group"
                    aria-label="Toggle Sound"
                >
                    {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    {isPlaying && (
                        <div className="flex gap-[2px] items-center h-3">
                            <motion.div 
                                animate={{ height: [4, 12, 6, 12, 4] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                className="w-[2px] bg-accent"
                            />
                            <motion.div 
                                animate={{ height: [8, 4, 12, 4, 8] }}
                                transition={{ repeat: Infinity, duration: 0.4 }}
                                className="w-[2px] bg-accent"
                            />
                            <motion.div 
                                animate={{ height: [6, 10, 4, 10, 6] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className="w-[2px] bg-accent"
                            />
                        </div>
                    )}
                </button>

                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full border border-primary/10 hover:border-accent hover:text-accent transition-colors"
                    aria-label="Toggle Theme"
                >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
            </div>

            <a 
              href="mailto:raakesh.mj7@gmail.com"
              className="px-6 py-2 border border-primary/20 rounded-full text-sm font-bold uppercase hover:bg-primary hover:text-background hover:border-primary transition-all bg-primary/5 backdrop-blur-sm"
            >
              Let's Talk
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
             <button 
                onClick={toggleSound}
                className="p-2 rounded-full border border-primary/10"
             >
                {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
             </button>
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full border border-primary/10"
             >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
                className="text-primary"
                onClick={() => setIsMenuOpen(true)}
            >
                <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 bg-background z-[60] flex flex-col justify-center items-center"
          >
            <button 
              className="absolute top-8 right-8 text-primary hover:text-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, idx) => (
                <motion.a 
                  key={link.label}
                  href={link.href}
                  className="font-display text-5xl font-bold uppercase hover:text-accent hover:italic transition-all text-primary"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a 
                href="mailto:raakesh.mj7@gmail.com"
                className="mt-8 px-8 py-3 bg-primary text-background font-bold uppercase tracking-widest rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Let's Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};