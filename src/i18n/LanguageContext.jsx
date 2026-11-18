import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UI } from './ui.js';

export const LANGS = ['fr', 'en'];
const STORAGE_KEY = 'lang';

/**
 * Langue initiale : ?lang=en dans l'URL > choix mémorisé > langue du navigateur.
 * Le français reste la langue par défaut.
 */
function initialLang() {
  if (typeof window === 'undefined') return 'fr';
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    // stockage indisponible
  }
  const nav = (navigator.languages || [navigator.language || 'fr']).map((l) => l.slice(0, 2));
  return nav.find((l) => LANGS.includes(l)) || 'fr';
}

/**
 * Traduit une valeur de contenu :
 *  - { fr: '…', en: '…' } -> texte dans la langue demandée (repli sur le français)
 *  - tableau             -> chaque élément traduit
 *  - chaîne / nombre     -> renvoyé tel quel (noms propres, technologies…)
 */
export function translate(value, lang) {
  if (Array.isArray(value)) return value.map((item) => translate(item, lang));
  if (value && typeof value === 'object' && ('fr' in value || 'en' in value)) {
    return value[lang] ?? value.fr ?? value.en;
  }
  return value;
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // stockage indisponible
    }
    // L'URL reflète la langue : le lien copié ouvre la même version.
    const url = new URL(window.location.href);
    if (next === 'fr') url.searchParams.delete('lang');
    else url.searchParams.set('lang', next);
    window.history.replaceState(null, '', url);
  }, []);

  // <html lang>, titre et description suivent la langue (lecteurs d'écran, onglet, traduction auto).
  useEffect(() => {
    const ui = UI[lang];
    document.documentElement.lang = lang;
    document.title = ui.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', ui.meta.description);
    // Chaque version linguistique est sa propre page canonique (sinon l'anglaise passerait pour un doublon).
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const url = new URL(canonical.href);
      url.search = lang === 'fr' ? '' : `?lang=${lang}`;
      canonical.setAttribute('href', url.toString());
    }
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, ui: UI[lang], tr: (v) => translate(v, lang) }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** { lang, setLang, ui, tr } — `ui` : textes de l'interface ; `tr(valeur)` : contenu traduit. */
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang doit être utilisé dans <LanguageProvider>.');
  return ctx;
}
