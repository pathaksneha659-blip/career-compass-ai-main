import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Smile, Target, TrendingUp, Zap, Sparkles } from 'lucide-react';
import StudyChart from '@/components/dashboard/StudyChart';
import QuickActionCard from '@/components/dashboard/QuickActionCard';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.3 },
});

export default function Dashboard() {
  const { profile, dailyLogs, testResult, careerSuggestions } = useApp();
  const hasData = dailyLogs.length > 0 || testResult;

  const todayLog = dailyLogs[0];
  const avgMood = dailyLogs.length > 0
    ? (dailyLogs.reduce((s, l) => s + l.mood, 0) / dailyLogs.length).toFixed(1)
    : '—';
  const totalHours = dailyLogs.reduce((s, l) => s + l.studyHours, 0);
  const consistencyScore = Math.min(100, Math.round((dailyLogs.length / 30) * 100));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 lg:p-10 glass border-t border-l border-white/10 border-b border-r border-black/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Background gradient effects */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
        
        <motion.div {...fadeUp(0)} className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-primary/30 text-xs font-bold mb-6 text-primary shadow-[0_0_15px_rgba(0,255,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            System Analytics Active
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 text-shadow-sm">
            {profile ? `Welcome back, ` : 'Career Intelligence Hub'}
            {profile && <span className="neon-text text-primary">{profile.name}</span>}
            {profile && <span className="text-white">_</span>}
          </h1>
          <p className="text-muted-foreground mt-4 text-base lg:text-lg font-medium">
            {hasData
              ? `You've compiled ${dailyLogs.length} data point${dailyLogs.length !== 1 ? 's' : ''}. Neural models are actively generating insights.`
              : 'Initialize your dynamic AI model by logging semantic activity or taking the cognitive assessment.'}
          </p>
        </motion.div>
      </div>

      {/* Quick Actions (no data) */}
      {!hasData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickActionCard
            to="/daily-log"
            icon={BookOpen}
            title="Submit Daily Log"
            description="Record study hours, subjects, mood, and skills."
            color="primary"
            delay={0.1}
          />
          <QuickActionCard
            to="/aptitude-test"
            icon={Target}
            title="Take Aptitude Test"
            description="15 questions to assess your career fit."
            color="accent"
            delay={0.15}
          />
        </div>
      )}

      {/* Stats Cards */}
      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Today's Grind", value: todayLog ? `${todayLog.studyHours}h` : '—', icon: Clock, color: 'text-primary', bg: 'bg-primary/10 border-primary/30', glow: 'shadow-[0_0_15px_rgba(0,255,255,0.2)]' },
            { label: 'Avg Well-being', value: avgMood, icon: Smile, color: 'text-accent', bg: 'bg-accent/10 border-accent/30', glow: 'shadow-[0_0_15px_rgba(200,100,255,0.2)]' },
            { label: 'Total Investment', value: `${totalHours}h`, icon: TrendingUp, color: 'text-teal', bg: 'bg-teal/10 border-teal/30', glow: 'shadow-[0_0_15px_rgba(0,255,150,0.2)]' },
            { label: 'Data Consistency', value: `${consistencyScore}%`, icon: Zap, color: 'text-warning', bg: 'bg-warning/10 border-warning/30', glow: 'shadow-[0_0_15px_rgba(255,200,0,0.2)]' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(0.1 + i * 0.05)}
              className="relative p-6 rounded-3xl glass hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.glow} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color} group-hover:animate-pulse`} />
              </div>
              <p className="text-3xl font-extrabold text-white tracking-tight text-shadow-sm">{stat.value}</p>
              <p className="text-sm font-bold text-muted-foreground mt-1 opacity-80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Top Career + Consistency row */}
      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Top Career Suggestion */}
          {careerSuggestions.length > 0 && (
            <motion.div {...fadeUp(0.2)} className="p-8 rounded-3xl glass border border-primary/20 hover:border-primary/50 relative overflow-hidden group transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/30 transition-colors duration-500" />
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                   <Target className="w-5 h-5 text-primary animate-pulse" />
                   Primary ML Directive
                </h3>
                <Link to="/results" className="text-sm font-bold text-primary hover:text-white border border-primary/30 hover:bg-primary/20 hover:border-primary px-4 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                  Full Diagnostic <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-black/50 flex items-center justify-center shadow-inner text-4xl border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all">
                   {careerSuggestions[0].icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-black text-white tracking-tight">{careerSuggestions[0].title}</h4>
                  <div className="mt-4 w-full bg-black/60 rounded-full h-3 overflow-hidden shadow-inner flex items-center p-0.5 border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${careerSuggestions[0].match}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                      className="h-full bg-primary rounded-full relative shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                    >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                  <p className="text-xs font-bold text-primary mt-2 uppercase tracking-widest">
                    <span className="text-white neon-text">{careerSuggestions[0].match}%</span> Confidence Rating
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Skills to Improve */}
          {careerSuggestions.length > 0 && careerSuggestions[0].skillsToImprove.length > 0 && (
            <motion.div {...fadeUp(0.25)} className="p-8 rounded-3xl glass border border-white/5 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="text-base font-bold text-white">Targeted Skill Acquisition</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {careerSuggestions[0].skillsToImprove.slice(0, 4).map((skill, i) => (
                  <div key={skill} className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/10 hover:border-accent/40 hover:bg-accent/5 transition-all group">
                    <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-sm font-black border border-accent/30 shadow-[0_0_10px_rgba(200,100,255,0.2)] group-hover:scale-110 transition-transform">
                      0{i + 1}
                    </div>
                    <span className="text-sm font-bold text-muted-foreground group-hover:text-white transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Study Chart */}
      {dailyLogs.length > 1 && (
        <motion.div {...fadeUp(0.3)} className="rounded-3xl glass border border-white/5 p-6 lg:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
           <StudyChart dailyLogs={dailyLogs} />
        </motion.div>
      )}

      {/* Recent Logs */}
      {dailyLogs.length > 0 && (
        <motion.section {...fadeUp(0.35)} className="pb-8">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-base font-bold text-white">Telemetry Log History</h3>
            <Link to="/daily-log" className="text-sm font-bold text-primary hover:text-white border border-transparent hover:border-primary/30 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
              Add Entry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {dailyLogs.slice(0, 5).map(log => (
              <div key={log.id} className="flex items-center justify-between p-5 rounded-3xl glass border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                     {['😔', '😕', '😐', '🙂', '😊'][log.mood - 1]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-tight">{new Date(log.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-xs font-medium text-primary mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
                      {log.studyHours}h focus • {log.likedSubjects.length} modules
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex text-xs font-bold text-accent bg-accent/10 border border-accent/30 px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(200,100,255,0.1)]">
                  Verified Tx
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
