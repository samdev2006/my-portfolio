import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Bouton de retour en haut, visible après un certain défilement. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#accueil"
      aria-label="Retour en haut de la page"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-mist/20 bg-night/80 text-snow backdrop-blur transition-all duration-300 hover:border-sun hover:text-sun sm:bottom-8 sm:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
