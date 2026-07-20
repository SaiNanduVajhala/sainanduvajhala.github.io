import { useState, useEffect } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { ClickSpark } from './components/ClickSpark';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Carousel } from './components/Carousel';
import { Timeline } from './components/Timeline';
import { motion, AnimatePresence } from 'framer-motion';

import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  LayersIcon,
  HistoryIcon,
  ArrowRightIcon,
  CopyIcon,
  CheckIcon
} from './components/Icons';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to Light mode (Cream/Pastel theme) as requested
    return 'light';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || !window.matchMedia('(hover: hover)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContactClick = () => {
    navigator.clipboard.writeText('vajhalasainandu@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update dynamic theme-color meta tag for mobile status bar alignment
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', theme === 'dark' ? '#111110' : '#f8f3e8');
  }, [theme]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const header = document.querySelector('.navbar');
      if (header && !header.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);

    if (target) {
      // Calculate coordinate immediately before menu height collapse to prevent incorrect layout values
      const yOffset = -90;
      const y = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + yOffset;

      setIsMenuOpen(false);

      // Scroll to the locked coordinate once transition completes
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 280);
    } else {
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    {
      label: '.about()',
      desc: 'AI/ML specialization & credentials',
      href: '#about',
      icon: <UserIcon size={16} />
    },
    {
      label: '.systems()',
      desc: 'Deep learning models & custom agents',
      href: '#systems',
      icon: <LayersIcon size={16} />
    },
    {
      label: '.chronology()',
      desc: 'Timeline of milestones & education',
      href: '#chronology',
      icon: <HistoryIcon size={16} />
    },
    {
      label: '.contactme()',
      desc: 'Get in touch for collaborations',
      href: '#contact',
      icon: <MailIcon size={16} />
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 20
      }
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Click Spark emitter from React Bits — Desktop only to prevent mobile lag */}
      {!isMobile && (
        <ClickSpark sparkColor={theme === 'dark' ? '#a3b59e' : '#788a73'} sparkSize={10} sparkCount={10} sparkSpeed={3} />
      )}

      {/* Floating Capsule Header (Card Nav style) */}
      <header
        className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}
      >
        <div className="nav-content">
          <a href="#" className="logo" style={{ textTransform: 'lowercase' }}>
            sn.dev<span className="logo-dot" />
          </a>

          {/* Unified Controls: Theme Toggle + CardNav Hamburger Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={(e) => { setIsMenuOpen(!isMenuOpen); (e.currentTarget as HTMLButtonElement).blur(); }}
              className="nav-btn nav-hamburger-btn"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu Card Content (animated via AnimatePresence & spring staggers) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="card-nav-dropdown-content"
            >
              <motion.div
                variants={isMobile ? undefined : staggerContainer}
                initial={isMobile ? undefined : "hidden"}
                animate={isMobile ? undefined : "show"}
                className="card-nav-grid"
              >
                {menuItems.map(item => (
                  <motion.a
                    key={item.label}
                    variants={isMobile ? undefined : staggerItem}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="card-nav-item"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.6rem' }}>
                      <div className="card-nav-icon-wrapper">
                        {item.icon}
                      </div>
                      <ArrowRightIcon size={14} className="card-nav-arrow" />
                    </div>
                    <div className="card-nav-item-title">{item.label}</div>
                    <div className="card-nav-item-desc">{item.desc}</div>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                variants={isMobile ? undefined : staggerItem}
                initial={isMobile ? undefined : "hidden"}
                animate={isMobile ? undefined : "show"}
                className="card-nav-footer"
                style={{ justifyContent: 'center' }}
              >
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <a href="https://github.com/SaiNanduVajhala" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} aria-label="GitHub">
                    <GithubIcon size={15} />
                  </a>
                  <a href="https://linkedin.com/in/vajhala-sai-nandu" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} aria-label="LinkedIn">
                    <LinkedinIcon size={15} />
                  </a>
                  <a href="mailto:vajhalasainandu@gmail.com" style={{ color: 'var(--text-secondary)' }} aria-label="Email">
                    <MailIcon size={15} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Render Modular Fullscreen Hero Component */}
      <Hero />

      {/* Main Content Layout */}
      <main className="max-width-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        {/* Bento Grid (About) */}
        <section id="about" style={{ padding: '3.5rem 0 1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            .about()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            System diagnostics and quantitative metric outputs from built pipelines.
          </p>
          <BentoGrid />
        </section>

        {/* Projects Carousel Section */}
        <section id="systems" style={{ padding: '3rem 0 1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            .systems()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Deep-dive models, datasets, and custom agent architectures.
          </p>
          <Carousel />
        </section>

        {/* Experience & Milestones (Timeline) */}
        <section id="chronology" style={{ padding: '3rem 0' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            .chronology()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Education milestones, internships, and hackathon results.
          </p>
          <Timeline />
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ padding: '3rem 0 1rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            .contactme()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Have a project in mind, an opportunity, or just want to discuss deep learning? Drop me a line.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              vajhalasainandu@gmail.com
            </span>
            <button
              onClick={handleContactClick}
              title="Copy to clipboard"
              style={{
                borderRadius: '6px',
                padding: '4px 6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="copy-btn"
            >
              {copied ? <CheckIcon /> : <CopyIcon size={12} />}
            </button>
          </div>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=vajhalasainandu@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleContactClick}
            className="btn btn-primary"
            style={{
              padding: '0.6rem 1.6rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <MailIcon size={14} />
            {copied ? 'copied.to.clipboard()' : 'send.email()'}
          </a>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--card-border)', padding: '2.5rem 0', marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div>
            <div>© {new Date().getFullYear()} Sai Nandu Vajhala.</div>
            <div style={{ fontSize: '0.72rem', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>Loc: Hyderabad, India</div>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', fontFamily: 'var(--font-mono)' }}>
            <a href="https://github.com/SaiNanduVajhala" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>github</a>
            <a href="https://linkedin.com/in/vajhala-sai-nandu" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>linkedin</a>
            <a href="https://kaggle.com/vajhalasainandu" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>kaggle</a>
            <a href="mailto:vajhalasainandu@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>email</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
