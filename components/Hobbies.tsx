import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Github, Camera, MapPin, Gamepad2, Dumbbell, Battery, Wifi, Signal, ArrowUpRight, Music, Coffee, User } from 'lucide-react';

const interests = [
  {
    id: 1,
    title: "Lifestyle",
    image: "/walking.jpeg",
    icon: <User className="w-6 h-6" />,
    desc: "Just me, living in the moment."
  },
  {
    id: 2,
    title: "Exploration",
    image: "/climbing.jpeg",
    icon: <MapPin className="w-6 h-6" />,
    desc: "New places, new perspectives."
  },
  {
    id: 3,
    title: "Downtime",
    image: "/irish.jpeg",
    icon: <Gamepad2 className="w-6 h-6" />,
    desc: "Recharging with good games."
  },
  {
    id: 4,
    title: "Discipline",
    image: "/gym.heic",
    icon: <Dumbbell className="w-6 h-6" />,
    desc: "Pushing limits, physical & mental."
  }
];

export const Hobbies: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <section className="py-32 bg-background relative overflow-hidden">
             {/* Header */}
             <div className="container mx-auto px-6 mb-20">
                <h2 className="font-display font-black text-5xl md:text-7xl uppercase text-primary mb-6">
                    Life <br/> <span className="text-accent">Unfiltered</span>
                </h2>
                <p className="text-secondary text-xl max-w-xl">
                    Away from the keyboard and the commit logs. Just snapshots of my journey, 
                    the places I go, and the chaos that fuels the code.
                </p>
             </div>

             {/* Apple-style Carousel */}
             <div className="pl-6 md:pl-20 overflow-x-auto pb-12 hide-scrollbar flex gap-8 snap-x snap-mandatory pr-6">
                {interests.map((item) => (
                    <div key={item.id} className="snap-center shrink-0 w-[85vw] md:w-[400px] h-[500px] relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5 shadow-2xl">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 will-change-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        
                        <div className="absolute bottom-8 left-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 text-accent border border-white/20">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
                        </div>
                    </div>
                ))}
             </div>

             {/* Phone Mockup Section */}
             <div className="container mx-auto px-6 mt-32">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32">
                    <div className="text-center lg:text-left max-w-md order-2 lg:order-1">
                        <h3 className="font-display font-bold text-4xl text-primary mb-6">The Social Grid</h3>
                        <p className="text-secondary mb-8 text-lg leading-relaxed">
                            A digital archive of my existence. I share updates on my latest builds, random thoughts on tech, and glimpses of my daily grind.
                        </p>
                        <div className="hidden lg:flex items-center gap-4 text-accent uppercase font-bold tracking-widest text-sm">
                             <span className="w-12 h-[1px] bg-accent"></span>
                             <span>Synced Devices</span>
                        </div>
                    </div>

                    {/* The Phone */}
                    <div className="order-1 lg:order-2 relative w-[320px] h-[650px] bg-black rounded-[3.5rem] border-[8px] border-[#1f1f1f] shadow-2xl overflow-hidden ring-1 ring-white/20 transform -rotate-6 hover:rotate-0 transition-all duration-700 hover:scale-[1.02] shadow-accent/10 will-change-transform">
                        {/* Hardware Buttons */}
                        <div className="absolute top-24 -left-[10px] w-[3px] h-10 bg-[#2a2a2a] rounded-l-md"></div>
                        <div className="absolute top-40 -left-[10px] w-[3px] h-14 bg-[#2a2a2a] rounded-l-md"></div>
                        <div className="absolute top-28 -right-[10px] w-[3px] h-20 bg-[#2a2a2a] rounded-r-md"></div>

                        {/* Screen Content */}
                        <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col">
                            {/* Wallpaper / Gradient Background */}
                            <div className="absolute inset-0 z-0">
                                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="Wallpaper" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
                            </div>

                            {/* Status Bar */}
                            <div className="relative z-30 px-7 pt-4 pb-2 flex justify-between items-center text-white text-[10px] font-bold tracking-widest">
                                <span>{formatTime(time)}</span>
                                <div className="flex items-center gap-1.5 opacity-90">
                                    <Signal size={12} />
                                    <Wifi size={12} />
                                    <Battery size={16} />
                                </div>
                            </div>
                            
                            {/* Dynamic Island */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-40 flex items-center justify-center gap-3 px-3 shadow-lg">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/60"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20 animate-pulse"></div>
                            </div>

                            {/* Scrollable Area */}
                            <div className="flex-1 relative z-10 overflow-y-auto hide-scrollbar pt-6 px-5 pb-10">
                                {/* Profile Header */}
                                <div className="flex flex-col items-center mb-8 relative">
                                    <div className="w-24 h-24 rounded-full p-1 border border-accent/30 relative mb-3 group cursor-pointer transition-transform hover:scale-105">
                                        <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping opacity-20"></div>
                                        <img src="/raakesh.jpeg" alt="Profile" className="w-full h-full rounded-full object-cover bg-gray-800" 
                                             onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"; }}
                                        />
                                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-white text-[10px]">
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </div>
                                    </div>
                                    <h4 className="text-white font-bold text-lg">Raakesh MJ</h4>
                                    <p className="text-white/50 text-xs mb-4">Full Stack & Blockchain Dev</p>
                                    
                                    <div className="flex gap-3 w-full justify-center px-4">
                                        <button className="flex-1 py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/5">Follow</button>
                                        <button className="flex-1 py-2.5 bg-white/10 text-white text-xs font-bold rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">Message</button>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="space-y-3">
                                    <SocialCard 
                                        icon={<Linkedin size={18} />} 
                                        platform="LinkedIn" 
                                        handle="Connect Professionally" 
                                        color="bg-[#0077b5]" 
                                        url="https://www.linkedin.com/in/raakeshmj"
                                    />
                                    <SocialCard 
                                        icon={<Instagram size={18} />} 
                                        platform="Instagram" 
                                        handle="@raakesh_mj" 
                                        color="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" 
                                        url="https://www.instagram.com/raakesh_mj/"
                                    />
                                    <SocialCard 
                                        icon={<Twitter size={18} />} 
                                        platform="X (Twitter)" 
                                        handle="@raakeshmj" 
                                        color="bg-black border border-white/20" 
                                        url="https://x.com/raakeshmj"
                                    />
                                    <SocialCard 
                                        icon={<Github size={18} />} 
                                        platform="GitHub" 
                                        handle="Open Source" 
                                        color="bg-[#1b1f23]" 
                                        url="https://github.com/raakeshmj"
                                    />
                                </div>
                                
                                {/* Latest Updates Widget */}
                                <div className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-md">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs text-white/60 font-bold uppercase tracking-wider">Status Update</span>
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    </div>
                                    <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            Currently deep diving into Solidity smart contracts. The possibilities of DeFi are insane. 🚀 #web3 #coding
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50"></div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
}

const SocialCard = ({ icon, platform, handle, color, url }: { icon: React.ReactNode, platform: string, handle: string, color: string, url: string }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-95 group">
        <div className={`p-2.5 rounded-xl text-white shadow-lg ${color} group-hover:shadow-xl transition-shadow flex items-center justify-center`}>
            {icon}
        </div>
        <div className="flex-1">
            <div className="text-white text-sm font-bold flex items-center justify-between">
                {platform}
                <ArrowUpRight size={14} className="text-white/30 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
            </div>
            <div className="text-white/40 text-[10px]">{handle}</div>
        </div>
    </a>
);