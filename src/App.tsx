import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Rocket, 
  Star, 
  Trophy, 
  Menu, 
  X,
  Heart,
  Zap,
  Gamepad2,
  Users,
  Brain,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Components ---
import { LandingPage } from './components/LandingPage';
import { PlayZone } from './components/PlayZone';
import { ParentPortal } from './components/ParentPortal';
import { Onboarding } from './components/Onboarding';
import { PatternFinder } from './components/games/PatternFinder';
import { ColorMemory } from './components/games/ColorMemory';
import { StoryBuilder } from './components/games/StoryBuilder';
import { LogicLab } from './components/games/LogicLab';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from './hooks/useSound';

import { GameBackground } from './components/games/GameBackground';

const Character = ({ type, className = "" }: { type: 'sparky' | 'brainy' | 'rex' | 'glow', className?: string }) => {
  const getIcon = () => {
    switch (type) {
      case 'sparky': return <Star size={48} className="text-accent fill-accent" />;
      case 'brainy': return <Brain size={48} className="text-secondary fill-secondary/20" />;
      case 'rex': return <Rocket size={48} className="text-primary fill-primary/20" />;
      case 'glow': return <Star size={48} className="text-yellow-400 fill-yellow-200" />;
    }
  };

  return (
    <motion.div 
      animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`relative inline-block ${className}`}
    >
      <div className="relative z-10">
        {getIcon()}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3 mt-1">
          <div className="w-2 h-2 bg-ink rounded-full" />
          <div className="w-2 h-2 bg-ink rounded-full" />
        </div>
        <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-ink rounded-full" />
      </div>
      <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full -z-10" />
    </motion.div>
  );
};

