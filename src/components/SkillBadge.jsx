import { useState } from 'react';

const ACCENTS = {
  volt: { dot: 'bg-volt', ring: 'hover:border-volt/70 focus-visible:border-volt' },
  sun: { dot: 'bg-sun', ring: 'hover:border-sun/70 focus-visible:border-sun' },
  ion: { dot: 'bg-ion', ring: 'hover:border-ion/70 focus-visible:border-ion' },
};

// Le survol d'un badge soulève la touche correspondante du clavier 3D (écouté par three/world.js).
const highlight = (name) => window.dispatchEvent(new CustomEvent('world:skill', { detail: name }));

/**
 * Badge de technologie : léger agrandissement, éclat au survol/focus et courte description.
 * Sur écran tactile, un appui affiche / masque la description.
 */
export default function SkillBadge({ name, description, color = 'volt' }) {
  const [open, setOpen] = useState(false);
  const accent = ACCENTS[color] || ACCENTS.volt;

  return (
    <div
      className="group relative"
      onMouseEnter={() => highlight(name)}
      onMouseLeave={() => highlight(null)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onFocus={() => highlight(name)}
        onBlur={() => {
          setOpen(false);
          highlight(null);
        }}
        className={`flex items-center gap-2 rounded-full border border-mist/15 bg-ash/60 px-4 py-2 text-sm font-medium text-mist transition-all duration-300 hover:scale-105 hover:brightness-125 focus-visible:scale-105 ${accent.ring}`}
      >
        <span className={`h-2 w-2 rounded-full ${accent.dot}`} aria-hidden="true" />
        {name}
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-48 -translate-x-1/2 rounded-xl border border-mist/15 bg-void/95 px-3 py-2 text-center text-xs leading-snug text-mist/90 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0'
        }`}
      >
        {description}
      </span>
    </div>
  );
}
