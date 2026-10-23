import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsapAnimations.js';
import { navLinks, profile } from '../data/profile.js';
import useCvAvailable from '../hooks/useCvAvailable.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('accueil');
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const tlRef = useRef(null);
  const cvAvailable = useCvAvailable();

  // Apparence adaptée au défilement (meilleure lisibilité).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lien actif selon la section visible.
  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Timeline GSAP du menu mobile (créée une fois, jouée / inversée selon `open`).
  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.set(panelRef.current, { autoAlpha: 0 });
      const tl = gsap.timeline({ paused: true });
      tl.to(panelRef.current, { autoAlpha: 1, duration: reduced ? 0 : 0.35, ease: 'power2.out' });
      tl.from(
        '[data-mlink]',
        { y: reduced ? 0 : 28, autoAlpha: 0, stagger: reduced ? 0 : 0.06, duration: reduced ? 0 : 0.45, ease: 'power3.out' },
        '-=0.1'
      );
      tlRef.current = tl;
    }, panelRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return undefined;
    if (open) {
      tl.timeScale(1).play();
      document.documentElement.style.overflow = 'hidden';
      const firstLink = panelRef.current && panelRef.current.querySelector('a');
      if (firstLink) firstLink.focus({ preventScroll: true });
    } else {
      tl.timeScale(1.6).reverse();
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Clavier : Échap ferme le menu, Tab reste dans le panneau tant qu'il est ouvert.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll('a')].filter(Boolean);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Fermeture automatique si l'écran repasse en mode bureau.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[75] transition-all duration-300 ${
        scrolled || open ? 'border-b border-mist/10 bg-void/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Navigation principale" className="container-x flex h-16 items-center justify-between">
        <a
          href="#accueil"
          onClick={closeMenu}
          aria-label={`${profile.displayName} – retour à l’accueil`}
          className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-snow"
        >
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-sun/60 text-[0.7rem] text-sun transition-colors group-hover:bg-sun group-hover:text-void">
            {profile.logoText}
          </span>
          <span className="hidden xl:inline">{profile.displayName}</span>
        </a>

        {/* Navigation bureau */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                  active === link.id ? 'text-snow' : 'text-mist/70 hover:text-snow'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px bg-sun transition-transform duration-300 ${
                    active === link.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {cvAvailable ? (
            <a
              href={profile.cv.path}
              download={profile.cv.downloadName}
              className="hidden items-center gap-2 rounded-full border border-mist/25 px-4 py-2 text-sm font-medium text-snow transition-colors hover:border-sun hover:text-sun lg:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              CV
            </a>
          ) : (
            <span
              title="CV bientôt disponible"
              aria-disabled="true"
              className="hidden cursor-not-allowed items-center gap-2 rounded-full border border-mist/10 px-4 py-2 text-sm font-medium text-mist/40 lg:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              CV
            </span>
          )}

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="relative z-[2] flex h-11 w-11 items-center justify-center rounded-full border border-mist/20 text-snow transition-colors hover:border-sun lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Menu mobile plein écran, animé avec GSAP.
          Placé hors du <header> : backdrop-filter y créerait un bloc conteneur pour position: fixed. */}
      <div
        id="menu-mobile"
        ref={panelRef}
        aria-hidden={!open}
        className="fixed inset-0 z-[74] flex flex-col justify-center bg-void/95 px-8 pb-10 pt-24 backdrop-blur-xl lg:hidden"
        style={{ visibility: 'hidden' }}
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <li key={link.id} data-mlink>
              <a
                href={`#${link.id}`}
                onClick={closeMenu}
                className={`flex items-baseline gap-4 rounded-xl py-3 font-display text-3xl font-bold transition-colors sm:text-4xl ${
                  active === link.id ? 'text-sun' : 'text-snow hover:text-ion'
                }`}
              >
                <span className="font-mono text-xs font-normal text-mist/50">0{index + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div data-mlink className="mt-8">
          {cvAvailable ? (
            <a
              href={profile.cv.path}
              download={profile.cv.downloadName}
              onClick={closeMenu}
              className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 text-sm font-semibold text-void"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Télécharger mon CV
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-mist/15 px-6 py-3 text-sm text-mist/45">
              <Download className="h-4 w-4" aria-hidden="true" />
              CV bientôt disponible
            </span>
          )}
        </div>
      </div>
    </>
  );
}
