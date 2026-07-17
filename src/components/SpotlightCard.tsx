import React, { useRef, useState, useEffect } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  style
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={() => !isTouch && setIsHovered(false)}
      className={`glass-panel ${className}`}
      style={{
        ...style,
        position: 'relative'
      }}
    >
      {/* Border spotlight overlay - strictly desktop only to avoid WebKit mobile nested mask clipping */}
      {!isTouch && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            opacity: isHovered ? 1 : 0,
            border: '1px solid transparent',
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, var(--accent), transparent 60%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
            zIndex: 2,
            transition: 'opacity 0.4s ease'
          }}
        />
      )}
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 3, height: '100%' }}>
        {children}
      </div>
    </div>
  );
};
