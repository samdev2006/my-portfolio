import { useEffect, useRef } from 'react';

// Générateur pseudo-aléatoire déterministe : le champ d'étoiles reste identique à chaque rendu.
function mulberry32(seed) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLORS = ['#F5F7FA', '#D8DDE3'];
const ACCENTS = ['#FF6B1A', '#4D8DFF', '#16C7D9'];

/**
 * Étoiles générées dynamiquement sur un <canvas> (dessin statique, redessiné au resize).
 * Aucune boucle d'animation : le scintillement est géré en CSS (classe .twinkle).
 */
export default function StarField({ density = 1, seed = 7, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas && canvas.parentElement;
    if (!canvas || !parent) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let raf = 0;

    const draw = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const rand = mulberry32(seed);
      const count = Math.min(Math.round(((w * h) / 9000) * density), 380);

      for (let i = 0; i < count; i += 1) {
        const x = rand() * w;
        const y = rand() * h;
        const sizeRoll = rand();
        const radius = sizeRoll > 0.94 ? 1.7 : sizeRoll > 0.65 ? 1.1 : 0.7;
        const accent = rand() > 0.94;
        ctx.globalAlpha = 0.35 + rand() * 0.6;
        ctx.fillStyle = accent
          ? ACCENTS[Math.floor(rand() * ACCENTS.length)]
          : COLORS[Math.floor(rand() * COLORS.length)];
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    draw();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    observer.observe(parent);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [density, seed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
