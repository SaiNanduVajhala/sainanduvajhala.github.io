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
  sparkCount = 10,
  sparkSpeed = 2.8
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
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handlePointerDown = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      for (let i = 0; i < sparkCount; i++) {
        // Generate sparks in a random-angled circle
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
    };

    window.addEventListener('pointerdown', handlePointerDown);

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        
        // ponytail: slow deceleration and gradual alpha fadeout
        spark.vx *= 0.95;
        spark.vy *= 0.95;
        spark.alpha -= 0.025;

        if (spark.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(spark.x, spark.y);
        // Draw path connecting current position with fainted trace
        ctx.lineTo(spark.x - spark.vx * 2.5, spark.y - spark.vy * 2.5);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = spark.size * 0.15;
        ctx.lineCap = 'round';
        ctx.globalAlpha = spark.alpha;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
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
        zIndex: 9999, // Render on top of page content to display sparks over elements
        pointerEvents: 'none' // Direct clicks through the canvas overlay
      }}
    />
  );
};
export default ClickSpark;
