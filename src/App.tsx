import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ClickSpark } from './components/ClickSpark';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Carousel } from './components/Carousel';
import { Timeline } from './components/Timeline';
import { MailIcon, CopyIcon, CheckIcon } from './components/Icons';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || !window.matchMedia('(hover: hover)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContactClick = useCallback(() => {
    navigator.clipboard.writeText('vajhalasainandu@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', theme === 'dark' ? '#111110' : '#f8f3e8');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div className="app-container">
      {/* Dynamic Click Spark emitter — Desktop only to prevent mobile lag */}
      {!isMobile && (
        <ClickSpark sparkColor={theme === 'dark' ? '#a3b59e' : '#788a73'} sparkSize={10} sparkCount={10} sparkSpeed={3} />
      )}

      {/* Floating Capsule Header (Isolated, Memoized component) */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Component */}
      <Hero />

      {/* Main Content Layout */}
      <main className="max-width-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        {/* Bento Grid (About) */}
        <section id="about" style={{ padding: '3.5rem 0 1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            .about()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            B.Tech Computer Science student specializing in AI & Machine Learning, with expertise in deep learning models, low-latency audio assistants, and graph-based cognitive memory loops.
          </p>
          <BentoGrid />
        </section>

        {/* Systems & Architecture (Projects Carousel) */}
        <section id="systems" style={{ padding: '3rem 0' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            .systems()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Production-grade AI architectures, cognitive agent memory systems, and low-latency audio pipelines.
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
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
              type="button"
            >
              {copied ? <CheckIcon /> : <CopyIcon size={12} />}
            </button>
          </div>
          <div>
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
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '2rem 1rem', textAlign: 'center', marginTop: '4rem' }}>
        <div className="max-width-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Sai Nandu Vajhala. Engineered with precision.
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            sys.status: [operational]
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
