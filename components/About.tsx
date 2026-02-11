import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Experience } from './Experience';
import { Stats } from './Stats';
import { Code, Database, Globe, Cpu, Layers, Terminal, Download, Sparkles, ArrowRight, Server } from 'lucide-react';

export const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax for portrait
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    // Mouse move effect for portrait
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const { clientWidth, clientHeight } = e.currentTarget;

        const x = (offsetX / clientWidth) - 0.5;
        const y = (offsetY / clientHeight) - 0.5;

        mouseX.set(x * 20);
        mouseY.set(y * 20);
    };

    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-surface to-background opacity-50 dark:opacity-30" />
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-background to-transparent" />

                {/* OPTIMIZATION: Removed heavy SVG filter noise overlay */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '50px 50px', color: 'var(--primary)' }}>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">

                    {/* Portrait Section */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            style={{ y, rotateX: springY, rotateY: springX, rotate }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                            className="sticky top-32 perspective-1000 will-change-transform"
                        >
                            <div className="relative aspect-[3/4] clip-portrait-hex group bg-card-bg shadow-2xl">
                                <img
                                    src='/raakesh.jpeg'  // ✅ Use the imported variable
                                    alt="Raakesh MJ"
                                    loading="lazy"
                                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const parent = e.currentTarget.parentElement;
                                        if (parent && !parent.querySelector('.error-placeholder')) {
                                            const placeholder = document.createElement('div');
                                            placeholder.className = 'error-placeholder absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800';
                                            placeholder.innerHTML = '<span class="text-gray-600 dark:text-gray-400 font-medium text-xl">Raakesh MJ</span>';
                                            parent.appendChild(placeholder);
                                        }
                                    }}
                                />

                                {/* Overlay Effects */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80"></div>
                                <div className="absolute inset-0 border-[4px] border-primary/5 group-hover:border-accent/50 transition-colors duration-500 z-20 pointer-events-none mix-blend-overlay"></div>

                                {/* Animated Border Trace */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <rect x="2" y="2" width="99%" height="99%" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" className="animate-[dash_3s_linear_infinite]" />
                                </svg>

                                <div className="absolute bottom-8 left-8 z-30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                                        <span className="text-accent text-xs font-bold uppercase tracking-widest">Available for hire</span>
                                    </div>
                                    <h3 className="text-primary font-display font-bold text-2xl">Raakesh MJ</h3>
                                    <p className="text-secondary text-sm">Full Stack Engineer</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bio Section */}
                    <div className="lg:col-span-7 flex flex-col justify-center pt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-display font-black text-6xl md:text-8xl leading-[0.85] mb-12 tracking-tighter">
                                <span className="text-outline block text-primary/20 dark:text-primary/100">ENGINEERING</span>
                                <span className="bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent block">THE FUTURE</span>
                            </h2>

                            <div className="space-y-6 text-lg text-secondary font-light leading-relaxed mb-12 max-w-2xl">
                                <p>
                                    I operate at the intersection of <strong className="text-primary font-semibold">robust engineering</strong> and <strong className="text-primary font-semibold">visionary design</strong>.
                                    Currently pursuing an Integrated M.Tech in Computer Science at VIT Vellore.
                                </p>
                                <p>
                                    My philosophy is simple: build systems that are scalable, secure, and intuitive. From architecting decentralized energy platforms
                                    to crafting pixel-perfect interfaces, I bring a full-spectrum approach to digital problem solving.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                <a href="https://drive.google.com/file/d/1M8LcSS9AmkK3FfmWt6FN-lmVdR6J1tWi/view?usp=drive_link" target="_blank" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-primary/20 hover:border-accent text-primary rounded-full overflow-hidden transition-all duration-300">
                                    <span className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                    <Download className="w-5 h-5 group-hover:text-accent transition-colors" />
                                    <span className="font-bold uppercase tracking-wider text-sm relative z-10 group-hover:text-accent transition-colors">Download Resume</span>
                                </a>
                            </div>

                            <Experience />
                        </motion.div>
                    </div>
                </div>

                {/* Technical Arsenal - Bento Grid */}
                <div id="skills" className="scroll-mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-primary/10 pb-8">
                        <div>
                            <h4 className="font-tech font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Proficiency
                            </h4>
                            <h2 className="font-display font-black text-4xl md:text-6xl text-primary uppercase">Technical Arsenal</h2>
                        </div>
                        <div className="hidden md:block w-1/3 h-[1px] bg-gradient-to-r from-accent to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">

                        {/* Full Stack Web - Large Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-2 md:row-span-2 glass-card p-8 rounded-3xl group relative overflow-hidden flex flex-col justify-between"
                        >
                            {/* Abstract Background Decoration */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-accent border border-primary/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Globe size={32} />
                                </div>
                                <h3 className="text-3xl font-display font-bold text-primary mb-3">Full Stack Web</h3>
                                <p className="text-secondary text-lg mb-8 max-w-sm">Building comprehensive, scalable web solutions with modern frameworks and reactive patterns.</p>

                                <div className="flex flex-wrap gap-3">
                                    {["React.js", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion"].map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-white/5 border border-primary/10 rounded-xl text-xs font-bold text-secondary uppercase tracking-wider hover:text-primary hover:border-accent hover:bg-accent/10 transition-all cursor-default shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Backend & Data - Tall Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="md:col-span-1 md:row-span-2 glass-card p-8 rounded-3xl group relative overflow-hidden flex flex-col"
                        >
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-accent border border-primary/10 shadow-lg group-hover:rotate-12 transition-transform">
                                <Database size={28} />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-primary mb-6">Backend & Data</h3>

                            <div className="flex flex-col gap-3 mt-auto">
                                {[
                                    { name: "PostgreSQL", role: "Relational Engine", status: "Active" },
                                    { name: "MongoDB", role: "Document Store", status: "Active" },
                                    { name: "Redis", role: "In-Memory Cache", status: "Deployed" },
                                    { name: "Firebase", role: "Real-time Sync", status: "Active" }
                                ].map((tech) => (
                                    <div key={tech.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/20 hover:bg-white/10 transition-all group/item hover:translate-x-1 cursor-default">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-primary group-hover/item:text-accent transition-colors">{tech.name}</span>
                                            <span className="text-[10px] text-secondary uppercase tracking-wider font-mono">{tech.role}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* AI & ML */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6 rounded-3xl group hover:border-accent transition-colors duration-300 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-xl text-accent">
                                    <Cpu className="w-6 h-6 group-hover:animate-pulse-slow" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-primary/30 group-hover:text-accent group-hover:-rotate-45 transition-all" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-1">AI & ML</h3>
                                <p className="text-sm text-secondary font-medium">Python, TensorFlow, Deepfake Detection</p>
                            </div>
                        </motion.div>

                        {/* Blockchain */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-6 rounded-3xl group hover:border-accent transition-colors duration-300 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-xl text-accent">
                                    <Layers className="w-6 h-6 group-hover:animate-float" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-primary/30 group-hover:text-accent group-hover:-rotate-45 transition-all" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-1">Blockchain</h3>
                                <p className="text-sm text-secondary font-medium">Solidity, Smart Contracts, Web3.js</p>
                            </div>
                        </motion.div>

                        {/* Languages */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="glass-card p-6 rounded-3xl group hover:border-accent transition-colors duration-300 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-xl text-accent">
                                    <Code className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-primary/30 group-hover:text-accent group-hover:-rotate-45 transition-all" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-1">Languages</h3>
                                <p className="text-sm text-secondary font-medium">JS, TS, Python, Java, C++</p>
                            </div>
                        </motion.div>

                        {/* Tools */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="glass-card p-6 rounded-3xl group hover:border-accent transition-colors duration-300 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-xl text-accent">
                                    <Terminal className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-primary/30 group-hover:text-accent group-hover:-rotate-45 transition-all" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-1">Tools</h3>
                                <p className="text-sm text-secondary font-medium">Git, Docker, AWS, Vercel</p>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Stats Section */}
                <Stats />
            </div>
        </section>
    );
};
