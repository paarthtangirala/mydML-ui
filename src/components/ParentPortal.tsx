import React from 'react';
import { motion } from 'motion/react';
import { useSound } from '../hooks/useSound';
import { 
  ArrowLeft, 
  Brain, 
  Target, 
  Trophy, 
  Zap, 
  Users, 
  Heart, 
  Smile, 
  Lightbulb, 
  ChevronRight, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Gamepad2,
  Sparkles
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

const radarData = [
  { subject: 'Cognitive', A: 120, fullMark: 150 },
  { subject: 'Creative', A: 98, fullMark: 150 },
  { subject: 'Social', A: 86, fullMark: 150 },
  { subject: 'Physical', A: 99, fullMark: 150 },
  { subject: 'Emotional', A: 85, fullMark: 150 },
];

const growthData = [
  { name: 'Mon', cognitive: 4000, creative: 2400 },
  { name: 'Tue', cognitive: 3000, creative: 1398 },
  { name: 'Wed', cognitive: 2000, creative: 9800 },
  { name: 'Thu', cognitive: 2780, creative: 3908 },
  { name: 'Fri', cognitive: 1890, creative: 4800 },
  { name: 'Sat', cognitive: 2390, creative: 3800 },
  { name: 'Sun', cognitive: 3490, creative: 4300 },
];

const sessions = [
  { id: 1, date: 'Oct 12, 2024', games: 3, xp: 450, focus: 'Logic' },
  { id: 2, date: 'Oct 10, 2024', games: 2, xp: 300, focus: 'Memory' },
  { id: 3, date: 'Oct 08, 2024', games: 5, xp: 750, focus: 'Creativity' },
];

export const ParentPortal = ({ onBack, childData }: { onBack: () => void; childData: any; key?: React.Key }) => {
  const { playSound } = useSound();
  const name = childData?.name || 'Arjun';
  const age = childData?.age || 6;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="glass p-8 rounded-[3rem] shadow-xl mb-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <button 
              onClick={() => {
                playSound('click');
                onBack();
              }}
              className="flex items-center gap-2 text-ink/60 hover:text-primary font-bold mb-6 transition-colors"
            >
              <ArrowLeft size={20} /> Back to Adventure
            </button>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center shadow-2xl rotate-3">
                <img 
                  src={`https://picsum.photos/seed/${name}/200/200`} 
                  alt={name} 
                  className="w-20 h-20 rounded-[1.5rem] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl mb-2">{name}'s <span className="text-secondary">MyDeck</span> 🌟</h1>
                <div className="flex flex-wrap gap-4 text-sm font-bold text-ink/60">
                  <span className="bg-ink/5 px-3 py-1 rounded-full">Age: {age}</span>
                  <span className="bg-ink/5 px-3 py-1 rounded-full">Explorer Level: 12</span>
                  <span className="bg-ink/5 px-3 py-1 rounded-full">Language: English</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-secondary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-transform">
              Get MyDeck AI Report
            </button>
            <button className="bg-ink text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-ink/20 hover:scale-105 transition-transform">
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Smart Recommendations Section - Core MyDeck Feature */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <Sparkles size={24} />
          </div>
          <h2 className="text-4xl">Smart <span className="text-primary font-bold">Recommendations</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Logic Building Blocks",
              type: "Toy",
              reason: "Based on Memory Match performance",
              image: "https://picsum.photos/seed/blocks/400/300",
              color: "bg-blue-500"
            },
            {
              title: "Creative Story Cards",
              type: "Activity",
              reason: "Based on Story Builder creativity",
              image: "https://picsum.photos/seed/cards/400/300",
              color: "bg-purple-500"
            },
            {
              title: "Pattern Recognition Tiles",
              type: "Toy",
              reason: "Targets spatial reasoning skills",
              image: "https://picsum.photos/seed/tiles/400/300",
              color: "bg-emerald-500"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass overflow-hidden rounded-[2.5rem] shadow-lg group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 left-4 ${item.color} text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full`}>
                  {item.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-ink/60 text-sm mb-4 italic">"{item.reason}"</p>
                <button className="w-full py-3 rounded-xl border-2 border-ink/10 font-bold hover:bg-ink hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Radar Chart Section */}
        <div className="lg:col-span-2 glass p-8 rounded-[3rem] shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl flex items-center gap-3">
              <Brain className="text-primary" /> Skill Transparency View
            </h2>
            <div className="text-xs font-bold text-ink/40 uppercase tracking-widest">Last 30 Days</div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#2F2F2F', fontSize: 12, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name={name}
                  dataKey="A"
                  stroke="#FF6B6B"
                  fill="#FF6B6B"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clinical Insights Section */}
        <div className="glass p-8 rounded-[3rem] shadow-xl flex flex-col gap-6">
          <h2 className="text-3xl flex items-center gap-3">
            <Lightbulb className="text-accent" /> Clinical Insights
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-secondary/10 rounded-2xl border-l-4 border-secondary">
              <div className="flex items-center gap-2 text-secondary font-bold mb-2">
                <CheckCircle2 size={18} /> Key Strength
              </div>
              <p className="text-sm font-semibold text-ink/80">
                {name} shows exceptional pattern recognition skills, particularly in visual-spatial tasks.
              </p>
            </div>

            <div className="p-4 bg-primary/10 rounded-2xl border-l-4 border-primary">
              <div className="flex items-center gap-2 text-primary font-bold mb-2">
                <AlertCircle size={18} /> Skill Gap Identified
              </div>
              <p className="text-sm font-semibold text-ink/80">
                Social interaction cues in collaborative games are currently a growth area.
              </p>
            </div>

            <div className="p-4 bg-accent/10 rounded-2xl border-l-4 border-accent">
              <div className="flex items-center gap-2 text-accent-foreground font-bold mb-2">
                <Target size={18} /> Action Plan
              </div>
              <p className="text-sm font-semibold text-ink/80">
                Introduce more "Story Builder" sessions to encourage emotional expression and narrative logic.
              </p>
            </div>
          </div>

          <button className="mt-auto w-full py-4 bg-ink text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-ink/90 transition-colors">
            Full Clinical Report <ChevronRight size={18} />
          </button>
        </div>

        {/* Growth Deltas Section */}
        <div className="lg:col-span-3 grid md:grid-cols-5 gap-6">
          {[
            { label: 'Cognitive 1', value: '+15%', icon: <Brain />, color: 'bg-primary' },
            { label: 'Cognitive 2', value: '+10%', icon: <Target />, color: 'bg-secondary' },
            { label: 'STEM 1', value: '+20%', icon: <Zap />, color: 'bg-accent' },
            { label: 'STEM 2', value: '+5%', icon: <Lightbulb />, color: 'bg-indigo-500' },
            { label: 'Creativity', value: '+30%', icon: <Smile />, color: 'bg-pink-500' },
          ].map((delta, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-[2rem] shadow-lg flex flex-col items-center text-center"
            >
              <div className={`w-12 h-12 ${delta.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                {delta.icon}
              </div>
              <div className="text-xs font-bold text-ink/40 uppercase mb-1">{delta.label}</div>
              <div className="text-2xl font-bold text-ink">{delta.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Growth Timeline Section */}
        <div className="lg:col-span-2 glass p-8 rounded-[3rem] shadow-xl">
          <h2 className="text-3xl mb-8 flex items-center gap-3">
            <TrendingUp className="text-secondary" /> Growth Timeline
          </h2>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-ink/5 rounded-2xl hover:bg-ink/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Calendar className="text-ink/40" />
                  </div>
                  <div>
                    <div className="font-bold text-ink">{session.date}</div>
                    <div className="text-xs font-bold text-ink/40 uppercase">{session.focus} Session</div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-xs font-bold text-ink/40 uppercase">Games</div>
                    <div className="font-bold">{session.games}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-ink/40 uppercase">XP Earned</div>
                    <div className="font-bold text-secondary">+{session.xp}</div>
                  </div>
                  <ChevronRight className="text-ink/20 group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adaptive Growth Path Section */}
        <div className="glass p-8 rounded-[3rem] shadow-xl">
          <h2 className="text-3xl mb-8 flex items-center gap-3">
            <Target className="text-primary" /> Adaptive Path
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <Gamepad2 size={20} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold">Next Activity</div>
                <div className="text-xs text-ink/60">Logic Lab: Level 4</div>
              </div>
              <div className="text-xs font-bold text-secondary">Ready</div>
            </div>
            <div className="h-2 bg-ink/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                className="h-full bg-primary"
              />
            </div>
            <p className="text-xs font-semibold text-ink/60">
              Arjun is 65% through his current developmental milestone for "Pattern Recognition".
            </p>
            <button className="w-full py-3 border-2 border-dashed border-ink/10 rounded-2xl text-sm font-bold text-ink/40 hover:border-primary/40 hover:text-primary transition-all">
              View Full Roadmap
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
