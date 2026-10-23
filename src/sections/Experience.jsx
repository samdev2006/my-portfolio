import useGsap from '../hooks/useGsap.js';
import { gsap, standardSectionAnimations } from '../animations/gsapAnimations.js';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Planet from '../components/Planet.jsx';

export default function Experience() {
  const items = profile.experiences;
  const hasItems = items.length > 0;

  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    standardSectionAnimations(ref.current);

    // La ligne orbitale se trace au fil du scroll.
    gsap.fromTo(
      '[data-timeline-line]',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      }
    );

    gsap.utils.toArray('[data-timeline-item]', ref.current).forEach((item) => {
      gsap.from(item, {
        x: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', once: true },
      });
    });
  }, []);

  return (
    <div ref={ref}>
      <Section id="parcours" wave="b" tint={false}>
        <SectionHeading
          id="parcours"
          eyebrow="05 · Parcours"
          title="Une trajectoire, étape par étape."
          description="Stages, expériences professionnelles et réalisations techniques, présentés dans l’ordre où ils se sont produits."
        />

        <div data-timeline className="relative ml-3 max-w-3xl sm:ml-6">
          <span
            aria-hidden="true"
            data-timeline-line
            className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-sun via-volt to-transparent"
          />

          {hasItems ? (
            <ol className="space-y-10">
              {items.map((item) => (
                <li key={`${item.period}-${item.role}`} data-timeline-item className="relative pl-10">
                  <span className="absolute -left-[7px] top-1.5">
                    <Planet variant="sun" size={15} />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-sun">
                    {item.period}
                    {item.type ? ` · ${item.type}` : ''}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{item.role}</h3>
                  {item.organization && <p className="text-sm text-ion">{item.organization}</p>}
                  {item.description && <p className="mt-3 text-sm leading-relaxed text-mist/85">{item.description}</p>}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mist/80">
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                  {item.stack && item.stack.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <li key={tech} className="rounded-full border border-volt/30 bg-volt/10 px-3 py-1 font-mono text-xs">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <div data-timeline-item className="relative pl-10">
              <span className="absolute -left-[7px] top-1.5">
                <Planet variant="teal" size={15} />
              </span>
              <div className="glass rounded-2xl border-dashed p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ion">Prochaine étape</p>
                <h3 className="mt-2 text-xl font-bold">{profile.experiencePlaceholder.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist/85">{profile.experiencePlaceholder.text}</p>
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
