// ============================================================================
// CONFIGURATION CENTRALISÉE DU PORTFOLIO
// Modifiez ce fichier pour personnaliser le site sans toucher aux composants.
// Règle : une valeur vide ('') ou un tableau vide = information non fournie,
// le bloc correspondant est simplement masqué.
// ============================================================================

export const profile = {
  firstName: 'Dieudonné',
  displayName: 'S.E ADOUKO',
  fullName: 'Dieudonné Samuel Ebenezer ADOUKO',
  logoText: 'SA',
  lastName: 'Adouko',
  // Les deux lignes du grand titre de l'accueil.
  heroLines: ['Dieudonné', 'S.E. Adouko'],
  title: 'Développeur Full-Stack',
  // Portrait détouré (fond transparent) affiché sur l'accueil. null = pas de photo.
  photo: { src: '/images/samuel.webp', alt: 'Portrait de Dieudonné S.E. Adouko en costume' },
  tagline: 'Je transforme des idées en expériences numériques performantes.',
  heroDescription:
    'Je conçois et développe des applications web et mobiles, de l’interface à l’API, avec une attention particulière à la qualité du code et à l’expérience utilisateur. Côté création, je réalise aussi des affiches et des visuels.',

  contact: {
    email: 'samueladouko23@gmail.com',
    phone: '+225 01 51 03 52 63',
    location: 'Abidjan, Côte d’Ivoire',
    timeZone: 'Africa/Abidjan',
    // Formspree : les messages du formulaire sont envoyés à cette adresse.
    // Vide = le formulaire ouvre le client de messagerie (mailto:).
    formEndpoint: 'https://formspree.io/f/xqppkzdv',
  },

  socials: {
    github: 'https://github.com/samdev2006',
    linkedin: 'https://www.linkedin.com/in/dieudonn%C3%A9-samuel-ebenezer-adouko-07a9a2326',
  },

  cv: {
    path: '/cv/cv-samuel.pdf',
    downloadName: 'CV-Adouko-Samuel-Developpeur-Full-Stack.pdf',
  },

  sourceCode: {
    repoUrl: 'https://github.com/samdev2006/my-portfolio',
  },

  availability: {
    open: true,
    label: 'Ouvert aux opportunités',
  },

  about: {
    intro:
      'Développeur Full-Stack, je m’intéresse à tout ce qui relie une idée à un produit utilisable : l’interface, le serveur, l’API et la base de données.',
    paragraphs: [
      'J’aime comprendre le besoin avant d’écrire la première ligne de code. Mon approche : découper le problème, structurer proprement l’application, puis itérer en gardant un code lisible et facile à faire évoluer.',
      'Je suis particulièrement attiré par les applications métier, la conception d’API REST, l’architecture logicielle, la fintech et l’automatisation des processus : des terrains où un logiciel bien pensé rend un service concret.',
      'En parallèle, je réalise des affiches, des montages vidéo et des retouches photo. Ce regard créatif nourrit directement la façon dont je pense mes interfaces.',
    ],
    facts: [
      { label: 'Basé à', value: 'Abidjan, Côte d’Ivoire' },
      { label: 'Formation', value: 'Licence 3 Pro Génie Logiciel' },
      { label: 'Actuellement', value: 'Stagiaire développeur chez Xearth' },
      { label: 'Domaines', value: 'Web · Mobile · API REST · Design' },
    ],
    values: [
      { title: 'Qualité du code', text: 'Un code lisible, structuré et maintenable.' },
      { title: 'Expérience utilisateur', text: 'Des interfaces claires, fluides et accessibles.' },
      { title: 'Résolution de problèmes', text: 'Des solutions utiles à des besoins réels.' },
      { title: 'Apprentissage continu', text: 'Progresser, explorer, se remettre en question.' },
    ],
  },

  // Expériences professionnelles (la plus récente en premier).
  experiences: [
    {
      period: 'Depuis octobre 2026',
      role: 'Stagiaire développeur web & mobile',
      organization: 'Xearth',
      type: 'Stage',
      description: 'Développement web et mobile au sein de l’équipe technique.',
      highlights: [],
      stack: ['React', 'Node.js', 'Express.js'],
    },
  ],

  // Formation (la plus récente en premier).
  education: [
    {
      degree: 'Licence 3 Professionnelle en Génie Logiciel',
      school: 'Institut International Polytechnique des Élites d’Abidjan (IIPEA)',
      period: 'Oct. 2025 — Oct. 2026',
      location: 'Cocody Riviera 2',
      description:
        'Conception et développement logiciel, architecture applicative et gestion de projets informatiques.',
    },
    {
      degree: 'BTS IDA — 2ᵉ année',
      school: 'Institut International Polytechnique des Élites d’Abidjan (IIPEA)',
      period: 'Oct. 2024 — 2025',
      location: 'Cocody Riviera 2',
      description: '',
    },
    {
      degree: 'BTS IDA — 1ʳᵉ année',
      school: 'Institut International Polytechnique des Élites d’Abidjan (IIPEA)',
      period: 'Oct. 2023 — 2024',
      location: 'Cocody Riviera 2',
      description: '',
    },
    {
      degree: 'Baccalauréat série D',
      school: 'Lycée Moderne 2 d’Abobo',
      period: '2016 — 2023',
      location: 'Abobo',
      description: '',
    },
  ],

  // Services. group : 'dev' | 'creation'. icon : nom d'icône déclaré dans sections/Services.jsx.
  services: [
    { id: 'web-apps', group: 'dev', icon: 'LayoutDashboard', title: 'Applications web', text: 'Applications web interactives (React, Vue…) qui répondent à des besoins métier précis.' },
    { id: 'web-sites', group: 'dev', icon: 'Globe', title: 'Sites web', text: 'Sites vitrines responsives, rapides et soignés, pensés pour être clairs.' },
    { id: 'rest-api', group: 'dev', icon: 'Server', title: 'API REST', text: 'Conception et développement d’API structurées, notamment avec Java et Spring Boot.' },
    { id: 'mobile', group: 'dev', icon: 'Smartphone', title: 'Applications mobiles', text: 'Applications multiplateformes avec Flutter et Dart.' },
    { id: 'databases', group: 'dev', icon: 'Database', title: 'Bases de données', text: 'Modélisation et intégration de données avec MySQL ou Firebase.' },
    { id: 'maintenance', group: 'dev', icon: 'Wrench', title: 'Maintenance', text: 'Reprise, correction et amélioration progressive d’applications existantes.' },
    { id: 'posters', group: 'creation', icon: 'Palette', title: 'Affiches & visuels', text: 'Affiches, flyers et visuels pour vos événements et votre communication.' },
    { id: 'video', group: 'creation', icon: 'Film', title: 'Montage vidéo', text: 'Découpage, rythme, titrage et habillage pour des vidéos propres et dynamiques.' },
    { id: 'photo', group: 'creation', icon: 'Camera', title: 'Retouche photo', text: 'Colorimétrie, nettoyage et mise en valeur du sujet.' },
  ],

  contactSection: {
    title: 'Un projet en tête ? Parlons-en.',
    text: 'Stage, collaboration technique, application à développer ou affiche à concevoir : écrivez-moi.',
  },

  footerQuote: 'Un bon logiciel est une idée claire, rendue simple à utiliser.',
};

// Navigation principale (les ids correspondent aux sections de la page).
export const navLinks = [
  { id: 'apropos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'creations', label: 'Créations' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
];
