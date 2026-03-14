import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Eye, TrendingUp, Brain, BarChart3 } from 'lucide-react';

export default function ParentViewPage() {
  const { dailyLogs, profile, careerSuggestions } = useApp();

  const studyData = [...dailyLogs].reverse().slice(-14).map(log => ({
    date: new Date(log.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    hours: log.studyHours,
    mood: log.mood,
  }));

  const skillCounts: Record<string, number> = {};
  dailyLogs.forEach(l => l.skills.forEach(s => { skillCounts[s] = (skillCounts[s] || 0) + 1; }));
  const skillData = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([skill, count]) => ({ skill, count }));

  const avgHours = dailyLogs.length > 0
    ? (dailyLogs.reduce((s, l) => s + l.studyHours, 0) / dailyLogs.length).toFixed(1)
    : '0';
  const consistency = Math.min(100, Math.round((dailyLogs.length / 30) * 100));

  const tooltipStyle = {
    borderRadius: '12px', border: 'none',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    background: 'hsl(var(--card))', color: 'hsl(var(--foreground))',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl mx-auto p-4 lg:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Eye className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Parent View</h1>
          <p className="text-sm text-muted-foreground">
            {profile ? `Viewing ${profile.name}'s progress` : 'Student progress insights'}
          </p>
        </div>
      </div>

      {dailyLogs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No data available yet.</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Logs', value: dailyLogs.length.toString() },
              { label: 'Avg Hours/Day', value: avgHours },
              { label: 'Consistency', value: `${consistency}%` },
              { label: 'Top Career', value: careerSuggestions[0]?.title || '—' },
            ].map(s => (
              <div key={s.label} className="p-5 rounded-2xl bg-card card-shadow">
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Study Consistency */}
            <div className="p-6 rounded-2xl bg-card card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Study Consistency</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={studyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} name="Hours" />
                  <Line type="monotone" dataKey="mood" stroke="hsl(var(--teal))" strokeWidth={2.5} dot={{ r: 3 }} name="Mood" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Skill Growth */}
            <div className="p-6 rounded-2xl bg-card card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Skill Growth</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={skillData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="skill" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} angle={-20} textAnchor="end" height={50} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
