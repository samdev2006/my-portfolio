// Projets du portfolio, dans l'ordre d'affichage.
//
// Champs :
//  - id, name, tagline, description, problem (facultatif)
//  - status   : 'En ligne' | 'En cours' | '' (badge affiché à côté du nom)
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
    tagline: 'Gestion financière pour les PME',
    status: 'En cours',
    description:
      'Application web de gestion financière pensée pour les PME ivoiriennes : enregistrement des opérations, gestion des accès par rôle et génération du rapport financier de l’entreprise.',
    problem: 'Centraliser l’information financière d’une PME au lieu de la disperser entre carnets et tableurs.',
    features: [
      'Enregistrement des opérations financières',
      'Accès par rôle : administrateur et gestionnaire',
      'Ajout de gestionnaires par l’administrateur',
      'Génération du rapport financier',
    ],
    tech: ['React', 'Spring Boot', 'MySQL'],
    repoUrl: 'https://github.com/samdev2006/finansmart-fontend',
    demoUrl: '',
    image: { src: '/images/finansmart-frontend.webp', alt: 'Écran de connexion de FinanSmart' },
    accent: '#1BA58F',
  },
  {
    id: 'club-tech-iipea',
    name: 'Club Tech IIPEA',
    tagline: 'Site vitrine du club informatique',
    status: 'En ligne',
    description:
      'Site vitrine du club informatique AE-IIPEA, qui rassemble les étudiants passionnés de technologie : présentation du club, activités, événements, équipe et inscription en ligne.',
    problem: 'Donner au club une présence en ligne claire pour présenter ses activités et recruter de nouveaux membres.',
    features: ['Présentation du club et de ses activités', 'Agenda des événements', 'Page équipe', 'Formulaire d’inscription'],
    tech: ['React', 'Vite'],
    repoUrl: 'https://github.com/samdev2006/tech-iipea-club',
    demoUrl: 'https://tech-iipea-club.vercel.app',
    image: { src: '/images/club-informatique.webp', alt: 'Page d’accueil du site du Club Tech IIPEA' },
    accent: '#2F5BEA',
  },
  {
    id: 'myeebdevent',
    name: 'MyEEBDevent',
    tagline: 'Gestion d’événements pour une communauté',
    status: 'En cours',
    description:
      'Application de gestion d’événements pour une communauté religieuse : les membres consultent les événements, s’y inscrivent et retrouvent l’historique de leurs participations.',
    problem:
      'Centraliser l’information sur les événements et simplifier l’inscription des membres, au lieu de passer par des messages dispersés.',
    features: ['Consultation des événements', 'Inscription aux événements', 'Historique des participations'],
    tech: ['React', 'Spring Boot', 'MySQL'],
    repoUrl: 'https://github.com/samdev2006/MyEEBDevent',
    demoUrl: '',
    image: null,
    accent: '#FF6B1A',
  },
];
