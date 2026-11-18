import useGsap from '../hooks/useGsap.js';
import { revealSection } from '../animations/gsapAnimations.js';

/** Section de page : espacement commun, séparateur, révélations au scroll. */
export default function Section({ id, className = '', children }) {
  const ref = useGsap(({ reduced }) => {
    if (!reduced) revealSection(ref.current);
  }, []);

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className={`relative py-24 sm:py-32 lg:py-36 ${className}`}>
      <div className="page-x">{children}</div>
    </section>
  );
}

/** Fait suivre la lumière de `.spotlight` au pointeur. */
export function trackSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}
