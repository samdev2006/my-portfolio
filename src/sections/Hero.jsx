import { ArrowDown, ArrowRight, Rocket } from 'lucide-react';
import useGsap from '../hooks/useGsap.js';
import { gsap, isCoarsePointer, isSmallScreen } from '../animations/gsapAnimations.js';
import { profile } from '../data/profile.js';
import Button from '../components/Button.jsx';
import CvButton from '../components/CvButton.jsx';
import OrbitLines from '../components/OrbitLines.jsx';
import Planet from '../components/Planet.jsx';
import StarField from '../components/StarField.jsx';
import { WorldAnchor } from '../components/WorldContext.jsx';

export default function Hero({ ready }) {
  const ref = useGsap(
    ({ reduced }) => {
      if (!ready || reduced) return undefined;

      // Séquence d'introduction orchestrée : fond -> étoiles -> planètes -> titre -> texte -> boutons.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-bg]', { opacity: 0, duration: 1.2 }, 0)
        .from('[data-hero-stars]', { opacity: 0, duration: 1.4 }, 0.1)
        .from('[data-hero-orbit]', { opacity: 0, scale: 0.85, duration: 1.6 }, 0.2)
        .from('[data-hero-planet]', { opacity: 0, scale: 0.4, duration: 1.4, stagger: 0.18, ease: 'back.out(1.4)' }, 0.3)
        .from('[data-hero-badge]', { opacity: 0, y: 20, duration: 0.7 }, 0.5)
        .from('[data-hero-word]', { yPercent: 115, duration: 1, stagger: 0.12 }, 0.6)
        .from('[data-hero-role]', { opacity: 0, y: 24, duration: 0.8 }, 1.0)
        .from('[data-hero-tag]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.06 }, 1.1)
        .from('[data-hero-tagline]', { opacity: 0, y: 24, duration: 0.8 }, 1.15)
        .from('[data-hero-text]', { opacity: 0, y: 24, duration: 0.8 }, 1.3)
        .from('[data-hero-cta] > *', { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 1.45)
        .from('[data-hero-scroll]', { opacity: 0, duration: 0.8 }, 1.9);

      // Au scroll, la zone de la planète s'éloigne doucement : l'objet 3D suit sa position et sa taille.
      gsap.to('[data-hero-scene]', {
        yPercent: 12,
        scale: 0.92,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Parallaxe légère suivant le curseur : bureau uniquement, jamais sur écran tactile.
      if (isCoarsePointer() || isSmallScreen()) return undefined;
      const layers = gsap.utils.toArray('[data-depth]').map((el) => ({
        depth: parseFloat(el.dataset.depth),
        x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
      }));
      const onMove = (event) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        layers.forEach(({ depth, x, y }) => {
          x(nx * depth);
          y(ny * depth);
        });
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    },
    [ready]
  );

  const words = profile.displayName.split(' ');

  return (
    <section
      id="accueil"
      ref={ref}
      aria-labelledby="accueil-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24 lg:pt-16"
    >
      {/* Fond propre au Hero : relief + étoiles denses + lignes orbitales */}
      <div aria-hidden="true" data-hero-bg className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 78% 45%, rgba(77,141,255,0.10), transparent 70%), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(255,107,26,0.08), transparent 70%)',
          }}
        />
      </div>
      <div data-hero-stars aria-hidden="true" className="pointer-events-none absolute inset-0">
        <StarField seed={21} density={1.4} />
      </div>

      {/* Scène 3D : planète, lunes et orbites (Three.js). Positionnée au-dessus du texte sur mobile. */}
      <div
        data-hero-scene
        className="absolute inset-x-0 top-14 h-[44svh] lg:inset-y-0 lg:left-[38%] lg:right-0 lg:top-0 lg:h-auto"
      >
        <div data-hero-orbit className="h-full w-full">
          {/* La planète 3D est dessinée par le canvas Three.js fixe (components/World.jsx) sur cette zone. */}
          <WorldAnchor name="hero" label="Planète 3D rayée entourée de lunes en orbite" className="h-full w-full" />
        </div>
      </div>

      {/* Petites planètes décoratives en parallaxe (bureau) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div data-depth="-40" className="absolute left-[34%] top-[16%]">
          <span data-hero-planet className="block">
            <Planet variant="tan" size={46} />
          </span>
        </div>
        <div data-depth="30" className="absolute bottom-[14%] left-[46%]">
          <span data-hero-planet className="block">
            <Planet variant="moon" size={22} />
          </span>
        </div>
        <div data-depth="-24" className="absolute right-[6%] top-[12%]">
          <span data-hero-planet className="block">
            <Planet variant="moon" size={16} />
          </span>
        </div>
      </div>
      <OrbitLines className="-left-40 bottom-[-18rem] h-[44rem] w-[44rem] opacity-40" color="#16C7D9" count={2} />

      <div className="container-x relative z-10">
        <div className="max-w-2xl pt-[34svh] lg:pt-0">
          <p
            data-hero-badge
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-mist/15 bg-night/70 px-4 py-2 text-xs text-mist/90 backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ion" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ion" />
            </span>
            {profile.availability.internship ? profile.availability.label : 'Portfolio'}
          </p>

          <h1 id="accueil-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="sr-only">{profile.displayName} — {profile.title}</span>
            <span aria-hidden="true" className="flex flex-wrap gap-x-4">
              {words.map((word) => (
                <span key={word} className="inline-block overflow-hidden pb-2">
                  <span data-hero-word className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p data-hero-role className="mt-5 font-mono text-sm uppercase tracking-[0.3em] text-sun sm:text-base">
            {profile.title}
          </p>

          {profile.heroTags && profile.heroTags.length > 0 && (
            <ul aria-label="Domaines d’intervention" className="mt-4 flex flex-wrap gap-2">
              {profile.heroTags.map((tag) => (
                <li
                  key={tag}
                  data-hero-tag
                  className="rounded-full border border-mist/15 bg-night/60 px-3 py-1 font-mono text-[0.7rem] text-mist/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <p data-hero-tagline className="mt-7 font-display text-xl font-medium leading-snug text-snow sm:text-2xl">
            {profile.tagline}
          </p>

          <p data-hero-text className="mt-5 max-w-xl text-base leading-relaxed text-mist/80 sm:text-lg">
            {profile.heroDescription}
          </p>

          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projets" icon={Rocket}>
              Explorer mes projets
            </Button>
            <CvButton />
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-mist transition-colors hover:text-snow"
            >
              Me contacter
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#apropos"
        aria-label="Descendre vers la section À propos"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist/60 transition-colors hover:text-snow md:flex"
      >
        Défiler
        <ArrowDown className="float-y h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
