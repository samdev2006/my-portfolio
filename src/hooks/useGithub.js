import { useEffect, useState } from 'react';

const CACHE_KEY = 'gh-activity-v1';
const CACHE_MS = 60 * 60 * 1000; // 1 h : l'API publique est limitée à 60 requêtes / heure / visiteur.

/** Extrait le pseudo d'une URL GitHub (https://github.com/pseudo). */
export const githubUser = (url) => (url || '').replace(/\/+$/, '').split('/').pop();

function readCache(user) {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data.user === user && Date.now() - data.at < CACHE_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Stockage indisponible (navigation privée…) : pas de cache, rien de grave.
  }
}

/**
 * Profil et dépôts publics GitHub, chargés côté navigateur.
 * Renvoie { status: 'loading' | 'ready' | 'error', profile, repos }.
 * `exclude` : dépôts à ignorer (ex. le dépôt README du profil).
 */
export default function useGithub(user, { exclude = [] } = {}) {
  const [state, setState] = useState(() => {
    const cached = user ? readCache(user) : null;
    return cached ? { status: 'ready', ...cached } : { status: user ? 'loading' : 'error' };
  });

  useEffect(() => {
    if (!user || state.status === 'ready') return undefined;
    const controller = new AbortController();
    const get = (path) =>
      fetch(`https://api.github.com${path}`, {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json' },
      }).then((res) => {
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        return res.json();
      });

    Promise.all([get(`/users/${user}`), get(`/users/${user}/repos?per_page=100&sort=pushed`)])
      .then(([profile, repos]) => {
        const data = {
          user,
          at: Date.now(),
          profile: { publicRepos: profile.public_repos, createdAt: profile.created_at, url: profile.html_url },
          repos: repos
            .filter((repo) => !repo.fork && !repo.archived && !exclude.includes(repo.name) && repo.name !== user)
            .map((repo) => ({
              name: repo.name,
              description: repo.description || '',
              language: repo.language || '',
              stars: repo.stargazers_count,
              pushedAt: repo.pushed_at,
              url: repo.html_url,
              homepage: repo.homepage || '',
            })),
        };
        writeCache(data);
        setState({ status: 'ready', ...data });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error' });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return state;
}
