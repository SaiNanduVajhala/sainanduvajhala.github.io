import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    github: "https://github.com/SaiNanduVajhala/GPT2-Code-Completion",
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
    github: "https://github.com/SaiNanduVajhala/Emotion-Voice-Assistant",
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

// Inline SVG arrow icons
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: 'transform 0.25s ease',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const Carousel: React.FC = () => {
  const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const slideProject = (newDirection: number) => {
    let nextIndex = currentIndex + newDirection;
    if (nextIndex >= projectsData.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = projectsData.length - 1;
    setPage([nextIndex, newDirection]);
    setIsDetailOpen(false);
  };

  const project = projectsData[currentIndex];

  return (
    <div style={{ margin: '2rem 0' }}>
      {/* ── Top: Project Selector Bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '380px',
        margin: '0 auto 1.25rem'
      }}>
        <button
          onClick={() => slideProject(-1)}
          className="btn btn-secondary"
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            cursor: 'pointer',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            flexShrink: 0
          }}
          aria-label="Previous project"
        >
          <ChevronLeftIcon />
        </button>

        <div style={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          margin: '0 0.75rem',
          minWidth: 0
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                textAlign: 'center',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(8px)'
              }}
            >
              {project.title}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => slideProject(1)}
          className="btn btn-secondary"
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            cursor: 'pointer',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            flexShrink: 0
          }}
          aria-label="Next project"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Dots indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
        {projectsData.map((_, i) => (
          <div
            key={i}
            onClick={() => { setPage([i, i > currentIndex ? 1 : -1]); setIsDetailOpen(false); }}
            style={{
              width: i === currentIndex ? '1.5rem' : '0.4rem',
              height: '0.4rem',
              borderRadius: '9999px',
              background: i === currentIndex ? 'var(--accent)' : 'var(--border-light)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* ── Bottom: Project Description Card ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard style={{ padding: 0 }}>
            <div style={{ padding: '1.75rem' }}>
              {/* Subtitle + Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
                  {project.subtitle}
                </p>
                <span className="badge" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  {project.date}
                </span>
              </div>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                {project.technologies.map(tech => (
                  <span key={tech} className="badge badge-accent" style={{ fontSize: '0.7rem' }}>{tech}</span>
                ))}
              </div>

              {/* Core points */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                {project.points.map((pt, pIdx) => (
                  <li key={pIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', marginTop: '0.15rem', flexShrink: 0 }}>•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Metrics row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1rem',
                background: 'var(--border-light)',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1rem'
              }}>
                {project.metrics.map(m => (
                  <div key={m.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.15rem' }}>
                      {m.label}
                    </div>
                  </div>
                ))}

                {/* Mini loss curve */}
                {project.lossCurve && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
                      Telemetry
                    </span>
                    <svg viewBox="0 0 100 30" style={{ width: '80px', height: '28px' }}>
                      <path
                        d={project.lossCurve.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (project.lossCurve!.length - 1)) * 100} ${30 - (val / 95) * 25}`).join(' ')}
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* ── Detailed Description Dropdown ── */}
              <div style={{
                border: '1px solid var(--card-border)',
                borderRadius: '10px',
                marginBottom: '1rem',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setIsDetailOpen(!isDetailOpen)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  <span>Detailed Architecture & Implementation</span>
                  <ChevronDownIcon isOpen={isDetailOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isDetailOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 1rem 1rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                        borderTop: '1px solid var(--card-border)'
                      }}>
                        {project.details.map((detail, dIdx) => (
                          <p key={dIdx} style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.82rem',
                            lineHeight: '1.55',
                            margin: dIdx === 0 ? '0.75rem 0 0 0' : 0
                          }}>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* GitHub link */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    textDecoration: 'none',
                    padding: '0.4rem 0.8rem',
                    border: '1px solid var(--card-border)',
                    borderRadius: '8px',
                    transition: 'border-color 0.2s ease, color 0.2s ease'
                  }}
                >
                  <GithubIcon size={14} />
                  View Source
                </a>
              )}
            </div>
            <BorderBeam size={180} duration={14} />
          </SpotlightCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
