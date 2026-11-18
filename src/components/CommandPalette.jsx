import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowRight, Copy, CornerDownLeft, Github, Hash, Linkedin, Mail, Search } from 'lucide-react';
import { profile } from '../data/profile.js';
import { copyText } from '../utils/clipboard.js';

/** Ouvre la palette depuis n'importe quel composant (ex. bouton de la navbar). */
export const openCommandPalette = () => window.dispatchEvent(new Event('open-command-palette'));

const SECTIONS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'apropos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'github', label: 'Activité GitHub' },
  { id: 'creations', label: 'Créations' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Palette de commandes : Ctrl+K / ⌘K. Navigation entre sections et actions rapides. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const commands = useMemo(() => {
    const { contact, socials, cv } = profile;
    const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    const openUrl = (url) => () => window.open(url, '_blank', 'noopener,noreferrer');
    return [
      ...SECTIONS.filter((s) => s.id === 'accueil' || document.getElementById(s.id)).map((s) => ({
        id: `go-${s.id}`,
        group: 'Aller à',
        label: s.label,
        icon: Hash,
        run: go(s.id),
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copier mon adresse e-mail',
        hint: contact.email,
        icon: Copy,
        run: async () => {
          await copyText(contact.email);
          notify('Adresse e-mail copiée');
        },
      },
      { id: 'mail', group: 'Actions', label: 'M’écrire un e-mail', icon: Mail, run: () => (window.location.href = `mailto:${contact.email}`) },
      {
        id: 'cv',
        group: 'Actions',
        label: 'Télécharger mon CV',
        hint: 'PDF',
        icon: ArrowDownToLine,
        run: () => {
          const link = document.createElement('a');
          link.href = cv.path;
          link.download = cv.downloadName;
          link.click();
        },
      },
      socials.github && { id: 'github', group: 'Liens', label: 'Ouvrir mon GitHub', icon: Github, run: openUrl(socials.github) },
      socials.linkedin && { id: 'linkedin', group: 'Liens', label: 'Ouvrir mon LinkedIn', icon: Linkedin, run: openUrl(socials.linkedin) },
    ].filter(Boolean);
    // Recalculé à chaque ouverture : les sections présentes peuvent varier.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return commands;
    return commands.filter((c) => normalize(`${c.label} ${c.group} ${c.hint || ''}`).includes(q));
  }, [commands, query]);

  // Raccourci global et événement d'ouverture.
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onOpen);
    };
  }, []);

  // Ouverture : champ vidé, focus, scroll bloqué ; fermeture : focus rendu.
  useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;
    setQuery('');
    setActive(0);
    document.documentElement.style.overflow = 'hidden';
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(id);
      document.documentElement.style.overflow = '';
      if (opener && opener.focus) opener.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  // L'élément actif reste visible quand on navigue au clavier.
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const execute = (command) => {
    if (!command) return;
    setOpen(false);
    // Laisse la palette se fermer (et le scroll se débloquer) avant d'agir.
    window.setTimeout(() => command.run(), 30);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      execute(results[active]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Tab') {
      event.preventDefault(); // le focus reste dans le champ : on navigue avec les flèches
    }
  };

  let lastGroup = '';

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <div role="dialog" aria-modal="true" aria-label="Palette de commandes" className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-coal shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-stone" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Rechercher une section ou une action…"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                className="h-14 w-full bg-transparent text-[0.95rem] text-paper placeholder:text-paper/35 focus:outline-none"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-stone">Échap</kbd>
            </div>

            <ul id="palette-list" ref={listRef} role="listbox" aria-label="Commandes" className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-stone">Aucun résultat pour « {query} ».</li>}
              {results.map((command, index) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                const Icon = command.icon;
                const selected = index === active;
                return (
                  <li key={command.id} role="presentation">
                    {showGroup && <p className="label px-3 pb-1.5 pt-3 text-[0.62rem]">{command.group}</p>}
                    <div
                      id={`palette-${command.id}`}
                      role="option"
                      aria-selected={selected}
                      data-index={index}
                      onMouseMove={() => setActive(index)}
                      onClick={() => execute(command)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                        selected ? 'bg-graphite text-paper' : 'text-paper/80'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${selected ? 'text-accent' : 'text-stone'}`} aria-hidden="true" />
                      <span className="flex-1 truncate">{command.label}</span>
                      {command.hint && <span className="hidden truncate font-mono text-[0.7rem] text-stone sm:inline">{command.hint}</span>}
                      {selected && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-stone" aria-hidden="true" />}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.65rem] text-stone">
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1">↑</kbd>
                <kbd className="rounded border border-line px-1">↓</kbd> naviguer
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1">↵</kbd> ouvrir
              </span>
              <span className="ml-auto inline-flex items-center gap-1">
                <ArrowRight className="h-3 w-3" aria-hidden="true" /> Ctrl / ⌘ + K
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[96] -translate-x-1/2 rounded-full border border-line bg-graphite px-4 py-2 text-sm text-paper shadow-lg transition-all duration-300 ${
          toast ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        {toast}
      </div>
    </>
  );
}
