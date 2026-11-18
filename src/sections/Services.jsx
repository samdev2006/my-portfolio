import { Globe, LayoutDashboard, Server, Smartphone, Database, Wrench, Palette, Film, Camera } from 'lucide-react';
import { profile } from '../data/profile.js';
import Section, { trackSpotlight } from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const ICONS = { Globe, LayoutDashboard, Server, Smartphone, Database, Wrench, Palette, Film, Camera };

const GROUPS = [
  { id: 'dev', title: 'Développement' },
  { id: 'creation', title: 'Création visuelle' },
];

export default function Services() {
  return (
    <Section id="services" className="border-t border-line">
      <SectionHeading
        id="services"
        index="06"
        label="Services"
        title="Ce que je peux réaliser pour vous."
        text="Du développement web, mobile et d’API, mais aussi de la création visuelle."
      />

      <div className="space-y-14">
        {GROUPS.map((group) => {
          const list = profile.services.filter((service) => service.group === group.id);
          if (!list.length) return null;
          return (
            <div key={group.id} className="grid gap-6 lg:grid-cols-12">
              <h3 data-reveal className="label pt-2 lg:col-span-3">
                {group.title}
              </h3>
              <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                {list.map((service) => {
                  const Icon = ICONS[service.icon] || Globe;
                  return (
                    <li key={service.id} onPointerMove={trackSpotlight} className="card spotlight p-6">
                      <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                      <p className="mt-8 font-display text-lg font-semibold tracking-tight text-paper">{service.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-stone">{service.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