const MouseTrail = () => {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { id: Date.now(), x: e.clientX, y: e.clientY };
      setTrail(prev => [...prev.slice(-10), newPoint]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {trail.map((point, i) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: point.x,
              top: point.y,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#FF6B6B' : '#4ECDC4',
              boxShadow: '0 0 10px currentColor'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const WelcomeBubble = () => {
  const [visible, setVisible] = useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      playSound('magic', 0.1);
    }, 2000);
    return () => clearTimeout(timer);
  }, [playSound]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-24 right-8 z-[60] flex items-start gap-4"
        >
          <div className="glass p-4 rounded-2xl shadow-2xl max-w-[200px] relative">
            <p className="font-bold text-sm leading-tight">
              Hi! I'm Sparky. Can you find all 5 hidden stars? 🌟
            </p>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 glass rotate-45 border-l-0 border-b-0" />
          </div>
          <Character type="sparky" className="w-12 h-12" />
          <button 
            onClick={() => setVisible(false)}
            className="absolute -top-2 -left-2 w-6 h-6 bg-ink text-white rounded-full flex items-center justify-center text-xs"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const QuestTracker = ({ collectedStars }: { collectedStars: number }) => {
  const totalStars = 5;
  const progress = (collectedStars / totalStars) * 100;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="glass p-4 rounded-3xl shadow-2xl border-2 border-primary/20 flex items-center gap-4"
      >
        <div className="flex-1">
          <div className="flex justify-between mb-2 px-2">
            <span className="font-bold text-sm text-ink/60 uppercase tracking-widest">Adventure Progress</span>
            <span className="font-bold text-primary">{collectedStars}/{totalStars} Stars</span>
          </div>
          <div className="h-4 bg-ink/5 rounded-full overflow-hidden border border-ink/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            />
          </div>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${collectedStars === totalStars ? 'bg-accent' : 'bg-ink/5'}`}>
          <Trophy className={collectedStars === totalStars ? 'text-ink' : 'text-ink/20'} />
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'onboarding' | 'play-zone' | 'parent-portal' | 'game-pattern' | 'game-memory' | 'game-story' | 'game-logic'>('landing');
  const [childData, setChildData] = useState<{ name: string; age: number } | null>(null);
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('app-muted') === 'true');
  const { playSound } = useSound();
  const [collectedStars, setCollectedStars] = useState(0);
  const [foundStars, setFoundStars] = useState<number[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    localStorage.setItem('app-muted', String(newState));
    if (!newState) playSound('click');
  };

  const handleCollectStar = (id: number) => {
    if (!foundStars.includes(id)) {
      playSound('success');
      setFoundStars([...foundStars, id]);
      setCollectedStars(prev => prev + 1);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#FFE66D']
      });
    }
  };

  const handleStartAdventure = () => {
    playSound('click');
    if (!childData) {
      setCurrentView('onboarding');
    } else {
      setCurrentView('play-zone');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (childData) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
      });
    }
  };

  const handleOnboardingComplete = (data: any) => {
    setChildData(data);
    setCurrentView('play-zone');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      {/* Persistent Magical Background for Games - Always mounted for smoothness */}
      <div className={`fixed inset-0 z-[-1] transition-opacity duration-1000 ${currentView === 'landing' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <GameBackground />
      </div>
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-primary z-[60] origin-left" style={{ scaleX }} />

      {/* Sound Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMute}
        className="fixed top-6 right-6 z-[70] w-12 h-12 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg hover:bg-white transition-colors group"
      >
        {isMuted ? (
          <VolumeX size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
        ) : (
          <Volume2 size={20} className="text-primary" />
        )}
      </motion.button>

      {/* Background Blobs */}
      <div className="blob top-[-100px] left-[-100px]" />
      <div className="blob bottom-[-100px] right-[-100px] bg-secondary/20" />
      <div className="blob top-[40%] left-[60%] bg-accent/20" />

      {/* Navbar */}
      {!currentView.startsWith('game-') && (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg' : 'py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                playSound('click');
                setCurrentView('landing');
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Rocket className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight text-ink">MyDeck<span className="text-primary">.ai</span></span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => {
                  playSound('click');
                  setCurrentView('play-zone');
                }}
                className={`font-semibold transition-colors ${currentView === 'play-zone' ? 'text-primary' : 'text-ink/70 hover:text-primary'}`}
              >
                Play Zone
              </button>
              <button 
                onClick={() => {
                  playSound('click');
                  setCurrentView('parent-portal');
                }}
                className={`font-semibold transition-colors ${currentView === 'parent-portal' ? 'text-primary' : 'text-ink/70 hover:text-primary'}`}
              >
                Parent Portal
              </button>
              <a href="#how-it-works" className="font-semibold text-ink/70 hover:text-primary transition-colors">How it Works</a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartAdventure}
                className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20"
              >
                Join the Club
              </motion.button>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-ink" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 glass shadow-2xl p-6 flex flex-col gap-4 md:hidden"
              >
                <button onClick={() => { setCurrentView('play-zone'); setIsMenuOpen(false); }} className="font-bold text-lg text-ink/70">Play Zone</button>
                <button onClick={() => { setCurrentView('parent-portal'); setIsMenuOpen(false); }} className="font-bold text-lg text-ink/70">Parent Portal</button>
                <a href="#how-it-works" className="font-bold text-lg text-ink/70">How it Works</a>
                <button onClick={handleStartAdventure} className="bg-primary text-white py-3 rounded-xl font-bold">Join the Club</button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      <MouseTrail />
      {!currentView.startsWith('game-') && <WelcomeBubble />}
      {!currentView.startsWith('game-') && <QuestTracker collectedStars={collectedStars} />}

      <main>
        <AnimatePresence mode="wait">
          {currentView === 'landing' && (
            <LandingPage 
              key="landing"
              onStartAdventure={handleStartAdventure}
              onCollectStar={handleCollectStar}
              foundStars={foundStars}
            />
          )}
          {currentView === 'onboarding' && (
            <Onboarding 
              key="onboarding"
              onComplete={handleOnboardingComplete}
              onBack={() => setCurrentView('landing')}
            />
          )}
          {currentView === 'play-zone' && (
            <PlayZone 
              key="play-zone"
              childData={childData}
              collectedStars={collectedStars}
              onBack={() => setCurrentView('landing')} 
              onStartGame={(id) => {
                if (id === 1) setCurrentView('game-pattern');
                if (id === 2) setCurrentView('game-memory');
                if (id === 3) setCurrentView('game-story');
                if (id === 4) setCurrentView('game-logic');
              }}
            />
          )}
          {currentView === 'game-pattern' && (
            <PatternFinder key="game-pattern" onBack={() => setCurrentView('play-zone')} />
          )}
          {currentView === 'game-memory' && (
            <ColorMemory key="game-memory" onBack={() => setCurrentView('play-zone')} />
          )}
          {currentView === 'game-story' && (
            <StoryBuilder key="game-story" onBack={() => setCurrentView('play-zone')} />
          )}
          {currentView === 'game-logic' && (
            <LogicLab key="game-logic" onBack={() => setCurrentView('play-zone')} />
          )}
          {currentView === 'parent-portal' && (
            <ParentPortal 
              key="parent-portal"
              childData={childData}
              onBack={() => setCurrentView('landing')} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-ink/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Rocket className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight text-ink">MyDeck<span className="text-primary">.ai</span></span>
            </div>
            <p className="text-xl text-ink/60 max-w-sm mb-8 leading-relaxed">
              Empowering the next generation of explorers through science-backed play and AI insights.
            </p>
            <div className="flex gap-4">
              {[Heart, Star, Zap].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center cursor-pointer text-primary shadow-lg"
                >
                  <Icon />
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4 text-ink/60 font-semibold">
              <li><button onClick={() => setCurrentView('play-zone')} className="hover:text-primary transition-colors">Games</button></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
              <li><button onClick={() => setCurrentView('parent-portal')} className="hover:text-primary transition-colors">For Parents</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl mb-6">Legal</h4>
            <ul className="space-y-4 text-ink/60 font-semibold">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-ink/5 text-center text-ink/40 font-bold">
          Built with ❤️ for better child development outcomes. © 2024 MyDeck.ai
        </div>
      </footer>
    </div>
  );
}
