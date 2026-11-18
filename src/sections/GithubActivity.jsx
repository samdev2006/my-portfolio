import { ArrowUpRight, Star, GitBranch } from 'lucide-react';
import { profile } from '../data/profile.js';
import useGithub, { githubUser } from '../hooks/useGithub.js';
import Section, { trackSpotlight } from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

// Couleurs officielles des langages sur GitHub.
const LANG_COLORS = {
  Java: '#B07219',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Dart: '#00B4AB',
  Python: '#3572A5',
  'C#': '#178600',
  PHP: '#4F5D95',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Vue: '#41B883',
  Kotlin: '#A97BFF',
};
const colorOf = (lang) => LANG_COLORS[lang] || '#9A968F';

const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });
function timeAgo(iso) {
  const days = Math.round((new Date(iso) - Date.now()) / 86_400_000);
  if (Math.abs(days) < 1) return "aujourd'hui";
  if (Math.abs(days) < 30) return rtf.format(days, 'day');
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), 'month');
  return rtf.format(Math.round(days / 365), 'year');
}

const monthYear = (iso) => new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(new Date(iso));

function languageShares(repos) {
  const counts = {};
  repos.forEach((repo) => {
    if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, share: Math.round((count / total) * 100) }));
}

function RepoCard({ repo }) {
  return (
    <li>
      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        onPointerMove={trackSpotlight}
        className="card spotlight group flex h-full flex-col p-6 transition-colors hover:border-paper/20"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="flex min-w-0 items-center gap-2 font-mono text-sm text-paper">
            <GitBranch className="h-4 w-4 shrink-0 text-stone" aria-hidden="true" />
            <span className="truncate">{repo.name}</span>
          </p>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-stone transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
            aria-hidden="true"
          />
        </div>
        <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-stone">
          {repo.description || 'Pas encore de description.'}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.7rem] text-stone">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: colorOf(repo.language) }} aria-hidden="true" />
              {repo.language}
            </span>
          )}
          {repo.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3" aria-hidden="true" />
              {repo.stars}
            </span>
          )}
          <span>Mis à jour {timeAgo(repo.pushedAt)}</span>
        </div>
      </a>
    </li>
  );
}

export default function GithubActivity() {
  const user = githubUser(profile.socials.github);
  const { status, profile: gh, repos = [] } = useGithub(user);

  if (!user) return null;

  const languages = languageShares(repos);
  const stats =
    status === 'ready'
      ? [
          { label: 'Dépôts publics', value: gh.publicRepos },
          { label: 'Langage principal', value: languages[0] ? languages[0].name : '—' },
          { label: 'Dernière activité', value: repos[0] ? timeAgo(repos[0].pushedAt) : '—' },
          { label: 'Sur GitHub depuis', value: monthYear(gh.createdAt) },
        ]
      : null;

  return (
    <Section id="github" className="border-t border-line">
      <SectionHeading
        id="github"
        index="04"
        label="Activité GitHub"
        title="Ce que je code en ce moment."
        text="Mes dépôts publics, chargés en direct depuis GitHub : exercices, projets d’école et projets personnels."
        aside={
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-paper"
          >
            @{user} sur GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        }
      />

      <div data-reveal aria-live="polite" aria-busy={status === 'loading'}>
        {status === 'error' && (
          <p className="card p-7 text-sm text-stone">
            Impossible de charger l’activité GitHub pour le moment.{' '}
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-paper underline underline-offset-4">
              Voir mes dépôts directement sur GitHub
            </a>
            .
          </p>
        )}

        {status === 'loading' && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Chargement des dépôts">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="card h-44 animate-pulse bg-coal/60" />
            ))}
          </ul>
        )}

        {status === 'ready' && (
          <>
            <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="border-b border-line py-5 pr-4 sm:py-6 sm:pr-6">
                  <dt className="label">{stat.label}</dt>
                  <dd className="mt-3 font-display text-xl font-medium tracking-tight text-paper first-letter:uppercase sm:text-2xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            {languages.length > 0 && (
              <div className="mt-10">
                <p className="label">Langages des dépôts</p>
                <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-graphite" role="img" aria-label={languages.map((l) => `${l.name} ${l.share} %`).join(', ')}>
                  {languages.map((lang) => (
                    <span key={lang.name} style={{ width: `${lang.share}%`, background: colorOf(lang.name) }} className="h-full" />
                  ))}
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-stone" aria-hidden="true">
                  {languages.map((lang) => (
                    <li key={lang.name} className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: colorOf(lang.name) }} />
                      <span className="text-paper/85">{lang.name}</span> {lang.share} %
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.slice(0, 6).map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </ul>
          </>
        )}
      </div>
    </Section>
  );
}
