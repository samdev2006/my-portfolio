// ============================================================================
// CONFIGURATION CENTRALISÉE DU PORTFOLIO
// Modifiez ce fichier pour personnaliser votre portfolio sans toucher aux composants.
// Règle : une valeur vide ('') signifie "information non fournie" -> le lien ou
// le bloc correspondant est affiché comme désactivé, jamais inventé.
// ============================================================================

export const profile = {
  firstName: "Dieudonné",
  displayName: "S.E ADOUKO",
  fullName: "Dieudonné Samuel Ebenezer ADOUKO",
  logoText: "A.S.",
  title: "Full-Stack Developer",
  tagline: "Je transforme des idées en expériences numériques performantes.",
  // Petites étiquettes sous le titre du Hero.
  heroTags: [
    "Web",
    "Mobile",
    "API REST",
    "Affiches",
    "Montage vidéo",
    "Retouche photo",
  ],
  heroDescription:
    "Je conçois et développe des applications web et mobiles en mettant l’accent sur la qualité du code, l’expérience utilisateur et la résolution de problèmes concrets.",

  // Coordonnées : à renseigner (laissées vides volontairement, rien n'est inventé).
  contact: {
    email: "samueladouko23@gmail.com", // ex. 'prenom.nom@exemple.com'
    phone: "+225 01 51 035 263", // facultatif
    location: "Abidjan,Côte d'\Ivoire",
    // Service de formulaire (ex. Formspree : 'https://formspree.io/f/xxxxxxx').
    // Vide = le formulaire ouvre le client de messagerie via mailto:.
    formEndpoint: "https://formspree.io/f/xqppkzdv",
  },

  // Réseaux : laissez '' tant que l'URL n'est pas connue.
  socials: {
    github: "https://github.com/samdev2006/",
    linkedin:
      "https://www.linkedin.com/in/dieudonné-samuel-ebenezer-adouko-07a9a2326?utm_source=share_via&utm_content=profile&utm_medium=member_ios", // ex. 'https://www.linkedin.com/in/votre-profil'
    other: [
      // { label: 'X', url: 'https://x.com/...' },
    ],
  },

  // CV : déposez votre PDF dans public/cv/ puis vérifiez le nom ci-dessous.
  cv: {
    path: "/cv/cv-samuel.pdf",
    downloadName: "CV-Adouko-Samuel-Full-Stack-Developer.pdf",
  },

  // Code source du portfolio (bouton « Télécharger le code source »).
  // Placez l'archive dans public/ si vous souhaitez la proposer en téléchargement.
  sourceCode: {
    zipPath: "", // ex. '/portfolio-samuel-fullstack.zip' (laisser vide pour masquer le bouton)
    repoUrl: "https://github.com/samdev2006/my-portfolio", // ex. 'https://github.com/votre-pseudo/portfolio'
  },

  availability: {
    internship: true,
    label: "N'hésitez pas à me contacter ",
  },

  about: {
    intro:
      "Développeur Full-Stack passionné par la conception d’applications web et mobiles, je m’intéresse à tout ce qui relie une idée à un produit utilisable : de l’interface au serveur, en passant par l’API et la base de données.",
    paragraphs: [
      "J’aime comprendre le besoin avant d’écrire la première ligne de code. Mon approche : découper le problème, structurer proprement l’application, puis itérer en gardant un code lisible et facile à faire évoluer.",
      "Le développement logiciel est pour moi un domaine d’apprentissage permanent. Je travaille avec plusieurs technologies, j’en approfondis certaines et j’en explore d’autres, avec l’envie constante de progresser et de rejoindre une équipe technique ambitieuse.",
      "Au-delà du code, je réalise aussi des affiches, des montages vidéo et des retouches photo : ce regard créatif nourrit directement la façon dont je pense mes interfaces.",
      "Je suis particulièrement attiré par les applications métier, la conception d’API REST, l’architecture logicielle, les technologies financières (fintech) et l’automatisation des processus : autant de terrains où un logiciel bien pensé rend un service concret.",
    ],
    // Aucun chiffre inventé : seuls des faits confirmés figurent ici.
    highlights: [
      { label: "Profil", value: "Full-Stack" },
      { label: "Formation", value: "Licence 3 Pro Génie Logiciel" },
      {
        label: "Domaines",
        value: "Web · Mobile · API REST · Création visuelle",
      },
    ],
    values: [
      {
        title: "Qualité du code",
        text: "Un code lisible, structuré et maintenable.",
      },
      {
        title: "Expérience utilisateur",
        text: "Des interfaces claires, fluides et accessibles.",
      },
      {
        title: "Résolution de problèmes",
        text: "Des solutions utiles à des besoins réels.",
      },
      {
        title: "Apprentissage continu",
        text: "Progresser, explorer, remettre en question.",
      },
    ],
  },

  // Parcours professionnel : aucune entrée fictive. Ajoutez vos vraies expériences ici.
  // Modèle d'une entrée :
  // { period: '2025', role: 'Stagiaire développeur', organization: 'Nom', type: 'Stage',
  //   description: '...', highlights: ['...'], stack: ['React'] }
  experiences: [
    {
      period: " Dépuis Ocobre 2026",
      role: "Stagiaire développeur",
      organization: "Xearth",
      type: "Stage",
      description: "Stagiaire développeur web/Mobile",
      highlights: [""],
      stack: ["React","Nodejs","Expressjs"],
    },
  ],
  experiencePlaceholder: {
    title: "En route vers la prochaine étape",
    text: "Je recherche un stage pour mettre mes compétences au service d’une équipe technique. Mes réalisations techniques sont à retrouver dans la section Projets.",
  },

  // Parcours académique : seules les informations confirmées sont affichées.
  education: [
    {
      degree: "Licence 3 Professionnelle en Génie Logiciel",
      school:
        "Institut Internationnale Polytcehnique des Elites d'\Abidjan (IIPEA)",
      period: "Octobre 2025 à Octobre 2026",
      location: "Cocody Rivera 2",
      description:
        "Formation orientée conception et développement logiciel, architecture applicative et gestion de projets informatiques.",
    },
    {
      degree: "BTS 2ème Année IDA",
      school:
        "Institut Internationnale Polytcehnique des Elites d'\Abidjan (IIPEA)",
      period: "Octobre 2024 à  2025",
      location: "Cocody Rivera 2",
      description:
        "Formation orientée conception et développement logiciel, architecture applicative et gestion de projets informatiques.",
    },
    {
      degree: "BTS 1ère Année IDA",
      school:
        "Institut Internationnale Polytcehnique des Elites d'\Abidjan (IIPEA)",
      period: "Octobre 2023 à 2024",
      location: "Cocody Rivera 2",
      description:
        "Formation orientée conception et développement logiciel, architecture applicative et gestion de projets informatiques.",
    },
    {
      degree: "Baccalauréat série D",
      school: "ILycée Moderne 2 Abobo",
      period: "2016-2023",
      location: "Abobo",
      description: "",
    },
  ],

  // Services : uniquement des prestations cohérentes avec les compétences listées.
  services: [
    {
      id: "web-sites",
      group: "dev",
      icon: "Globe",
      title: "Développement de sites web",
      text: "Sites vitrines et pages responsives, rapides et soignés, pensés pour être clairs et agréables à utiliser.",
      color: "volt",
    },
    {
      id: "web-apps",
      group: "dev",
      icon: "LayoutDashboard",
      title: "Développement d’applications web",
      text: "Applications web interactives (React, Vue, Nuxt…) répondant à des besoins métier précis.",
      color: "sun",
    },
    {
      id: "rest-api",
      group: "dev",
      icon: "Server",
      title: "Développement d’API REST",
      text: "Conception et développement d’API REST structurées, notamment avec Java et Spring Boot.",
      color: "ion",
    },
    {
      id: "mobile",
      group: "dev",
      icon: "Smartphone",
      title: "Développement d’applications mobiles",
      text: "Applications mobiles multiplateformes avec Flutter et Dart.",
      color: "volt",
    },
    {
      id: "databases",
      group: "dev",
      icon: "Database",
      title: "Intégration de bases de données",
      text: "Modélisation et intégration de données avec MySQL ou Firebase, selon le besoin du projet.",
      color: "ion",
    },
    {
      id: "maintenance",
      group: "dev",
      icon: "Wrench",
      title: "Maintenance et amélioration d’applications",
      text: "Reprise, correction et amélioration progressive d’applications existantes.",
      color: "sun",
    },
    {
      id: "posters",
      group: "creation",
      icon: "Palette",
      title: "Création d’affiches et visuels",
      text: "Affiches, flyers et visuels pour vos événements et votre communication, avec une identité claire et soignée.",
      color: "sun",
    },
    {
      id: "video",
      group: "creation",
      icon: "Film",
      title: "Montage vidéo",
      text: "Montage de vidéos : découpage, rythme, titrage et habillage pour des contenus propres et dynamiques.",
      color: "volt",
    },
    {
      id: "photo",
      group: "creation",
      icon: "Camera",
      title: "Retouche photo",
      text: "Retouche et amélioration de photos : colorimétrie, nettoyage et mise en valeur du sujet.",
      color: "ion",
    },
  ],

  contactSection: {
    title: "Un projet en tête ? Explorons les possibilités.",
    text: "Je suis ouvert aux opportunités de stage, aux collaborations techniques et aux projets de développement.",
  },

  footerQuote: "Un bon logiciel est une idée claire, rendue simple à utiliser.",
};

// Navigation (les ids correspondent aux sections de la page).
export const navLinks = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "creations", label: "Créations" },
  { id: "parcours", label: "Parcours" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];
