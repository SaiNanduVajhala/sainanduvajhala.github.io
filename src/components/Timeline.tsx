import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BriefcaseIcon, TrophyIcon, GraduationCapIcon, BulletIcon } from './Icons';

interface TimelineEntry {
  type: 'work' | 'hackathon' | 'education';
  title: string;
  subtitle: string;
  date: string;
  details: string[];
}

const timelineData: TimelineEntry[] = [
  {
    type: "work",
    title: "Data Science Intern",
    subtitle: "Xylofy AI (Remote)",
    date: "June 2026 – July 2026",
    details: [
      "Engineered preprocessing pipelines and classification models (Scikit-learn/XGBoost) for employee attrition analysis, improving prediction accuracy by 15%.",
      "Built a demand forecasting system comparing SARIMA, Prophet, and XGBoost (20.5% MAPE) and deployed an interactive Streamlit dashboard to optimize inventory stocking strategies."
    ]
  },
  {
    type: "hackathon",
    title: "Hangover Hackathon | WeMakeDevs & Cognee",
    subtitle: "Creator of Oneiros",
    date: "July 2026",
    details: [
      "Built Oneiros, a memory OS based on Erik Hoel's Overfitted Brain Hypothesis that creates an AI agent sleeping to consolidate raw experiences into abstraction-linked knowledge schemas."
    ]
  },
  {
    type: "hackathon",
    title: "Gemma 4 Good Hackathon | Google DeepMind",
    subtitle: "Creator of LexiRead",
    date: "April 2026 – May 2026",
    details: [
      "Built LexiRead, an AI-powered dyslexia-friendly reading assistant using Google's Gemma 4 family models to support reading comprehension and cognitive ease."
    ]
  },
  {
    type: "education",
    title: "BTech in Artificial Intelligence & Machine Learning",
    subtitle: "Sreyas Institute of Engineering and Technology (Hyderabad, Telangana)",
    date: "Aug 2024 – May 2027 (Expected)",
    details: [
      "Focused coursework: Deep Learning, Natural Language Processing, LLMs, CUDA, System Optimization, and Graph Database structures."
    ]
  },
  {
    type: "education",
    title: "Diploma in Electrical & Electronics Engineering",
    subtitle: "Samskruti College of Engineering and Technology (Hyderabad, Telangana)",
    date: "Aug 2021 – April 2024",
    details: [
      "Graduated with foundational engineering principles, electrical design, and computation."
    ]
  }
];

export const Timeline: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'work' | 'hackathon' | 'education'>('all');

  const filteredEntries = timelineData.filter(entry => filter === 'all' || entry.type === filter);

  return (
    <div style={{ margin: '2.5rem 0' }}>
      {/* Filters (ponytail: keep interface clean and lightweight) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {(['all', 'work', 'hackathon', 'education'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`btn ${filter === type ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '0.35rem 0.9rem',
              fontSize: '0.75rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="timeline-container">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.title + entry.date}
              layout
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="timeline-item"
            >
              {/* Animated node dot with theme-adaptive styling */}
              <div className="timeline-dot">
                <span
                  className="timeline-icon-box"
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '18px',
                    padding: '0.25rem',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {entry.type === 'work' && <BriefcaseIcon />}
                  {entry.type === 'hackathon' && <TrophyIcon />}
                  {entry.type === 'education' && <GraduationCapIcon />}
                </span>
              </div>

              {/* Text info */}
              <div className="timeline-info" style={{ paddingLeft: '2.25rem' }}>
                <div className="timeline-date">{entry.date}</div>
                <h4 className="timeline-title">{entry.title}</h4>
                <div className="timeline-subtitle">{entry.subtitle}</div>
                <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: '1.5' }}>
                  {entry.details.map((detail, dIdx) => (
                    <li key={dIdx} style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start' }}>
                      <span><BulletIcon /></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Timeline;
