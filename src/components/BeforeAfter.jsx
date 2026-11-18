import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';

/** Comparateur avant / après pour les retouches photo (curseur utilisable au clavier). */
export default function BeforeAfter({ before, after, alt }) {
  const [position, setPosition] = useState(50);
  const { ui } = useLang();
  const tag = 'pointer-events-none absolute top-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-paper';

  return (
    <div className="relative max-w-5xl select-none overflow-hidden rounded-2xl bg-black">
      <img src={after} alt={`${alt} — ${ui.creations.afterAlt}`} className="block max-h-[72vh] w-full object-contain" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={before} alt={`${alt} — ${ui.creations.beforeAlt}`} className="h-full w-full object-contain" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper" style={{ left: `${position}%` }} />
      <span className={`${tag} left-3`}>{ui.creations.before}</span>
      <span className={`${tag} right-3`}>{ui.creations.after}</span>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={ui.creations.compare}
        className="absolute inset-x-0 bottom-4 mx-auto w-2/3 accent-[#FF6B1A]"
      />
    </div>
  );
}
