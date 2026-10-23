import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../animations/gsapAnimations.js';
import Planet from './Planet.jsx';
import { profile } from '../data/profile.js';

/**
 * Animation de chargement courte (~1,3 s). `onReveal` est appelé au début du fondu de sortie :
 * le Hero peut alors lancer sa séquence d'introduction pendant que le loader disparaît.
 */
export default function Loader({ onReveal }) {
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const progress = { value: 0 };
    document.documentElement.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = '';
          setGone(true);
        },
      });

      tl.to(progress, {
        value: 100,
        duration: reduced ? 0.15 : 1.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = `${Math.round(progress.value)}`;
          if (barRef.current) barRef.current.style.transform = `scaleX(${progress.value / 100})`;
        },
      });
      tl.add(() => onReveal && onReveal(), reduced ? '>' : '>-0.05');
      tl.to(rootRef.current, { autoAlpha: 0, duration: reduced ? 0.1 : 0.7, ease: 'power2.out' });
    }, rootRef);

    return () => {
      document.documentElement.style.overflow = '';
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Chargement du portfolio"
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8 bg-void"
    >
      <div className="relative flex h-40 w-40 items-center justify-center">
        <span className="spin-slow absolute inset-0 rounded-full border border-ion/30">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-sun shadow-[0_0_14px_#FF6B1A]" />
        </span>
        <Planet variant="banded" size={72} />
      </div>
      <div className="w-56 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist/70">{profile.displayName}</p>
        <div className="mt-4 h-px w-full bg-ash">
          <div ref={barRef} className="h-px origin-left bg-sun" style={{ transform: 'scaleX(0)' }} />
        </div>
        <p className="mt-3 font-mono text-xs text-mist/60">
          <span ref={counterRef}>0</span> %
        </p>
      </div>
    </div>
  );
}
