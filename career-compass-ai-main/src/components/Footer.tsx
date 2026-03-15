const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-muted/20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 Career Compass. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
