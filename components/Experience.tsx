import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, Building2, Sparkles, ArrowRight } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    year: "June 2024 - July 2024",
    title: "Full Stack Developer",
    org: "Zool Tech",
    desc: "Developed and maintained full-stack web applications using MERN stack. Collaborated on responsive designs and integrated RESTful APIs."
  },
  {
    type: 'education',
    year: "2022 - 2027",
    title: "Integrated M.Tech in CSE",
    org: "VIT Vellore",
    desc: "Specializing in Artificial Intelligence & Blockchain integration. Current CGPA: 8.43"
  }
];

export const Experience: React.FC = () => {
  return (
    <div className="relative mt-24">
       <h4 className="font-tech font-bold text-2xl uppercase tracking-widest text-accent mb-16 flex items-center gap-4">
          <span className="w-12 h-[2px] bg-accent"></span>
          Career Timeline
       </h4>

       <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[19px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-accent via-primary/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: index * 0.2 }}
                 className="relative pl-16 group"
               >
                  {/* Glowing Node */}
                  <div className={`absolute left-0 top-1 w-10 h-10 rounded-full bg-surface border-2 flex items-center justify-center z-10 transition-transform group-hover:scale-110 border-primary/30`}>
                     <div className={`w-3 h-3 rounded-full bg-primary/50`}></div>
                  </div>

                  {/* Content Card */}
                  <div className={`p-8 rounded-2xl relative overflow-hidden transition-all duration-300 group-hover:translate-x-2 glass-card`}>
                     
                     {/* Decorative Background Icon */}
                     <div className="absolute -right-4 -top-4 text-primary/5 dark:text-white/5 transform rotate-12 group-hover:rotate-0 transition-transform duration-500 pointer-events-none">
                         {exp.type === 'work' ? <Briefcase size={120} /> : <GraduationCap size={120} />}
                     </div>
                     
                     <div className="relative z-10">
                         <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className={`px-3 py-1 text-black text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 bg-secondary text-background`}>
                                <Calendar size={12} /> {exp.year}
                            </span>
                         </div>
                         
                         <h3 className="font-display font-bold text-3xl text-primary mb-1">{exp.title}</h3>
                         <p className={`font-tech text-xl mb-4 font-medium text-secondary`}>{exp.org}</p>
                         <p className="text-secondary text-lg leading-relaxed max-w-2xl font-light">{exp.desc}</p>
                     </div>
                  </div>
               </motion.div>
            ))}
          </div>
       </div>
    </div>
  );
};