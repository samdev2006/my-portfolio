import useGsap from '../hooks/useGsap.js';
import { gsap, standardSectionAnimations } from '../animations/gsapAnimations.js';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

// Constellations de la carte astronomique : un nom par domaine d'intérêt réel.
const STARS = [
  { x: 118, y: 120, label: 'Web', c: '#4D8DFF' },
  { x: 268, y: 92, label: 'Mobile', c: '#16C7D9' },
  { x: 304, y: 212, label: 'API REST', c: '#FF6B1A' },
  { x: 250, y: 316, label: 'Données', c: '#16C7D9' },
  { x: 120, y: 318, label: 'Création', c: '#FF6B1A' },
  { x: 68, y: 210, label: 'Fintech', c: '#4D8DFF' },
];

function StarMap() {
  const ticks = Array.from({ length: 36 });
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Carte astronomique stylisée de mes domaines d'intérêt : web, mobile, API REST, données, création visuelle et fintech" className="mx-auto w-full max-w-md">
      <g data-spin style={{ transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="186" fill="none" stroke="#D8DDE3" strokeOpacity="0.18" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#4D8DFF" strokeOpacity="0.28" strokeDasharray="3 7" />
        {ticks.map((_, i) => {
          const a = (i / ticks.length) * Math.PI * 2;
          const r1 = 186;
          const r2 = i % 3 === 0 ? 174 : 180;
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * r1}
              y1={200 + Math.sin(a) * r1}
              x2={200 + Math.cos(a) * r2}
              y2={200 + Math.sin(a) * r2}
              stroke="#D8DDE3"
              strokeOpacity="0.35"
            />
          );
        })}
      </g>
      <circle cx="200" cy="200" r="104" fill="none" stroke="#16C7D9" strokeOpacity="0.22" />
      <circle cx="200" cy="200" r="58" fill="none" stroke="#D8DDE3" strokeOpacity="0.15" />
      <line x1="14" y1="200" x2="386" y2="200" stroke="#D8DDE3" strokeOpacity="0.1" />
      <line x1="200" y1="14" x2="200" y2="386" stroke="#D8DDE3" strokeOpacity="0.1" />

      <polyline
        points={`${STARS.map((s) => `${s.x},${s.y}`).join(' ')} ${STARS[0].x},${STARS[0].y}`}
        fill="none"
        stroke="#F5F7FA"
        strokeOpacity="0.28"
        strokeDasharray="2 5"
      />
      {STARS.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="12" fill={s.c} fillOpacity="0.12" />
          <circle cx={s.x} cy={s.y} r="4.5" fill={s.c} />
          <text x={s.x + 12} y={s.y + 4} fill="#D8DDE3" fontSize="12" fontFamily="ui-monospace, monospace" letterSpacing="1.2">
            {s.label}
          </text>
        </g>
      ))}
      <circle cx="200" cy="200" r="9" fill="#FF6B1A" />
      <circle cx="200" cy="200" r="16" fill="none" stroke="#FF6B1A" strokeOpacity="0.5" />
    </svg>
  );
}

export default function About() {
  const { about } = profile;

  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    standardSectionAnimations(ref.current);
    // La carte tourne lentement au rythme du scroll.
    gsap.to('[data-spin]', {
      rotation: 70,
      ease: 'none',
      transformOrigin: '50% 50%',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  }, []);

  return (
    <div ref={ref}>
      <Section id="apropos" wave="a">
        <SectionHeading
          id="apropos"
          eyebrow="01 · À propos"
          title="Un développeur qui relie l’idée au produit."
          description={about.intro}
        />

        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} data-reveal className="text-base leading-relaxed text-mist/85 sm:text-lg">
                {paragraph}
              </p>
            ))}

            <dl data-reveal-stagger className="grid gap-3 pt-4 sm:grid-cols-3">
              {about.highlights.map((item) => (
                <div key={item.label} className="glass rounded-2xl p-4">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ion">{item.label}</dt>
                  <dd className="mt-2 font-display text-base font-semibold text-snow">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="relative">
            <StarMap />
          </div>
        </div>

        <ul data-reveal-stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value, index) => (
            <li key={value.title} className="glass rounded-2xl p-5">
              <span className="font-mono text-xs text-sun">0{index + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">{value.text}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
