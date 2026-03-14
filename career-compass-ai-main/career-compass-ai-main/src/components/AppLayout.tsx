import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard, FileText, ClipboardList, Compass, BarChart3,
  User, LogOut, Menu, X, GraduationCap, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/daily-log', label: 'Daily Tracker', icon: FileText },
  { path: '/aptitude-test', label: 'Career Test', icon: ClipboardList },
  { path: '/results', label: 'AI Suggestions', icon: Compass },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { logout, profile } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern text-foreground flex overflow-hidden">
      {/* Sidebar Overlay (mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-72 glass border-r border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-[72px] flex items-center justify-between px-6 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-3 group" onClick={() => setSidebarOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,255,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <span className="font-extrabold text-foreground text-xl tracking-tight neon-text flex items-baseline">
               Career<span className="text-primary ml-0.5">AI</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-muted-foreground hover:text-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2 opacity-70">Main Menu</div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'neon-text' : 'group-hover:text-primary'}`} />
                <span className={`relative z-10 ${isActive ? 'neon-text' : ''}`}>{item.label}</span>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(0,255,255,0.8)] z-10"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 mt-auto">
          <div className="p-3 rounded-xl glass border border-white/5 flex items-center gap-3 cursor-pointer hover:border-white/20 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(200,100,255,0.4)] group-hover:scale-105 transition-transform duration-300">
              {profile?.name?.[0]?.toUpperCase() || 'H'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">{profile?.name || 'Hacker_01'}</p>
              <p className="text-xs text-muted-foreground truncate">{profile?.stream || 'Lvl 5 Developer'}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); logout(); }}
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
              title="Log out"
            >
              <LogOut className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-[72px] glass border-b border-white/10 flex items-center px-4 lg:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-white rounded-xl hover:bg-white/5 transition-smooth mr-3"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center gap-3">
             <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
               {navItems.find(n => n.path === pathname)?.label || 'Overview'}
             </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/parent-view"
              className="text-xs font-semibold px-4 py-2 rounded-full glass border border-white/10 hover:border-primary/50 text-muted-foreground hover:text-white hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" />
              Mentor Mode
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto custom-scrollbar relative">
          <div className="max-w-6xl mx-auto pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
