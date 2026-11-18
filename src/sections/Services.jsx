import { Globe, LayoutDashboard, Server, Smartphone, Database, Wrench, Palette, Film, Camera } from 'lucide-react';
import { profile } from '../data/profile.js';
import Section, { trackSpotlight } from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

const ICONS = { Globe, LayoutDashboard, Server, Smartphone, Database, Wrench, Palette, Film, Camera };

const GROUPS = ['dev', 'creation'];

export default function Services() {
  const { tr, ui } = useLang();
  return (
    <Section id="services" className="border-t border-line">
      <SectionHeading
        id="services"
        index="07"
        label={ui.services.label}
        title={ui.services.title}
        text={ui.services.text}
      />

      <div className="space-y-14">
        {GROUPS.map((group) => {
          const list = profile.services.filter((service) => service.group === group);
          if (!list.length) return null;
          return (
            <div key={group} className="grid gap-6 lg:grid-cols-12">
              <h3 data-reveal className="label pt-2 lg:col-span-3">
                {ui.services.groups[group]}
              </h3>
              <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                {list.map((service) => {
                  const Icon = ICONS[service.icon] || Globe;
                  return (
                    <li key={service.id} onPointerMove={trackSpotlight} className="card spotlight p-6">
                      <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                      <p className="mt-8 font-display text-lg font-semibold tracking-tight text-paper">{tr(service.title)}</p>
                      <p className="mt-2 text-sm leading-relaxed text-stone">{tr(service.text)}</p>
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
