import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';

// Résultat mis en cache : une seule vérification pour toute la page.
let cachedCheck = null;

function checkCv() {
  if (!cachedCheck) {
    cachedCheck = fetch(profile.cv.path, { method: 'HEAD' })
      .then((res) => {
        const type = (res.headers.get('content-type') || '').toLowerCase();
        // En développement, un fichier absent renvoie index.html (text/html) avec un code 200.
        return res.ok && !type.includes('text/html');
      })
      .catch(() => false);
  }
  return cachedCheck;
}

/** true si le PDF du CV est réellement présent dans public/cv/. */
export default function useCvAvailable() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    checkCv().then((ok) => {
      if (active) setAvailable(ok);
    });
    return () => {
      active = false;
    };
  }, []);

  return available;
}
