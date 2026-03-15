import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, BarChart3, Brain, Target, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background bg-grid-pattern overflow-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 glass border-b border-white/10 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <Cpu className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <span className="font-bold text-white text-xl tracking-tight neon-text ext-shadow-sm flex items-baseline">
              Career<span className="text-primary ml-0.5">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors hidden sm:block">
              System Login
            </Link>
            <Link
              to="/auth"
              className="h-10 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-full text-sm font-semibold hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:-translate-y-0.5 transition-all flex items-center relative overflow-hidden group border border-white/20"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 font-bold tracking-wide">Initialize</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-visible">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] opacity-40 pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] opacity-30 pointer-events-none animate-float" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/40 text-primary text-sm font-bold mb-8 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            V2.0 Neural Network Live
          </motion.div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 text-shadow-sm">
            Hacking your future with{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 neon-text text-primary font-black">AI precision.</span>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mt-6 leading-relaxed max-w-2xl mx-auto font-medium">
            Deploy cognitive tracking and behavioral data modeling to compile the ultimate roadmap for your career trajectory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/auth"
              className="h-14 px-8 bg-gradient-to-r from-primary to-accent text-white rounded-full text-base font-bold hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:-translate-y-1 transition-all flex items-center gap-2 w-full sm:w-auto justify-center border border-white/20"
            >
              Run Code &gt;_ <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="h-14 px-8 glass border border-white/10 text-white rounded-full text-base font-bold hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center w-full sm:w-auto shadow-sm"
            >
              View Documentation
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-32">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 neon-text">Core System Modules</h2>
          <p className="text-muted-foreground text-lg font-medium">Everything you need to discover and prepare for your ideal career path, backed by predictive AI models.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {[
            {
              icon: Brain,
              title: 'Cognitive Engine',
              desc: 'Scientifically calibrated assessments evaluating logical reasoning, core interests, and psychological traits via neural modeling.',
              glowColor: 'primary',
            },
            {
              icon: BarChart3,
              title: 'Telemetry Analytics',
              desc: 'Daily logs track your study habits, mood fluctuations, and incremental skill development over time in our visual dashboard.',
              glowColor: 'accent',
            },
            {
              icon: Target,
              title: 'Predictive Matching',
              desc: 'Advanced ML algorithms correlate your profile with real-world careers, generating actionable branching roadmaps.',
              glowColor: 'teal',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative p-8 rounded-3xl glass border border-white/5 hover:border-${feature.glowColor}/50 hover:shadow-[0_0_30px_rgba(var(--${feature.glowColor}),0.15)] transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${feature.glowColor}/10 border border-${feature.glowColor}/30 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 text-${feature.glowColor} group-hover:animate-pulse`} />
                </div>
                <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-${feature.glowColor} transition-colors duration-300`}>{feature.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 relative">
        <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="text-sm font-bold text-muted-foreground">© 2026 Pathfinder. End of transmission.</p>
        </div>
      </footer>
    </div>
  );
}
