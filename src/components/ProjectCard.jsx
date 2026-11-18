import { ArrowUpRight, Github } from 'lucide-react';
import Button from './Button.jsx';

function hostOf(url) {
  try {
    return new URL(url).host;
  } catch {
    return '';
  }
}

/** Visuel du projet dans un cadre de navigateur. Sans capture : couverture typographique. */
function ProjectVisual({ project }) {
  const address = hostOf(project.demoUrl) || `${project.id}.app`;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-graphite shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
          <span className="h-2 w-2 rounded-full bg-paper/20" />
        </span>
        <span className="mx-auto truncate rounded-md bg-ink/60 px-3 py-1 font-mono text-[0.68rem] text-stone">{address}</span>
        <span className="w-[34px]" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col justify-between p-8 sm:p-10"
            style={{
              background: `radial-gradient(120% 90% at 100% 0%, ${project.accent}55, transparent 60%), radial-gradient(80% 80% at 0% 100%, ${project.accent}22, transparent 60%), #141416`,
            }}
          >
            <span className="label">{project.tagline}</span>
            <span className="font-display text-5xl font-semibold tracking-[-0.04em] text-paper sm:text-6xl">
              {project.name}
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-paper/50">Capture bientôt disponible</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1;

  return (
    <article
      aria-labelledby={`projet-${project.id}`}
      className="group grid grid-cols-1 items-center gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:gap-14 lg:pt-16"
    >
      <div data-reveal className={`min-w-0 lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
        <ProjectVisual project={project} />
      </div>

      <div data-reveal className={`min-w-0 lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, '0')}</span>
          {project.status && (
            <span className="chip">
              <span
                className={`mr-2 h-1.5 w-1.5 rounded-full ${project.status === 'En ligne' ? 'bg-[#28C840]' : 'bg-[#FEBC2E]'}`}
                aria-hidden="true"
              />
              {project.status}
            </span>
          )}
        </div>

        <h3 id={`projet-${project.id}`} className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-2 font-display text-lg text-paper/70">{project.tagline}</p>

        <p className="mt-6 leading-relaxed text-stone">{project.description}</p>

        {project.problem && (
          <p className="mt-5 border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-paper/80">
            <span className="label mb-1 block text-accent">Problème résolu</span>
            {project.problem}
          </p>
        )}

        {project.features.length > 0 && (
          <ul className="mt-6 grid gap-2 text-sm text-paper/85">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="mt-[0.55rem] h-1 w-3 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {project.tech.length > 0 && (
          <ul aria-label="Technologies" className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(project.demoUrl || project.repoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.demoUrl && (
              <Button href={project.demoUrl} iconRight={ArrowUpRight} variant="light" size="sm">
                Voir le site
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} icon={Github} variant="outline" size="sm">
                Code source
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
