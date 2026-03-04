import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Rocket } from 'lucide-react';

interface StoryBuilderProps {
  onBack: () => void;
}

export const StoryBuilder: React.FC<StoryBuilderProps> = ({ onBack }) => {
  const items = [
    { icon: '🎩', label: 'HAT' },
    { icon: '🦖', label: 'DINOSAUR' },
    { icon: '🌙', label: 'MOON' },
    { icon: '🚀', label: 'SPACESHIP' },
    { icon: '🦁', label: 'LION' },
    { icon: '🌳', label: 'TREE' },
    { icon: '👽', label: 'ALIEN' },
    { icon: '🌊', label: 'OCEAN' },
    { icon: '🪐', label: 'PLANET' }
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
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 font-bold hover:scale-105 transition-transform"
        >
          <ArrowLeft size={20} /> Exit to Games
        </button>
        <div className="bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          Dev
        </div>
      </div>

      <div className="flex flex-col items-center mb-12 relative">
        <div className="bg-amber-100 text-amber-700 px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
          Chapter 1: Divergent Idea Generation
        </div>
        <h1 className="text-6xl font-display font-black text-slate-800 mb-4 flex items-center gap-4">
          The Story Builder 📖
        </h1>
        
        {/* Character Interaction */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -right-32 top-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[150px] relative">
            <p className="text-[10px] font-bold text-slate-600 leading-tight">
              "Drag your favorite items to build a magical story!"
            </p>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-l border-b border-slate-100" />
          </div>
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Rocket className="text-white fill-white/20" size={32} />
          </div>
        </motion.div>

        <p className="text-slate-400 font-medium italic">
          "L1: 'What ideas can I create?' - Create any story you like!"
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-2 gap-8 mb-12">
        {/* Left Panel: Characters & Items */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-xl p-10 border border-white/50">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-amber-400">✨</span>
            <h2 className="text-2xl font-display font-black text-blue-900">Characters & Items</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {items.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square bg-slate-50 rounded-3xl flex flex-col items-center justify-center gap-2 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-[10px] font-black text-slate-400 tracking-widest group-hover:text-blue-400 transition-colors">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Panel: Story Timeline */}
        <div className="bg-emerald-50/30 rounded-[3rem] shadow-xl p-10 border border-emerald-100 flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-emerald-400">🎞️</span>
            <h2 className="text-2xl font-display font-black text-emerald-900">Story Timeline</h2>
          </div>
          <div className="flex-1 border-4 border-dashed border-emerald-100 rounded-[2rem] flex items-center justify-center">
            <span className="text-emerald-400 font-black italic text-2xl">Tell us more!</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 bg-slate-200 text-slate-500 rounded-3xl font-black text-xl flex items-center gap-3 shadow-lg"
        >
          <BookOpen size={24} /> READ MY STORY
        </motion.button>
        <p className="text-slate-300 font-medium italic">"There's no wrong story!"</p>
        
        <div className="mt-8 bg-blue-50 px-8 py-3 rounded-full border border-blue-100">
          <span className="text-blue-600 font-black text-sm uppercase tracking-widest">0/1 Items Needed</span>
        </div>
      </div>
      </div>
    </motion.div>
  );
};
