import { useEffect, useState } from 'react';

// Une seule vérification par fichier pour toute la page.
const checks = new Map();

function checkFile(path) {
  if (!checks.has(path)) {
    checks.set(
      path,
      fetch(path, { method: 'HEAD' })
        .then((res) => {
          const type = (res.headers.get('content-type') || '').toLowerCase();
          // En développement, un fichier absent renvoie index.html (text/html) avec un code 200.
          return res.ok && !type.includes('text/html');
        })
        .catch(() => false)
    );
  }
  return checks.get(path);
}

/** true si le fichier (le PDF du CV) est réellement présent. */
export default function useCvAvailable(path) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    if (!path) {
      setAvailable(false);
      return undefined;
    }
    checkFile(path).then((ok) => {
      if (active) setAvailable(ok);
    });
    return () => {
      active = false;
    };
  }, [path]);

  return available;
}
