import useGsap from '../hooks/useGsap.js';
import { gsap, standardSectionAnimations } from '../animations/gsapAnimations.js';
import { projects } from '../data/projects.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Projects() {
  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    standardSectionAnimations(ref.current);

    // Révélation des cartes : entrée en perspective, légère rotation qui se résorbe.
    gsap.utils.toArray('[data-project]', ref.current).forEach((card) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        rotateX: 6,
        transformPerspective: 900,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      });
    });
  }, []);

  return (
    <div ref={ref}>
      <Section id="projets" wave="a">
        <SectionHeading
          id="projets"
          eyebrow="03 · Projets"
          title="Chaque projet, une planète à explorer."
          description="Une sélection de réalisations, avec le problème résolu, les technologies utilisées et les liens vers le code lorsqu’ils sont disponibles."
        />

        <div className="flex flex-col gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} reversed={index % 2 === 1} />
          ))}
        </div>
      </Section>
    </div>
  );
}
