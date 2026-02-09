import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 z-[70] bg-surface border border-white/10 rounded-xl overflow-hidden shadow-2xl overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-accent hover:text-black rounded-full transition-colors border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
              {/* Image Side */}
              <div className="relative h-[40vh] lg:h-full overflow-hidden">
                 <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Tag className="w-3 h-3" /> {project.category}
                    </span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {project.year}
                    </span>
                </div>

                <h2 className="font-display font-black text-4xl md:text-6xl uppercase mb-6 leading-tight">
                    {project.title}
                </h2>

                <p className="text-xl text-secondary mb-8 leading-relaxed">
                    {project.description}
                </p>

                <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">Project Highlights</h3>
                    <ul className="list-disc list-inside text-secondary space-y-2">
                        <li>Advanced architectural design patterns</li>
                        <li>High-performance optimization</li>
                        <li>Seamless user experience integration</li>
                        <li>Secure and scalable backend infrastructure</li>
                    </ul>
                </div>

                <div className="flex gap-4 mt-12">
                    {project.link && (
                        <a href={project.link} target="_blank" className="flex-1 bg-accent text-black font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors">
                            <ExternalLink className="w-5 h-5" /> View Live
                        </a>
                    )}
                    <a href="#" className="flex-1 border border-white/20 text-white font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors">
                        <Github className="w-5 h-5" /> Source Code
                    </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};