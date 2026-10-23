import Planet from './Planet.jsx';
import OrbitLines from './OrbitLines.jsx';
import StarField from './StarField.jsx';

// Composition visuelle d'un projet : vraie capture si fournie, sinon planète provisoire
// clairement signalée (« Visuel provisoire »).
const PLANET_PROPS = {
  sun: { variant: 'sun', ring: false },
  teal: { variant: 'teal', ring: false },
  ringed: { variant: 'moon', ring: true },
  blue: { variant: 'blue', ring: false },
};

const ORBIT_COLORS = { sun: '#FF6B1A', teal: '#16C7D9', ringed: '#4D8DFF', blue: '#4D8DFF' };

export default function ProjectVisual({ project }) {
  const { image, planet = 'sun', name } = project;

  if (image && image.src) {
    return (
      <div className="relative h-full min-h-[16rem] w-full overflow-hidden rounded-2xl">
        <img src={image.src} alt={image.alt || `Capture du projet ${name}`} loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }

  const props = PLANET_PROPS[planet] || PLANET_PROPS.sun;

  return (
    <div className="relative flex h-full min-h-[16rem] w-full items-center justify-center overflow-hidden rounded-2xl bg-void/70">
      <StarField seed={planet.length * 13 + 5} density={0.7} />
      <OrbitLines className="left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-70" color={ORBIT_COLORS[planet] || '#4D8DFF'} count={3} />
      {/* data-parallax (GSAP) et le zoom au survol (CSS) sont sur deux éléments distincts pour éviter tout conflit de transform */}
      <div data-parallax="18" className="relative">
        <div className="transition-transform duration-700 group-hover:scale-110">
          <Planet variant={props.variant} ring={props.ring} size="clamp(7rem, 22vw, 11rem)" className="float-y" />
        </div>
      </div>
      {project.visualIsPlaceholder && (
        <span className="absolute bottom-3 left-3 rounded-full border border-mist/20 bg-night/80 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist/70">
          Visuel provisoire
        </span>
      )}
    </div>
  );
}
