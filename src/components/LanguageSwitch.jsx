import { LANGS, useLang } from '../i18n/LanguageContext.jsx';

const NAMES = { fr: 'Français', en: 'English' };

/** Sélecteur FR / EN. */
export default function LanguageSwitch({ className = '' }) {
  const { lang, setLang, ui } = useLang();

  return (
    <div role="group" aria-label={ui.nav.language} className={`flex h-9 items-center rounded-full border border-line bg-coal/60 p-0.5 ${className}`}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={NAMES[code]}
          className={`h-full rounded-full px-2.5 font-mono text-[0.68rem] uppercase tracking-wider transition-colors ${
            lang === code ? 'bg-paper text-ink' : 'text-stone hover:text-paper'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
