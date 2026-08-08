import React, { memo, useState } from 'react';
import { SpotlightCard } from './SpotlightCard';

import { 
  CpuIcon, 
  AwardIcon, 
  TargetIcon, 
  ExternalArrowIcon, 
  CheckIcon,
  TrophyIcon
} from './Icons';

interface TechCategory {
  id: string;
  label: string;
}

interface TechItem {
  name: string;
  category: string;
  categoryLabel: string;
  badgeColor?: string;
}

const categories: TechCategory[] = [
  { id: 'ml_data', label: 'AI & ML' },
  { id: 'languages', label: 'Languages' },
  { id: 'databases', label: 'Databases' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'tools', label: 'Dev Tools' }
];

const techStackItems: TechItem[] = [
  // Languages
  { name: 'Java', category: 'languages', categoryLabel: 'Languages' },
  { name: 'Python', category: 'languages', categoryLabel: 'Languages' },
  { name: 'JavaScript', category: 'languages', categoryLabel: 'Languages' },
  { name: 'TypeScript', category: 'languages', categoryLabel: 'Languages' },
  { name: 'HTML5', category: 'languages', categoryLabel: 'Languages' },
  { name: 'CSS3', category: 'languages', categoryLabel: 'Languages' },
  { name: 'R', category: 'languages', categoryLabel: 'Languages' },
  { name: 'Markdown', category: 'languages', categoryLabel: 'Languages' },

  // Machine Learning & Data
  { name: 'PyTorch', category: 'ml_data', categoryLabel: 'AI & ML' },
  { name: 'TensorFlow', category: 'ml_data', categoryLabel: 'AI & ML' },
  { name: 'Keras', category: 'ml_data', categoryLabel: 'AI & ML' },
  { name: 'scikit-learn', category: 'ml_data', categoryLabel: 'AI & ML' },
  { name: 'NumPy', category: 'ml_data', categoryLabel: 'AI & ML' },
  { name: 'Pandas', category: 'ml_data', categoryLabel: 'AI & ML' },
  { name: 'SciPy', category: 'ml_data', categoryLabel: 'AI & ML' },
  { name: 'Matplotlib', category: 'ml_data', categoryLabel: 'AI & ML' },
  { name: 'MLflow', category: 'ml_data', categoryLabel: 'AI & ML' },

  // Databases
  { name: 'PostgreSQL', category: 'databases', categoryLabel: 'Databases' },
  { name: 'MySQL', category: 'databases', categoryLabel: 'Databases' },
  { name: 'SQLite', category: 'databases', categoryLabel: 'Databases' },
  { name: 'MongoDB', category: 'databases', categoryLabel: 'Databases' },
  { name: 'Redis', category: 'databases', categoryLabel: 'Databases' },
  { name: 'Supabase', category: 'databases', categoryLabel: 'Databases' },
  { name: 'Firebase', category: 'databases', categoryLabel: 'Databases' },

  // Cloud & Deployment
  { name: 'AWS', category: 'cloud', categoryLabel: 'Cloud & DevOps' },
  { name: 'Google Cloud', category: 'cloud', categoryLabel: 'Cloud & DevOps' },
  { name: 'Docker', category: 'cloud', categoryLabel: 'Cloud & DevOps' },
  { name: 'Kubernetes', category: 'cloud', categoryLabel: 'Cloud & DevOps' },
  { name: 'Vercel', category: 'cloud', categoryLabel: 'Cloud & DevOps' },
  { name: 'Netlify', category: 'cloud', categoryLabel: 'Cloud & DevOps' },
  { name: 'Render', category: 'cloud', categoryLabel: 'Cloud & DevOps' },

  // Dev Tools
  { name: 'Git', category: 'tools', categoryLabel: 'Dev Tools' },
  { name: 'GitHub', category: 'tools', categoryLabel: 'Dev Tools' },
  { name: 'GitHub Actions', category: 'tools', categoryLabel: 'Dev Tools' },
  { name: 'Postman', category: 'tools', categoryLabel: 'Dev Tools' },
  { name: 'OpenAPI', category: 'tools', categoryLabel: 'Dev Tools' },
  { name: 'Notion', category: 'tools', categoryLabel: 'Dev Tools' }
];

