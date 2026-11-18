import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Projects() {
  return (
    <Section id="projets" className="border-t border-line">
      <SectionHeading
        id="projets"
        index="03"
        label="Projets"
        title="Des projets concrets, du besoin au code."
        text="Une sélection de réalisations : le problème de départ, ce que fait l’application et les technologies utilisées."
        aside={
          profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-paper"
            >
              Tous mes dépôts sur GitHub
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          )
        }
      />

      <div className="space-y-16 lg:space-y-24">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
