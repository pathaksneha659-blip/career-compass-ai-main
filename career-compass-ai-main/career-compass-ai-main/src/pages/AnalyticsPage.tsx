import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, BarChart3, Brain, Target } from 'lucide-react';

export default function AnalyticsPage() {
  const { dailyLogs, testResult } = useApp();

  // Study hours per week (aggregate by week)
  const weeklyData = (() => {
    if (dailyLogs.length === 0) return [];
    const weeks: Record<string, number> = {};
    [...dailyLogs].reverse().forEach(log => {
      const d = new Date(log.date);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const key = weekStart.toLocaleDateString('en', { month: 'short', day: 'numeric' });
      weeks[key] = (weeks[key] || 0) + log.studyHours;
    });
    return Object.entries(weeks).map(([week, hours]) => ({ week, hours: Math.round(hours * 10) / 10 }));
  })();

  // Motivation trend
  const motivationData = [...dailyLogs].reverse().slice(-14).map(log => ({
    date: new Date(log.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    motivation: log.motivation,
    mood: log.mood,
  }));

  // Skill frequency
  const skillCounts: Record<string, number> = {};
  dailyLogs.forEach(l => l.skills.forEach(s => { skillCounts[s] = (skillCounts[s] || 0) + 1; }));
  const skillData = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([skill, count]) => ({ skill, count }));

  const tooltipStyle = {
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    background: 'hsl(var(--card))',
    color: 'hsl(var(--foreground))',
  };

  const noData = dailyLogs.length === 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Progress Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your study patterns, motivation, and skill growth.</p>
      </div>

      {noData ? (
        <div className="text-center py-20">
          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Submit daily logs to see analytics here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Study Hours */}
          <ChartCard icon={TrendingUp} title="Study Hours Per Week" color="primary">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Motivation Trend */}
          <ChartCard icon={Target} title="Motivation Trend" color="accent">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={motivationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} domain={[0, 5]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="motivation" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--accent))' }} name="Motivation" />
                <Line type="monotone" dataKey="mood" stroke="hsl(var(--teal))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--teal))' }} name="Mood" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Skill Development */}
          <ChartCard icon={Brain} title="Skill Development" color="teal">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={skillData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="skill" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill="hsl(var(--teal))" radius={[6, 6, 0, 0]} name="Times Practiced" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Test Performance */}
          {testResult && (
            <div className="p-6 rounded-2xl bg-card card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Target className="w-4.5 h-4.5 text-warning" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Test Performance</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Logical Score</p>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-bold text-foreground">{testResult.logical}</span>
                    <span className="text-sm text-muted-foreground mb-1">/ 5</span>
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(testResult.logical / 5) * 100}%` }} />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Top Interest</p>
                  <p className="text-xl font-bold text-foreground mt-2">
                    {Object.entries(testResult.interest).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Top Personality Trait</p>
                  <p className="text-xl font-bold text-foreground mt-2">
                    {Object.entries(testResult.personality).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

function ChartCard({ icon: Icon, title, color, children }: { icon: any; title: string; color: string; children: React.ReactNode }) {
  const bgMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    teal: 'bg-teal/10 text-teal',
  };
  return (
    <div className="p-6 rounded-2xl bg-card card-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bgMap[color]}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}
