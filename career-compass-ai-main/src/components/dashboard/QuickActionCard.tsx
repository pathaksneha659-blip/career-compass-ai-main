import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface QuickActionCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'primary' | 'accent';
  delay: number;
}

export default function QuickActionCard({ to, icon: Icon, title, description, color, delay }: QuickActionCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link
        to={to}
        className="block p-6 rounded-2xl bg-card card-shadow hover:card-shadow-hover transition-smooth group"
      >
        <div className={`w-10 h-10 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <div className={`mt-4 flex items-center gap-1 text-sm font-medium ${color === 'primary' ? 'text-primary' : 'text-accent'} group-hover:gap-2 transition-all`}>
          Get started <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </motion.div>
  );
}
