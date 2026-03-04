import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw, Undo2, Play, Info, Star } from 'lucide-react';

interface PatternFinderProps {
  onBack: () => void;
}

export const PatternFinder: React.FC<PatternFinderProps> = ({ onBack }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const pattern = [
    { color: 'bg-yellow-400' },
    { color: 'bg-red-500' },
    { color: 'bg-yellow-400' },
    { color: 'bg-red-500' },
    { color: 'bg-yellow-400' },
    { isMissing: true }
  ];

  const options = [
    { id: 1, color: 'bg-blue-500' },
    { id: 2, color: 'bg-green-500' },
    { id: 3, color: 'bg-yellow-400' },
    { id: 4, color: 'bg-red-500' }
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
        <div className="bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          Dev
        </div>
      </div>

      {/* Game Card */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl p-12 flex flex-col items-center relative overflow-hidden border border-white/50">
        <div className="absolute top-8 right-8 text-slate-200">
          <Info size={32} />
        </div>

        <div className="bg-slate-900 text-white px-6 py-1.5 rounded-full text-[10px] font-bold mb-6">
          L1: BASIC_SWITCH
        </div>

        <h1 className="text-5xl font-display font-black text-slate-800 mb-2 tracking-tight">PATTERN FINDER</h1>
        
        {/* Character Interaction */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -left-12 top-1/4 hidden lg:flex flex-col items-center gap-2"
        >
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[150px] relative">
            <p className="text-[10px] font-bold text-slate-600 leading-tight">
              "Look closely at the colors! What comes next?"
            </p>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-r border-t border-slate-100" />
          </div>
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Star className="text-white fill-white" size={32} />
          </div>
        </motion.div>

        <div className="flex items-center gap-2 mb-12">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level 1/12</span>
        </div>

        {/* Pattern Display */}
        <div className="w-full bg-white/40 backdrop-blur-md rounded-[2rem] p-8 flex justify-center gap-4 mb-12 border border-white/50 shadow-inner">
          {pattern.map((item, i) => (
            <div 
              key={i}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${item.isMissing ? 'bg-white/60 border-2 border-dashed border-blue-200' : 'bg-white/80'}`}
            >
              {item.isMissing ? (
                selectedOption ? (
                  <div className={`w-10 h-10 rounded-full shadow-inner ${options.find(o => o.id === selectedOption)?.color}`} />
                ) : (
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <ArrowLeft className="text-blue-300 rotate-180" size={20} />
                  </div>
                )
              ) : (
                <div className={`w-10 h-10 rounded-full shadow-inner ${item.color}`} />
              )}
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedOption(option.id)}
              className={`w-32 h-24 rounded-2xl bg-white/60 backdrop-blur-md border-2 transition-all flex items-center justify-center shadow-sm ${selectedOption === option.id ? 'border-blue-500 ring-4 ring-blue-50' : 'border-white/50 hover:border-blue-200'}`}
            >
              <div className={`w-12 h-12 rounded-full shadow-lg ${option.color}`} />
            </motion.button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-12">
          <button 
            onClick={() => setSelectedOption(null)}
            className="flex items-center gap-2 px-6 py-2 bg-slate-50 text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors"
          >
            <Undo2 size={16} /> Undo
          </button>
          <button 
            onClick={() => setSelectedOption(null)}
            className="flex items-center gap-2 px-6 py-2 bg-slate-50 text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-6 bg-emerald-50 text-emerald-600 rounded-2xl font-bold flex items-center justify-center gap-3 border border-emerald-100 shadow-sm hover:bg-emerald-100 transition-colors"
        >
          <Play size={20} fill="currentColor" />
          ANALYZE THE PATTERN LOGIC
        </motion.button>
      </div>
      </div>
    </motion.div>
  );
};
