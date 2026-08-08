import React, { useState, memo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import { BorderBeam } from './BorderBeam';
import { GithubIcon } from './Icons';

interface Project {
  title: string;
  subtitle: string;
  date: string;
  technologies: string[];
  points: string[];
  github?: string;
  details: string[];
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
    github: "https://github.com/SaiNanduVajhala/oneiros",
    details: [
      "Three-Tier Memory Architecture: Working Memory (in-RAM 20-turn history with zero-latency contradiction detection), Long-Term Memory (Cognee Cloud semantic vector recall as the single source of truth), and Infrastructure Caching (SQLite isolated for offline visualization layout caching and UI sidebar).",
      "Sleep Stage Pipeline: N1 Replay (weighted exponential activation decay), N2 Consolidation (DBSCAN semantic clustering via scikit-learn), N3 Pruning (auto-merge at ≥0.995 similarity, LLM validator at ≥0.90, contradiction prune), and REM Abstraction (concept node creation and cross-cluster latent linking).",
      "Cognitive Dream Gate skips the sleep cycle automatically when fewer than 3 real episodic memories exist. MemoryLifecycleEngine uses dynamic Retention Scores (importance, age decay, access count, status penalties) to drive state transitions: ACTIVE → INACTIVE → ARCHIVED → FORGOTTEN.",
      "Developer Console Page at #/debug with 15 diagnostic sections, testing utilities, self-tests, and real-time backend log streaming. WebGL Synaptic Shader Background and Three.js 3D/2D graph viewport with per-node delete and Clear All functionality."
    ],
    metrics: [
      { label: "Recall Latency", value: "<1ms" },
      { label: "Graph Nodes", value: "1.2k+" },
      { label: "Memory Compaction", value: "40%" }
    ],
    lossCurve: [90, 75, 55, 42, 30, 24, 18, 14, 11, 8]
  },
  {
    title: "GPT-2 Code Completion",
    subtitle: "Autoregressive Code Prediction Model",
    date: "May 2026",
    technologies: ["Python", "PyTorch", "Hugging Face", "GPT-2", "CodeXGLUE", "Kaggle GPUs"],
    points: [
      "Fine-tuned a GPT-2 transformer on the CodeXGLUE dataset (13k+ code samples) to build a robust autocomplete model for software developer codebases.",
      "Achieved a validation loss of 1.19 and a perplexity of 3.28 on held-out validation data."
    ],
    github: "https://github.com/SaiNanduVajhala/code-completion-gpt2",
    details: [
      "Optimized training using Flash Attention and Mixed Precision (FP16) on Kaggle T4 GPUs, reducing training time by ~40% while maintaining numerical stability.",
      "Structured data with custom AST (Abstract Syntax Tree) aware tokens to improve predictive capability on nested logic blocks. Tokenizer was extended with code-specific special tokens for indentation, brackets, and scope delimiters.",
      "Evaluation pipeline included BLEU-4 scoring on code completions, exact-match accuracy on function signatures, and human-evaluated naturalness scoring on 200 randomly sampled completions."
    ],
    metrics: [
      { label: "Validation Loss", value: "1.19" },
      { label: "Perplexity", value: "3.28" },
      { label: "Data Samples", value: "13k+" }
    ],
    lossCurve: [3.5, 2.8, 2.1, 1.8, 1.5, 1.35, 1.28, 1.22, 1.20, 1.19]
  },
  {
    title: "Emotion-Aware Assistant",
    subtitle: "Real-Time Voice Assistant with Full-Duplex",
    date: "Nov 2025 – Mar 2026",
    technologies: ["Python", "FastAPI", "WebSockets", "GPT-4o", "Whisper", "ElevenLabs"],
    points: [
      "Architected a full-duplex conversational assistant using FastAPI and WebSockets for low-latency, real-time bi-directional audio/video streaming.",
      "Integrated MediaPipe and DeepFace vision pipelines to analyze user emotion, demographics, and adjust responses dynamically."
    ],
    github: "https://github.com/SaiNanduVajhala/Voice_Model_with_full_duplex",
    details: [
      "Developed a custom chunking/buffer queue to stream raw audio chunks directly to Whisper, parallelizing speech-to-text inference with GPT-4o context construction, maintaining response continuity under 600ms end-to-end latency.",
      "MediaPipe face mesh provides 468-point landmark detection at 30fps. DeepFace pipeline classifies 7 emotion categories (angry, disgust, fear, happy, sad, surprise, neutral) in real-time, feeding emotional context into the GPT-4o system prompt.",
      "ElevenLabs TTS integration with voice cloning and streaming audio output via WebSocket binary frames. Supports interrupt detection to stop TTS playback mid-sentence when the user starts speaking."
    ],
    metrics: [
      { label: "Inference Latency", value: "~600ms" },
      { label: "Audio Sampling", value: "16kHz" },
      { label: "Framerate", value: "30fps" }
    ],
    lossCurve: [120, 100, 85, 70, 62, 55, 48, 42, 38, 35]
  },
  {
    title: "Sales Forecasting Engine",
    subtitle: "End-to-End Demand Intelligence System",
    date: "July 2026",
    technologies: ["Python", "SARIMA", "Prophet", "XGBoost", "Streamlit", "scikit-learn"],
    points: [
      "Built an end-to-end sales forecasting and demand intelligence system to predict future product demand, identify anomalies in weekly sales, and segment product sub-categories for inventory optimization.",
      "Compared SARIMA vs. Prophet vs. XGBoost forecasting models across multiple retail segments (Furniture, Technology, Office Supplies) with ADF stationarity testing and time series decomposition."
    ],
    github: "https://github.com/SaiNanduVajhala/sales-forecasting-demand-intelligence",
    details: [
      "Utilized the Superstore Sales Dataset (4 years of daily transactional data) merged with a supplementary Video Game Sales Dataset to demonstrate multi-source data merging and cross-domain analysis capabilities.",
      "Task pipeline: Data Loading & Deep Exploration → Time Series Decomposition (ADF Stationarity Test) → Forecasting Model Comparison (SARIMA vs. Prophet vs. XGBoost) → Segment-Level Forecasting → Anomaly Detection (Isolation Forest vs. Z-Score) → Product Demand Segmentation (K-Means Clustering & PCA).",
      "Deployed an interactive Streamlit dashboard with real-time forecast visualization, anomaly highlighting, and cluster exploration. Produced a professionally styled 2-page executive strategy brief addressed to the CFO and Head of Supply Chain."
    ],
    metrics: [
      { label: "Forecast Models", value: "3" },
      { label: "Data Span", value: "4 Years" },
      { label: "Segments", value: "5" }
    ],
    lossCurve: [85, 72, 60, 50, 42, 36, 30, 25, 22, 20]
  },
  {
    title: "CrewAI Trading Agent",
    subtitle: "Multi-Agent Financial Intelligence Pipeline",
    date: "Sep 2025",
    technologies: ["Python", "CrewAI", "SerperDev", "Telegram API", "Yahoo Finance", "LangChain"],
    points: [
      "Built a multi-agent Python system using CrewAI framework that automatically generates daily US financial market summaries with specialized agents for data collection, analysis, and delivery.",
      "Produces bilingual summaries (Hindi and Hebrew) with embedded financial charts from Yahoo Finance, dispatched directly to a Telegram channel."
    ],
    github: "https://github.com/SaiNanduVajhala/CrewAI-Trading-Agent",
    details: [
      "5 specialized agents collaborate sequentially: Financial News Search Agent (SerperDevTool for top 3 market-moving headlines from S&P 500, Nasdaq), Financial Market Summary Agent (≤500 word distillation with KPIs and index volatility), Content Formatting Agent (chart download + base64 markdown embedding), Multilingual Translation Agent (Hindi + Hebrew with preserved formatting), and Telegram Integration Agent (text chunking + photo attachment dispatch).",
      "Custom tools built natively: Download Financial Chart Image (Yahoo Finance chart retrieval for ^GSPC, ^IXIC), Embed Image in Markdown (base64 data URI conversion), and Send Telegram Message with Images (text chunk parsing + decoded photo upload).",
      "Implements CrewAI Flow with guardrails for error handling, proper logging, and clean agent architecture. Each agent produces an intermediate artifact (01_search.md → 02_summary.md → 03_format.md → 04_translate.md → 05_send.md) for full traceability."
    ],
    metrics: [
      { label: "Agents", value: "5" },
      { label: "Languages", value: "3" },
      { label: "Indices Tracked", value: "2" }
    ],
    lossCurve: [100, 88, 72, 58, 45, 38, 30, 26, 22, 18]
  }
];

