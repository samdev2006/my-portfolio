import { Github, Linkedin, Mail } from 'lucide-react';
import { navLinks, profile } from '../data/profile.js';
import Planet from '../components/Planet.jsx';

function SocialLink({ href, label, icon: Icon }) {
  if (!href) {
    return (
      <span title={`${label} : lien bientôt disponible`} aria-disabled="true" className="cursor-not-allowed text-mist/30">
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">{label} (lien non disponible)</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={label}
      className="text-mist/70 transition-colors hover:text-sun"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { socials, contact } = profile;

  return (
    <footer className="relative border-t border-mist/10 bg-void/80 pb-10 pt-14">
      <div className="container-x relative">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
          <div>
            <p className="font-display text-xl font-bold text-snow">{profile.fullName}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-sun">{profile.title}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist/70">« {profile.footerQuote} »</p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-mist/70 transition-colors hover:text-snow">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <SocialLink href={socials.github} label="GitHub" icon={Github} />
            <SocialLink href={socials.linkedin} label="LinkedIn" icon={Linkedin} />
            <SocialLink href={contact.email ? `mailto:${contact.email}` : ''} label="E-mail" icon={Mail} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-mist/10 pt-6 text-xs text-mist/50 sm:flex-row">
          <p>© {year} {profile.fullName}. Tous droits réservés.</p>

          {/* Petit satellite en orbite */}
          <span aria-hidden="true" className="relative flex h-10 w-10 items-center justify-center">
            <span className="spin-slow absolute inset-0 rounded-full border border-dashed border-ion/40" style={{ animationDuration: '14s' }}>
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-sun" />
            </span>
            <Planet variant="teal" size={14} />
          </span>
        </div>
      </div>
    </footer>
  );
}
