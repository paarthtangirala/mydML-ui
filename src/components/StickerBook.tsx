import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Trophy, Sparkles, Rocket, Brain, Heart } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface StickerBookProps {
  isOpen: boolean;
  onClose: () => void;
  collectedStars: number;
}

export const StickerBook = ({ isOpen, onClose, collectedStars }: StickerBookProps) => {
  const { playSound } = useSound();

  const stickers = [
    { id: 1, name: 'Pattern Master', icon: <Brain />, color: 'bg-primary', description: 'Solved a tricky pattern!' },
    { id: 2, name: 'Memory Wizard', icon: <Sparkles />, color: 'bg-secondary', description: 'Found all the pairs!' },
    { id: 3, name: 'Story Teller', icon: <Heart />, color: 'bg-accent', description: 'Created a magical story!' },
    { id: 4, name: 'Space Explorer', icon: <Rocket />, color: 'bg-indigo-500', description: 'Reached the stars!' },
    { id: 5, name: 'Logic Hero', icon: <Trophy />, color: 'bg-emerald-500', description: 'Completed a logic lab!' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#fdfbf7] rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white"
          >
            {/* Header */}
            <div className="bg-primary p-8 text-white flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-display font-bold mb-2">My Adventure Sticker Book 📖</h2>
                <p className="text-white/80 font-bold">You have collected {collectedStars} magical stars!</p>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {stickers.map((sticker, i) => {
                  const isUnlocked = collectedStars > i;
                  return (
                    <motion.div
                      key={sticker.id}
                      whileHover={isUnlocked ? { scale: 1.05, rotate: 2 } : {}}
                      className={`relative aspect-square rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center transition-all ${
                        isUnlocked 
                          ? `${sticker.color} text-white shadow-xl cursor-pointer` 
                          : 'bg-ink/5 text-ink/20 border-4 border-dashed border-ink/10'
                      }`}
                    >
                      <div className={`mb-4 ${isUnlocked ? 'scale-150' : 'scale-100 opacity-20'}`}>
                        {sticker.icon}
                      </div>
                      <h3 className={`font-bold mb-1 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
                        {sticker.name}
                      </h3>
                      <p className={`text-[10px] leading-tight ${isUnlocked ? 'opacity-80' : 'opacity-0'}`}>
                        {sticker.description}
                      </p>

                      {!isUnlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Star size={32} className="opacity-10" />
                        </div>
                      )}
                      
                      {isUnlocked && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Star size={16} fill="currentColor" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Star Collection Section */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-8 text-center text-ink/40 uppercase tracking-widest">Star Collection</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                        collectedStars >= i 
                          ? 'bg-accent text-white shadow-lg scale-110' 
                          : 'bg-ink/5 text-ink/10'
                      }`}
                    >
                      <Star fill={collectedStars >= i ? "currentColor" : "none"} size={32} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-ink/5 text-center">
              <p className="font-bold text-ink/40">Keep playing games to earn more stickers!</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
