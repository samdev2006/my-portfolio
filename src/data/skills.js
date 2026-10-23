// Compétences par catégorie. Aucun pourcentage : seules des descriptions factuelles.
// Ajouter une compétence : ajoutez { name, description } dans l'items de la bonne catégorie.
// Technologies présentées comme utilisées, étudiées ou explorées selon le contexte : aucun niveau de maîtrise n'est affirmé.

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Interfaces web',
    color: 'volt',
    items: [
      { name: 'React.js', description: 'Composants, hooks et interfaces dynamiques.' },
      { name: 'JavaScript', description: 'JavaScript moderne (ES6+).' },
      { name: 'HTML', description: 'Structure sémantique et accessible.' },
      { name: 'CSS', description: 'Mises en page responsives et animations.' },
      { name: 'Tailwind CSS', description: 'Design utilitaire rapide et cohérent.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Logique serveur & API',
    color: 'sun',
    items: [
      { name: 'Java', description: 'Programmation orientée objet côté serveur.' },
      { name: 'Spring Boot', description: 'Services et API REST structurés.' },
      { name: 'PHP', description: 'Développement web côté serveur.' },
      { name: 'API REST', description: 'Conception et consommation d’API.' },
    ],
  },
  {
    id: 'databases',
    title: 'Bases de données',
    subtitle: 'Stockage & données',
    color: 'ion',
    items: [
      { name: 'MySQL', description: 'Base relationnelle : modélisation et requêtes.' },
      { name: 'Firebase', description: 'Base de données et services temps réel.' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    subtitle: 'Applications multiplateformes',
    color: 'volt',
    items: [
      { name: 'Flutter', description: 'Applications mobiles multiplateformes.' },
      { name: 'Dart', description: 'Langage de Flutter.' },
    ],
  },
  {
    id: 'tools',
    title: 'Outils',
    subtitle: 'Workflow & livraison',
    color: 'sun',
    items: [
      { name: 'Git', description: 'Gestion de versions.' },
      { name: 'GitHub', description: 'Hébergement de code et collaboration.' },
      { name: 'Docker', description: 'Conteneurisation d’applications.' },
      { name: 'VS Code', description: 'Environnement de développement quotidien.' },
    ],
  },
  {
    id: 'creative',
    title: 'Création visuelle',
    subtitle: 'Image & vidéo',
    color: 'ion',
    items: [
      { name: 'Création d’affiches', description: 'Affiches et visuels de communication.' },
      { name: 'Montage vidéo', description: 'Montage et habillage de vidéos.' },
      { name: 'Retouche photo', description: 'Retouche et amélioration d’images.' },
    ],
  },
];
