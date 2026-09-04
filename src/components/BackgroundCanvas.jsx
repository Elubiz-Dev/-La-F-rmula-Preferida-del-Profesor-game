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

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Partículas enriquecidas: Runas de Euler, números del libro y flores de cerezo (Sakura)
    const symbols = [
      'e^{iπ}+1=0', '28', '220', '284', '√-1', 'π', 'e', '∞', 
      '24!', '∫', 'Σ', 'N', '17', 'Root', '1975', '80 min', '愛'
    ];
    
    const particles = [];
    const numParticles = 48;

    for (let i = 0; i < numParticles; i++) {
      const isPetal = Math.random() > 0.65;
      const isFormula = !isPetal && Math.random() > 0.6;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: isPetal ? (Math.random() * 0.4 + 0.2) : (Math.random() - 0.5) * 0.35 - 0.15,
        symbol: isFormula ? 'e^{iπ}+1=0' : symbols[Math.floor(Math.random() * symbols.length)],
        size: isPetal ? (Math.random() * 10 + 8) : (Math.random() * 16 + 12),
        opacity: Math.random() * 0.18 + 0.05,
        targetOpacity: Math.random() * 0.25 + 0.05,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        isPetal,
        color: isPetal 
          ? 'rgba(251, 207, 232,' 
          : isFormula 
            ? 'rgba(251, 191, 36,' 
            : 'rgba(226, 232, 240,'
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // 1. Orbes de luz ambiental de fondo (glows suaves)
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time * 0.5) * 60,
        height * 0.25 + Math.cos(time * 0.4) * 40,
        10,
        width * 0.2,
        height * 0.25,
        width * 0.45
      );
      grad1.addColorStop(0, 'rgba(16, 185, 129, 0.07)');
      grad1.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.85 + Math.cos(time * 0.3) * 50,
        height * 0.75 + Math.sin(time * 0.6) * 50,
        10,
        width * 0.85,
        height * 0.75,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
      grad2.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Halo de ratón interactivo (Spotlight sutil)
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        mouseGlow.addColorStop(0, 'rgba(52, 211, 153, 0.06)');
        mouseGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.02)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Render de partículas
      particles.forEach((p) => {
        p.swayPhase += p.swaySpeed;
        p.x += p.speedX + (p.isPetal ? Math.sin(p.swayPhase) * 0.5 : 0);
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        // Reposicionar si sale de los bordes
        if (p.x < -60) p.x = width + 60;
        if (p.x > width + 60) p.x = -60;
        if (p.y < -60) p.y = height + 60;
        if (p.y > height + 60) p.y = -60;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isPetal) {
          // Pétalo de cerezo (Sakura) con gradiente suave
          ctx.fillStyle = `${p.color} ${p.opacity * 1.6})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.7, p.size * 0.35, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Tiza matemática flotante
          ctx.fillStyle = `${p.color} ${p.opacity})`;
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
