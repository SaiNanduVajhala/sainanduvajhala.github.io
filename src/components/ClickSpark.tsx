import React, { useEffect, useRef } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkCount?: number;
  sparkSpeed?: number;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = 'var(--accent)',
  sparkSize = 12,
  sparkCount = 8,
  sparkSpeed = 2.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }

    let sparks: Spark[] = [];
    let animationFrameId: number | null = null;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        
        spark.vx *= 0.94;
        spark.vy *= 0.94;
        spark.alpha -= 0.035;

        if (spark.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(spark.x, spark.y);
        ctx.lineTo(spark.x - spark.vx * 2.2, spark.y - spark.vy * 2.2);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = spark.size * 0.15;
        ctx.lineCap = 'round';
        ctx.globalAlpha = Math.max(0, spark.alpha);
        ctx.stroke();
        ctx.restore();
      }

      // ON-DEMAND: Only request next frame if sparks exist!
      if (sparks.length > 0) {
        animationFrameId = requestAnimationFrame(updateAndDraw);
      } else {
        animationFrameId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Ignore taps on navigation buttons or hamburger to prevent spark overhead during navbar animation
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.navbar, .nav-btn, .card-nav-item, button, a')) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * sparkSpeed + 1.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          size: Math.random() * 3 + sparkSize - 4
        });
      }

      // Start loop on-demand if it's currently idle
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateAndDraw);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [sparkColor, sparkSize, sparkCount, sparkSpeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
};
