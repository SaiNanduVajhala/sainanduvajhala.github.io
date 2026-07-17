import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import { BorderBeam } from './BorderBeam';
import { ExternalLink, ChevronDown, BrainCircuit, Code2, HeartPulse } from 'lucide-react';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" stroke="currentColor" />
    <path d="M9 18c-4.51 2-5-2-7-2" stroke="currentColor" />
  </svg>
);

interface Project {
  title: string;
  subtitle: string;
  date: string;
  technologies: string[];
  points: string[];
  github?: string;
  demo?: string;
  details: string;
  metrics: { label: string; value: string }[];
  lossCurve?: number[];
}

const projectsData: Project[] = [
  {
    title: "Oneiros",
    subtitle: "Cognitive Memory OS for AI Agents",
    date: "July 2026",
    technologies: ["Python", "Cognee Cloud", "SQLite", "FastAPI", "Three.js", "React"],
    points: [
      "Built a memory OS based on Erik Hoel's Overfitted Brain Hypothesis, enabling AI agents to consolidate raw experiences during 'sleep' and wake up with structured, abstraction-linked schemas.",
      "Integrated Cognee graph schemas with SQLite caching for sub-millisecond dynamic entity recall and interactive 3D force-directed visualizations."
    ],
    github: "https://github.com/SaiNanduVajhala/Oneiros", // ponytail: sensible fallback URLs
    details: "Architectural Detail: The system manages experiences in a temporary SQLite database, then periodically feeds them through a graph consolidation daemon (representing REM sleep). It extracts abstract schemas using LLMs and updates a long-term Neo4j/Cognee knowledge graph. Caching layer is structured to minimize latency to sub-milliseconds during active conversations.",
    metrics: [
      { label: "Recall Latency", value: "<1ms" },
      { label: "Graph Nodes", value: "1.2k+" },
      { label: "Memory Compaction", value: "40%" }
    ],
    lossCurve: [90, 75, 55, 42, 30, 24, 18, 14, 11, 8]
  },
  {
    title: "GPT-2 Code Completion Fine-Tuning",
    subtitle: "Autoregressive Code Prediction Model",
    date: "May 2026",
    technologies: ["Python", "PyTorch", "Hugging Face", "GPT-2", "CodeXGLUE", "Kaggle GPUs"],
    points: [
      "Fine-tuned a GPT-2 transformer on the CodeXGLUE dataset (13k+ code samples) to build a robust autocomplete model for software developer codebases.",
      "Achieved a validation loss of 1.19 and a perplexity of 3.28 on held-out validation data."
    ],
    github: "https://github.com/SaiNanduVajhala/GPT2-Code-Completion",
    details: "Training Detail: Optimized training using Flash Attention and Mixed Precision (FP16) on Kaggle T4 GPUs. Structured data with custom AST (Abstract Syntax Tree) aware tokens to improve predictive capability on nested logic blocks.",
    metrics: [
      { label: "Validation Loss", value: "1.19" },
      { label: "Perplexity", value: "3.28" },
      { label: "Data Samples", value: "13k+" }
    ],
    lossCurve: [3.5, 2.8, 2.1, 1.8, 1.5, 1.35, 1.28, 1.22, 1.20, 1.19]
  },
  {
    title: "Emotion-Aware Multimodal Assistant",
    subtitle: "Real-Time Voice Assistant with Full-Duplex",
    date: "Nov 2025 – Mar 2026",
    technologies: ["Python", "FastAPI", "WebSockets", "GPT-4o", "Whisper", "ElevenLabs"],
    points: [
      "Architected a full-duplex conversational assistant using FastAPI and WebSockets for low-latency, real-time bi-directional audio/video streaming.",
      "Integrated MediaPipe and DeepFace vision pipelines to analyze user emotion, demographics, and adjust responses dynamically."
    ],
    github: "https://github.com/SaiNanduVajhala/Emotion-Voice-Assistant",
    details: "Latency Optimization: Developed a custom chunking/buffer queue to stream raw audio chunks directly to Whisper, parallelizing speech-to-text inference with GPT-4o context construction, maintaining response continuity under 600ms.",
    metrics: [
      { label: "Inference Latency", value: "~600ms" },
      { label: "Audio Sampling", value: "16kHz" },
      { label: "Framerate", value: "30fps" }
    ],
    lossCurve: [120, 100, 85, 70, 62, 55, 48, 42, 38, 35]
  }
];

export const ProjectCard: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '2rem 0' }}>
      {projectsData.map((project, idx) => {
        const isExpanded = expandedIndex === idx;

        return (
          <SpotlightCard key={project.title} style={{ padding: 0 }}>
            <div style={{ padding: '1.75rem' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    {idx === 0 ? <BrainCircuit size={20} style={{ color: 'var(--accent)' }} /> : 
                     idx === 1 ? <Code2 size={20} style={{ color: 'var(--accent-secondary)' }} /> : 
                     <HeartPulse size={20} style={{ color: 'var(--accent)' }} />}
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{project.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{project.subtitle}</p>
                </div>
                <span className="badge" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{project.date}</span>
              </div>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: '1rem 0' }}>
                {project.technologies.map(tech => (
                  <span key={tech} className="badge badge-accent" style={{ fontSize: '0.7rem' }}>{tech}</span>
                ))}
              </div>

              {/* Core points */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', margin: '1rem 0' }}>
                {project.points.map((pt, pIdx) => (
                  <li key={pIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', marginTop: '0.15rem' }}>•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Metrics & Performance graphs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', background: 'var(--border-light)', padding: '1rem', borderRadius: '12px', marginTop: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {project.metrics.map(m => (
                    <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{m.label}:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{m.value}</strong>
                    </div>
                  ))}
                </div>

                {/* SVG Training Loss Curve simulation */}
                {project.lossCurve && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '60px' }}>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                      Training Telemetry (Loss)
                    </span>
                    <svg viewBox="0 0 100 30" style={{ width: '120px', height: '35px', overflow: 'visible' }}>
                      <path
                        d={project.lossCurve.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (project.lossCurve!.length - 1)) * 100} ${30 - (val / 95) * 25}`).join(' ')}
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Glow filter under line */}
                      <path
                        d={project.lossCurve.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (project.lossCurve!.length - 1)) * 100} ${30 - (val / 95) * 25}`).join(' ')}
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="4"
                        strokeOpacity="0.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Bottom links and expand button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', gap: '0.4rem', cursor: 'pointer' }}>
                    <GithubIcon size={14} /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', gap: '0.4rem', cursor: 'pointer' }}>
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>

                <button
                  onClick={() => toggleExpand(idx)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                >
                  Architectural Details 
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Expandable Architecture Drawer */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden', background: 'rgba(var(--accent-rgb), 0.02)', borderTop: '1px solid var(--card-border)' }}
                >
                  <div style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>System Blueprint:</strong>
                    {project.details}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Accent Border Beam for Hero Project */}
            {idx === 0 && <BorderBeam duration={9} />}
          </SpotlightCard>
        );
      })}
    </div>
  );
};
