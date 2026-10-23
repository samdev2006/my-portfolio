import { GraduationCap } from 'lucide-react';
import useGsap from '../hooks/useGsap.js';
import { standardSectionAnimations } from '../animations/gsapAnimations.js';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import OrbitLines from '../components/OrbitLines.jsx';

export default function Education() {
  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    standardSectionAnimations(ref.current);
  }, []);

  return (
    <div ref={ref}>
      <Section id="formation" wave="a" className="!py-20 sm:!py-24">
        <SectionHeading id="formation" eyebrow="06 · Formation" title="Mon parcours académique." />

        <div data-reveal-stagger className="grid gap-5 md:grid-cols-2">
          {profile.education.map((entry) => (
            <article key={entry.degree} className="glass spotlight relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <OrbitLines className="-right-24 -top-24 h-72 w-72 opacity-60" color="#16C7D9" count={3} />
              <GraduationCap className="relative h-7 w-7 text-sun" aria-hidden="true" />
              <h3 className="relative mt-5 text-xl font-bold leading-snug sm:text-2xl">{entry.degree}</h3>
              {/* Les champs vides (non confirmés) ne sont pas affichés */}
              {entry.school && <p className="relative mt-2 text-sm font-medium text-ion">{entry.school}</p>}
              {(entry.period || entry.location) && (
                <p className="relative mt-1 font-mono text-xs uppercase tracking-[0.18em] text-mist/60">
                  {[entry.period, entry.location].filter(Boolean).join(' · ')}
                </p>
              )}
              {entry.description && <p className="relative mt-4 text-sm leading-relaxed text-mist/85">{entry.description}</p>}
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
