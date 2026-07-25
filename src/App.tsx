import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { ClickSpark } from './components/ClickSpark';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Carousel } from './components/Carousel';
import { Timeline } from './components/Timeline';
import { MailIcon } from './components/Icons';

// Code-split & Lazy-loaded Resume Viewer Overlay Component
const ResumeViewer = React.lazy(() => import('./components/ResumeViewer'));

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [copied, setCopied] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const scrollPosRef = useRef<number>(0);

  const handleOpenResume = useCallback(() => {
    scrollPosRef.current = window.scrollY;
    document.body.style.overflow = 'hidden';
    setIsResumeOpen(true);
  }, []);

  const handleCloseResume = useCallback(() => {
    setIsResumeOpen(false);
    document.body.style.overflow = '';
    window.scrollTo({ top: scrollPosRef.current });
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
      {/* Dynamic Click Spark emitter */}
      <ClickSpark sparkColor={theme === 'dark' ? '#a3b59e' : '#788a73'} sparkSize={10} sparkCount={10} sparkSpeed={3} />

      {/* Floating Capsule Header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Component */}
      <Hero onOpenResume={handleOpenResume} />

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

        {/* Chronology & Milestones (Timeline) */}
        <section id="chronology" style={{ padding: '3rem 0' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            .chronology()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Timeline of education, key milestones, hackathons, and certifications.
          </p>
          <Timeline />
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ padding: '4rem 0 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
            .contactme()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Open for AI/ML engineering roles, research collaborations, and cognitive system consulting.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="mailto:vajhalasainandu@gmail.com"
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

      {/* Lazy Loaded Fullscreen Resume Viewer Overlay */}
      {isResumeOpen && (
        <Suspense fallback={null}>
          <ResumeViewer onClose={handleCloseResume} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
