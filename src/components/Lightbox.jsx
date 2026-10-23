import { useEffect, useLayoutEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gsap } from '../animations/gsapAnimations.js';
import BeforeAfter from './BeforeAfter.jsx';

/** Visionneuse plein écran : image, vidéo locale, vidéo YouTube ou comparateur avant/après. */
export default function Lightbox({ item, hasPrev, hasNext, onClose, onPrev, onNext }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Ouverture animée (GSAP).
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, { opacity: 0, scale: 0.94, y: 20, duration: 0.4, ease: 'power3.out' });
    }, panelRef);
    return () => ctx.revert();
  }, [item.id]);

  // Focus, verrouillage du scroll et touches du clavier.
  useEffect(() => {
    const opener = document.activeElement;
    document.documentElement.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowLeft' && hasPrev) onPrev();
      else if (event.key === 'ArrowRight' && hasNext) onNext();
      else if (event.key === 'Tab' && panelRef.current) {
        // Piège le focus dans la visionneuse.
        const focusables = panelRef.current.parentElement.querySelectorAll('button, input, video, iframe, [href]');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
      if (opener && opener.focus) opener.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPrev, hasNext]);

  let media;
  if (item.youtube) {
    media = (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          title={item.title}
          src={`https://www.youtube-nocookie.com/embed/${item.youtube}?rel=0`}
          allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  } else if (item.type === 'video') {
    media = (
      <video
        key={item.src}
        src={item.src}
        poster={item.poster || undefined}
        controls
        playsInline
        preload="metadata"
        className="max-h-[70vh] w-full rounded-2xl bg-black"
      >
        Votre navigateur ne peut pas lire cette vidéo.
      </video>
    );
  } else if (item.before) {
    media = <BeforeAfter before={item.before} after={item.src} alt={item.title} />;
  } else {
    media = <img src={item.src} alt={item.title} className="max-h-[70vh] w-full rounded-2xl object-contain" />;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-void/92 p-4 backdrop-blur-md sm:p-8"
    >
      <div ref={panelRef} onClick={(event) => event.stopPropagation()} className="relative flex max-h-full w-full max-w-5xl flex-col gap-4 overflow-y-auto">
        {media}
        <div className="px-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-sun">
            {item.year ? `${item.year} · ` : ''}
            {item.category}
          </p>
          <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
          {item.description && <p className="mt-2 text-sm leading-relaxed text-mist/80">{item.description}</p>}
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fermer la visionneuse"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-mist/25 bg-night/80 text-snow transition-colors hover:border-sun hover:text-sun sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      {hasPrev && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          aria-label="Réalisation précédente"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mist/25 bg-night/80 text-snow transition-colors hover:border-sun hover:text-sun sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Réalisation suivante"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mist/25 bg-night/80 text-snow transition-colors hover:border-sun hover:text-sun sm:right-6"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
