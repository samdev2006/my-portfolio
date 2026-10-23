import useGsap from '../hooks/useGsap.js';
import { gsap, ScrollTrigger } from '../animations/gsapAnimations.js';
import StarField from './StarField.jsx';

// Reliefs organiques superposés, façon papier découpé (références : image spatiale fournie).
const RELIEFS = [
  { d: 'M0 150 C180 60 340 210 560 150 S940 40 1160 130 S1380 80 1440 110 L1440 1000 L0 1000Z', fill: '#0c1015' },
  { d: 'M0 350 C220 270 380 420 620 350 S1000 250 1220 350 S1400 320 1440 340 L1440 1000 L0 1000Z', fill: '#0e1318' },
  { d: 'M0 570 C260 480 420 650 700 570 S1060 460 1260 570 S1400 550 1440 560 L1440 1000 L0 1000Z', fill: '#11161c' },
  { d: 'M0 790 C300 710 460 870 760 800 S1120 710 1440 810 L1440 1000 L0 1000Z', fill: '#141a21' },
];

/**
 * Fond fixe de toute la page : noir profond, reliefs en parallaxe douce liée au scroll,
 * deux couches d'étoiles (l'une scintille en CSS) et halos de lumière discrets.
 */
export default function SpaceBackground() {
  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    gsap.utils.toArray('[data-bg-layer]').forEach((layer, i) => {
      gsap.to(layer, {
        yPercent: -(5 + i * 5),
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });
    // Recalcule les positions après le chargement des polices / images.
    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 overflow-hidden bg-void"
      style={{ height: '100lvh' }}
    >
      {/* Halos de lumière : orange solaire en haut à droite, bleu en bas à gauche */}
      <div
        className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-[0.10]"
        style={{ background: 'radial-gradient(circle, #FF6B1A, transparent 65%)' }}
      />
      <div
        className="absolute -bottom-48 -left-40 h-[36rem] w-[36rem] rounded-full opacity-[0.09]"
        style={{ background: 'radial-gradient(circle, #4D8DFF, transparent 65%)' }}
      />

      <StarField seed={3} density={1} />
      <StarField seed={11} density={0.3} className="twinkle" />

      {RELIEFS.map((relief, i) => (
        <svg
          key={relief.d}
          data-bg-layer
          viewBox="0 0 1440 1000"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-[125%] w-full"
        >
          <path d={relief.d} fill={relief.fill} stroke="rgba(216,221,227,0.06)" strokeWidth="1.5" />
          {i === RELIEFS.length - 1 &&
            [1, 2, 3, 4, 5].map((n) => (
              <path
                key={n}
                d={relief.d}
                transform={`translate(0 ${n * 26})`}
                fill="none"
                stroke="rgba(216,221,227,0.05)"
                strokeWidth="1"
              />
            ))}
        </svg>
      ))}

      {/* Vignette pour garder le texte lisible */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,10,13,0.75) 100%)' }}
      />
    </div>
  );
}
