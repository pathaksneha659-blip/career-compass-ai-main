import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Check, User } from 'lucide-react';

const STREAMS = ['Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'Other'];

export default function ProfilePage() {
  const { profile, setProfile } = useApp();
  const [saved, setSaved] = useState(false);
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
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal details.</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">
            {profile?.name?.[0]?.toUpperCase() || 'S'}
          </span>
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{profile?.name || 'Student'}</p>
          <p className="text-sm text-muted-foreground">{profile?.stream || 'No stream'} · {profile?.class || 'No class'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Full Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} required />
          <FormField label="Age" value={form.age} onChange={v => setForm(f => ({ ...f, age: v }))} type="number" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Class / Grade" value={form.class} onChange={v => setForm(f => ({ ...f, class: v }))} required />
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
            placeholder="What do you want to achieve?"
          />
        </div>

        <button
          type="submit"
          className="h-11 px-6 gradient-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-smooth shadow-lg shadow-primary/25 flex items-center gap-2"
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Profile'}
        </button>
      </form>
    </motion.div>
  );
}

function FormField({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <input
        type={type} required={required} value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-11 px-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
      />
    </div>
  );
}
