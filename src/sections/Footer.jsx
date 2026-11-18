import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { navLinks, profile } from '../data/profile.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Footer() {
  const { lang, tr, ui } = useLang();
  const year = new Date().getFullYear();
  const socials = [
    profile.socials.github && { href: profile.socials.github, label: 'GitHub', icon: Github },
    profile.socials.linkedin && { href: profile.socials.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: `mailto:${profile.contact.email}`, label: ui.contact.email, icon: Mail },
  ].filter(Boolean);

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="page-x pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
              {lang === 'fr' ? `« ${tr(profile.footerQuote)} »` : `“${tr(profile.footerQuote)}”`}
            </p>
          </div>
          <nav aria-label={ui.footer.nav} className="lg:col-span-3 lg:col-start-8">
            <p className="label">{ui.footer.navigation}</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-paper/75 transition-colors hover:text-paper">
                    {tr(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <p className="label">{ui.footer.networks}</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {socials.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="inline-flex items-center gap-2 text-paper/75 transition-colors hover:text-paper"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none whitespace-nowrap font-display text-[17vw] font-semibold leading-[0.8] tracking-[-0.06em] text-paper/[0.06] lg:text-[13.5rem]"
        >
          {profile.lastName}
          <span className="text-accent/40">.</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-stone">
          <p>
            © {year} {profile.fullName}
          </p>
          <div className="flex items-center gap-5">
            {profile.sourceCode.repoUrl && (
              <a href={profile.sourceCode.repoUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
                {ui.footer.source}
              </a>
            )}
            <a href="#accueil" className="inline-flex items-center gap-1.5 transition-colors hover:text-paper">
              {ui.footer.top}
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
