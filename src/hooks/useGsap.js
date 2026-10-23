import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, collectCleanups } from '../animations/gsapAnimations.js';

/**
 * Exécute `setup` dans un gsap.context() rattaché à la ref retournée.
 * - Le contexte est annulé (revert) au démontage et à chaque changement de `deps` :
 *   pas d'animations dupliquées, pas de fuite mémoire (React StrictMode inclus).
 * - Les observers créés via onView() sont détruits automatiquement.
 * - `setup` reçoit { reduced } : si true, ne créez pas d'animation de mouvement.
 * - Si `setup` renvoie une fonction, elle sert de nettoyage supplémentaire.
 */
export default function useGsap(setup, deps = []) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    let extraCleanup;
    let disposeObservers;
    const ctx = gsap.context(() => {
      disposeObservers = collectCleanups(() => {
        extraCleanup = setup({ reduced });
      });
    }, scope);
    return () => {
      if (typeof extraCleanup === 'function') extraCleanup();
      if (disposeObservers) disposeObservers();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
