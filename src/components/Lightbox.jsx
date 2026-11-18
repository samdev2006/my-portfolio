import { useEffect, useLayoutEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gsap } from '../animations/gsapAnimations.js';
import BeforeAfter from './BeforeAfter.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

/** Visionneuse plein écran : image, vidéo locale, vidéo YouTube ou comparateur avant / après. */
export default function Lightbox({ item, categoryLabel, position, hasPrev, hasNext, onClose, onPrev, onNext }) {
  const rootRef = useRef(null);
  const { tr, ui } = useLang();
  const title = tr(item.title);
  const description = tr(item.description);
  const mediaRef = useRef(null);
  const closeRef = useRef(null);
  // Les derniers callbacks, lus par l'écouteur clavier installé une seule fois.
  const actions = useRef({});
  actions.current = { hasPrev, hasNext, onClose, onPrev, onNext };

  useLayoutEffect(() => {
    // fromTo (et non from) : l'état final reste correct même si l'effet est rejoué (StrictMode).
    const tween = gsap.fromTo(
      mediaRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', clearProps: 'opacity,transform' }
    );
    return () => tween.kill();
  }, [item.id]);

  // Ouverture : scroll bloqué, focus sur « Fermer », clavier. Fermeture : focus rendu à la vignette.
  useEffect(() => {
    const opener = document.activeElement;
    document.documentElement.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();

    const onKeyDown = (event) => {
      const a = actions.current;
      if (event.key === 'Escape') a.onClose();
      else if (event.key === 'ArrowLeft' && a.hasPrev) a.onPrev();
      else if (event.key === 'ArrowRight' && a.hasNext) a.onNext();
      else if (event.key === 'Tab' && rootRef.current) {
        const focusables = rootRef.current.querySelectorAll('button, input, video, iframe, [href]');
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
  }, []);

  let media;
  if (item.youtube) {
    media = (
      <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black">
        <iframe
          title={title}
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
        className="max-h-[72vh] w-full max-w-5xl rounded-2xl bg-black"
      >
        {ui.creations.noVideo}
      </video>
    );
  } else if (item.before) {
    media = <BeforeAfter before={item.before} after={item.src} alt={title} />;
  } else {
    media = <img src={item.src} alt={title} className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain" />;
  }

  const navButton =
    'flex h-11 w-11 items-center justify-center rounded-full border border-line bg-coal/90 text-paper transition-colors hover:border-paper/50';

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="font-mono text-xs text-stone">{position}</span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={ui.creations.close} className={navButton}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <div
          ref={mediaRef}
          // Clic sur l'image : rien. Clic à côté (dans la zone vide) : fermeture.
          onClick={(event) => {
            if (event.target !== event.currentTarget) event.stopPropagation();
          }}
          className="flex max-h-full w-full justify-center"
        >
          {media}
        </div>
      </div>

      <div className="flex items-end justify-between gap-6 px-4 pb-6 pt-4 sm:px-8" onClick={(event) => event.stopPropagation()}>
        <div className="min-w-0">
          <p className="label text-accent">
            {item.year ? `${item.year} · ` : ''}
            {categoryLabel}
          </p>
          <h3 className="mt-1 truncate text-xl font-semibold tracking-tight">{title}</h3>
          {description && <p className="mt-1 text-sm text-stone">{description}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={onPrev} disabled={!hasPrev} aria-label={ui.creations.prev} className={`${navButton} disabled:opacity-30`}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={onNext} disabled={!hasNext} aria-label={ui.creations.next} className={`${navButton} disabled:opacity-30`}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