interface ProjectCardItemProps {
  project: Project;
  idx: number;
  isActive: boolean;
  onOpenSpec: () => void;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({ project, idx, isActive, onOpenSpec }) => {
  return (
    <div style={{ width: 'clamp(340px, 86vw, 660px)', flexShrink: 0 }}>
      <SpotlightCard style={{ padding: 0, height: '100%' }}>
        <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            {/* Header Row: Subtitle + Date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', margin: 0 }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, margin: '0.25rem 0 0 0' }}>
                  {project.subtitle}
                </p>
              </div>
              <span className="badge" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                {project.date}
              </span>
            </div>

            {/* Technologies */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.1rem' }}>
              {project.technologies.map(tech => (
                <span key={tech} className="badge badge-accent" style={{ fontSize: '0.72rem' }}>{tech}</span>
              ))}
            </div>

            {/* Core points */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.55', margin: '0 0 1.1rem 0', padding: 0 }}>
              {project.points.map((pt, pIdx) => (
                <li key={pIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', marginTop: '0.15rem', flexShrink: 0 }}>•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Trigger Button for Glass Architecture Spec Modal */}
            <button
              onClick={onOpenSpec}
              type="button"
              aria-label={`View detailed architecture for ${project.title}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.9rem',
                background: 'rgba(var(--accent-rgb), 0.08)',
                border: '1px solid rgba(var(--accent-rgb), 0.22)',
                borderRadius: '8px',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '1rem',
                transition: 'all 0.2s ease'
              }}
            >
              <span>View Architecture Specs →</span>
            </button>
          </div>

          {/* Footer Controls / GitHub Link */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none',
                  padding: '0.4rem 0.85rem',
                  border: '1px solid var(--card-border)',
                  borderRadius: '8px',
                  transition: 'border-color 0.2s ease, color 0.2s ease'
                }}
              >
                <GithubIcon size={14} />
                View Source
              </a>
            )}
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              0{idx + 1} / 0{projectsData.length}
            </span>
          </div>
        </div>

        {isActive && <BorderBeam size={220} duration={12} />}
      </SpotlightCard>
    </div>
  );
};

export const Carousel: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<{ project: Project; idx: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      projectsData.length - 1,
      Math.max(0, Math.round(latest * (projectsData.length - 1)))
    );
    setActiveIdx(index);
  });

  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        // Calculate exact horizontal distance to reveal the 5th project card completely
        const totalTrackWidth = trackRef.current.scrollWidth;
        const visibleWidth = trackRef.current.clientWidth || window.innerWidth;
        const maxScroll = totalTrackWidth - visibleWidth + 150;
        setScrollRange(Math.max(0, maxScroll));
      }
    };

    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '180vh', margin: '0 0 1.5rem 0' }}>
      <div style={{
        position: 'sticky',
        top: '75px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '1.25rem',
        paddingBottom: '2.5rem',
        overflow: 'hidden'
      }}>
        {/* Section Header */}
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            .systems()
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 500, lineHeight: '1.55', margin: 0 }}>
            Production-grade AI architectures, cognitive agent memory systems, and low-latency audio pipelines.
          </p>
        </div>

        {/* Dynamic Scroll-Driven Horizontal Slide Track */}
        <motion.div
          ref={trackRef}
          style={{
            x,
            display: 'flex',
            gap: '1.25rem',
            paddingLeft: '0.2rem',
            willChange: 'transform'
          }}
        >
          {projectsData.map((project, idx) => (
            <ProjectCardItem
              key={project.title}
              project={project}
              idx={idx}
              isActive={activeIdx === idx}
              onOpenSpec={() => setActiveModalProject({ project, idx })}
            />
          ))}
        </motion.div>
      </div>

      {/* Global Root Portal Architecture Spec Modal Overlay */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeModalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 99999,
                background: 'rgba(0, 0, 0, 0.72)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '680px',
                  maxHeight: '85vh',
                  background: 'var(--background)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '20px',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Modal Header */}
                <div style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid var(--card-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--card-bg)'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                      <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>Architecture Spec</span>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>0{activeModalProject.idx + 1} / 0{projectsData.length}</span>
                    </div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{activeModalProject.project.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveModalProject(null)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--card-border)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'var(--text-primary)'
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', margin: '0 0 0.4rem 0', textTransform: 'uppercase' }}>
                      System Overview
                    </h4>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                      {activeModalProject.project.subtitle}
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', margin: '0 0 0.6rem 0', textTransform: 'uppercase' }}>
                      Tech Stack & Engine Dependencies
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {activeModalProject.project.technologies.map(tech => (
                        <span key={tech} className="badge badge-accent" style={{ fontSize: '0.75rem' }}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', margin: '0 0 0.6rem 0', textTransform: 'uppercase' }}>
                      Detailed Architectural Specs
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {activeModalProject.project.details.map((detail, dIdx) => (
                        <div key={dIdx} style={{ padding: '0.85rem 1rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '10px' }}>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
});

Carousel.displayName = 'Carousel';
