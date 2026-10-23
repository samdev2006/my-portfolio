import useGsap from '../hooks/useGsap.js';
import { standardSectionAnimations } from '../animations/gsapAnimations.js';
import { skillCategories } from '../data/skills.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SkillBadge from '../components/SkillBadge.jsx';
import { WorldAnchor } from '../components/WorldContext.jsx';

const ACCENT_HEX = { volt: '#4D8DFF', sun: '#FF6B1A', ion: '#16C7D9' };

// Largeur des cartes sur grand écran (grille de 6 colonnes) : lignes 4+2, 2+2+2 puis 6.
// Classes écrites en toutes lettres pour que Tailwind les détecte.
const SPANS = ['xl:col-span-4', 'xl:col-span-2', 'xl:col-span-2', 'xl:col-span-2', 'xl:col-span-2', 'xl:col-span-6'];

// Constellation décorative : points reliés, positions déterministes selon le nombre de technologies.
function Constellation({ count, color }) {
  const points = Array.from({ length: Math.max(count, 3) }).map((_, i, all) => {
    const t = i / (all.length - 1);
    return { x: 20 + t * 260, y: 60 + Math.sin(t * Math.PI * 1.6 + count) * 38 + (i % 2) * 14 };
  });
  return (
    <svg viewBox="0 0 300 120" aria-hidden="true" className="pointer-events-none absolute -right-4 -top-2 h-24 w-56 opacity-60">
      <polyline points={points.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke={color} strokeOpacity="0.4" strokeDasharray="2 4" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i % 3 === 0 ? 3.2 : 2} fill={color} />
      ))}
    </svg>
  );
}

export default function Skills() {
  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    standardSectionAnimations(ref.current);
  }, []);

  return (
    <div ref={ref}>
      <Section id="competences" wave="b" tint={false}>
        <SectionHeading
          id="competences"
          eyebrow="02 · Compétences"
          title="Ma pile technologique, touche par touche."
          description="Technologies utilisées, étudiées ou explorées selon les projets et le contexte. Survolez une touche du clavier 3D, ou un badge ci-dessous, pour en savoir plus."
        />

        {/* Clavier 3D « Tech Stack » : une touche par technologie, dessiné par le canvas Three.js fixe */}
        <div data-reveal className="glass relative mb-8 overflow-hidden rounded-3xl">
          <WorldAnchor
            name="skills"
            label="Clavier 3D dont chaque touche représente une technologie : liste complète ci-dessous"
            className="mx-auto h-[20rem] w-full max-w-3xl sm:h-[26rem] lg:h-[32rem]"
          />
        </div>

        <div data-reveal-stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          {skillCategories.map((category, index) => {
            const hex = ACCENT_HEX[category.color] || ACCENT_HEX.volt;
            return (
              <article key={category.id} className={`glass spotlight relative rounded-3xl p-6 sm:p-7 ${SPANS[index] || 'xl:col-span-2'}`}>
                <Constellation count={category.items.length} color={hex} />
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em]" style={{ color: hex }}>
                  {category.subtitle}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{category.title}</h3>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {category.items.map((item) => (
                    <SkillBadge key={item.name} name={item.name} description={item.description} color={category.color} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
