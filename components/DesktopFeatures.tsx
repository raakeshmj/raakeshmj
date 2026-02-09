import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, Share2, Maximize, Minus, ExternalLink, Command, Keyboard, X } from 'lucide-react';
import { useSound } from './SoundManager';

export const DesktopFeatures: React.FC = () => {
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, visible: boolean }>({ x: 0, y: 0, visible: false });
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { playSound, toggleSound } = useSound();
  const menuRef = useRef<HTMLDivElement>(null);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      switch(e.key.toLowerCase()) {
        case '?':
          setShowShortcuts(prev => !prev);
          playSound('click');
          break;
        case 'm':
          toggleSound();
          break;
        case 'escape':
          setShowShortcuts(false);
          setContextMenu(prev => ({ ...prev, visible: false }));
          break;
        case 't':
          const html = document.documentElement;
          if (html.classList.contains('light')) {
            html.classList.remove('light');
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          } else {
            html.classList.add('light');
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          }
          playSound('click');
          break;
      }
      
      // Command+K for contact (Simulated)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
         e.preventDefault();
         document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSound, playSound]);

  // Custom Context Menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
      playSound('hover');
    };

    const handleClick = () => {
      if (contextMenu.visible) setContextMenu(prev => ({ ...prev, visible: false }));
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, [contextMenu.visible, playSound]);

  // Adjust menu position to stay in viewport
  const menuStyle = {
    top: contextMenu.y,
    left: contextMenu.x,
  };

  if (menuRef.current) {
     if (contextMenu.x + 200 > window.innerWidth) menuStyle.left = contextMenu.x - 200;
     if (contextMenu.y + 300 > window.innerHeight) menuStyle.top = contextMenu.y - 300;
  }

  return (
    <div className="hidden md:block">
      {/* Shortcut Help Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
               onClick={() => setShowShortcuts(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111] border border-white/10 p-8 rounded-2xl z-[100] shadow-2xl w-[500px]"
            >
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Keyboard className="text-accent" /> Keyboard Shortcuts
                 </h3>
                 <button onClick={() => setShowShortcuts(false)}><X className="text-white/50 hover:text-white" /></button>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <ShortcutKey k="?" label="Toggle this menu" />
                  <ShortcutKey k="M" label="Mute / Unmute" />
                  <ShortcutKey k="T" label="Toggle Theme" />
                  <ShortcutKey k="⌘ K" label="Jump to Contact" />
               </div>
               
               <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/30 text-xs">
                  Pro Tip: Right-click anywhere for quick actions.
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.visible && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={menuStyle}
            className="fixed z-[9999] w-56 bg-[#18181b]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2"
          >
            <div className="px-4 py-2 border-b border-white/5 mb-2">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Raakesh MJ</span>
            </div>
            
            <ContextMenuItem icon={<Copy size={14} />} label="Copy Email" onClick={() => {
                navigator.clipboard.writeText("raakesh.mj7@gmail.com");
                playSound('success');
            }} />
            <ContextMenuItem icon={<Download size={14} />} label="Get Resume" onClick={() => window.open('https://drive.google.com/file/d/1XmyZ_2zxKf9Hcp7VmEtMsKpQtak0E07h/view?usp=drive_link', '_blank')} />
            <ContextMenuItem icon={<Share2 size={14} />} label="Share Portfolio" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                playSound('success');
            }} />
            
            <div className="my-2 border-t border-white/5" />
            
            <ContextMenuItem icon={<ExternalLink size={14} />} label="View Source" onClick={() => window.open('https://github.com/raakeshmj', '_blank')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShortcutKey = ({ k, label }: { k: string, label: string }) => (
    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
        <span className="text-sm text-secondary">{label}</span>
        <kbd className="px-2 py-1 bg-white/10 rounded-md text-xs font-bold font-mono text-white min-w-[24px] text-center border border-white/10">{k}</kbd>
    </div>
);

const ContextMenuItem = ({ icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm text-gray-300 hover:bg-accent hover:text-black transition-colors"
    >
        {icon} {label}
    </button>
);