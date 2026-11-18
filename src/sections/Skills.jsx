import { skillCategories } from '../data/skills.js';
import Section, { trackSpotlight } from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Skills() {
  const { tr, ui } = useLang();
  return (
    <Section id="competences" className="border-t border-line">
      <SectionHeading
        id="competences"
        index="02"
        label={ui.skills.label}
        title={ui.skills.title}
        text={ui.skills.text}
      />

      <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <li key={category.id} onPointerMove={trackSpotlight} className="card spotlight p-7">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold tracking-tight">{tr(category.title)}</h3>
              <span className="font-mono text-xs text-stone">
                {String(index + 1).padStart(2, '0')} / {String(skillCategories.length).padStart(2, '0')}
              </span>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {tr(category.items).map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
