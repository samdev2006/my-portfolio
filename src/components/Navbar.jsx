import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks, profile } from '../data/profile.js';
import CvButton from './CvButton.jsx';

/** Barre de navigation fixe : fond flouté au scroll, section active soulignée, menu plein écran sur mobile. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section active : celle qui traverse le milieu de l'écran.
  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menu mobile : scroll bloqué, Échap pour fermer, focus piégé.
  useEffect(() => {
    if (!open) return undefined;
    document.documentElement.style.overflow = 'hidden';
    const first = menuRef.current && menuRef.current.querySelector('a');
    if (first) first.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
      } else if (event.key === 'Tab' && menuRef.current) {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll('a')].filter(Boolean);
        const index = items.indexOf(document.activeElement);
        if (event.shiftKey && index <= 0) {
          event.preventDefault();
          items[items.length - 1].focus();
        } else if (!event.shiftKey && index === items.length - 1) {
          event.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-500 ${
          scrolled || open ? 'border-b border-line bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Navigation principale" className="page-x flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
          <a href="#accueil" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-paper font-display text-sm font-bold tracking-tight text-ink transition-colors group-hover:bg-accent">
              {profile.logoText}
            </span>
            <span className="hidden font-display text-[0.95rem] font-semibold tracking-tight sm:block">
              {profile.firstName} {profile.displayName}
            </span>
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-coal/60 p-1 backdrop-blur md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`block rounded-full px-4 py-1.5 text-[0.85rem] transition-colors ${
                    active === link.id ? 'bg-graphite text-paper' : 'text-stone hover:text-paper'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <CvButton size="sm" label="CV" className="hidden sm:inline-flex" />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-coal text-paper md:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink px-5 pb-10 pt-6 md:hidden"
        >
          <ul className="divide-y divide-line border-y border-line">
            {navLinks.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 font-display text-3xl font-semibold tracking-tight"
                >
                  {link.label}
                  <span className="font-mono text-xs text-stone">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <CvButton className="w-full" />
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center justify-between rounded-2xl border border-line p-4 text-sm text-stone"
            >
              {profile.contact.email}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
