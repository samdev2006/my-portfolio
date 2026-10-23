import { useEffect } from 'react';
import { gsap, isCoarsePointer, prefersReducedMotion } from '../animations/gsapAnimations.js';

/**
 * Effet « magnétique » (GSAP) : l'élément se rapproche légèrement du curseur quand il le survole.
 * Désactivé sur écran tactile et si l'utilisateur préfère réduire les animations.
 */
export default function useMagnetic(ref, { strength = 0.28, enabled = true } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || isCoarsePointer() || prefersReducedMotion()) return undefined;

    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      moveX((event.clientX - (rect.left + rect.width / 2)) * strength);
      moveY((event.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'x,y' });
    };
  }, [ref, strength, enabled]);
}
