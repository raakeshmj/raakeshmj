import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import { Button } from './Button';
import { ShieldCheck, Lock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={containerRef} className="py-24 md:py-32 border-t border-white/10 relative group">
      {/* Patent Pending Highlight Effect - Moving Scanline */}
      {project.highlight && (
        <>
           <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none -z-10" />
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-20 animate-pulse-slow" />
        </>
      )}

      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
          
          {/* Image Section */}
          <div className="w-full md:w-3/5 relative">
            <div className={`overflow-hidden rounded-sm relative z-10 aspect-[4/3] clip-image-slant ${project.highlight ? 'ring-1 ring-accent/30 box-shadow-accent' : ''}`}>
              <motion.div style={{ scale: imageScale }} className="w-full h-full">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-700 ${project.highlight ? 'grayscale opacity-80 group-hover:opacity-100' : 'grayscale group-hover:grayscale-0'}`}
                />
              </motion.div>
              
              {/* Overlay Color Tint */}
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
              
              {project.highlight && (
                 <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <div className="bg-black/80 backdrop-blur text-accent border border-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-full">
                        <Lock className="w-3 h-3" /> Patent Pending
                    </div>
                 </div>
              )}
            </div>

            {/* Decorative Number */}
            <div className={`absolute -top-12 ${isEven ? '-left-12' : '-right-12'} -z-0 opacity-20`}>
              <span className={`font-display font-black text-9xl ${project.highlight ? 'text-accent opacity-50' : 'text-outline-accent'}`}>
                0{index + 1}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-2/5 relative z-20">
            <motion.div style={{ y }}>
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-wider ${project.highlight ? 'bg-accent text-black border-accent' : 'border-accent text-accent'}`}>
                  {project.category}
                </span>
                <span className="text-secondary text-sm">{project.year}</span>
              </div>
              
              <h3 className={`font-display font-bold text-4xl md:text-5xl uppercase mb-6 leading-tight ${project.highlight ? 'text-white' : ''}`}>
                {project.title}
                {project.highlight && <span className="text-accent text-2xl align-top ml-2 animate-pulse">*</span>}
              </h3>
              
              <p className="text-secondary text-lg mb-8 leading-relaxed">
                {project.description}
              </p>
              
              {project.link && (
                <Button 
                    href={project.link} 
                    variant={project.highlight ? 'primary' : 'outline'}
                    className={project.highlight ? 'shadow-[0_0_20px_rgba(195,245,60,0.3)] hover:shadow-[0_0_30px_rgba(195,245,60,0.5)]' : ''}
                >
                    {project.highlight ? 'View Documentation' : 'View Project'}
                </Button>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};