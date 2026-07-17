import React from 'react';

interface BorderBeamProps {
  size?: number; // length of the beam segment
  duration?: number; // duration of animation in seconds
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  size = 150,
  duration = 6,
  colorFrom = 'var(--accent)',
  colorTo = 'var(--accent-secondary)'
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        borderRadius: 'inherit',
        zIndex: 0
      }}
    >
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          borderRadius: 'inherit'
        }}
      >
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity={0} />
            <stop offset="50%" stopColor={colorFrom} stopOpacity={1} />
            <stop offset="100%" stopColor={colorTo} stopOpacity={0} />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          rx="16"
          fill="none"
          stroke="url(#beam-grad)"
          strokeWidth="2"
          style={{
            strokeDasharray: `${size} 800`,
            animation: `border-beam-anim ${duration}s linear infinite`
          }}
        />
      </svg>
      <style>{`
        @keyframes border-beam-anim {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -950;
          }
        }
      `}</style>
    </div>
  );
};
