import { skillCategories } from '../data/skills.js';
import Section, { trackSpotlight } from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

export default function Skills() {
  return (
    <Section id="competences" className="border-t border-line">
      <SectionHeading
        id="competences"
        index="02"
        label="Compétences"
        title="Les outils avec lesquels je construis."
        text="Technologies utilisées en formation, en stage et sur mes projets personnels."
      />

      <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <li key={category.id} onPointerMove={trackSpotlight} className="card spotlight p-7">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold tracking-tight">{category.title}</h3>
              <span className="font-mono text-xs text-stone">
                {String(index + 1).padStart(2, '0')} / {String(skillCategories.length).padStart(2, '0')}
              </span>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {category.items.map((item) => (
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
