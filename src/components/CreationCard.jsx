import { useLayoutEffect, useRef } from 'react';
import { Play, ArrowLeftRight, Maximize2 } from 'lucide-react';
import { gsap } from '../animations/gsapAnimations.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export const isEmptyCreation = (item) => !item.src && !item.youtube;

const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Vignette de la galerie (format d'origine de l'image). `animate` : entrée animée après un changement de filtre. */
export default function CreationCard({ item, index, animate, categoryLabel, onOpen }) {
  const ref = useRef(null);
  const { tr, ui } = useLang();
  const title = tr(item.title);
  const description = tr(item.description);
  const isVideo = item.type === 'video' || Boolean(item.youtube);
  const hasCompare = Boolean(item.before && item.src);
  const cover = item.poster || (item.youtube ? youtubeThumb(item.youtube) : !isVideo ? item.src : '');

  useLayoutEffect(() => {
    if (!animate || !ref.current) return undefined;
    const tween = gsap.fromTo(ref.current, { opacity: 0, y: 24 }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.05,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
    });
    return () => tween.kill();
  }, [animate, index]);

  return (
    <li ref={ref} className="mb-4 break-inside-avoid sm:mb-5">
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={ui.creations.enlarge(title)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-coal text-left"
      >
        {cover ? (
          <img
            src={cover}
            alt={description ? `${title} — ${description}` : title}
            loading="lazy"
            decoding="async"
            className={`block w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] ${isVideo ? 'aspect-video object-cover' : 'h-auto'}`}
          />
        ) : (
          <span className="block aspect-video w-full bg-gradient-to-br from-graphite to-ink" />
        )}

        <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />

        {isVideo && (
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />
          </span>
        )}
        {hasCompare && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-paper backdrop-blur">
            <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
            {ui.creations.beforeAfter}
          </span>
        )}

        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-paper opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </span>

        <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <span className="label text-accent">
            {item.year ? `${item.year} · ` : ''}
            {categoryLabel}
          </span>
          <span className="mt-1 block font-display text-lg font-semibold tracking-tight text-paper">{title}</span>
        </span>
      </button>
    </li>
  );
}
