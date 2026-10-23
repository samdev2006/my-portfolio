import { createContext, useContext, useMemo, useState } from 'react';
import Planet from './Planet.jsx';

// Partage l'état du monde 3D ('loading' | 'ready' | 'failed') avec les ancres des sections.
const WorldContext = createContext({ status: 'loading', setStatus: () => {} });

export function WorldProvider({ children }) {
  const [status, setStatus] = useState('loading');
  const value = useMemo(() => ({ status, setStatus }), [status]);
  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
}

export function useWorld() {
  return useContext(WorldContext);
}

const FALLBACKS = {
  hero: { variant: 'banded', ring: false },
  skills: { variant: 'dark', ring: true },
  contact: { variant: 'teal', ring: true },
};

/**
 * Zone réservée à un objet 3D. Le canvas fixe du monde dessine l'objet par-dessus cette zone.
 * Tant que la 3D n'est pas prête (ou si WebGL est indisponible), une planète CSS s'affiche à la place.
 */
export function WorldAnchor({ name, label, className = '' }) {
  const { status } = useWorld();
  const fallback = FALLBACKS[name] || FALLBACKS.hero;

  return (
    <div data-world-anchor={name} role="img" aria-label={label} className={className}>
      {status !== 'ready' && (
        <div className="flex h-full w-full items-center justify-center">
          <Planet variant={fallback.variant} ring={fallback.ring} size="min(55%, 16rem)" className="float-y aspect-square" />
        </div>
      )}
    </div>
  );
}
