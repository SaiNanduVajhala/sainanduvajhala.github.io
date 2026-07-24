import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  LayersIcon,
  HistoryIcon,
  ArrowRightIcon
} from './Icons';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

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

// 100% Compositor-friendly variants (scaleY + y + opacity, 0.16s ease)
const dropdownVariants = {
  hidden: {
    opacity: 0,
    scaleY: 0.88,
    y: -6
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    y: 0,
    transition: {
      duration: 0.16,
      ease: [0.16, 1, 0.3, 1] as const
    }
  },
  exit: {
    opacity: 0,
    scaleY: 0.92,
    y: -4,
    transition: {
      duration: 0.12,
      ease: [0.7, 0, 0.84, 0] as const
    }
  }
};

export const Navbar: React.FC<NavbarProps> = memo(({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const header = document.querySelector('.navbar');
      if (header && !header.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);

    setIsMenuOpen(false);

    if (target) {
      const yOffset = -90;
      const y = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <header className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}>
      <div className="nav-content">
        <a href="#" className="logo" style={{ textTransform: 'lowercase' }}>
          sn.dev<span className="logo-dot" />
        </a>

        {/* Unified Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={toggleMenu}
            className="nav-btn nav-hamburger-btn"
            aria-label="Toggle menu"
            type="button"
          >
            {isMenuOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu — GPU-Accelerated Transform & Opacity Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: 'top center', willChange: 'transform, opacity' }}
            className="card-nav-dropdown-content"
          >
            <div className="card-nav-grid">
              {menuItems.map(item => (
                <a
                  key={item.label}
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
                </a>
              ))}
            </div>

            <div className="card-nav-footer" style={{ justifyContent: 'center' }}>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

Navbar.displayName = 'Navbar';
