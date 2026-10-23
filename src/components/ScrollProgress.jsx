import useGsap from '../hooks/useGsap.js';
import { gsap } from '../animations/gsapAnimations.js';

/** Fine barre de progression du scroll en haut de page (scaleX piloté par ScrollTrigger). */
export default function ScrollProgress() {
  const ref = useGsap(() => {
    gsap.fromTo(
      '[data-progress]',
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      }
    );
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div data-progress className="h-full origin-left bg-gradient-to-r from-sun via-volt to-ion" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
