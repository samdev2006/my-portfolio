// Projets du portfolio, dans l'ordre d'affichage.
// Texte traduisible : { fr: '…', en: '…' } (voir l'en-tête de profile.js).
//
// Champs :
//  - id, name, tagline, description, problem (facultatif)
//  - status   : 'live' (en ligne) | 'wip' (en cours) | '' (pas de badge)
//  - features : fonctionnalités réellement implémentées
//  - tech     : technologies utilisées
//  - repoUrl  : lien vers le code ('' = bouton masqué). Le dépôt doit être PUBLIC sinon GitHub affiche une 404.
//  - demoUrl  : lien vers la version en ligne ('' = bouton masqué)
//  - image    : { src, alt } capture d'écran (idéalement .webp, 1600 px de large) ou null
//  - accent   : couleur de la couverture générée quand il n'y a pas d'image

export const projects = [
  {
    id: 'finansmart',
    name: 'FinanSmart',
    tagline: { fr: 'Gestion financière pour les PME', en: 'Financial management for small businesses' },
    status: 'wip',
    description: {
      fr: 'Application web de gestion financière pensée pour les PME ivoiriennes : enregistrement des opérations, gestion des accès par rôle et génération du rapport financier de l’entreprise.',
      en: 'A financial management web app designed for small businesses in Côte d’Ivoire: recording transactions, role-based access and generating the company’s financial report.',
    },
    problem: {
      fr: 'Centraliser l’information financière d’une PME au lieu de la disperser entre carnets et tableurs.',
      en: 'Centralize a small business’s financial information instead of scattering it across notebooks and spreadsheets.',
    },
    features: [
      { fr: 'Enregistrement des opérations financières', en: 'Recording financial transactions' },
      { fr: 'Accès par rôle : administrateur et gestionnaire', en: 'Role-based access: administrator and manager' },
      { fr: 'Ajout de gestionnaires par l’administrateur', en: 'Administrators can add managers' },
      { fr: 'Génération du rapport financier', en: 'Financial report generation' },
    ],
    tech: ['React', 'Spring Boot', 'MySQL'],
    repoUrl: 'https://github.com/samdev2006/finansmart-fontend',
    demoUrl: '',
    image: {
      src: '/images/finansmart-frontend.webp',
      alt: { fr: 'Écran de connexion de FinanSmart', en: 'FinanSmart login screen' },
    },
    accent: '#1BA58F',
  },
  {
    id: 'club-tech-iipea',
    name: 'Club Tech IIPEA',
    tagline: { fr: 'Site vitrine du club informatique', en: 'Website for the school’s tech club' },
    status: 'live',
    description: {
      fr: 'Site vitrine du club informatique AE-IIPEA, qui rassemble les étudiants passionnés de technologie : présentation du club, activités, événements, équipe et inscription en ligne.',
      en: 'Showcase website for the AE-IIPEA tech club, which brings together students passionate about technology: club presentation, activities, events, team and online sign-up.',
    },
    problem: {
      fr: 'Donner au club une présence en ligne claire pour présenter ses activités et recruter de nouveaux membres.',
      en: 'Give the club a clear online presence to showcase its activities and recruit new members.',
    },
    features: [
      { fr: 'Présentation du club et de ses activités', en: 'Club and activities overview' },
      { fr: 'Agenda des événements', en: 'Events calendar' },
      { fr: 'Page équipe', en: 'Team page' },
      { fr: 'Formulaire d’inscription', en: 'Sign-up form' },
    ],
    tech: ['React', 'Vite'],
    repoUrl: 'https://github.com/samdev2006/tech-iipea-club',
    demoUrl: 'https://tech-iipea-club.vercel.app',
    image: {
      src: '/images/club-informatique.webp',
      alt: { fr: 'Page d’accueil du site du Club Tech IIPEA', en: 'Club Tech IIPEA website homepage' },
    },
    accent: '#2F5BEA',
  },
  {
    id: 'myeebdevent',
    name: 'MyEEBDevent',
    tagline: { fr: 'Gestion d’événements pour une communauté', en: 'Event management for a community' },
    status: 'wip',
    description: {
      fr: 'Application de gestion d’événements pour une communauté religieuse : les membres consultent les événements, s’y inscrivent et retrouvent l’historique de leurs participations.',
      en: 'An event management app for a religious community: members browse events, register for them and view their participation history.',
    },
    problem: {
      fr: 'Centraliser l’information sur les événements et simplifier l’inscription des membres, au lieu de passer par des messages dispersés.',
      en: 'Centralize event information and simplify member registration, instead of relying on scattered messages.',
    },
    features: [
      { fr: 'Consultation des événements', en: 'Browsing events' },
      { fr: 'Inscription aux événements', en: 'Event registration' },
      { fr: 'Historique des participations', en: 'Participation history' },
    ],
    tech: ['React', 'Spring Boot', 'MySQL'],
    repoUrl: 'https://github.com/samdev2006/MyEEBDevent',
    demoUrl: '',
    image: null,
    accent: '#FF6B1A',
  },
];
