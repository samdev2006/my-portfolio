import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

export default function About() {
  const { about } = profile;

  return (
    <Section id="apropos">
      <SectionHeading id="apropos" index="01" label="À propos" title="Un développeur qui relie l’idée au produit." />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <p
          data-reveal
          className="font-display text-2xl font-medium leading-snug tracking-tight text-paper sm:text-[2rem] lg:col-span-6"
        >
          {about.intro}
        </p>
        <div className="space-y-6 lg:col-span-5 lg:col-start-8">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} data-reveal className="text-base leading-relaxed text-stone sm:text-[1.05rem]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <dl data-reveal-stagger className="mt-20 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {about.facts.map((fact) => (
          <div key={fact.label} className="border-b border-line py-6 sm:pr-6 lg:border-b-0">
            <dt className="label">{fact.label}</dt>
            <dd className="mt-3 font-display text-lg font-medium tracking-tight text-paper">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <ul data-reveal-stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {about.values.map((value, index) => (
          <li key={value.title} className="bg-ink p-7">
            <span className="font-mono text-xs text-accent">0{index + 1}</span>
            <h3 className="mt-8 text-lg font-semibold tracking-tight">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{value.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
