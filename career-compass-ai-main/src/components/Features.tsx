import { motion } from "framer-motion";
import { Lightbulb, BarChart3, Target } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    emoji: "🧠",
    title: "Skill Discovery",
    description:
      "Fun, science-backed quizzes that uncover your natural talents, interests, and personality traits to guide your career choices.",
  },
  {
    icon: BarChart3,
    emoji: "📊",
    title: "Progress Tracking",
    description:
      "Track your study habits, growth milestones, and skill development over time with easy-to-read visual dashboards.",
  },
  {
    icon: Target,
    emoji: "🎯",
    title: "Personality Match",
    description:
      "Smart algorithms match your unique profile with real-world careers and generate step-by-step roadmaps just for you.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

const Features = () => {
  return (
    <section id="features" className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
          What You'll Get 🚀
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Everything you need to discover your ideal career path — powered by smart AI that actually understands students.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={item}
            className="group relative p-8 rounded-2xl shadow-soft glass-surface glass-surface-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-3xl mb-5">{feature.emoji}</div>
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
              {feature.title}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
