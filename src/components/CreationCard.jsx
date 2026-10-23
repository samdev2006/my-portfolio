import { useLayoutEffect, useRef } from 'react';
import { Palette, Film, Camera, Play, ArrowLeftRight } from 'lucide-react';
import { gsap } from '../animations/gsapAnimations.js';
import Planet from './Planet.jsx';

const RATIOS = { portrait: 'aspect-[3/4]', landscape: 'aspect-video', square: 'aspect-square' };
const ICONS = { affiches: Palette, videos: Film, photos: Camera };
const PLANETS = { affiches: 'sun', videos: 'blue', photos: 'teal' };

export const isEmptyCreation = (item) => !item.src && !item.youtube;

/**
 * Vignette de la galerie. Ouvre le lightbox au clic.
 * `animate` : animation d'entrée GSAP, utilisée quand le filtre change (la première apparition
 * est gérée par la révélation au scroll de la section).
 */
export default function CreationCard({ item, index, animate, onOpen }) {
  const ref = useRef(null);
  const empty = isEmptyCreation(item);
  const Icon = ICONS[item.category] || Palette;
  const isVideo = item.type === 'video' || Boolean(item.youtube);
  const hasCompare = Boolean(item.before && item.src);

  useLayoutEffect(() => {
    if (!animate || !ref.current) return undefined;
    const tween = gsap.from(ref.current, {
      opacity: 0,
      y: 30,
      scale: 0.96,
      duration: 0.6,
      delay: index * 0.06,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
    });
    return () => tween.kill();
  }, [animate, index]);

  const cover = item.poster || (!isVideo ? item.src : '');

  return (
    <li ref={ref} className="mb-5 break-inside-avoid">
      <button
        type="button"
        disabled={empty}
        onClick={() => onOpen(item)}
        aria-label={empty ? `${item.title} (emplacement libre)` : `Ouvrir : ${item.title}`}
        className={`group relative block w-full overflow-hidden rounded-3xl border text-left transition-all duration-500 ${
          empty
            ? 'cursor-default border-dashed border-mist/20 bg-night/50'
            : 'border-mist/10 bg-night hover:-translate-y-1 hover:border-sun/50'
        } ${RATIOS[item.ratio] || RATIOS.landscape}`}
      >
        {empty ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <Planet variant={PLANETS[item.category] || 'moon'} size={64} className="float-y" />
            <Icon className="h-5 w-5 text-mist/60" aria-hidden="true" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist/60">Emplacement libre</span>
          </span>
        ) : (
          <>
            {cover ? (
              <img
                src={cover}
                alt={`${item.title}${item.description ? ` — ${item.description}` : ''}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-br from-ash to-void" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            {isVideo && (
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sun text-void shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6" aria-hidden="true" />
              </span>
            )}
            {hasCompare && (
              <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-void/80 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-mist">
                <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
                Avant / après
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-sun">
                {item.year ? `${item.year} · ` : ''}
                {item.category}
              </span>
              <span className="mt-1 block font-display text-base font-semibold text-snow">{item.title}</span>
            </span>
          </>
        )}
      </button>
    </li>
  );
}
