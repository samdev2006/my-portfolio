import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import useGsap from '../hooks/useGsap.js';
import { gsap } from '../animations/gsapAnimations.js';
import { profile } from '../data/profile.js';
import { marqueeStack } from '../data/skills.js';
import Button from '../components/Button.jsx';
import CvButton from '../components/CvButton.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

function LocalTime() {
  const { lang } = useLang();
  const format = () =>
    new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: profile.contact.timeZone,
    }).format(new Date());
  const [time, setTime] = useState(format);

  useEffect(() => {
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return <span className="tabular-nums">{time}</span>;
}

// Petite fenêtre d'éditeur : une présentation « en Java », construite à partir des données réelles.
function CodeCard() {
  const { tr, ui, lang } = useLang();
  const current = profile.experiences[0];
  const k = (text) => <span className="text-[#C792EA]">{text}</span>; // mots-clés
  const t = (text) => <span className="text-[#FFCB6B]">{text}</span>; // types
  const c = (text) => <span className="text-[#82AAFF]">{text}</span>; // classes
  const v = (text) => <span className="text-paper/90">{text}</span>; // variables
  const s = (text) => <span className="text-[#C3E88D]">"{text}"</span>; // chaînes
  const b = (text) => <span className="text-accent">{text}</span>; // booléens
  const list = (items) =>
    items.map((item, i) => (
      <span key={item}>
        {i > 0 && ', '}
        {s(item)}
      </span>
    ));
  const field = (type, name, value) => (
    <>
      {'  '}
      {type} {v(name)} = {value};
    </>
  );

  const lines = [
    <>
      {k('public class')} {c('Samuel')} {k('extends')} {c('Developer')} {'{'}
    </>,
    field(t('String'), 'role', s(tr(profile.title))),
    field(t('String'), 'city', s('Abidjan, CI')),
    current ? field(t('String'), 'current', s(`${tr(current.type)} @ ${current.organization}`)) : null,
    field(<>{t('String')}[]</>, 'stack', <>{'{'}{list(['React', 'Spring Boot', 'Flutter'])}{'}'}</>),
    field(<>{t('String')}[]</>, 'design', <>{'{'}{list(lang === 'en' ? ['Posters', 'Video'] : ['Affiches', 'Vidéo'])}{'}'}</>),
    field(k('boolean'), 'available', b(String(profile.availability.open))),
    <>{'}'}</>,
  ].filter(Boolean);

  return (
    <figure
      aria-label={ui.hero.codeLabel}
      className="relative overflow-hidden rounded-3xl border border-line bg-coal/90 shadow-[0_40px_120px_-40px_rgba(255,107,26,0.35)] backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[0.72rem] text-stone">Samuel.java</span>
      </div>
      <pre className="overflow-x-auto px-3.5 py-5 font-mono text-[0.56rem] leading-[1.8] text-stone min-[380px]:text-[0.6rem] min-[420px]:text-[0.66rem] sm:px-5 sm:text-[0.72rem]">
        <code>
          {lines.map((line, i) => (
            <span key={i} data-code-line className="block">
              <span className="mr-4 hidden w-3 select-none text-right text-paper/20 sm:inline-block">{i + 1}</span>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export default function Hero() {
  const { tr, ui } = useLang();
  const current = profile.experiences[0];
  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });
    tl.from('[data-hero-glow]', { opacity: 0, duration: 1.6 }, 0)
      .from('[data-hero-pill]', { opacity: 0, y: 16, duration: 0.7 }, 0.1)
      .from('[data-hero-line]', { yPercent: 105, duration: 1.1, stagger: 0.1, ease: 'power4.out' }, 0.15)
      .from('[data-hero-fade]', { opacity: 0, y: 22, duration: 0.8, stagger: 0.08 }, 0.55)
      .from('[data-hero-photo]', { opacity: 0, y: 50, duration: 1.3 }, 0.25)
      .from('[data-hero-card]', { opacity: 0, y: 40, rotate: 1.5, duration: 1.1 }, 0.5)
      .from('[data-code-line]', { opacity: 0, x: -8, duration: 0.4, stagger: 0.06 }, 0.85)
      .from('[data-hero-bottom]', { opacity: 0, duration: 1 }, 1);

    // La carte de code remonte légèrement plus vite que le texte au scroll.
    gsap.to('[data-hero-card]', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, []);

  return (
    <section
      id="accueil"
      ref={ref}
      aria-labelledby="accueil-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32"
    >
      {/* Lueur + grille très discrètes */}
      <div aria-hidden="true" data-hero-glow className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-accent/[0.13] blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#2F5BEA]/[0.08] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(237,235,230,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(237,235,230,0.035) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 80%)',
          }}
        />
      </div>

      <div className="page-x relative z-10 grid flex-1 grid-cols-1 items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <p
            data-hero-pill
            className="inline-flex items-center gap-3 rounded-full border border-line bg-coal/70 py-1.5 pl-3 pr-4 text-[0.8rem] text-paper/85 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-[#28C840]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28C840]" />
            </span>
            {tr(profile.availability.label)}
            {current && current.current && (
              <span className="hidden text-stone sm:inline">· {ui.hero.internAt(current.organization)}</span>
            )}
          </p>

          <h1
            id="accueil-title"
            className="mt-8 text-[clamp(3rem,8vw,7.2rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
          >
            <span className="sr-only">
              {profile.fullName}, {tr(profile.title)}
            </span>
            <span aria-hidden="true">
              {profile.heroLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span data-hero-line className="block">
                    {line}
                    {i === profile.heroLines.length - 1 && <span className="text-accent">.</span>}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p data-hero-fade className="mt-8 font-display text-xl font-medium tracking-tight text-paper sm:text-2xl">
            {tr(profile.title)} <span className="text-stone">— {tr(profile.tagline)}</span>
          </p>

          <p data-hero-fade className="mt-5 max-w-xl text-base leading-relaxed text-stone sm:text-[1.05rem]">
            {tr(profile.heroDescription)}
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projets" iconRight={ArrowRight} variant="light">
              {ui.hero.viewProjects}
            </Button>
            <CvButton />
          </div>
        </div>

        <div className="relative min-w-0 lg:col-span-5">
          {profile.photo && (
            <div data-hero-photo className="relative mx-auto aspect-[633/800] w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[27rem]">
              {/* Halo et anneau derrière la silhouette : détachent le costume sombre du fond. */}
              <div aria-hidden="true" className="absolute left-1/2 top-[8%] h-[70%] w-[95%] -translate-x-1/2 rounded-full bg-accent/25 blur-[80px]" />
              <div aria-hidden="true" className="absolute left-1/2 top-[3%] aspect-square w-[92%] -translate-x-1/2 rounded-full border border-paper/10 bg-gradient-to-b from-paper/[0.06] to-transparent" />
              <img
                src={profile.photo.src}
                alt={tr(profile.photo.alt)}
                width="633"
                height="800"
                fetchpriority="high"
                className="relative h-full w-full object-contain [mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%)]"
              />
            </div>
          )}
          <div
            data-hero-card
            className={
              profile.photo
                ? 'relative z-10 mx-auto -mt-20 max-w-[30rem] lg:absolute lg:-bottom-14 lg:-left-16 lg:mt-0 lg:w-[29rem]'
                : 'lg:pl-6'
            }
          >
            <CodeCard />
          </div>
        </div>
      </div>

      <div data-hero-bottom className="relative z-10 border-t border-line">
        <div className="page-x flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-stone">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {tr(profile.contact.location)} · <LocalTime /> GMT
          </span>
          <a href="#apropos" className="hidden items-center gap-2 transition-colors hover:text-paper sm:inline-flex">
            {ui.hero.scroll}
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <div className="mask-fade-x overflow-hidden border-t border-line py-5" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-12 pr-12">
            {[...marqueeStack, ...marqueeStack].map((tech, i) => (
              <span key={`${tech}-${i}`} className="flex items-center gap-12 font-display text-2xl font-medium tracking-tight text-paper/25 sm:text-3xl">
                {tech}
                <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
