/**
 * En-tête de section : numéro + libellé, grand titre animé mot par mot, texte facultatif.
 * `aside` s'affiche à droite du titre sur grand écran (ex. filtres, lien).
 */
export default function SectionHeading({ id, index, label, title, text, aside }) {
  return (
    <header className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="max-w-3xl">
        <p data-reveal className="label flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line" aria-hidden="true" />
          {label}
        </p>
        <h2
          id={`${id}-title`}
          data-words
          className="mt-6 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl"
        >
          <span className="sr-only">{title}</span>
          <span aria-hidden="true">
            {title.split(' ').map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span data-word className="inline-block">
                  {word}
                  {' '}
                </span>
              </span>
            ))}
          </span>
        </h2>
        {text && (
          <p data-reveal className="mt-6 max-w-2xl text-base leading-relaxed text-stone sm:text-lg">
            {text}
          </p>
        )}
      </div>
      {aside && <div data-reveal>{aside}</div>}
    </header>
  );
}
