import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw, Undo2, Lightbulb, Brain } from 'lucide-react';

interface ColorMemoryProps {
  onBack: () => void;
}

export const ColorMemory: React.FC<ColorMemoryProps> = ({ onBack }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const buttons = [
    { id: 'red', color: 'bg-red-500', label: 'RED' },
    { id: 'blue', color: 'bg-blue-500', label: 'BLUE' },
    { id: 'green', color: 'bg-emerald-500', label: 'GREEN' },
    { id: 'yellow', color: 'bg-amber-400', label: 'YELLOW' }
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
      <div className="w-full max-w-6xl flex justify-between items-start mb-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 font-bold hover:scale-105 transition-transform"
        >
          <ArrowLeft size={20} /> Exit to Games
        </button>
        <div className="flex flex-col items-end">
          <div className="bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Dev
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level</div>
            <div className="text-4xl font-display font-black text-slate-800">1<span className="text-slate-300 text-xl">/10</span></div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-start mb-8 relative">
        <h1 className="text-6xl font-display font-black text-slate-800 mb-2">Color Memory</h1>
        
        {/* Character Interaction */}
        <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -right-24 top-0 hidden lg:flex items-center gap-4"
        >
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[150px] relative">
            <p className="text-[10px] font-bold text-slate-600 leading-tight">
              "Watch the sequence carefully! You've got this!"
            </p>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-l border-b border-slate-100" />
          </div>
          <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="text-white fill-white/20" size={32} />
          </div>
        </motion.div>

        <div className="flex gap-4">
          <span className="bg-slate-900 text-white px-4 py-1 rounded-lg text-[10px] font-bold">L1: SEQUENTIAL</span>
          <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Assessment V1</span>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        {buttons.map((btn) => (
          <motion.button
            key={btn.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={() => setActiveButton(btn.id)}
            onMouseUp={() => setActiveButton(null)}
            className={`w-64 h-64 rounded-[3rem] ${btn.color} shadow-2xl flex flex-col items-center justify-center relative group overflow-hidden`}
          >
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner mb-4">
              <div className={`w-16 h-16 rounded-full shadow-2xl ${btn.color} border-4 border-white/30`} />
            </div>
            <span className="text-white/60 font-black text-xs tracking-[0.2em]">{btn.label}</span>
            
            {/* Active Glow */}
            {activeButton === btn.id && (
              <motion.div 
                layoutId="glow"
                className="absolute inset-0 bg-white/20 pointer-events-none"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Status Bar */}
      <div className="w-full max-w-4xl bg-emerald-50 border border-emerald-100 py-4 rounded-2xl flex items-center justify-center gap-3 mb-8 shadow-sm">
        <div className="w-5 h-5 bg-slate-800 rounded-lg flex items-center justify-center">
          <div className="w-3 h-3 text-white">🎮</div>
        </div>
        <span className="text-emerald-700 font-black tracking-[0.1em] uppercase text-sm">Your Turn!</span>
      </div>

      {/* Controls */}
      <div className="w-full max-w-4xl grid grid-cols-3 gap-4">
        <button className="bg-slate-50 border border-slate-100 py-4 rounded-2xl flex items-center justify-center gap-2 text-slate-300 font-black text-[10px] tracking-widest uppercase hover:bg-slate-100 transition-colors">
          <Undo2 size={16} /> Undo Tap
        </button>
        <button className="bg-red-50/30 border border-red-100/50 py-4 rounded-2xl flex items-center justify-center gap-2 text-red-200 font-black text-[10px] tracking-widest uppercase hover:bg-red-50 transition-colors">
          <RotateCcw size={16} /> Reset
        </button>
        <button className="bg-slate-50 border border-slate-100 py-4 rounded-2xl flex items-center justify-center gap-2 text-slate-300 font-black text-[10px] tracking-widest uppercase hover:bg-slate-100 transition-colors">
          <Lightbulb size={16} /> No Hints
        </button>
      </div>
      </div>
    </motion.div>
  );
};
