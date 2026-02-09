import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { ScrollProgress } from './components/ScrollProgress';
import { SoundProvider } from './components/SoundManager';
import { MobileFeatures } from './components/MobileFeatures';
import { DesktopFeatures } from './components/DesktopFeatures';
import { ScrollToTop } from './components/ScrollToTop';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy load heavy sections below the fold
const Work = lazy(() => import('./components/Work').then(module => ({ default: module.Work })));
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Hobbies = lazy(() => import('./components/Hobbies').then(module => ({ default: module.Hobbies })));

function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  // Prevent scrolling during preloader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  // Handle Hash Scroll on Load
  useEffect(() => {
    if (!loading && window.location.hash) {
      setTimeout(() => {
         const element = document.querySelector(window.location.hash);
         if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
         }
      }, 100);
    }
  }, [loading]);

  // Handle Theme - Default to Dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';

    if (isLight) {
        setIsDark(false);
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    } else {
        setIsDark(true);
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  return (
    <SoundProvider>
      <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-black cursor-none transition-colors duration-500">
        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <ScrollProgress />
        <CustomCursor />
        <MobileFeatures />
        <DesktopFeatures />
        <ScrollToTop />
        
        {/* Moving Background Elements - Optimized with will-change-transform */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] will-change-transform" 
          />
          <motion.div 
            animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
            }}
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px] will-change-transform" 
          />
        </div>

        <div className={`relative z-10 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Header toggleTheme={toggleTheme} isDark={isDark} />
          <main>
            <Hero />
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-accent">Loading content...</div>}>
              <Work />
              <About />
              <Hobbies />
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </SoundProvider>
  );
}

export default App;