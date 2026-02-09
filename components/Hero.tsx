import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Marquee } from './Marquee';
import { TextReveal } from './TextReveal';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-8 md:w-12 h-[1px] bg-accent" />
            <span className="uppercase tracking-[0.2em] text-xs md:text-sm text-accent font-bold">Based in Bangalore, India</span>
          </motion.div>
          
          <div className="font-display font-black text-[13vw] md:text-9xl uppercase leading-[0.9] tracking-tighter mb-4">
             <TextReveal text="Full Stack" delay={0.2} />
             <div className="flex items-center gap-4 flex-wrap">
                <span className="text-outline">Developer</span>
                <motion.span 
                   initial={{ width: 0 }} 
                   animate={{ width: 'auto' }}
                   className="hidden md:inline-block h-2 md:h-4 bg-accent w-12 md:w-24"
                />
             </div>
             <TextReveal text="& Engineer" delay={0.5} />
          </div>
        </div>

        <motion.div 
          className="max-w-xl ml-auto mt-8 md:mt-12"
          style={{ y: y1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-secondary text-base md:text-xl leading-relaxed">
            I craft scalable web applications and decentralized solutions. 
            Merging robust engineering with seamless user experiences.
          </p>
        </motion.div>
      </div>

      <div className="mt-auto mb-12">
        <Marquee text="Raakesh MJ • Developer" speed={25} outline />
      </div>

      <motion.div 
        className="absolute bottom-8 left-6 md:left-12 flex items-center gap-4"
        style={{ opacity }}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded-full flex items-center justify-center animate-bounce">
          <ArrowDown className="text-accent w-5 h-5 md:w-6 md:h-6" />
        </div>
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-secondary">Scroll to explore</span>
      </motion.div>
    </section>
  );
};