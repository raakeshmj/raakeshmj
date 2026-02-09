import React from 'react';
import { Button } from './Button';
import { Instagram, Linkedin, Github, Mail } from 'lucide-react';
import { Spotify } from './Spotify';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-surface pt-32 pb-12 relative overflow-hidden scroll-mt-20 transition-colors duration-500">
        {/* Giant Text Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
             <h1 className="text-[20vw] font-display font-black leading-none text-primary whitespace-nowrap">
                LET'S TALK
             </h1>
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-2xl">
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase mb-8 leading-tight text-primary">
              Have a project <br /> in mind?
            </h2>
            <p className="text-secondary text-xl mb-12 max-w-md">
              I'm always interested in hearing about new projects, collaborations, and opportunities in Full Stack and Web3.
            </p>
            <Button href="mailto:raakesh.mj7@gmail.com" className="text-lg px-10 py-5">
              Get in Touch
            </Button>
          </div>

          <div className="flex flex-col gap-12">
            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest mb-6">Contact</h4>
              <a href="mailto:raakesh.mj7@gmail.com" className="block text-xl md:text-2xl font-bold hover:text-accent transition-colors mb-2 text-primary">
                raakesh.mj7@gmail.com
              </a>
              <p className="text-secondary">+91 96068 88360</p>
              <p className="text-secondary mt-1">Bangalore, India</p>
            </div>

            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest mb-6">Connect</h4>
              <div className="flex gap-6 mb-8">
                <a href="https://github.com/raakeshmj" target="_blank" className="p-4 border border-primary/10 rounded-full hover:bg-primary hover:text-background transition-all text-primary" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/raakeshmj/" target="_blank" className="p-4 border border-primary/10 rounded-full hover:bg-primary hover:text-background transition-all text-primary" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:raakesh.mj7@gmail.com" className="p-4 border border-primary/10 rounded-full hover:bg-primary hover:text-background transition-all text-primary" aria-label="Email">
                    <Mail className="w-5 h-5" />
                </a>
              </div>
              
              <Spotify />
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-secondary">
          <p>© 2024 Raakesh MJ. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <a href="#" className="hover:text-primary">Privacy Policy</a>
             <a href="#" className="hover:text-primary">Credits</a>
          </div>
        </div>
      </div>
    </footer>
  );
};