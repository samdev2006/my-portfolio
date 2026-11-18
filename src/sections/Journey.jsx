import { Briefcase, GraduationCap } from 'lucide-react';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

function Column({ icon: Icon, title, children }) {
  return (
    <div>
      <h3 data-reveal className="flex items-center gap-3 text-lg font-semibold tracking-tight">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-coal text-accent">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        {title}
      </h3>
      <ol data-reveal-stagger className="mt-8 border-t border-line">
        {children}
      </ol>
    </div>
  );
}

function Entry({ period, title, place, meta, text, tags = [], current = false }) {
  return (
    <li className="grid gap-x-6 gap-y-2 border-b border-line py-7 sm:grid-cols-[9.5rem_1fr]">
      <p className="font-mono text-xs leading-6 text-stone">
        {current && <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#28C840] align-middle" aria-hidden="true" />}
        {period}
      </p>
      <div>
        <p className="text-lg font-semibold tracking-tight text-paper">{title}</p>
        <p className="mt-1 text-sm text-paper/75">{place}</p>
        {meta && <p className="mt-1 text-xs text-stone">{meta}</p>}
        {text && <p className="mt-3 text-sm leading-relaxed text-stone">{text}</p>}
        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function Journey() {
  const { experiences, education } = profile;

  return (
    <Section id="parcours" className="border-t border-line">
      <SectionHeading id="parcours" index="06" label="Parcours" title="Une trajectoire, étape par étape." />

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-14">
        <Column icon={Briefcase} title="Expérience">
          {experiences.map((exp, i) => (
            <Entry
              key={`${exp.organization}-${exp.period}`}
              period={exp.period}
              title={exp.role}
              place={`${exp.organization}${exp.type ? ` · ${exp.type}` : ''}`}
              text={exp.description}
              tags={exp.stack}
              current={i === 0 && /depuis/i.test(exp.period)}
            />
          ))}
          {experiences.length === 0 && (
            <li className="py-7 text-sm text-stone">À la recherche d’un stage pour rejoindre une équipe technique.</li>
          )}
        </Column>

        <Column icon={GraduationCap} title="Formation">
          {education.map((edu) => (
            <Entry
              key={`${edu.degree}-${edu.period}`}
              period={edu.period}
              title={edu.degree}
              place={edu.school}
              meta={edu.location}
              text={edu.description}
            />
          ))}
        </Column>
      </div>
    </Section>
  );
}
