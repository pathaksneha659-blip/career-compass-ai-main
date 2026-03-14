import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { DailyLog } from '@/lib/types';

interface StudyChartProps {
  dailyLogs: DailyLog[];
}

export default function StudyChart({ dailyLogs }: StudyChartProps) {
  const chartData = [...dailyLogs]
    .reverse()
    .slice(-14)
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      hours: log.studyHours,
      mood: log.mood,
    }));

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.2)]">
          <TrendingUp className="w-5 h-5 text-primary animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
           Telemetry & Focus Trends
        </h3>
      </div>
      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" opacity={0.5} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, fontFamily: 'Space Grotesk' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, fontFamily: 'Space Grotesk' }} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid rgba(0,255,255,0.3)',
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(12px)',
                color: '#fff',
                fontFamily: 'Space Grotesk',
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(0,255,255,0.2)',
                padding: '12px 16px',
              }}
              itemStyle={{ fontWeight: 700, fontFamily: 'Space Grotesk' }}
              cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: '#000', strokeWidth: 2, stroke: 'hsl(var(--primary))' }} activeDot={{ r: 7, fill: 'hsl(var(--primary))', strokeWidth: 0, style: { filter: 'drop-shadow(0 0 8px rgba(0,255,255,0.8))' } }} name="Focus (Hours)" />
            <Line type="monotone" dataKey="mood" stroke="hsl(var(--teal))" strokeWidth={3} dot={{ r: 4, fill: '#000', strokeWidth: 2, stroke: 'hsl(var(--teal))' }} activeDot={{ r: 7, fill: 'hsl(var(--teal))', strokeWidth: 0, style: { filter: 'drop-shadow(0 0 8px rgba(0,255,150,0.8))' } }} name="Well-being" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
