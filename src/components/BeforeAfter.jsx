import { useState } from 'react';

/** Comparateur avant / après pour les retouches photo (curseur accessible au clavier). */
export default function BeforeAfter({ before, after, alt }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative select-none overflow-hidden rounded-2xl bg-black">
      <img src={after} alt={`${alt} — après retouche`} className="block max-h-[70vh] w-full object-contain" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={before} alt={`${alt} — avant retouche`} className="h-full w-full object-contain" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-snow shadow-[0_0_12px_rgba(0,0,0,0.6)]" style={{ left: `${position}%` }} />
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-void/80 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-mist">
        Avant
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-void/80 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-mist">
        Après
      </span>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Comparer l’image avant et après retouche"
        className="absolute inset-x-0 bottom-4 mx-auto w-2/3 accent-[#FF6B1A]"
      />
    </div>
  );
}
