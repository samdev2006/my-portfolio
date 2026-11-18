// Helpers GSAP centralisés. Toutes les animations sont créées dans un gsap.context()
// (voir hooks/useGsap.js) et donc annulées au démontage.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const media = (query) =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;

export const prefersReducedMotion = () => media('(prefers-reduced-motion: reduce)');
export const isCoarsePointer = () => media('(pointer: coarse)');

// ---------------------------------------------------------------------------
// Les IntersectionObserver créés pendant un setup de useGsap sont collectés ici
// puis déconnectés au démontage.
// ---------------------------------------------------------------------------
let cleanupScope = null;

export function collectCleanups(run) {
  const list = [];
  const previous = cleanupScope;
  cleanupScope = list;
  try {
    run();
  } finally {
    cleanupScope = previous;
  }
  return () => list.forEach((fn) => fn());
}

/**
 * Appelle `callback(element)` une seule fois, quand l'élément entre dans la fenêtre.
 * IntersectionObserver ne dépend pas de positions calculées à l'avance : un contenu
 * ne peut pas rester caché si la mise en page bouge (polices, images).
 */
export function onView(elements, callback, { rootMargin = '0px 0px -8% 0px' } = {}) {
  const list = Array.from(elements);
  if (!list.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        callback(entry.target);
      });
    },
    { rootMargin, threshold: 0.01 }
  );
  list.forEach((el) => observer.observe(el));
  if (cleanupScope) cleanupScope.push(() => observer.disconnect());
}

/**
 * Révélations au scroll d'une section :
 *  - [data-words]          : chaque [data-word] monte depuis un masque
 *  - [data-reveal]         : fondu + montée
 *  - [data-reveal-stagger] : ses enfants apparaissent les uns après les autres
 * Les éléments ne sont masqués qu'au moment où l'animation est créée :
 * sans JS ou avec « réduire les animations », tout reste visible.
 */
export function revealSection(root) {
  gsap.utils.toArray('[data-words]', root).forEach((title) => {
    const words = title.querySelectorAll('[data-word]');
    gsap.set(words, { yPercent: 110 });
    onView([title], () =>
      gsap.to(words, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'power3.out', clearProps: 'transform' })
    );
  });

  gsap.utils.toArray('[data-reveal]', root).forEach((el) => {
    gsap.set(el, { opacity: 0, y: 28 });
    onView([el], () =>
      gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,transform' })
    );
  });

  gsap.utils.toArray('[data-reveal-stagger]', root).forEach((parent) => {
    const kids = Array.from(parent.children);
    gsap.set(kids, { opacity: 0, y: 28 });
    onView([parent], () =>
      gsap.to(kids, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
      })
    );
  });
}
