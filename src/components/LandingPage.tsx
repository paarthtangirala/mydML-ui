import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useSound } from '../hooks/useSound';
import { 
  Sparkles, 
  Rocket, 
  Brain, 
  Gamepad2, 
  Trophy, 
  Star, 
  Heart, 
  Users, 
  Target, 
  ArrowRight, 
  ChevronRight,
  Lightbulb
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Character = ({ type, className = "" }: { type: 'sparky' | 'brainy' | 'rex' | 'glow', className?: string }) => {
  const { playSound } = useSound();
  const variants = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    happy: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'sparky': return <Star size={48} className="text-accent fill-accent" />;
      case 'brainy': return <Brain size={48} className="text-secondary fill-secondary/20" />;
      case 'rex': return <Rocket size={48} className="text-primary fill-primary/20" />;
      case 'glow': return <Lightbulb size={48} className="text-yellow-400 fill-yellow-200" />;
    }
  };

  return (
    <motion.div 
      variants={variants}
      animate="idle"
      whileHover="happy"
      onMouseEnter={() => playSound('magic', 0.2)}
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

const FeatureCard = ({ feature, index }: { feature: Feature; index: number; key?: React.Key }) => {
  const { playSound } = useSound();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
      onMouseEnter={() => playSound('hover', 0.1)}
      className="glass p-8 rounded-3xl shadow-xl border-2 border-transparent hover:border-primary/20 transition-all group"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.color}`}>
        {feature.icon}
      </div>
      <h3 className="text-2xl mb-3">{feature.title}</h3>
      <p className="text-ink/60 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

const StepItem = ({ step, index }: { step: Step; index: number; key?: React.Key }) => {
  const { playSound } = useSound();
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => playSound('hover', 0.1)}
      className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 text-center md:text-left">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 font-bold text-white shadow-lg ${step.color}`}>
          {step.id}
        </div>
        <h3 className="text-3xl mb-4">{step.title}</h3>
        <p className="text-xl text-ink/60 max-w-md mx-auto md:mx-0">{step.description}</p>
      </div>
      <div className="flex-1 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-64 h-64 rounded-[3rem] flex items-center justify-center shadow-2xl ${step.color} bg-opacity-10 border-4 border-dashed border-white/50`}
        >
          <div className="text-white">
            {React.cloneElement(step.icon as React.ReactElement, { size: 80, className: 'drop-shadow-xl' })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const LandingPage = ({ 
  onStartAdventure, 
  onCollectStar, 
  foundStars 
}: { 
  onStartAdventure: () => void;
  onCollectStar: (id: number) => void;
  foundStars: number[];
  key?: React.Key;
}) => {
  const { playSound } = useSound();
  const { scrollY } = useScroll();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800", // Playing with blocks
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800", // Discovery/Nature
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800", // Painting
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800"  // Colorful toys
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features: Feature[] = [
    {
      title: "Expert Curated",
      description: "Every assessment is designed by child development specialists who know how kids learn best.",
      icon: <Users className="text-white" />,
      color: "bg-primary"
    },
    {
      title: "Science-Backed",
      description: "Personalized activities based on developmental science to ensure real growth.",
      icon: <Brain className="text-white" />,
      color: "bg-secondary"
    },
    {
      title: "Real-World Skills",
      description: "Each game targets cognitive, creativity and motor skills for a well-rounded explorer.",
      icon: <Target className="text-white" />,
      color: "bg-accent"
    },
    {
      title: "Track Progress",
      description: "Watch your child's growth through milestones and skills in a fun dashboard.",
      icon: <Trophy className="text-white" />,
      color: "bg-indigo-500"
    }
  ];

  const steps: Step[] = [
    { id: 1, title: "Tell Us About Your Child", description: "Fill a fun questionnaire about your little explorer's favorite things!", icon: <Sparkles />, color: "bg-primary" },
    { id: 2, title: "Play Assessment Games", description: "Your child plays engaging, science-backed games that feel like magic!", icon: <Gamepad2 />, color: "bg-secondary" },
    { id: 3, title: "AI Builds Profile", description: "Our clever AI analyzes gameplay to map cognitive strengths and superpowers.", icon: <Brain />, color: "bg-accent" },
    { id: 4, title: "Get Recommendations", description: "Receive personalized toy and activity suggestions tailored just for them.", icon: <Star />, color: "bg-indigo-500" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent/30 px-4 py-2 rounded-full mb-6 border border-accent/50"
            >
              <Sparkles className="text-accent-foreground w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">AI-Powered Adventure</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl mb-8 leading-[0.9]">
              Unlock Your <br />
              <span className="text-primary relative">
                Child's Potential
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="absolute bottom-2 left-0 h-4 bg-accent/30 -z-10"
                />
              </span>
            </h1>

            <p className="text-2xl text-ink/60 mb-10 leading-relaxed max-w-lg">
              AI-powered assessments and personalized recommendations for holistic child development through play.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => {
                  playSound('click');
                  onStartAdventure();
                }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                onMouseEnter={() => playSound('hover', 0.1)}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white text-xl font-bold px-10 py-5 rounded-3xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3"
              >
                Start Your Adventure <ArrowRight />
              </motion.button>
              
              {!foundStars.includes(1) && (
                <motion.div 
                  onClick={() => {
                    playSound('success');
                    onCollectStar(1);
                  }}
                  whileHover={{ scale: 1.5, rotate: 180 }}
                  className="cursor-pointer text-accent ml-4 self-center"
                >
                  <Star fill="currentColor" />
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
            className="relative"
            style={{ y: useTransform(scrollY, [0, 500], [0, 100]) }}
          >
            <div className="relative z-10 bg-white p-4 rounded-[4rem] shadow-2xl rotate-3 overflow-hidden aspect-square">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex]} 
                  alt="Child playing and learning" 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1 }}
                  className="rounded-[3.5rem] w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <Character type="sparky" className="absolute -top-12 -left-12 drop-shadow-2xl" />
              <Character type="brainy" className="absolute -bottom-12 -right-12 drop-shadow-2xl" />

            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-4 border-dashed border-primary/20 rounded-full -z-10 animate-spin-slow" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="for-parents" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative">
            <Character type="glow" className="mb-6" />
            <h2 className="text-5xl md:text-6xl mb-6">Built for Little Explorers</h2>
            <p className="text-2xl text-ink/60 max-w-2xl mx-auto">
              We combine play with science to help you understand your child's unique strengths.
            </p>
            {!foundStars.includes(2) && (
              <motion.div 
                onClick={() => {
                  playSound('success');
                  onCollectStar(2);
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 right-0 cursor-pointer text-accent"
              >
                <Star fill="currentColor" size={32} />
              </motion.div>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl mb-8">How MyDeck Works ✨</h2>
            <p className="text-2xl text-ink/60">Follow the path to discover your child's superpowers!</p>
          </div>
          <div className="relative space-y-32">
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-primary/10 -translate-x-1/2 hidden md:block" />
            {steps.map((step, i) => (
              <StepItem key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Game Section Preview */}
      <section id="games" className="py-32 px-6 bg-ink text-white rounded-[4rem] mx-6 mb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl mb-8">The Assessment <br /><span className="text-secondary">Games</span></h2>
              <p className="text-2xl text-white/60">
                Not just games, but windows into your child's cognitive world. Fun, engaging, and deeply insightful.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => playSound('hover', 0.1)}
              onClick={() => {
                playSound('click');
                onStartAdventure();
              }}
              className="bg-secondary text-ink font-bold px-8 py-4 rounded-2xl flex items-center gap-2"
            >
              Play Now <ChevronRight />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[3rem] aspect-[4/5] mb-6 border-4 border-transparent group-hover:border-secondary transition-all">
                  <img 
                    src={`https://picsum.photos/seed/game-${i}/600/800`} 
                    alt="Game" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <button className="w-full bg-secondary text-ink font-bold py-4 rounded-2xl shadow-xl mb-4 flex items-center justify-center gap-2">
                      Play Adventure <Gamepad2 />
                    </button>
                  </div>
                </div>
                <h3 className="text-3xl mb-2 group-hover:text-secondary transition-colors">Space Explorer {i}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
