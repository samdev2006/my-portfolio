import { Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import Button from './Button.jsx';
import ProjectVisual from './ProjectVisual.jsx';

/** Grande carte de projet. `reversed` inverse la disposition sur grand écran (asymétrie). */
export default function ProjectCard({ project, index, reversed = false }) {
  const { name, tagline, description, problem, features, tech, repoUrl, demoUrl, placeholder } = project;

  // Lumière qui suit le curseur : variables CSS lues par .spotlight::before.
  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <article
      data-project
      onPointerMove={onPointerMove}
      className={`group glass spotlight grid gap-6 rounded-[2rem] p-4 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8 ${
        placeholder ? 'border-dashed' : ''
      }`}
    >
      <div className={`${reversed ? 'lg:order-2' : ''}`}>
        <ProjectVisual project={project} />
      </div>

      <div className="flex flex-col justify-center py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-sun">Planète 0{index + 1}</span>
          {placeholder && (
            <span className="rounded-full border border-mist/20 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mist/60">
              Emplacement libre
            </span>
          )}
        </div>

        <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{name}</h3>
        <p className="mt-1 text-sm font-medium text-ion">{tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-mist/85 sm:text-base">{description}</p>

        <div className="mt-5 rounded-2xl border border-mist/10 bg-void/40 p-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-sun">Problème résolu</p>
          <p className="mt-2 text-sm leading-relaxed text-mist/85">{problem}</p>
        </div>

        <ul className="mt-5 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-mist/85">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ion" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {tech.length > 0 && (
          <ul aria-label="Technologies utilisées" className="mt-5 flex flex-wrap gap-2">
            {tech.map((item) => (
              <li key={item} className="rounded-full border border-volt/30 bg-volt/10 px-3 py-1 font-mono text-xs text-snow">
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            href={repoUrl || undefined}
            external
            icon={Github}
            variant="outline"
            disabled={!repoUrl}
            disabledReason="Lien du code source bientôt disponible"
          >
            Code source
          </Button>
          <Button
            href={demoUrl || undefined}
            external
            icon={ExternalLink}
            variant="ghost"
            disabled={!demoUrl}
            disabledReason="Démonstration non disponible pour le moment"
          >
            Démonstration
          </Button>
        </div>
      </div>
    </article>
  );
}
