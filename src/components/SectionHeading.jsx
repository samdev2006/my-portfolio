// Titre de section : eyebrow + titre (mot par mot) + description.
// Révélé au scroll via data-reveal-heading / data-hsoft / data-hword (voir gsapAnimations.js).

export default function SectionHeading({ id, eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';
  const words = title.split(' ');

  return (
    <header data-reveal-heading className={`mb-12 flex max-w-3xl flex-col gap-4 sm:mb-16 ${alignment}`}>
      <p data-hsoft className="eyebrow">
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden align-bottom pb-1">
              <span data-hword className="inline-block">
                {word}
              </span>
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h2>
      {description && (
        <p data-hsoft className="text-base leading-relaxed text-mist/80 sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
