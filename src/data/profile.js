// ============================================================================
// CONFIGURATION CENTRALISÉE DU PORTFOLIO
// Modifiez ce fichier pour personnaliser le site sans toucher aux composants.
//
// TRADUCTION : un texte traduisible s'écrit { fr: '…', en: '…' }.
// Une simple chaîne ('React', un nom propre…) est identique dans les deux langues.
// Si la traduction anglaise manque, le texte français est affiché.
//
// Une valeur vide ('') ou un tableau vide = information non fournie : le bloc est masqué.
// ============================================================================

export const profile = {
  firstName: 'Dieudonné',
  displayName: 'S.E ADOUKO',
  fullName: 'Dieudonné Samuel Ebenezer ADOUKO',
  logoText: 'SA',
  lastName: 'Adouko',
  // Les deux lignes du grand titre de l'accueil.
  heroLines: ['Dieudonné', 'S.E. Adouko'],
  title: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
  // Portrait détouré (fond transparent) affiché sur l'accueil. null = pas de photo.
  photo: {
    src: '/images/samuel.webp',
    alt: { fr: 'Portrait de Dieudonné S.E. Adouko en costume', en: 'Portrait of Dieudonné S.E. Adouko in a suit' },
  },
  tagline: {
    fr: 'Je transforme des idées en expériences numériques performantes.',
    en: 'I turn ideas into fast, reliable digital experiences.',
  },
  heroDescription: {
    fr: 'Je conçois et développe des applications web et mobiles, de l’interface à l’API, avec une attention particulière à la qualité du code et à l’expérience utilisateur. Côté création, je réalise aussi des affiches et des visuels.',
    en: 'I design and build web and mobile applications, from the interface to the API, with a strong focus on code quality and user experience. On the creative side, I also design posters and visuals.',
  },

  contact: {
    email: 'samueladouko23@gmail.com',
    phone: '+225 01 51 03 52 63',
    location: { fr: 'Abidjan, Côte d’Ivoire', en: 'Abidjan, Côte d’Ivoire' },
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
    // CV en anglais (facultatif). Tant qu'il est vide, la version anglaise du site
    // propose le CV français avec la mention « (French) ».
    pathEn: '',
    downloadNameEn: 'Resume-Adouko-Samuel-Full-Stack-Developer.pdf',
  },

  sourceCode: {
    repoUrl: 'https://github.com/samdev2006/my-portfolio',
  },

  availability: {
    open: true,
    label: { fr: 'Ouvert aux opportunités', en: 'Open to opportunities' },
  },

  about: {
    intro: {
      fr: 'Développeur Full-Stack, je m’intéresse à tout ce qui relie une idée à un produit utilisable : l’interface, le serveur, l’API et la base de données.',
      en: 'As a Full-Stack developer, I care about everything that turns an idea into a usable product: the interface, the server, the API and the database.',
    },
    paragraphs: [
      {
        fr: 'J’aime comprendre le besoin avant d’écrire la première ligne de code. Mon approche : découper le problème, structurer proprement l’application, puis itérer en gardant un code lisible et facile à faire évoluer.',
        en: 'I like to understand the need before writing the first line of code. My approach: break the problem down, structure the application cleanly, then iterate while keeping the code readable and easy to evolve.',
      },
      {
        fr: 'Je suis particulièrement attiré par les applications métier, la conception d’API REST, l’architecture logicielle, la fintech et l’automatisation des processus : des terrains où un logiciel bien pensé rend un service concret.',
        en: 'I’m especially drawn to business applications, REST API design, software architecture, fintech and process automation: areas where well-designed software makes a real difference.',
      },
      {
        fr: 'En parallèle, je réalise des affiches, des montages vidéo et des retouches photo. Ce regard créatif nourrit directement la façon dont je pense mes interfaces.',
        en: 'Alongside development, I design posters, edit videos and retouch photos. That creative eye directly shapes the way I think about interfaces.',
      },
    ],
    facts: [
      { label: { fr: 'Basé à', en: 'Based in' }, value: 'Abidjan, Côte d’Ivoire' },
      { label: { fr: 'Formation', en: 'Education' }, value: { fr: 'Licence 3 Pro Génie Logiciel', en: 'Bachelor’s, Software Engineering' } },
      { label: { fr: 'Actuellement', en: 'Currently' }, value: { fr: 'Stagiaire développeur chez Xearth', en: 'Developer intern at Xearth' } },
      { label: { fr: 'Domaines', en: 'Fields' }, value: 'Web · Mobile · API REST · Design' },
    ],
    values: [
      {
        title: { fr: 'Qualité du code', en: 'Code quality' },
        text: { fr: 'Un code lisible, structuré et maintenable.', en: 'Readable, well-structured, maintainable code.' },
      },
      {
        title: { fr: 'Expérience utilisateur', en: 'User experience' },
        text: { fr: 'Des interfaces claires, fluides et accessibles.', en: 'Clear, smooth and accessible interfaces.' },
      },
      {
        title: { fr: 'Résolution de problèmes', en: 'Problem solving' },
        text: { fr: 'Des solutions utiles à des besoins réels.', en: 'Useful solutions to real needs.' },
      },
      {
        title: { fr: 'Apprentissage continu', en: 'Continuous learning' },
        text: { fr: 'Progresser, explorer, se remettre en question.', en: 'Keep improving, exploring and questioning.' },
      },
    ],
  },

  // Expériences professionnelles (la plus récente en premier). current: true = en cours.
  experiences: [
    {
      period: { fr: 'Depuis octobre 2026', en: 'Since October 2026' },
      current: true,
      role: { fr: 'Stagiaire développeur web & mobile', en: 'Web & mobile developer intern' },
      organization: 'Xearth',
      type: { fr: 'Stage', en: 'Internship' },
      description: {
        fr: 'Développement web et mobile au sein de l’équipe technique.',
        en: 'Web and mobile development within the technical team.',
      },
      highlights: [],
      stack: ['React', 'Node.js', 'Express.js'],
    },
  ],

  // Formation (la plus récente en premier).
  education: [
    {
      degree: {
        fr: 'Licence 3 Professionnelle en Génie Logiciel',
        en: 'Professional Bachelor’s Degree (Year 3) in Software Engineering',
      },
      school: 'Institut International Polytechnique des Élites d’Abidjan (IIPEA)',
      period: { fr: 'Oct. 2025 — Oct. 2026', en: 'Oct 2025 — Oct 2026' },
      location: 'Cocody Riviera 2',
      description: {
        fr: 'Conception et développement logiciel, architecture applicative et gestion de projets informatiques.',
        en: 'Software design and development, application architecture and IT project management.',
      },
    },
    {
      degree: { fr: 'BTS IDA — 2ᵉ année', en: 'BTS in Application Development (IDA) — Year 2' },
      school: 'Institut International Polytechnique des Élites d’Abidjan (IIPEA)',
      period: { fr: 'Oct. 2024 — 2025', en: 'Oct 2024 — 2025' },
      location: 'Cocody Riviera 2',
      description: '',
    },
    {
      degree: { fr: 'BTS IDA — 1ʳᵉ année', en: 'BTS in Application Development (IDA) — Year 1' },
      school: 'Institut International Polytechnique des Élites d’Abidjan (IIPEA)',
      period: { fr: 'Oct. 2023 — 2024', en: 'Oct 2023 — 2024' },
      location: 'Cocody Riviera 2',
      description: '',
    },
    {
      degree: { fr: 'Baccalauréat série D', en: 'Baccalaureate, Series D (Mathematics & Life Sciences)' },
      school: 'Lycée Moderne 2 d’Abobo',
      period: '2016 — 2023',
      location: 'Abobo',
      description: '',
    },
  ],

  // Services. group : 'dev' | 'creation'. icon : nom d'icône déclaré dans sections/Services.jsx.
  services: [
    {
      id: 'web-apps',
      group: 'dev',
      icon: 'LayoutDashboard',
      title: { fr: 'Applications web', en: 'Web applications' },
      text: {
        fr: 'Applications web interactives (React, Vue…) qui répondent à des besoins métier précis.',
        en: 'Interactive web applications (React, Vue…) built around specific business needs.',
      },
    },
    {
      id: 'web-sites',
      group: 'dev',
      icon: 'Globe',
      title: { fr: 'Sites web', en: 'Websites' },
      text: {
        fr: 'Sites vitrines responsives, rapides et soignés, pensés pour être clairs.',
        en: 'Responsive, fast and polished showcase websites, designed to be clear.',
      },
    },
    {
      id: 'rest-api',
      group: 'dev',
      icon: 'Server',
      title: { fr: 'API REST', en: 'REST APIs' },
      text: {
        fr: 'Conception et développement d’API structurées, notamment avec Java et Spring Boot.',
        en: 'Design and development of well-structured APIs, notably with Java and Spring Boot.',
      },
    },
    {
      id: 'mobile',
      group: 'dev',
      icon: 'Smartphone',
      title: { fr: 'Applications mobiles', en: 'Mobile apps' },
      text: { fr: 'Applications multiplateformes avec Flutter et Dart.', en: 'Cross-platform apps with Flutter and Dart.' },
    },
    {
      id: 'databases',
      group: 'dev',
      icon: 'Database',
      title: { fr: 'Bases de données', en: 'Databases' },
      text: { fr: 'Modélisation et intégration de données avec MySQL ou Firebase.', en: 'Data modeling and integration with MySQL or Firebase.' },
    },
    {
      id: 'maintenance',
      group: 'dev',
      icon: 'Wrench',
      title: { fr: 'Maintenance', en: 'Maintenance' },
      text: {
        fr: 'Reprise, correction et amélioration progressive d’applications existantes.',
        en: 'Taking over, fixing and gradually improving existing applications.',
      },
    },
    {
      id: 'posters',
      group: 'creation',
      icon: 'Palette',
      title: { fr: 'Affiches & visuels', en: 'Posters & visuals' },
      text: {
        fr: 'Affiches, flyers et visuels pour vos événements et votre communication.',
        en: 'Posters, flyers and visuals for your events and communication.',
      },
    },
    {
      id: 'video',
      group: 'creation',
      icon: 'Film',
      title: { fr: 'Montage vidéo', en: 'Video editing' },
      text: {
        fr: 'Découpage, rythme, titrage et habillage pour des vidéos propres et dynamiques.',
        en: 'Cutting, pacing, titles and graphics for clean, dynamic videos.',
      },
    },
    {
      id: 'photo',
      group: 'creation',
      icon: 'Camera',
      title: { fr: 'Retouche photo', en: 'Photo retouching' },
      text: { fr: 'Colorimétrie, nettoyage et mise en valeur du sujet.', en: 'Color grading, cleanup and making the subject stand out.' },
    },
  ],

  contactSection: {
    title: { fr: 'Un projet en tête ? Parlons-en.', en: 'Got a project in mind? Let’s talk.' },
    text: {
      fr: 'Stage, collaboration technique, application à développer ou affiche à concevoir : écrivez-moi.',
      en: 'Internship, technical collaboration, an app to build or a poster to design: get in touch.',
    },
  },

  footerQuote: {
    fr: 'Un bon logiciel est une idée claire, rendue simple à utiliser.',
    en: 'Good software is a clear idea, made simple to use.',
  },
};

// Navigation principale (les ids correspondent aux sections de la page).
export const navLinks = [
  { id: 'apropos', label: { fr: 'À propos', en: 'About' } },
  { id: 'projets', label: { fr: 'Projets', en: 'Projects' } },
  { id: 'creations', label: { fr: 'Créations', en: 'Work' } },
  { id: 'parcours', label: { fr: 'Parcours', en: 'Journey' } },
  { id: 'contact', label: { fr: 'Contact', en: 'Contact' } },
];
