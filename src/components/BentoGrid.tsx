import React from 'react';
import { SpotlightCard } from './SpotlightCard';

import { 
  CpuIcon, 
  AwardIcon, 
  TargetIcon, 
  BarChartIcon, 
  ExternalArrowIcon, 
  CheckIcon 
} from './Icons';

export const BentoGrid: React.FC = () => {
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
              B.Tech Computer Science student specializing in AI & Machine Learning, with a strong foundation in competitive programming and algorithmic problem-solving. Active experience developing memory-enhanced agents, low-latency audio assistants, and fine-tuning transformer architectures. Deeply passionate about open-source contribution and practical GenAI systems.
            </p>
          </div>
        </SpotlightCard>
      </div>

      {/* Metric Counters */}
      <SpotlightCard className="bento-card">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', minHeight: '160px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge" style={{ fontFamily: 'var(--font-mono)' }}>Model Diagnostics</span>
            <span style={{ color: 'var(--accent)' }}><BarChartIcon /></span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>1.19</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GPT-2 Val Loss</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>+15%</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attrition Accuracy</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>3.28</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GPT-2 Perplexity</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Sub-10ms</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TTS Full-Duplex</div>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Core Tech Stack (Merged ML + Languages) */}
      <SpotlightCard className="bento-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent)' }}><CpuIcon /></span>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Tech Stack</h4>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['Python', 'TypeScript', 'Java', 'C/C++', 'SQL', 'R', 'PyTorch', 'Transformers', 'LangChain', 'CrewAI', 'FastAPI', 'Scikit-learn', 'CUDA'].map(skill => (
              <span key={skill} className="badge" style={{ fontSize: '0.7rem' }}>{skill}</span>
            ))}
          </div>
        </div>
      </SpotlightCard>

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
    </div>
  );
};
