import React, { useRef, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Filter } from 'lucide-react';

const projects: Project[] = [
  {
    id: 0,
    title: "Permission-Aware Vector Retrieval",
    category: "Patent Submitted • AI Security",
    description: "A novel architecture for secure Large Language Model interactions. This system embeds text with embedded permission logic, where the semantic similarity and retrievability of vectors are cryptographically constrained by user access levels.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    link: "https://github.com/raakeshmj",
    highlight: true
  },
  {
    id: 1,
    title: "SENTINEL AI",
    category: "AI Forensics",
    description: "A multimodal deepfake detection system designed for forensic verification. Features Bayesian evidence fusion and parallel analysis modules.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop",
    link: "https://raakeshmj.github.io/sentinel_ai/"
  },
  {
    id: 2,
    title: "DeGen Watts",
    category: "Blockchain",
    description: "A decentralized peer-to-peer renewable energy trading platform. Enables secure energy token trading using smart contracts on the blockchain.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Zool Tech",
    category: "Professional Experience",
    description: "Developed and maintained full-stack web applications using MERN stack. Collaborated on responsive designs and integrated RESTful APIs.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
  }
];

const categories = ["All", "AI Security", "AI Forensics", "Blockchain", "Professional Experience"];

export const Work: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Horizontal Scroll Setup
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });
  
  // Transform vertical scroll into horizontal movement
  const x = useTransform(scrollYProgress, [0, 0.2, 1], ["0%", "0%", "-75%"]);

  const filteredProjects = projects.filter(p => selectedCategory === "All" || p.category.includes(selectedCategory));

  return (
    <section id="work" className="bg-background relative pt-32">
        <div className="container mx-auto px-6 mb-12">
            <h2 className="font-display font-black text-5xl md:text-8xl uppercase text-white mb-8">
                Selected <br/> <span className="text-outline-accent">Works</span>
            </h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-12">
                <div className="flex items-center gap-2 text-secondary uppercase tracking-widest text-sm mr-4">
                    <Filter className="w-4 h-4" /> Filter By:
                </div>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full border text-sm font-bold uppercase transition-all ${
                            selectedCategory === cat 
                            ? 'bg-accent text-black border-accent' 
                            : 'border-white/10 text-secondary hover:text-white hover:border-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      
      {/* Mobile / Vertical Layout */}
      <div className="md:hidden flex flex-col gap-0">
        {filteredProjects.map((project, index) => (
            <div key={project.id} onClick={() => setSelectedProject(project)}>
                <ProjectCard project={project} index={index} />
            </div>
        ))}
      </div>

      {/* Desktop Horizontal Scroll Layout */}
      {selectedCategory === "All" ? (
         <div ref={targetRef} className="hidden md:block relative h-[300vh] bg-surface/30">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden pl-20">
                <motion.div 
                    style={{ x }} 
                    className="flex gap-20 will-change-transform" // Optimized for GPU
                >
                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className="relative w-[80vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 cursor-pointer group"
                            onClick={() => setSelectedProject(project)}
                        >
                             <div className={`aspect-[16/9] overflow-hidden rounded-sm mb-8 relative ${project.highlight ? 'ring-1 ring-accent box-shadow-accent' : ''}`}>
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    loading="lazy"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110 will-change-transform"
                                />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
                                
                                <div className="absolute bottom-6 left-6 z-10">
                                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur rounded-full ${project.highlight ? 'text-accent border border-accent' : 'text-white border border-white/20'}`}>
                                        {project.category}
                                    </span>
                                </div>
                             </div>
                             
                             <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-display font-black text-4xl uppercase text-white mb-2 group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-secondary line-clamp-2 max-w-lg">{project.description}</p>
                                </div>
                                <span className="font-display font-black text-6xl text-outline-accent opacity-20 group-hover:opacity-100 transition-opacity">
                                    0{index + 1}
                                </span>
                             </div>
                        </div>
                    ))}
                </motion.div>
            </div>
         </div>
      ) : (
        /* Grid Layout */
        <div className="hidden md:grid grid-cols-2 gap-8 container mx-auto px-6 pb-24">
            {filteredProjects.map((project, index) => (
                <div key={project.id} className="cursor-pointer" onClick={() => setSelectedProject(project)}>
                     <div className="aspect-[4/3] overflow-hidden rounded-sm mb-6 relative group">
                        <img 
                            src={project.image} 
                            loading="lazy" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all will-change-transform" 
                        />
                        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply" />
                     </div>
                     <h3 className="font-display font-bold text-2xl text-white mb-2">{project.title}</h3>
                     <p className="text-sm text-secondary">{project.category}</p>
                </div>
            ))}
        </div>
      )}

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};