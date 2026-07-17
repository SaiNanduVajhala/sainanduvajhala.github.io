import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={(e) => { toggleTheme(); (e.currentTarget as HTMLButtonElement).blur(); }}
      className="nav-btn"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 15, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -15, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // Shift moon slightly down and right to visually center it in the circle container
            transform: theme === 'light' ? 'translate(0.5px, 0.5px)' : 'none'
          }}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
export default ThemeToggle;
