import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">
            Career Compass
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-2"
          >
            Login
          </a>
          <motion.a
            href="#"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="gradient-primary text-sm font-semibold text-foreground px-5 py-2.5 rounded-full transition-all duration-200 hover:brightness-110"
          >
            Get Started Free
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
