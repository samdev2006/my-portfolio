import { Globe, LayoutDashboard, Server, Smartphone, Database, Wrench, Palette, Film, Camera } from 'lucide-react';
import useGsap from '../hooks/useGsap.js';
import { standardSectionAnimations } from '../animations/gsapAnimations.js';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const ICONS = { Globe, LayoutDashboard, Server, Smartphone, Database, Wrench, Palette, Film, Camera };
const COLORS = {
  sun: { text: 'text-sun', border: 'group-hover:border-sun/60', dot: 'bg-sun', hex: '#FF6B1A' },
  volt: { text: 'text-volt', border: 'group-hover:border-volt/60', dot: 'bg-volt', hex: '#4D8DFF' },
  ion: { text: 'text-ion', border: 'group-hover:border-ion/60', dot: 'bg-ion', hex: '#16C7D9' },
};

// Deux familles de services : développement et création visuelle.
const GROUPS = [
  { id: 'dev', title: 'Développement', subtitle: 'Web · mobile · API · données' },
  { id: 'creation', title: 'Création visuelle', subtitle: 'Affiches · montage vidéo · retouche photo' },
];

function ServiceCard({ service, number }) {
  const Icon = ICONS[service.icon] || Globe;
  const color = COLORS[service.color] || COLORS.volt;

  return (
    <article
      className={`group glass relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 ${color.border}`}
    >
      {/* Planète + satellite en orbite (la rotation s'active au survol) */}
      <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-dashed transition-transform duration-[1500ms] ease-out group-hover:rotate-180"
          style={{ borderColor: `${color.hex}66` }}
        >
          <span className={`absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ${color.dot}`} />
        </span>
        <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-ash ${color.text}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <span className="absolute right-5 top-5 font-mono text-xs text-mist/30">{String(number).padStart(2, '0')}</span>
      <h3 className="text-lg font-bold leading-snug">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mist/80">{service.text}</p>
    </article>
  );
}

export default function Services() {
  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    standardSectionAnimations(ref.current);
  }, []);

  let counter = 0;

  return (
    <div ref={ref}>
      <Section id="services" wave="b">
        <SectionHeading
          id="services"
          eyebrow="07 · Services"
          title="Ce que je peux réaliser."
          description="Du développement web, mobile et d’API, mais aussi de la création visuelle : affiches, montage vidéo et retouche photo."
        />

        <div className="space-y-14">
          {GROUPS.map((group) => {
            // Un service sans `group` est rangé dans « Développement ».
            const items = profile.services.filter((service) => (service.group || 'dev') === group.id);
            if (!items.length) return null;
            return (
              <div key={group.id}>
                <div data-reveal className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold sm:text-2xl">{group.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist/60">{group.subtitle}</p>
                </div>
                <div data-reveal-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((service) => {
                    counter += 1;
                    return <ServiceCard key={service.id} service={service} number={counter} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
