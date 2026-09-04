import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Partículas de símbolos matemáticos, polvo de tiza y pétalos de sakura
    const symbols = ['e', 'i', 'π', '√', 'Σ', '28', '220', '284', '0', '1', '∞', '∫', '24!'];
    const particles = [];
    const numParticles = 40;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.2, // ligera tendencia a flotar
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.random() * 16 + 12,
        opacity: Math.random() * 0.15 + 0.04,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        isPetal: Math.random() > 0.7
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isPetal) {
          // Dibujar sutil pétalo de cerezo (Sakura)
          ctx.fillStyle = `rgba(251, 207, 232, ${p.opacity * 1.5})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size * 0.3, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Dibujar símbolo matemático con estilo tiza
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.font = `${p.size}px 'Caveat', cursive, serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.symbol, 0, 0);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
