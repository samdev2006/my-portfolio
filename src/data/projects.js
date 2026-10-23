// Projets du portfolio. Modifiez ce fichier pour ajouter ou changer un projet.
//
// Champs :
//  - id, name, tagline, description, problem
//  - features : liste de fonctionnalités (à ajuster selon ce qui est réellement implémenté)
//  - tech : technologies (à ajuster selon l'implémentation réelle)
//  - repoUrl : lien vers le code source ('' = lien désactivé)
//  - demoUrl : lien vers la démo ('' = lien désactivé)
//  - image : { src, alt } pour une vraie capture (sinon visuel provisoire généré)
//  - planet : 'sun' | 'teal' | 'ringed' | 'blue' (illustration provisoire)
//  - placeholder : true tant que le projet n'est pas finalisé / renseigné

export const projects = [
  {
    id: 'myeebdevent',
    name: 'MyEEBDevent',
    tagline: 'Gestion d’événements pour une communauté religieuse',
    description:
      'Application de gestion d’événements destinée à une communauté religieuse : elle permet de consulter les événements, de s’y inscrire et de retrouver son historique de participation.(en cours de développement)',
    problem:
      'Centraliser l’information sur les événements d’une communauté et simplifier l’inscription des membres, au lieu de passer par des messages dispersés.',
    features: [
      'Consultation des événements',
      'Inscription aux événements',
      'Consultation de l’historique des participations',
      'Gestion des événements (selon les fonctionnalités réellement implémentées)',
    ],
    tech: ['React', 'Spring boot','MySQL'], // à confirmer selon la version du projet exposée
    repoUrl: 'https://github.com/samdev2006/MyEEBDevent',
    demoUrl: '',
    image: null,
    planet: 'sun',
    placeholder: false,
    visualIsPlaceholder: true,
  },
  {
    id: 'finansmart',
    name: '',
    tagline: 'Gestion Financière pour PME',
    description:
      'Application de gestion financière pour PME',
    problem:
      "Centraliser l’information financère d'une PME",
    features: [
    "Enregistrement d'une opération",
      "Ajout d'un gestionnaire étant ADMIN",
      'Génération du rapport financier de la PME',
    ],
    tech: ['React', 'Spring boot','MySQL'],
    repoUrl: 'https://github.com/samdev2006/finansmart-fontend',
    demoUrl: '',
    image: { src: '/images/finansmart-frontend.png', alt: 'Capture de l\'écran d\'accueil de Mon Projet' },
    planet: 'sun',
    placeholder: false,
    visualIsPlaceholder: true,
  },
  {
    id: 'club informatiqueiipea',
    name: 'Site Internet du club Informatique IIPEA',
    tagline: 'Site Vitrine',
    description:
      '',
    problem: '',
    features: [''],
    tech: [],
    repoUrl: 'https://github.com/samdev2006/tech-iipea-club',
    demoUrl: 'https://tech-iipea-club.vercel.app',
    image: { src: '/images/club-informatique.png', alt: 'Capture de l\'écran d\'accueil de Mon Projet' },
    planet: 'teal',
    placeholder: true,
    visualIsPlaceholder: true,
  },
];