export const BentoGrid: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState<string>('ml_data');

  const filteredItems = techStackItems.filter(item => item.category === activeTab);

  return (
    <div className="bento-grid">
      {/* Bio / Position Statement */}
      <div className="bento-span-2">
        <SpotlightCard className="bento-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%', justifyContent: 'center' }}>
            <span className="badge badge-accent" style={{ alignSelf: 'flex-start' }}>Specialization</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}>
              Architecting Cognitive Agents & Neural Systems
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              B.Tech Computer Science student specializing in AI & Machine Learning, with a strong foundation in competitive programming and algorithmic problem-solving. Active experience developing memory-enhanced agents, low-latency audio assistants, and transformer architectures. Deeply passionate about open-source contribution and practical GenAI systems.
            </p>
          </div>
        </SpotlightCard>
      </div>

      {/* Competitive Programming & Problem Solving */}
      <SpotlightCard className="bento-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', height: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-secondary)' }}><TargetIcon /></span>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Problem Solving</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            Active in algorithmic programming challenges and data structure optimization:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginTop: '0.1rem' }}>
            <a 
              href="https://leetcode.com/u/5a1tama/" 
              target="_blank" 
              rel="noreferrer" 
              style={{ display: 'flex', justifyContent: 'space-between', color: 'inherit', textDecoration: 'none', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.35rem' }}
            >
              <span>LeetCode: 5a1tama</span>
              <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}><ExternalArrowIcon /></span>
            </a>
            <a 
              href="https://www.hackerrank.com/profile/vajhalasainandu" 
              target="_blank" 
              rel="noreferrer" 
              style={{ display: 'flex', justifyContent: 'space-between', color: 'inherit', textDecoration: 'none' }}
            >
              <span>HackerRank: vajhalasainandu</span>
              <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}><ExternalArrowIcon /></span>
            </a>
          </div>
        </div>
      </SpotlightCard>

      {/* GitHub Profile Tech Stack Matrix (Spans 2 columns) */}
      <div className="bento-span-2">
        <SpotlightCard className="bento-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            {/* Header + Tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent)' }}><CpuIcon /></span>
                <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  Tech Stack
                </h4>
              </div>
              <span className="badge badge-accent" style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
                GitHub Profile Ecosystem
              </span>
            </div>

            <div className="tech-nav-bar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`tech-tab ${activeTab === cat.id ? 'active' : ''}`}
                  type="button"
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Tech Badges Grid */}
            <div className="tech-pill-grid">
              {filteredItems.map(item => (
                <div key={item.name} className="tech-pill">
                  <span className="tech-pill-dot" />
                  <span className="tech-pill-name">{item.name}</span>
                  {activeTab === 'all' && (
                    <span className="tech-pill-cat">{item.categoryLabel}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Certifications & Badges */}
      <SpotlightCard className="bento-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent)' }}><AwardIcon /></span>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Certifications</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.4rem' }}>
              <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', marginTop: '0.15rem' }}><CheckIcon /></span>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>OCI AI Foundations Associate</strong>
                <div style={{ color: 'var(--text-muted)' }}>Oracle University (2025)</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', marginTop: '0.15rem' }}><CheckIcon /></span>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Data Analytics Virtual Experience</strong>
                <div style={{ color: 'var(--text-muted)' }}>Deloitte (Forage)</div>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Hackathons & Competitions Showcase Card (Spans 3 columns) */}
      <div className="bento-span-3">
        <SpotlightCard className="bento-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent)' }}><TrophyIcon /></span>
                <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  Hackathons & Competitions
                </h4>
              </div>
              <span className="badge badge-accent" style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
                Engineering Showcase
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
              {/* Hangover Hackathon */}
              <div style={{
                background: 'var(--border-light)',
                border: '1px solid var(--card-border)',
                borderRadius: '10px',
                padding: '0.9rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>
                    WeMakeDevs Hackathon
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Hangover Hackathon
                  </span>
                </div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Oneiros — Cognitive Memory OS
                </h5>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                  Biologically-inspired AI memory OS with a 5-stage sleep consolidation pipeline using Cognee Cloud.
                </p>
                <div>
                  <a
                    href="https://github.com/SaiNanduVajhala/oneiros"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    <span>View Repository</span>
                    <ExternalArrowIcon />
                  </a>
                </div>
              </div>

              {/* Gemma 4 Good Hackathon */}
              <div style={{
                background: 'var(--border-light)',
                border: '1px solid var(--card-border)',
                borderRadius: '10px',
                padding: '0.9rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>
                    Google DeepMind & Kaggle
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Gemma 4 Good
                  </span>
                </div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  LexiRead — Dyslexia-Friendly Reader
                </h5>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                  AI dyslexia reading assistant powered by Gemma, dynamically adapting text layouts & spacing for accessibility.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a
                    href="https://github.com/SaiNanduVajhala/lexiread"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    <span>Repository</span>
                    <ExternalArrowIcon />
                  </a>
                  <a
                    href="https://lexi-read-one.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    <span>Live Demo</span>
                    <ExternalArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
});

BentoGrid.displayName = 'BentoGrid';


