import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Dumbbell, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";
import { UserInputs, generateRecommendation, Recommendation, Goal, Experience, Duration, Injury } from "../utils/expertLogic";
import { saveHistory } from "../utils/api";

const STEPS = [
  { id: 'goal', title: 'Primary Goal' },
  { id: 'experience', title: 'Experience Level' },
  { id: 'commitment', title: 'Time Commitment' },
  { id: 'injuries', title: 'Physical Limitations' }
];

export function GymPlanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState<UserInputs>({
    goal: 'muscle-gain',
    experience: 'beginner',
    days: 3,
    duration: 'medium',
    injury: 'none'
  });
  const [result, setResult] = useState<Recommendation | null>(null);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      const recommendation = generateRecommendation(inputs);
      setResult(recommendation);
      // Save to backend silently — don't block UI if server is offline
      saveHistory(inputs, recommendation).catch(() => {});
    }
  };

  const handleBack = () => {
    setCurrentStep(s => Math.max(0, s - 1));
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStep(0);
    setInputs({
      goal: 'muscle-gain',
      experience: 'beginner',
      days: 3,
      duration: 'medium',
      injury: 'none'
    });
  };

  const updateInput = (key: keyof UserInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  if (result) {
    return <ResultsView result={result} onReset={handleReset} />;
  }

  return (
    <div className="flex-1 bg-zinc-950 flex flex-col items-center justify-center py-20 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {STEPS.map((step, idx) => (
              <div key={step.id} className={`text-xs md:text-sm font-bold uppercase tracking-wider ${idx <= currentStep ? 'text-red-500' : 'text-zinc-600'}`}>
                <span className="hidden md:inline">Step {idx + 1}: </span>{step.title}
              </div>
            ))}
          </div>
          <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Questionnaire */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold uppercase tracking-tight text-white mb-8">What is your primary fitness goal?</h2>
                  <div className="grid gap-4">
                    {[
                      { value: 'fat-loss', label: 'Fat Loss', desc: 'Shed body fat and improve cardiovascular health.' },
                      { value: 'muscle-gain', label: 'Muscle Gain', desc: 'Build lean mass and increase overall strength.' },
                      { value: 'endurance', label: 'Endurance', desc: 'Improve stamina and athletic performance.' }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => updateInput('goal', opt.value as Goal)}
                        className={`text-left p-6 rounded-2xl border transition-all ${inputs.goal === opt.value ? 'bg-red-500/10 border-red-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'}`}
                      >
                        <div className="font-bold text-xl uppercase tracking-wider mb-2">{opt.label}</div>
                        <div className="text-sm opacity-80">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold uppercase tracking-tight text-white mb-8">What is your current experience level?</h2>
                  <div className="grid gap-4">
                    {[
                      { value: 'beginner', label: 'Beginner', desc: '< 1 year of consistent training.' },
                      { value: 'intermediate', label: 'Intermediate', desc: '1-3 years of consistent training.' },
                      { value: 'advanced', label: 'Advanced', desc: '3+ years of consistent, structured training.' }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => updateInput('experience', opt.value as Experience)}
                        className={`text-left p-6 rounded-2xl border transition-all ${inputs.experience === opt.value ? 'bg-red-500/10 border-red-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'}`}
                      >
                        <div className="font-bold text-xl uppercase tracking-wider mb-2">{opt.label}</div>
                        <div className="text-sm opacity-80">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold uppercase tracking-tight text-white mb-2">Time Commitment</h2>
                  <p className="text-zinc-400 mb-8">Be realistic about what you can consistently maintain.</p>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-zinc-300 uppercase">Training Days Per Week: <span className="text-red-500 text-xl ml-2">{inputs.days}</span></label>
                    <input 
                      type="range" 
                      min="1" 
                      max="7" 
                      value={inputs.days}
                      onChange={(e) => updateInput('days', parseInt(e.target.value))}
                      className="w-full accent-red-500"
                    />
                    <div className="flex justify-between text-xs text-zinc-500 font-bold">
                      <span>1 Day</span>
                      <span>7 Days</span>
                    </div>
                  </div>

                  <div className="pt-8 space-y-4 border-t border-zinc-800">
                    <label className="block text-sm font-bold text-zinc-300 uppercase">Typical Session Duration</label>
                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      {[
                        { value: 'short', label: '< 45 min' },
                        { value: 'medium', label: '45-60 min' },
                        { value: 'long', label: '60+ min' }
                      ].map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => updateInput('duration', opt.value as Duration)}
                          className={`text-center py-4 px-2 rounded-xl border transition-all text-sm md:text-base font-bold ${inputs.duration === opt.value ? 'bg-red-500/10 border-red-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold uppercase tracking-tight text-white mb-2">Physical Limitations</h2>
                  <p className="text-zinc-400 mb-8">Do you have any current injuries or movement restrictions?</p>
                  <div className="grid gap-4">
                    {[
                      { value: 'none', label: 'None / Healthy', icon: null },
                      { value: 'upper', label: 'Upper Body (Shoulders, Elbows, Wrists)', icon: <AlertTriangle size={18} /> },
                      { value: 'lower', label: 'Lower Body (Knees, Hips, Ankles)', icon: <AlertTriangle size={18} /> },
                      { value: 'back', label: 'Back / Spinal Issues', icon: <AlertTriangle size={18} /> }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => updateInput('injury', opt.value as Injury)}
                        className={`text-left p-6 rounded-2xl border transition-all flex items-center justify-between ${inputs.injury === opt.value ? 'bg-red-500/10 border-red-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'}`}
                      >
                        <span className="font-bold text-lg uppercase tracking-wider">{opt.label}</span>
                        {opt.icon && <span className={`${inputs.injury === opt.value ? 'text-red-500' : 'text-zinc-600'}`}>{opt.icon}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-12 flex justify-between items-center border-t border-zinc-800 pt-6">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-zinc-400 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none uppercase tracking-wider text-sm"
            >
              <ChevronLeft size={18} />
              Back
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg uppercase tracking-wider text-sm"
            >
              {currentStep === STEPS.length - 1 ? 'Generate Plan' : 'Next'}
              {currentStep === STEPS.length - 1 ? <Dumbbell size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsView({ result, onReset }: { result: Recommendation; onReset: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 bg-black py-16 px-4"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 font-bold uppercase tracking-wider text-sm mb-4">
            <Dumbbell size={16} /> Plan Generated Successfully
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white">Your Custom Gym Plan</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Based on the rules of sports science and your specific inputs, here is your customized training framework.</p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5"><Dumbbell size={120} /></div>
             <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-sm mb-2">Recommended Split</h3>
             <div className="text-2xl font-bold text-white uppercase">{result.split}</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
             <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-sm mb-2">Training Focus</h3>
             <div className="text-2xl font-bold text-white uppercase">{result.focus}</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
             <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-sm mb-2">Target Intensity</h3>
             <div className="text-2xl font-bold text-white uppercase">{result.intensity}</div>
          </div>
        </div>

        {/* The "Why" - Gym Planner Logic */}
        <div className="bg-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-3xl">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-3">
            <span className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-lg">?</span>
            Why This Plan?
          </h2>
          <p className="text-zinc-300 text-lg leading-relaxed border-l-4 border-red-500 pl-6 italic">
            "{result.explanation}"
          </p>
        </div>

        {/* Safety Warning if Injury */}
        {result.safetyAdvice && (
          <div className="bg-orange-500/10 border border-orange-500/50 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-orange-500/20 text-orange-500 p-4 rounded-full shrink-0">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-orange-500 uppercase tracking-tight mb-2">Injury Precaution</h2>
              <p className="text-zinc-300 leading-relaxed">{result.safetyAdvice}</p>
            </div>
          </div>
        )}

        {/* Weekly Schedule */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Weekly Structure</h2>
          <div className="grid gap-4">
            {result.schedule.map((day, idx) => {
              const isRest = day.type === 'rest';
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-start md:items-stretch overflow-hidden rounded-2xl border ${isRest ? 'bg-zinc-950 border-zinc-900 text-zinc-500' : 'bg-zinc-900 border-zinc-800 text-white'}`}>
                  <div className={`p-6 md:w-56 shrink-0 flex flex-col justify-center border-b md:border-b-0 md:border-r ${isRest ? 'border-zinc-900' : 'border-zinc-800'}`}>
                    <div className="font-bold uppercase tracking-wider text-sm opacity-70 mb-1">
                      Day {idx + 1}
                    </div>
                    <div className={`font-bold text-lg uppercase tracking-wide leading-tight ${isRest ? 'text-zinc-600' : 'text-red-400'}`}>
                      {day.title}
                    </div>
                  </div>
                  <div className="p-6 flex-1 w-full">
                    {isRest ? (
                      <p className="text-zinc-600 italic text-sm">Active recovery, light stretching, or complete rest.</p>
                    ) : (
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                        {day.exercises.map((ex, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm md:text-base text-zinc-300">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-12 flex justify-center border-t border-zinc-900">
           <button 
             onClick={onReset}
             className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold uppercase tracking-wider text-sm transition-colors"
           >
             <RotateCcw size={16} /> Start Over
           </button>
        </div>

      </div>
    </motion.div>
  );
}
