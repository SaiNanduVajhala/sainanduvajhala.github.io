import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BlurText } from './BlurText';

// ── Shooting Stars (inlined) ──
interface ShootingStarData {
  id: number; x: number; y: number; angle: number; scale: number; speed: number; distance: number;
}
const ShootingStars: React.FC<{
  minSpeed?: number; maxSpeed?: number; minDelay?: number; maxDelay?: number;
  starColor?: string; trailColor?: string; starWidth?: number; starHeight?: number;
}> = ({ minSpeed = 10, maxSpeed = 30, minDelay = 1200, maxDelay = 4200,
  starColor = '#9E00FF', trailColor = '#2EB9DF', starWidth = 10, starHeight = 1 }) => {
    const [star, setStar] = useState<ShootingStarData | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const getRandomStart = useCallback(() => {
      const side = Math.floor(Math.random() * 4);
      const offset = Math.random() * window.innerWidth;
      switch (side) {
        case 0: return { x: offset, y: 0, angle: 45 };
        case 1: return { x: window.innerWidth, y: offset, angle: 135 };
        case 2: return { x: offset, y: window.innerHeight, angle: 225 };
        default: return { x: 0, y: offset, angle: 315 };
      }
    }, []);
    useEffect(() => {
      const create = () => {
        const { x, y, angle } = getRandomStart();
        const s: ShootingStarData = { id: Date.now(), x, y, angle, scale: 1, speed: minSpeed + Math.random() * (maxSpeed - minSpeed), distance: 0 };
        setStar(s);
        setTimeout(() => setStar(null), Math.max(window.innerWidth, window.innerHeight) / s.speed * 50);
      };
      const schedule = (): ReturnType<typeof setTimeout> => setTimeout(() => { create(); ref.current = schedule(); }, minDelay + Math.random() * (maxDelay - minDelay));
      const ref: { current: ReturnType<typeof setTimeout> | null } = { current: null };
      create(); ref.current = schedule();
      return () => { if (ref.current) clearTimeout(ref.current); };
    }, [minSpeed, maxSpeed, minDelay, maxDelay, getRandomStart]);
    useEffect(() => {
      if (!star) return;
      let raf: number;
      const move = () => {
        setStar(p => {
          if (!p) return null;
          const rad = (p.angle * Math.PI) / 180;
          const d = p.distance + p.speed * 0.5;
          if (d > Math.max(window.innerWidth, window.innerHeight)) return null;
          return { ...p, x: p.x + Math.cos(rad) * p.speed * 0.5, y: p.y + Math.sin(rad) * p.speed * 0.5, distance: d };
        });
        raf = requestAnimationFrame(move);
      };
      raf = requestAnimationFrame(move);
      return () => cancelAnimationFrame(raf);
    }, [star?.id]);
    return (
      <svg ref={svgRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {star && <rect x={star.x} y={star.y} width={starWidth * star.scale} height={starHeight} fill="url(#star-gradient)" transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`} />}
        <defs><linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} /><stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} /></linearGradient></defs>
      </svg>
    );
  };

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDirectScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const yOffset = -90;
      const y = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
        padding: '6.5rem 1rem 3rem',
        boxSizing: 'border-box'
      }}
    >
      {/* Subtle ambient glow following the mouse, highly aesthetic & lightweight */}
      <div
        style={{
          position: 'fixed',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--glow-color) 0%, transparent 70%)',
          top: mousePos.y - 250,
          left: mousePos.x - 250,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: isHovered ? 0.65 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      {/* Shooting stars — dark mode only */}
      {isDark && (
        <ShootingStars
          minSpeed={12}
          maxSpeed={28}
          minDelay={1800}
          maxDelay={4500}
          starColor="#a3b59e"
          trailColor="#4a6741"
        />
      )}

      {/* Desktop Floating activation function badges */}
      <div className="desktop-only-badges">
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '25%',
            left: 'calc(50% - 440px)',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '0.35rem 0.6rem',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
          className="hero-floating-badge"
        >
          ReLU(x) = max(0, x)
        </motion.div>

        <motion.div
          animate={{
            y: [12, -12, 12],
            rotate: [0, -4, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{
            position: 'absolute',
            top: '32%',
            right: 'calc(50% - 440px)',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '0.35rem 0.6rem',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
          className="hero-floating-badge"
        >
          Softmax(zᵢ) = eᶻⁱ / Σeᶻʲ
        </motion.div>

        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 3, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '30%',
            left: 'calc(50% - 440px)',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '0.35rem 0.6rem',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
          className="hero-floating-badge"
        >
          σ(x) = 1 / (1 + e⁻ˣ)
        </motion.div>

        <motion.div
          animate={{
            y: [8, -8, 8],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '28%',
            right: 'calc(50% - 440px)',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '0.35rem 0.6rem',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
          className="hero-floating-badge"
        >
          tanh(x) = (eˣ - e⁻ˣ) / (eˣ + e⁻ˣ)
        </motion.div>
      </div>

      {/* Hero Header Wrapper */}
      <div style={{ zIndex: 5, padding: '0 1rem' }}>
        <h1
          className="hero-title"
          style={{
            fontSize: 'clamp(2.75rem, 7vw, 4.5rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '1rem'
          }}
        >
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            <BlurText
              text="Sai Nandu "
              delay={40}
              animateBy="letters"
              style={{ color: 'var(--text-primary)' }}
            />
          </span>
          <span className="hero-name-second-line">
            <BlurText
              text="Vajhala"
              delay={40}
              animateBy="letters"
              style={{ color: 'var(--text-primary)' }}
            />
          </span>
        </h1>

        {/* Subtitle Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.72rem, 2.5vw, 0.8rem)',
            color: 'var(--accent)',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem'
          }}
        >
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>[AI & Machine Learning</span>{' '}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Engineer]</span>
        </motion.div>

        {/* Intro statement to fill blank space */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{
            maxWidth: '540px',
            margin: '0 auto 2rem',
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Building deep learning models, low-latency audio assistants, and graph-based cognitive memory loops for autonomous agents.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}
        >
          <a
            href="https://sainanduvajhala.github.io/resume"
            target="_blank"
            rel="noreferrer"
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
              gap: '0.5rem'
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            view.resume()
          </a>
        </motion.div>
      </div>

      {/* Explore indicator */}
      <motion.a
        href="#about"
        onClick={(e) => handleDirectScroll(e, 'about')}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.45rem',
          textDecoration: 'none',
          color: 'var(--text-muted)',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          zIndex: 5
        }}
        whileHover={{ scale: 1.05, color: 'var(--accent)', opacity: 1 }}
      >
        <div
          style={{
            width: '18px',
            height: '28px',
            borderRadius: '9px',
            border: '1.5px solid var(--text-muted)',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '4px'
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '3px',
              height: '5px',
              borderRadius: '1px',
              backgroundColor: 'var(--text-muted)'
            }}
          />
        </div>
        scroll.explore()
      </motion.a>
    </section>
  );
};

export default Hero;
