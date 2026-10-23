// Helpers GSAP centralisés : un seul enregistrement de ScrollTrigger et des
// animations réutilisables. Toutes les animations sont créées dans un
// gsap.context() (voir hooks/useGsap.js) donc nettoyées au démontage.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(pointer: coarse)').matches;

export const isSmallScreen = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(max-width: 767px)').matches;

// ---------------------------------------------------------------------------
// Nettoyage : les observers créés pendant un `setup` de useGsap sont enregistrés
// ici puis détruits automatiquement au démontage du composant.
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

function trackCleanup(fn) {
  if (cleanupScope) cleanupScope.push(fn);
}

/**
 * Appelle `callback(element)` UNE fois, quand l'élément entre dans la fenêtre.
 * IntersectionObserver est insensible aux décalages de mise en page (contrairement à des
 * positions ScrollTrigger calculées trop tôt) : le contenu ne reste jamais caché.
 */
export function onView(elements, callback, { rootMargin = '0px 0px -10% 0px' } = {}) {
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
  trackCleanup(() => observer.disconnect());
}

// Les éléments sont visibles par défaut ; ils ne sont masqués (gsap.set) que lorsque
// l'animation est réellement créée : contenu lisible si JS ou animations désactivés.

/** Titres de section ([data-reveal-heading]) : mots qui montent, puis eyebrow et description. */
export function revealHeadings(root) {
  gsap.utils.toArray('[data-reveal-heading]', root).forEach((header) => {
    const soft = header.querySelectorAll('[data-hsoft]');
    const words = header.querySelectorAll('[data-hword]');
    gsap.set(soft, { opacity: 0, y: 24 });
    gsap.set(words, { yPercent: 115 });
    onView([header], () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(words, { yPercent: 0, duration: 0.95, stagger: 0.07 }, 0).to(
        soft,
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, clearProps: 'opacity,transform' },
        0.1
      );
    });
  });
}

/** Blocs [data-reveal] et enfants de [data-reveal-stagger]. */
export function revealBlocks(root) {
  gsap.utils.toArray('[data-reveal]', root).forEach((el) => {
    gsap.set(el, { opacity: 0, y: 44 });
    onView([el], () =>
      gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,transform' })
    );
  });

  gsap.utils.toArray('[data-reveal-stagger]', root).forEach((parent) => {
    const kids = Array.from(parent.children);
    gsap.set(kids, { opacity: 0, y: 40 });
    onView([parent], () =>
      gsap.to(kids, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
      })
    );
  });
}

/** Dessine progressivement les lignes orbitales ([data-orbit], pathLength = 1). */
export function drawOrbits(root, trigger) {
  gsap.utils.toArray('[data-orbit]', root).forEach((path, i) => {
    gsap.fromTo(
      path,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger || path,
          start: 'top 90%',
          end: 'bottom 40%',
          scrub: 0.6 + i * 0.2,
        },
      }
    );
  });
}

/** Parallaxe verticale liée au scroll sur les éléments [data-parallax="valeur"]. */
export function parallaxLayers(root) {
  gsap.utils.toArray('[data-parallax]', root).forEach((el) => {
    const amount = parseFloat(el.dataset.parallax) || 40;
    gsap.fromTo(
      el,
      { y: -amount },
      {
        y: amount,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      }
    );
  });
}

/** Applique l'ensemble des animations de scroll standard à une section. */
export function standardSectionAnimations(root, { parallax = true } = {}) {
  revealHeadings(root);
  revealBlocks(root);
  drawOrbits(root, root);
  if (parallax && !isSmallScreen()) parallaxLayers(root);
}
