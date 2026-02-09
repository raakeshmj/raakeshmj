import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  playSound: (type: 'hover' | 'click' | 'success') => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within a SoundProvider');
  return context;
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const ambientNodes = useRef<AudioNode[]>([]);

  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.05; // Low volume for ambient
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;
    }

    return () => {
        audioContextRef.current?.close();
    };
  }, []);

  const playTone = (freq: number, type: 'sine' | 'square' | 'triangle', duration: number, vol: number) => {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      
      if (ctx.state === 'suspended') {
          ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
  };

  const playSound = (type: 'hover' | 'click' | 'success') => {
    if (!isPlaying || !audioContextRef.current) return;
    
    // Haptic Feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'hover') navigator.vibrate(5);
        if (type === 'click') navigator.vibrate(10);
        if (type === 'success') navigator.vibrate([50, 50, 50]);
    }

    // Audio Synthesis
    if (type === 'hover') {
        // High pitched short blip
        playTone(800, 'sine', 0.05, 0.02);
    } else if (type === 'click') {
        // Mechanical click sound (lower freq)
        playTone(300, 'triangle', 0.05, 0.05);
    } else if (type === 'success') {
        // Success chord
        playTone(440, 'sine', 0.3, 0.1);
        setTimeout(() => playTone(554, 'sine', 0.3, 0.1), 50);
        setTimeout(() => playTone(659, 'sine', 0.4, 0.1), 100);
    }
  };

  const toggleSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;
    const ctx = audioContextRef.current;

    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    if (isPlaying) {
        // Stop Ambient
        ambientNodes.current.forEach(node => {
            try { 
                (node as any).stop(); 
                node.disconnect();
            } catch (e) {}
        });
        ambientNodes.current = [];
        setIsPlaying(false);
    } else {
        // Start Ambient Drone (Sci-fi atmosphere)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc1.type = 'sine';
        osc1.frequency.value = 55; // Low A
        
        osc2.type = 'sine';
        osc2.frequency.value = 55.5; // Slight detune for binaural beat effect

        filter.type = 'lowpass';
        filter.frequency.value = 300;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNodeRef.current);
        
        osc1.start();
        osc2.start();
        
        ambientNodes.current = [osc1, osc2];
        setIsPlaying(true);
    }
  };
  
  // Global Event Listeners for UI Interaction
  useEffect(() => {
      const handleMouseOver = (e: MouseEvent) => {
          if (!isPlaying) return;
          const target = e.target as HTMLElement;
          if (target.closest('a') || target.closest('button') || target.tagName === 'BUTTON' || target.tagName === 'A') {
              playSound('hover');
          }
      };
      
      const handleClick = (e: MouseEvent) => {
        if (!isPlaying) return;
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button') || target.tagName === 'BUTTON' || target.tagName === 'A') {
            playSound('click');
        }
      };

      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('click', handleClick);
      
      return () => {
          window.removeEventListener('mouseover', handleMouseOver);
          window.removeEventListener('click', handleClick);
      };
  }, [isPlaying]);

  return (
    <SoundContext.Provider value={{ isPlaying, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};