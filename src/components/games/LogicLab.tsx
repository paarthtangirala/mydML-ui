import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Hammer, Zap } from 'lucide-react';

interface LogicLabProps {
  onBack: () => void;
}

export const LogicLab: React.FC<LogicLabProps> = ({ onBack }) => {
  const grid = Array(16).fill(null);
  const pipes = [
    { id: 1, type: 'straight' },
    { id: 2, type: 'straight' },
    { id: 3, type: 'corner' },
    { id: 4, type: 'corner' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center relative"
    >
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 font-bold hover:scale-105 transition-transform"
        >
          <ArrowLeft size={20} /> Exit to Games
        </button>
      </div>

      {/* Game Container */}
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-2xl p-12 border-8 border-white relative">
        <div className="flex flex-col items-center mb-10 relative">
          <h1 className="text-5xl font-display font-black text-blue-500 mb-2">LOGIC LAB</h1>
          
          {/* Character Interaction */}
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -left-32 top-0 hidden lg:flex flex-col items-center gap-2"
          >
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[150px] relative">
              <p className="text-[10px] font-bold text-slate-600 leading-tight">
                "Connect the pipes to help the sprout grow!"
              </p>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-r border-t border-slate-100" />
            </div>
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="text-white fill-white/20" size={32} />
            </div>
          </motion.div>

          <div className="text-[10px] font-black text-amber-400 tracking-[0.3em] uppercase">Early Sprouts</div>
        </div>

        <div className="flex gap-8">
          {/* Left: Pipe Selection */}
          <div className="w-24 bg-blue-50/50 rounded-3xl p-4 border-2 border-dashed border-blue-200 flex flex-col gap-4">
            {pipes.map((pipe) => (
              <motion.div
                key={pipe.id}
                whileHover={{ scale: 1.1 }}
                className="w-full aspect-square bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className={`w-12 h-6 bg-slate-200 rounded-full ${pipe.type === 'corner' ? 'rounded-tr-none rounded-br-none border-r-4 border-slate-300' : ''}`} />
              </motion.div>
            ))}
          </div>

          {/* Center: Grid */}
          <div className="flex-1 grid grid-cols-4 gap-3">
            {grid.map((_, i) => (
              <div 
                key={i}
                className="aspect-square bg-white/50 rounded-2xl border border-white shadow-inner flex items-center justify-center relative group"
              >
                {i === 8 && (
                  <div className="w-full h-full bg-blue-100 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">💧</span>
                  </div>
                )}
                {i === 10 && (
                  <div className="w-full h-full bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">🌱</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-2xl transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-12 bg-white rounded-[2.5rem] p-6 flex items-center justify-between shadow-lg">
          <div className="flex gap-2 ml-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-blue-500 text-white rounded-2xl font-black text-xl shadow-lg shadow-blue-200 flex items-center gap-3"
          >
            RUN
          </motion.button>
          
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Floating Tool Icon */}
        <div className="absolute -bottom-12 -right-12 w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
          <Hammer className="text-white" size={24} />
        </div>
      </div>
      </div>
    </motion.div>
  );
};
