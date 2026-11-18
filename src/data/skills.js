// Compétences par catégorie. Aucun pourcentage de maîtrise : uniquement les outils utilisés.
// Ajouter une compétence : ajoutez son nom dans `items` de la bonne catégorie.
// Texte traduisible : { fr: '…', en: '…' } ; les noms de technologies restent de simples chaînes.

export const skillCategories = [
  { id: 'frontend', title: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { id: 'backend', title: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'Express.js', 'PHP', { fr: 'API REST', en: 'REST APIs' }] },
  { id: 'mobile', title: 'Mobile', items: ['Flutter', 'Dart'] },
  { id: 'data', title: { fr: 'Données', en: 'Data' }, items: ['MySQL', 'Firebase'] },
  { id: 'tools', title: { fr: 'Outils', en: 'Tools' }, items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman'] },
  {
    id: 'creative',
    title: { fr: 'Création', en: 'Creative' },
    items: [
      { fr: 'Affiches', en: 'Posters' },
      { fr: 'Montage vidéo', en: 'Video editing' },
      { fr: 'Retouche photo', en: 'Photo retouching' },
    ],
  },
];

// Technologies mises en avant dans le bandeau défilant de l'accueil.
export const marqueeStack = [
  'React',
  'Spring Boot',
  'Java',
  'Node.js',
  'Flutter',
  'MySQL',
  'Firebase',
  'Tailwind CSS',
  'Docker',
  'REST API',
  'Git',
];
