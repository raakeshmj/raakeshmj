import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';

const stats = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Years Experience", value: 3, suffix: "" },
  { label: "Code Commits", value: 500, suffix: "+" },
];

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const springValue = useSpring(0, { duration: 3000, bounce: 0 });

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString() + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} className="font-display font-black text-5xl md:text-6xl text-primary mb-2 block" />;
};

export const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-24 border-t border-primary/10 pt-12">
      {stats.map((stat, index) => (
        <div key={index} className="text-center md:text-left">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: index * 0.1 }}
           >
             <Counter value={stat.value} suffix={stat.suffix} />
             <div className="text-sm uppercase tracking-widest text-secondary">{stat.label}</div>
           </motion.div>
        </div>
      ))}
    </div>
  );
};