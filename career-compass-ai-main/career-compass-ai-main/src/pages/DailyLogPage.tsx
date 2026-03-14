import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { SUBJECTS, SKILLS } from '@/lib/constants';
import { DailyLog } from '@/lib/types';
import { motion } from 'framer-motion';
import { Check, Clock, BookOpen, Brain, Smile } from 'lucide-react';

export default function DailyLogPage() {
  const { addDailyLog, refreshSuggestions } = useApp();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [studyHours, setStudyHours] = useState(3);
  const [liked, setLiked] = useState<string[]>([]);
  const [struggled, setStruggled] = useState<string[]>([]);
  const [mood, setMood] = useState(3);
  const [motivation, setMotivation] = useState(3);
  const [skills, setSkills] = useState<string[]>([]);

  const toggleItem = (arr: string[], item: string, setter: (v: string[]) => void) => {
    setter(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const log: DailyLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      studyHours, likedSubjects: liked, struggledSubjects: struggled,
      mood, motivation, skills,
    };
    addDailyLog(log);
    refreshSuggestions();
    setSubmitted(true);
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center py-32">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Log submitted!</h2>
          <p className="text-sm text-muted-foreground mt-1">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  const moodEmojis = ['😔', '😕', '😐', '🙂', '😊'];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Daily Tracker</h1>
        <p className="text-sm text-muted-foreground mt-1">Record today's study activity and how you're feeling.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        {/* Study Hours */}
        <div className="p-6 rounded-2xl bg-card card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground">Study Hours</label>
              <p className="text-xs text-muted-foreground">How many hours did you study today?</p>
            </div>
            <span className="ml-auto text-2xl font-bold text-primary">{studyHours}h</span>
          </div>
          <input
            type="range" min={0} max={12} step={0.5} value={studyHours}
            onChange={e => setStudyHours(parseFloat(e.target.value))}
            className="w-full accent-primary h-2 rounded-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
            <span>0h</span><span>6h</span><span>12h</span>
          </div>
        </div>

        {/* Subjects */}
        <div className="p-6 rounded-2xl bg-card card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5 text-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground">Subjects Enjoyed</label>
              <p className="text-xs text-muted-foreground">Select subjects you liked today</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(s => (
              <button key={s} type="button" onClick={() => toggleItem(liked, s, setLiked)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-smooth ${
                  liked.includes(s)
                    ? 'gradient-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-foreground mb-3">Subjects You Struggled With</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <button key={s} type="button" onClick={() => toggleItem(struggled, s, setStruggled)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-smooth ${
                    struggled.includes(s)
                      ? 'bg-destructive text-destructive-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mood */}
        <div className="p-6 rounded-2xl bg-card card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
              <Smile className="w-4.5 h-4.5 text-accent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground">Mood & Motivation</label>
              <p className="text-xs text-muted-foreground">How are you feeling today?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-3">Mood</p>
              <div className="flex gap-2 justify-between">
                {moodEmojis.map((emoji, i) => (
                  <button key={i} type="button" onClick={() => setMood(i + 1)}
                    className={`w-12 h-12 rounded-xl text-xl flex items-center justify-center transition-smooth ${
                      mood === i + 1
                        ? 'bg-accent/15 ring-2 ring-accent scale-110'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-3">
                Motivation: <span className="text-foreground font-semibold">{motivation}/5</span>
              </p>
              <input
                type="range" min={1} max={5} value={motivation}
                onChange={e => setMotivation(parseInt(e.target.value))}
                className="w-full accent-accent h-2 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="p-6 rounded-2xl bg-card card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-warning/10 flex items-center justify-center">
              <Brain className="w-4.5 h-4.5 text-warning" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground">Skills Practiced</label>
              <p className="text-xs text-muted-foreground">Select skills you used or developed</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(s => (
              <button key={s} type="button" onClick={() => toggleItem(skills, s, setSkills)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-smooth ${
                  skills.includes(s)
                    ? 'bg-warning/15 text-warning ring-1 ring-warning/30'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="h-12 px-8 gradient-primary text-primary-foreground rounded-2xl text-sm font-semibold hover:opacity-90 transition-smooth shadow-lg shadow-primary/25"
        >
          Submit Daily Log
        </button>
      </form>
    </motion.div>
  );
}
