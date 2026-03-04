import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSound } from '../hooks/useSound';
import { Star, ArrowLeft, Play, X, BookOpen } from 'lucide-react';
import { StickerBook } from './StickerBook';

interface Game {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skills: string[];
  color: string;
  preview: React.ReactNode;
}

const games: Game[] = [
  {
    id: 1,
    title: "Pattern Finder",
    difficulty: 'Easy',
    skills: ['LOGIC', 'VISUAL'],
    color: 'bg-[#C1E1C1]', // Light Green
    preview: (
      <div className="flex flex-col gap-4 w-full px-4">
        <div className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm border border-slate-200">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400" />
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <div className="w-4 h-4 rounded-full bg-red-500" />
          </div>
          <div className="w-6 h-6 bg-slate-400 rounded-md flex items-center justify-center">
            <Play size={12} className="text-white fill-white" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['bg-yellow-400', 'bg-green-500', 'bg-red-500', 'bg-blue-500'].map((c, i) => (
            <div key={i} className="bg-white rounded-lg p-2 shadow-sm border border-slate-200 flex justify-center">
              <div className={`w-4 h-4 rounded-full ${c}`} />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Color Memory",
    difficulty: 'Medium',
    skills: ['MEMORY', 'FOCUS'],
    color: 'bg-[#B4D4FF]', // Light Blue
    preview: (
      <div className="grid grid-cols-2 gap-3 w-32">
        <div className="w-14 h-14 bg-red-500 rounded-2xl shadow-lg border-4 border-black/10 flex items-center justify-center">
          <span className="text-[6px] text-white font-bold">RED</span>
        </div>
        <div className="w-14 h-14 bg-blue-500 rounded-2xl shadow-lg border-4 border-black/10 flex items-center justify-center">
          <span className="text-[6px] text-white font-bold">BLUE</span>
        </div>
        <div className="w-14 h-14 bg-green-500 rounded-2xl shadow-lg border-4 border-black/10 flex items-center justify-center">
          <span className="text-[6px] text-white font-bold">GREEN</span>
        </div>
        <div className="w-14 h-14 bg-yellow-400 rounded-2xl shadow-lg border-4 border-black/10 flex items-center justify-center">
          <span className="text-[6px] text-white font-bold">YELLOW</span>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Story Builder",
    difficulty: 'Easy',
    skills: ['CREATIVITY', 'LANGUAGE'],
    color: 'bg-[#E0D7FF]', // Light Purple
    preview: (
      <div className="flex gap-4 w-full px-4">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 flex-1">
          <div className="text-[6px] font-bold mb-2 flex items-center gap-1">✨ Characters & Items</div>
          <div className="grid grid-cols-3 gap-1">
            {['🪐', '👽', '⚽', '🚲', '☀️', '🦅', '🐱', '🚀', '👨‍🚀'].map((emoji, i) => (
              <div key={i} className="w-6 h-6 bg-slate-50 rounded-md flex items-center justify-center border border-slate-100">
                <span className="text-[10px]">{emoji}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 flex-1">
          <div className="text-[6px] font-bold mb-2 flex items-center gap-1">🎬 Story Timeline</div>
          <div className="h-20 border-2 border-dashed border-emerald-100 rounded-lg flex items-center justify-center">
            <span className="text-[6px] text-emerald-400 font-bold">Add more twists!</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Logic Lab: Pipe Fixer",
    difficulty: 'Hard',
    skills: ['PROBLEM SOLVING', 'STEM'],
    color: 'bg-[#FFE5CC]', // Light Orange
    preview: (
      <div className="flex gap-4 w-full px-4">
        <div className="w-12 bg-white/50 rounded-xl p-2 border-2 border-dashed border-white flex flex-col gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-full aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center">
              <div className="w-6 h-3 bg-slate-200 rounded-full" />
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white/50 rounded-xl p-2 border-2 border-white grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-white/50 rounded-md border border-white flex items-center justify-center">
              {i === 4 && <span className="text-xs">💧</span>}
              {i === 8 && <span className="text-xs">🌱</span>}
            </div>
          ))}
          <div className="col-span-3 flex justify-center mt-1">
            <div className="bg-blue-500 text-white text-[6px] px-4 py-1 rounded-full font-bold">RUN</div>
          </div>
        </div>
      </div>
    )
  }
];

export const PlayZone = ({ 
  onBack, 
  onStartGame, 
  childData, 
  collectedStars 
}: { 
  onBack: () => void; 
  onStartGame: (id: number) => void; 
  childData: any;
  collectedStars: number;
  key?: React.Key 
}) => {
  const { playSound } = useSound();
  const [isStickerBookOpen, setIsStickerBookOpen] = useState(false);
  const name = childData?.name || 'Arjun';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative min-h-screen"
    >
      <StickerBook 
        isOpen={isStickerBookOpen} 
        onClose={() => setIsStickerBookOpen(false)} 
        collectedStars={collectedStars}
      />

      <div className="relative z-10">
        {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <button 
            onClick={() => {
              playSound('click');
              onBack();
            }}
            className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold mb-4 transition-colors text-sm"
          >
            <ArrowLeft size={18} /> Back to Adventure
          </button>
          <h1 className="text-6xl md:text-7xl font-display font-black tracking-tight">
            {name}'s <span className="text-primary">Play Zone</span> 🎮
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Sticker Book Button */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound('magic');
              setIsStickerBookOpen(true);
            }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-xl shadow-accent/20 group-hover:bg-accent/90 transition-colors">
              <BookOpen className="text-white" size={32} />
            </div>
            <span className="text-[10px] font-black text-accent uppercase tracking-widest">Sticker Book</span>
          </motion.button>
          {/* Sparky's Message */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[220px] relative z-10"
            >
              <button className="absolute top-2 right-2 text-slate-300 hover:text-slate-500">
                <X size={14} />
              </button>
              <p className="text-xs font-bold text-slate-600 leading-snug pr-4">
                Hi! I'm Sparky. Can you find all 5 hidden stars? 🌟
              </p>
              {/* Speech bubble tail */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-r border-t border-slate-100" />
            </motion.div>
            {/* Sparky Character Icon */}
            <div className="absolute -right-12 top-0 w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
              <Star className="text-white fill-white" size={24} />
              {/* Eyes and mouth */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 mt-1">
                <div className="w-1 h-1 bg-slate-800 rounded-full" />
                <div className="w-1 h-1 bg-slate-800 rounded-full" />
              </div>
            </div>
          </div>

          {/* XP Counter */}
          <div className="flex flex-col items-end ml-16">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total XP</div>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-display font-black text-slate-800">1,250</div>
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shadow-md">
                <Star className="text-white fill-white" size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onMouseEnter={() => playSound('hover', 0.1)}
            className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col group"
          >
            {/* Top Section: Preview */}
            <div className={`h-64 ${game.color} relative flex items-center justify-center overflow-hidden`}>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                {game.difficulty}
              </div>
              <div className="w-full flex justify-center">
                {game.preview}
              </div>
            </div>

            {/* Bottom Section: Info */}
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-display font-black text-slate-800 mb-4">{game.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {game.skills.map(skill => (
                  <span key={skill} className="text-[10px] font-black uppercase tracking-widest bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>

              <motion.button 
                onClick={() => {
                  playSound('pop');
                  onStartGame(game.id);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-colors mt-auto"
              >
                Start Game <Play size={20} fill="currentColor" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.div>
  );
};
