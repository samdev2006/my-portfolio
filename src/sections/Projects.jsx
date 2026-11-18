import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Projects() {
  const { ui } = useLang();
  return (
    <Section id="projets" className="border-t border-line">
      <SectionHeading
        id="projets"
        index="03"
        label={ui.projects.label}
        title={ui.projects.title}
        text={ui.projects.text}
        aside={
          profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-paper"
            >
              {ui.projects.allRepos}
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
