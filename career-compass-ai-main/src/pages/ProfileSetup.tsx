import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const STREAMS = ['Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'Other'];

export default function ProfileSetup() {
  const { setProfile, profile } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: profile?.name || '',
    age: profile?.age?.toString() || '',
    class: profile?.class || '',
    stream: profile?.stream || '',
    goals: profile?.goals || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      name: form.name,
      age: parseInt(form.age) || 16,
      class: form.class,
      stream: form.stream,
      goals: form.goals,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Set up your profile</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Tell us about yourself so we can personalize your experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                required value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Age</label>
              <input
                required type="number" min={10} max={30} value={form.age}
                onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
                placeholder="16"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Class / Grade</label>
              <input
                required value={form.class}
                onChange={e => setForm(f => ({ ...f, class: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
                placeholder="11th Grade"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Stream</label>
              <select
                required value={form.stream}
                onChange={e => setForm(f => ({ ...f, stream: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
              >
                <option value="">Select...</option>
                {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Career Goals</label>
            <textarea
              value={form.goals}
              onChange={e => setForm(f => ({ ...f, goals: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth resize-none"
              placeholder="What do you want to achieve? Any dream careers?"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 gradient-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-smooth shadow-lg shadow-primary/25"
          >
            Continue to Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
