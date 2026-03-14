import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { APTITUDE_QUESTIONS } from '@/lib/constants';
import { TestResult } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Brain, Lightbulb, Heart } from 'lucide-react';

export default function AptitudeTestPage() {
  const { setTestResult, testResult } = useApp();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const questions = APTITUDE_QUESTIONS;
  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  const selectAnswer = (idx: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: idx }));
  };

  const next = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else submitTest();
  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const submitTest = () => {
    let logical = 0;
    const interest: Record<string, number> = {};
    const personality: Record<string, number> = {};

    questions.forEach(q => {
      const ans = answers[q.id];
      if (ans === undefined) return;
      if (q.section === 'logical' && q.correctAnswer !== undefined) {
        if (ans === q.correctAnswer) logical++;
      } else if (q.weights) {
        const weights = q.weights[ans] || {};
        const target = q.section === 'interest' ? interest : personality;
        for (const [trait, score] of Object.entries(weights)) {
          target[trait] = (target[trait] || 0) + score;
        }
      }
    });

    setTestResult({ logical, interest, personality, completedAt: new Date().toISOString() });
    setFinished(true);
    setTimeout(() => navigate('/results'), 2000);
  };

  if (finished) {
    return (
      <div className="flex items-center justify-center py-32">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 glass border border-success/30 rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            <Check className="w-10 h-10 text-success drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Telemetry Captured!</h2>
          <p className="text-base text-primary font-bold mt-2 animate-pulse">Running Neural Analysis...</p>
        </motion.div>
      </div>
    );
  }

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto py-12 px-6"
      >
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-3xl bg-primary/20 border border-primary/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-all duration-500 hover:scale-110">
            <Brain className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight text-shadow-sm">System Diagnostics</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
            {questions.length} dynamically calibrated vectors to map your logical processing speed, core directives, and behavioral profile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: Brain, label: 'Logic Kernel', count: '5 Q', color: 'text-primary', bg: 'bg-primary/10 border-primary/30', glow: 'hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]' },
            { icon: Lightbulb, label: 'Interest Vector', count: '5 Q', color: 'text-accent', bg: 'bg-accent/10 border-accent/30', glow: 'hover:shadow-[0_0_20px_rgba(200,100,255,0.2)]' },
            { icon: Heart, label: 'Behavioral', count: '5 Q', color: 'text-teal', bg: 'bg-teal/10 border-teal/30', glow: 'hover:shadow-[0_0_20px_rgba(0,255,150,0.2)]' },
          ].map((s, i) => (
            <div key={s.label} className={`p-6 rounded-3xl glass border border-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 text-center group ${s.glow}`}>
              <div className={`w-14 h-14 rounded-2xl ${s.bg} border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className={`w-7 h-7 ${s.color}`} />
              </div>
              <p className="text-base font-bold text-white group-hover:neon-text transition-all">{s.label}</p>
              <p className="text-sm font-bold text-muted-foreground mt-1 opacity-80">{s.count}</p>
            </div>
          ))}
        </div>

        {testResult && (
          <div className="glass bg-white/5 border border-primary/30 rounded-2xl p-4 mb-8 text-center text-sm font-bold text-primary shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            Previous scan recorded on {new Date(testResult.completedAt).toLocaleDateString()}. Retaking will overwrite neural profile.
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setStarted(true)}
            className="h-14 px-10 bg-gradient-to-r from-primary to-accent border border-white/20 text-white rounded-full text-lg font-black hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:-translate-y-1 transition-all flex items-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10 hidden sm:inline tracking-wider">{testResult ? 'OVERRIDE PROFILE' : 'INITIALIZE SEQUENCE'}</span>
            <span className="relative z-10 sm:hidden tracking-wider">{testResult ? 'OVERRIDE' : 'START'}</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform animate-pulse" />
          </button>
        </div>
      </motion.div>
    );
  }

  const sectionConfig = {
    logical: { label: 'Logic Kernel', color: 'text-primary', bg: 'bg-primary' },
    interest: { label: 'Interest Vector', color: 'text-accent', bg: 'bg-accent' },
    personality: { label: 'Behavioral Node', color: 'text-teal', bg: 'bg-teal' },
  };
  const section = sectionConfig[question.section];

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10">
      {/* Progress */}
      <div className="mb-12 px-2">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className={`text-xs font-black uppercase tracking-[0.2em] ${section.color} bg-${section.color.split('-')[1]}/10 px-4 py-2 rounded-full border border-${section.color.split('-')[1]}/30 shadow-[0_0_10px_rgba(var(--${section.color.split('-')[1]}),0.2)]`}>
              {section.label}
            </span>
          </div>
          <div className="text-right flex items-baseline gap-1">
             <span className={`text-3xl font-black ${section.color}`}>{currentQ + 1}</span>
             <span className="text-base font-bold text-muted-foreground uppercase opacity-70"> / {questions.length}</span>
          </div>
        </div>
        <div className="h-3 bg-black/50 border border-white/5 rounded-full overflow-hidden shadow-inner relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay" />
          <motion.div
            className={`h-full ${section.bg} rounded-full relative`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite]" />
             <div className={`absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]`} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-3xl glass border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-10 leading-relaxed tracking-tight relative z-10">{question.question}</h2>

          <div className="space-y-4 relative z-10">
            {question.options.map((opt, idx) => {
              const isSelected = answers[question.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl text-lg font-bold transition-all duration-300 border-2 flex items-center group relative overflow-hidden ${
                    isSelected
                      ? `border-${section.color.split('-')[1]} bg-${section.color.split('-')[1]}/10 text-white shadow-[0_0_20px_rgba(var(--${section.color.split('-')[1]}),0.15)]`
                      : 'border-white/5 bg-black/40 text-muted-foreground hover:bg-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {isSelected && <div className={`absolute inset-0 bg-${section.color.split('-')[1]}/5 animate-pulse`} />}
                  <span className={`inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl text-base font-black mr-5 transition-all duration-300 border ${
                    isSelected
                      ? `bg-${section.color.split('-')[1]} border-${section.color.split('-')[1]} text-black shadow-[0_0_15px_rgba(var(--${section.color.split('-')[1]}),0.6)] scale-110`
                      : 'bg-transparent border-white/20 text-muted-foreground group-hover:border-white/50 group-hover:text-white'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed relative z-10">{opt}</span>
                  {isSelected && (
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`ml-4 text-${section.color.split('-')[1]}`}>
                       <Check className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(var(--${section.color.split('-')[1]}),0.8)]`} />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex justify-between items-center px-2">
        <button
          onClick={prev}
          disabled={currentQ === 0}
          className="h-14 px-8 rounded-full text-base font-bold text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-3 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Previous
        </button>
        <button
          onClick={next}
          disabled={answers[question.id] === undefined}
          className="h-14 px-8 bg-gradient-to-r from-primary to-accent border border-white/20 text-white rounded-full text-base font-black hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-30 disabled:grayscale disabled:hover:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center gap-3 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden group-enabled:block"></div>
          <span className="relative z-10 uppercase tracking-widest">{currentQ === questions.length - 1 ? 'Execute Scan' : 'Next Vector'}</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform group-disabled:translate-x-0" />
        </button>
      </div>
    </div>
  );
}
