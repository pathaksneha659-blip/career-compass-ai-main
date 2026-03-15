import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-visible">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none gradient-primary" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[100px] opacity-25 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface text-sm font-medium text-muted-foreground mb-8"
        >
          ✨ Trusted by 10,000+ Students
        </motion.div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 text-balance">
          Find Your Perfect{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Career Path
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-muted-foreground mt-4 leading-relaxed max-w-2xl mx-auto" style={{ textWrap: "pretty" }}>
          Get personalized AI-powered career guidance designed specially for students. Discover your strengths, explore careers, and build your future.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <motion.a
            href="#"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="h-14 px-8 gradient-primary text-foreground rounded-full text-base font-semibold shadow-lg hover:brightness-110 transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Explore Careers <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="h-14 px-8 glass-surface glass-surface-hover text-foreground rounded-full text-base font-semibold transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
          >
            Take Free Quiz
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
