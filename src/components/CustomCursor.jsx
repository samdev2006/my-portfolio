import { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsapAnimations.js';
import useMediaQuery from '../hooks/useMediaQuery.js';

/**
 * Halo discret qui suit le curseur. Il s'AJOUTE au curseur système (qui reste visible,
 * pour l'accessibilité) et n'existe que sur pointeur précis, sans préférence de mouvement réduit.
 */
export default function CustomCursor() {
  const fine = useMediaQuery('(pointer: fine)');
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const haloRef = useRef(null);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled || !haloRef.current) return undefined;
    const halo = haloRef.current;
    gsap.set(halo, { xPercent: -50, yPercent: -50, opacity: 0 });
    const moveX = gsap.quickTo(halo, 'x', { duration: 0.35, ease: 'power3.out' });
    const moveY = gsap.quickTo(halo, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
      gsap.to(halo, { opacity: 1, duration: 0.3, overwrite: 'auto' });
    };
    const onOver = (event) => {
      const interactive = event.target.closest && event.target.closest('a, button, input, textarea, [role="link"]');
      gsap.to(halo, { scale: interactive ? 1.9 : 1, duration: 0.25, overwrite: 'auto' });
    };
    const onLeave = () => gsap.to(halo, { opacity: 0, duration: 0.3 });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(halo);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={haloRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 rounded-full border border-ion/70 mix-blend-screen"
      style={{ boxShadow: '0 0 18px rgba(22,199,217,0.35)', opacity: 0 }}
    />
  );
}
