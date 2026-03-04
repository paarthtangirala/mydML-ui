import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Star, 
  Rocket, 
  Brain, 
  Palette, 
  Music, 
  Bug,
  Target,
  Heart
} from 'lucide-react';
import { useSound } from '../hooks/useSound';
import confetti from 'canvas-confetti';

interface OnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  key?: React.Key;
}

export const Onboarding = ({ onComplete, onBack }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const { playSound } = useSound();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: 5,
    favoriteColor: '',
    languages: [] as string[],
    freeTimeChoice: '',
    startingNewStyle: '',
    challengeReaction: 50,
    failureReaction: 50,
    activityPreference: 50,
    focusLevel: 50,
    groupAdventureStyle: '',
    magicalPowers: [] as string[],
    screenReadiness: ''
  });

  const totalSteps = 14;

  const handleNext = () => {
    playSound('click');
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
      });
      onComplete(formData);
    }
  };

  const handleBack = () => {
    playSound('click');
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const toggleLanguage = (lang: string) => {
    playSound('pop');
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const toggleMagicalPower = (power: string) => {
    playSound('pop');
    setFormData(prev => ({
      ...prev,
      magicalPowers: prev.magicalPowers.includes(power)
        ? prev.magicalPowers.filter(p => p !== power)
        : [...prev.magicalPowers, power]
    }));
  };

  const Slider = ({ 
    value, 
    onChange, 
    leftLabel, 
    rightLabel, 
    leftEmoji, 
    rightEmoji 
  }: { 
    value: number, 
    onChange: (val: number) => void, 
    leftLabel: string, 
    rightLabel: string,
    leftEmoji?: string,
    rightEmoji?: string
  }) => (
    <div className="space-y-12 py-8">
      <div className="relative h-4 bg-ink/5 rounded-full border border-ink/5">
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-lg shadow-primary/30 cursor-pointer transition-all active:scale-90"
          style={{ left: `calc(${value}% - 1rem)` }}
        />
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between gap-8">
        <div className={`flex-1 p-6 rounded-3xl transition-all border-2 ${value < 40 ? 'bg-primary/10 border-primary/20 scale-105' : 'bg-ink/5 border-transparent opacity-60'}`}>
          <p className="text-lg font-bold text-primary mb-2">{leftLabel} {leftEmoji}</p>
        </div>
        <div className={`flex-1 p-6 rounded-3xl transition-all border-2 ${value > 60 ? 'bg-primary/10 border-primary/20 scale-105' : 'bg-ink/5 border-transparent opacity-60'}`}>
          <p className="text-lg font-bold text-primary mb-2">{rightLabel} {rightEmoji}</p>
        </div>
      </div>
    </div>
  );

  const languages = [
    { id: 'english', label: 'English' },
    { id: 'deutsch', label: 'Deutsch' },
    { id: 'hindi', label: 'Hindi' },
    { id: 'other-indian', label: 'Other Indian language' },
    { id: 'mix', label: 'Mix of languages' },
  ];

  const colors = [
    { id: 'blue', label: 'Baby Blue', color: 'bg-blue-300' },
    { id: 'green', label: 'Baby Green', color: 'bg-green-300' },
    { id: 'yellow', label: 'Baby Yellow', color: 'bg-yellow-200' },
    { id: 'pink', label: 'Baby Pink', color: 'bg-pink-300' },
    { id: 'purple', label: 'Baby Purple', color: 'bg-purple-300' },
    { id: 'orange', label: 'Baby Orange', color: 'bg-orange-300' },
  ];

  const freeTimeChoices = [
    { id: 'building', label: 'Building amazing things! 🏗️' },
    { id: 'art', label: 'Creating colorful art! 🎨' },
    { id: 'games', label: 'Jumping and playing games! ⚽' },
    { id: 'stories', label: 'Telling stories and pretending! 📚' },
  ];

  const startingNewStyles = [
    { id: 'step-by-step', label: 'Step-by-step instructions like a treasure map 🗺️' },
    { id: 'little-help', label: 'A little help, but lots of room to explore 🚀' },
    { id: 'freedom', label: 'Complete freedom to create their own adventure! 🌈' },
  ];

  const groupStyles = [
    { id: 'solo', label: 'Prefers solo adventures and quiet play 🧘' },
    { id: 'alongside', label: 'Plays alongside others but does their own thing 👫' },
    { id: 'teams', label: 'Actively teams up and shares ideas! 🤝' },
  ];

  const magicalPowers = [
    { id: 'confidence', label: 'Confidence & emotional superpowers! 💪' },
    { id: 'focus', label: 'Focus & puzzle-solving skills! 🧠' },
    { id: 'creativity', label: 'Creativity & self-expression! 🎨' },
    { id: 'physical', label: 'Physical coordination & body control! 🤸' },
    { id: 'social', label: 'Social skills & making friends! 👫' },
    { id: 'curiosity', label: 'General curiosity & love for learning! 🌍' },
  ];

  const screenReadinessOptions = [
    { id: 'excited', label: 'Yes, they\'re excited! 🎉' },
    { id: 'support', label: 'Yes, with a little parental support 👨‍👩‍👧' },
    { id: 'soon', label: 'Not quite ready yet, but soon! 🌱' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4 px-2">
            <span className="text-sm font-bold text-ink/40 uppercase tracking-widest">Step {step} of {totalSteps}</span>
            <span className="text-sm font-bold text-primary uppercase tracking-widest">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="h-3 bg-ink/5 rounded-full overflow-hidden border border-ink/5 p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            />
          </div>
        </div>

        <div className="glass p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
                    <Sparkles size={40} />
                  </div>
                  <h2 className="text-4xl md:text-5xl mb-4">What is your child's name? ✨</h2>
                  <p className="text-xl text-ink/60">We'll use this to personalize their adventure!</p>
                </div>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Type your child's name..."
                  className="w-full bg-ink/5 border-2 border-transparent focus:border-primary/30 rounded-2xl px-8 py-6 text-2xl outline-none transition-all text-center font-bold"
                  autoFocus
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">Is it a <span className="text-primary">superboy</span> or a <span className="text-secondary">supergirl</span>? 🦸‍♂️🦸‍♀️</h2>
                </div>
                <div className="flex justify-center gap-6">
                  <button
                    onClick={() => setFormData({ ...formData, gender: 'boy' })}
                    className={`flex-1 p-8 rounded-[2rem] transition-all border-2 ${
                      formData.gender === 'boy'
                        ? 'bg-primary text-white border-transparent shadow-xl scale-105'
                        : 'bg-ink/5 text-primary border-transparent hover:bg-ink/10'
                    }`}
                  >
                    <span className="text-2xl font-bold">Superboy! 🦸‍♂️</span>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, gender: 'girl' })}
                    className={`flex-1 p-8 rounded-[2rem] transition-all border-2 ${
                      formData.gender === 'girl'
                        ? 'bg-secondary text-white border-transparent shadow-xl scale-105'
                        : 'bg-ink/5 text-secondary border-transparent hover:bg-ink/10'
                    }`}
                  >
                    <span className="text-2xl font-bold">Supergirl! 🦸‍♀️</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center text-secondary mx-auto mb-6">
                    <Star size={40} />
                  </div>
                  <h2 className="text-4xl md:text-5xl mb-4">How <span className="text-secondary">old</span> is {formData.name || 'your explorer'}?</h2>
                  <p className="text-xl text-ink/60">This helps us pick the right difficulty for games.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {[3, 4, 5, 6, 7, 8].map((age) => (
                    <button
                      key={age}
                      onClick={() => setFormData({ ...formData, age })}
                      className={`w-20 h-20 rounded-2xl text-2xl font-bold transition-all ${
                        formData.age === age 
                          ? 'bg-secondary text-white shadow-xl scale-110' 
                          : 'bg-ink/5 text-ink/40 hover:bg-ink/10'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">What is their <span className="text-primary">favorite color</span>?</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setFormData({ ...formData, favoriteColor: color.id })}
                      className={`p-6 rounded-3xl flex flex-col items-center gap-3 transition-all border-2 ${
                        formData.favoriteColor === color.id
                          ? `${color.color} text-ink border-transparent shadow-xl scale-105`
                          : 'bg-ink/5 text-ink/60 border-transparent hover:bg-ink/10'
                      }`}
                    >
                      <span className="font-bold">{color.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">Which <span className="text-primary">languages</span> does your child speak most comfortably?</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => toggleLanguage(lang.id)}
                      className={`p-6 rounded-3xl transition-all border-2 ${
                        formData.languages.includes(lang.id)
                          ? 'bg-primary text-white border-transparent shadow-xl scale-105'
                          : 'bg-ink/5 text-primary border-transparent hover:bg-ink/10'
                      }`}
                    >
                      <span className="font-bold">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">When your child has <span className="text-primary">free time</span>, what does their heart choose first?</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {freeTimeChoices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => setFormData({ ...formData, freeTimeChoice: choice.id })}
                      className={`p-6 rounded-3xl transition-all border-2 ${
                        formData.freeTimeChoice === choice.id
                          ? 'bg-primary text-white border-transparent shadow-xl scale-105'
                          : 'bg-ink/5 text-primary border-transparent hover:bg-ink/10'
                      }`}
                    >
                      <span className="font-bold">{choice.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">When <span className="text-primary">starting something new</span>, your child loves:</h2>
                </div>
                <div className="space-y-4">
                  {startingNewStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setFormData({ ...formData, startingNewStyle: style.id })}
                      className={`w-full p-6 rounded-3xl transition-all border-2 ${
                        formData.startingNewStyle === style.id
                          ? 'bg-primary text-white border-transparent shadow-xl scale-105'
                          : 'bg-ink/5 text-primary border-transparent hover:bg-ink/10'
                      }`}
                    >
                      <span className="font-bold text-lg">{style.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">When a <span className="text-primary">challenge</span> appears, your child usually:</h2>
                </div>
                <Slider 
                  value={formData.challengeReaction}
                  onChange={(val) => setFormData({ ...formData, challengeReaction: val })}
                  leftLabel="Quickly moves to something fun instead"
                  leftEmoji="😊"
                  rightLabel="Never gives up, like a superhero!"
                  rightEmoji="🦸‍♂️"
                />
              </motion.div>
            )}

            {step === 9 && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">If something <span className="text-primary">doesn't work</span> the first time, your child:</h2>
                </div>
                <Slider 
                  value={formData.failureReaction}
                  onChange={(val) => setFormData({ ...formData, failureReaction: val })}
                  leftLabel="Gets a little frustrated"
                  leftEmoji="🎈"
                  rightLabel="Super calm and keeps trying!"
                  rightEmoji="🥇"
                />
              </motion.div>
            )}

            {step === 10 && (
              <motion.div
                key="step10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">Your child loves <span className="text-primary">activities</span> that are:</h2>
                </div>
                <Slider 
                  value={formData.activityPreference}
                  onChange={(val) => setFormData({ ...formData, activityPreference: val })}
                  leftLabel="Very guided, like a fun recipe"
                  leftEmoji="👨‍🍳"
                  rightLabel="Completely open, pure imagination!"
                  rightEmoji="🌟"
                />
              </motion.div>
            )}

            {step === 11 && (
              <motion.div
                key="step11"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">While playing or learning, your child is <span className="text-primary">usually</span>:</h2>
                </div>
                <Slider 
                  value={formData.focusLevel}
                  onChange={(val) => setFormData({ ...formData, focusLevel: val })}
                  leftLabel="Easily distracted by shiny things"
                  leftEmoji="✨"
                  rightLabel="Super focused, like a laser beam!"
                  rightEmoji="🚀"
                />
              </motion.div>
            )}

            {step === 12 && (
              <motion.div
                key="step12"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">In <span className="text-primary">group adventures</span>, your child usually:</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setFormData({ ...formData, groupAdventureStyle: style.id })}
                      className={`p-6 rounded-3xl transition-all border-2 ${
                        formData.groupAdventureStyle === style.id
                          ? 'bg-primary text-white border-transparent shadow-xl scale-105'
                          : 'bg-ink/5 text-primary border-transparent hover:bg-ink/10'
                      }`}
                    >
                      <span className="font-bold text-lg">{style.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 13 && (
              <motion.div
                key="step13"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">What <span className="text-primary">magical powers</span> do you hope MyDeck gives your child?</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {magicalPowers.map((power) => (
                    <button
                      key={power.id}
                      onClick={() => toggleMagicalPower(power.id)}
                      className={`p-6 rounded-3xl transition-all border-2 ${
                        formData.magicalPowers.includes(power.id)
                          ? 'bg-primary text-white border-transparent shadow-xl scale-105'
                          : 'bg-ink/5 text-primary border-transparent hover:bg-ink/10'
                      }`}
                    >
                      <span className="font-bold">{power.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 14 && (
              <motion.div
                key="step14"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl mb-4">Is your child ready for <span className="text-primary">short screen adventures</span> (10-15 minutes)?</h2>
                </div>
                <div className="space-y-4">
                  {screenReadinessOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFormData({ ...formData, screenReadiness: option.id })}
                      className={`w-full p-6 rounded-3xl transition-all border-2 ${
                        formData.screenReadiness === option.id
                          ? 'bg-primary text-white border-transparent shadow-xl scale-105'
                          : 'bg-ink/5 text-primary border-transparent hover:bg-ink/10'
                      }`}
                    >
                      <span className="font-bold text-lg">{option.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-ink/40 font-bold hover:text-ink transition-colors px-6 py-4"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={step === 1 && !formData.name}
              className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-xl transition-all shadow-xl ${
                step === 1 && !formData.name 
                  ? 'bg-ink/10 text-ink/20 cursor-not-allowed' 
                  : 'bg-primary text-white hover:scale-105 active:scale-95 shadow-primary/20'
              }`}
            >
              {step === totalSteps ? "Let's Play!" : "Continue"} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
