// Conteneur de section : espacement, ancre de navigation et "relief" ondulé en haut
// (transition visuelle entre sections, inspirée des couches de l'image de référence).

const WAVES = {
  a: 'M0 120 L0 64 C240 4 440 112 720 62 S1200 8 1440 72 L1440 120Z',
  b: 'M0 120 L0 40 C200 100 480 6 760 58 S1220 110 1440 36 L1440 120Z',
};

export default function Section({ id, wave = 'a', tint = true, className = '', children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative scroll-mt-16 py-24 sm:py-32 ${className}`}>
      {tint && (
        <>
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 -top-[59px] h-[60px] w-full"
          >
            <path d={WAVES[wave]} fill="rgba(16,20,25,0.62)" />
          </svg>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-night/60" />
        </>
      )}
      <div className="container-x relative">{children}</div>
    </section>
  );
}
