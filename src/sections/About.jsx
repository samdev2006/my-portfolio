import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function About() {
  const { about } = profile;
  const { tr, ui } = useLang();

  return (
    <Section id="apropos">
      <SectionHeading id="apropos" index="01" label={ui.about.label} title={ui.about.title} />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <p
          data-reveal
          className="font-display text-2xl font-medium leading-snug tracking-tight text-paper sm:text-[2rem] lg:col-span-6"
        >
          {tr(about.intro)}
        </p>
        <div className="space-y-6 lg:col-span-5 lg:col-start-8">
          {tr(about.paragraphs).map((paragraph, i) => (
            <p key={i} data-reveal className="text-base leading-relaxed text-stone sm:text-[1.05rem]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <dl data-reveal-stagger className="mt-20 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {about.facts.map((fact, i) => (
          <div key={i} className="border-b border-line py-6 sm:pr-6 lg:border-b-0">
            <dt className="label">{tr(fact.label)}</dt>
            <dd className="mt-3 font-display text-lg font-medium tracking-tight text-paper">{tr(fact.value)}</dd>
          </div>
        ))}
      </dl>

      <ul data-reveal-stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {about.values.map((value, index) => (
          <li key={index} className="bg-ink p-7">
            <span className="font-mono text-xs text-accent">0{index + 1}</span>
            <h3 className="mt-8 text-lg font-semibold tracking-tight">{tr(value.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{tr(value.text)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
