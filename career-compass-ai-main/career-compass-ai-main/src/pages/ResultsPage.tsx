import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Target } from 'lucide-react';

export default function ResultsPage() {
  const { careerSuggestions, testResult } = useApp();

  if (!testResult || careerSuggestions.length === 0) {
    return (
      <div className="text-center py-24 glass border border-white/5 rounded-3xl relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
        <div className="w-20 h-20 rounded-3xl bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(200,100,255,0.3)]">
          <Sparkles className="w-10 h-10 text-accent animate-pulse" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3 tracking-tight">System Awaiting Data</h1>
        <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto font-medium">
          Initialize the aptitude sequence and transmit daily telemetry logs to compile neural recommendations.
        </p>
        <Link
          to="/aptitude-test"
          className="h-12 px-8 bg-gradient-to-r from-primary to-accent border border-white/20 text-white rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 group"
        >
          Initialize Sequence <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="text-center sm:text-left mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold mb-6 text-primary shadow-[0_0_15px_rgba(0,255,255,0.15)]">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Neural Analysis Complete
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight text-shadow-sm">ML Career Roadmap</h1>
        <p className="text-lg sm:text-xl text-muted-foreground mt-4 max-w-2xl font-medium leading-relaxed">
          Predictive directives generated via cognitive aptitude mapping and behavioral telemetry parsing.
        </p>
      </div>

      <div className="space-y-6">
        {careerSuggestions.map((career, i) => (
          <motion.div
            key={career.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-3xl glass-card transition-all duration-300 relative overflow-hidden group ${
              i === 0 ? 'border-primary/30 shadow-lg shadow-primary/5' : ''
            }`}
          >
            {i === 0 && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none" />
            )}
            <div className={`p-8 lg:p-12 relative z-10 glass rounded-3xl border transition-all duration-300 ${
              i === 0 ? 'border-primary/40 hover:border-primary/60 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'border-white/5 hover:border-white/20'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-8 mb-10">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 border ${
                  i === 0 ? 'bg-primary/20 border-primary/40 shadow-[0_0_25px_rgba(0,255,255,0.3)]' : 'bg-black/50 border-white/10'
                }`}>
                  {career.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-3 mb-4">
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{career.title}</h2>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 shadow-inner w-fit ${
                      i === 0 ? 'bg-black/60 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'bg-black/40'
                    }`}>
                       <span className={`text-sm font-bold uppercase tracking-widest ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`}>Match Vector</span>
                       <span className={`text-xl font-black ${i === 0 ? 'text-white neon-text' : 'text-white'}`}>{career.match}%</span>
                    </div>
                  </div>
                  {/* Match Bar */}
                  <div className={`mt-5 w-full bg-black/60 rounded-full h-4 overflow-hidden flex items-center p-0.5 border ${i === 0 ? 'border-primary/30 shadow-[0_0_10px_rgba(0,255,255,0.2)_inset]' : 'border-white/5 shadow-inner'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${career.match}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 + i * 0.15 }}
                      className={`h-full rounded-full relative ${i === 0 ? 'bg-primary shadow-[0_0_15px_rgba(0,255,255,0.8)]' : 'bg-white/80'}`}
                    >
                      {i === 0 && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite]" />}
                      <div className={`absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full ${i === 0 ? 'shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''}`} />
                    </motion.div>
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl font-medium border-l-2 pl-4 border-white/10">{career.reason}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {career.skillsToImprove.length > 0 && (
                  <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
                    <h4 className="flex items-center gap-3 text-sm font-black text-white mb-6 uppercase tracking-widest">
                       <TrendingUp className="w-5 h-5 text-accent" /> Target Skill Acquisition
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {career.skillsToImprove.map(skill => (
                        <span key={skill} className="text-sm px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent font-bold shadow-[0_0_10px_rgba(200,100,255,0.1)] hover:bg-accent/20 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
                  <h4 className="flex items-center gap-3 text-sm font-black text-white mb-6 uppercase tracking-widest">
                     <Target className="w-5 h-5 text-primary" /> Execution Directives
                  </h4>
                  <ol className="space-y-4">
                    {career.roadmap.map((step, idx) => (
                      <li key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all group">
                        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 text-primary text-base flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                          0{idx + 1}
                        </span>
                        <span className="font-bold leading-relaxed group-hover:text-white transition-colors">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
