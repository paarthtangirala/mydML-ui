import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, Sparkles, Cloud, Circle, Square, Triangle } from 'lucide-react';

export const GameBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none mesh-gradient">
      {/* Dynamic Gradient Orbs - With Mouse Parallax */}
      <motion.div 
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        className="absolute -top-[10%] -left-[5%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[100px] orb-primary" 
      />
      <motion.div 
        animate={{ x: -mousePos.x * 0.8, y: -mousePos.y * 0.8 }}
        className="absolute -bottom-[10%] -right-[5%] w-[70%] h-[70%] bg-secondary/10 rounded-full blur-[100px] orb-secondary" 
      />
      <motion.div 
        animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-accent/5 rounded-full blur-[120px] orb-primary opacity-50" 
      />

      {/* Floating Elements: Stars, Sparkles, and Playful Shapes */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          const size = 10 + Math.random() * 30;
          const duration = 15 + Math.random() * 20;
          const delay = -Math.random() * duration;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          
          return (
            <div
              key={i}
              className="absolute floating-element will-change-transform"
              style={{ 
                width: size, 
                height: size,
                left: `${left}%`,
                top: `${top}%`,
                '--duration': `${duration}s`,
                '--delay': `${delay}s`
              } as React.CSSProperties}
            >
              {i % 6 === 0 ? (
                <Star className="text-accent fill-accent/20 w-full h-full" />
              ) : i % 6 === 1 ? (
                <Sparkles className="text-primary w-full h-full" />
              ) : i % 6 === 2 ? (
                <Circle className="text-secondary/40 w-full h-full" />
              ) : i % 6 === 3 ? (
                <Square className="text-indigo-400/30 w-full h-full rotate-12" />
              ) : i % 6 === 4 ? (
                <Triangle className="text-pink-400/30 w-full h-full -rotate-12" />
              ) : (
                <Cloud className="text-secondary/20 w-full h-full" />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', 
             backgroundSize: '80px 80px' 
           }} 
      />
      
      {/* Animated Light Streaks */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent streak-left" />
      <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent streak-right" />
    </div>
  );
};
