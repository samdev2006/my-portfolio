// Galerie « Créations » : affiches, montages vidéo, retouches photo.
//
// AJOUTER UNE RÉALISATION
//  1. Déposez le fichier dans public/creations/ (image .webp/.jpg/.png, vidéo .mp4).
//  2. Ajoutez un objet au tableau `creations` (id UNIQUE obligatoire).
//  Une catégorie sans réalisation n'apparaît pas dans les filtres.
//
// Champs :
//  - id          : identifiant unique
//  - category    : 'affiches' | 'videos' | 'photos'
//  - title       : titre affiché
//  - description : contexte réel (client, événement, outils…)
//  - type        : 'image' | 'video'
//  - src         : chemin du fichier (image, ou vidéo .mp4)
//  - youtube     : identifiant d'une vidéo YouTube (remplace src), ex. 'dQw4w9WgXcQ'
//  - poster      : image de couverture d'une vidéo (facultatif)
//  - before      : retouche photo -> image « avant » (src = « après ») : comparateur avant / après
//  - year        : année (facultatif)
//
// Exemples :
//  { id: 'clip-1', category: 'videos', title: 'Aftermovie', type: 'video', youtube: 'ID_YOUTUBE' },
//  { id: 'retouche-1', category: 'photos', title: 'Portrait', type: 'image',
//    before: '/creations/portrait-avant.webp', src: '/creations/portrait-apres.webp' },

export const creationCategories = [
  { id: 'all', label: 'Tout' },
  { id: 'affiches', label: 'Affiches' },
  { id: 'videos', label: 'Montage vidéo' },
  { id: 'photos', label: 'Retouche photo' },
];

export const creations = [
  {
    id: 'chill-in-christ',
    category: 'affiches',
    title: 'Chill in Christ',
    description: 'Affiche d’un événement chrétien, Cocody Angré 10ᵉ tranche.',
    type: 'image',
    src: '/creations/chiil in christ.jpeg',
  },
  {
    id: 'stane-pins',
    category: 'affiches',
    title: 'STANE Group — Pins',
    description: 'Affiche publicitaire pour une entreprise d’imprimerie.',
    type: 'image',
    src: '/creations/stanegroup1.jpeg',
  },
  {
    id: 'ecole-du-disciple',
    category: 'affiches',
    title: 'L’École du Disciple',
    description: 'Affiche d’un programme chrétien.',
    type: 'image',
    src: '/creations/EDD.jpeg',
  },
  {
    id: 'stane-cadre',
    category: 'affiches',
    title: 'STANE Group — Cadres photo',
    description: 'Affiche publicitaire pour une entreprise d’imprimerie.',
    type: 'image',
    src: '/creations/stanegroup2.jpeg',
  },
  {
    id: 'rencontre-zoom',
    category: 'affiches',
    title: 'RDV des vendredis — Zoom',
    description: 'Affiche d’une rencontre en ligne d’un programme chrétien.',
    type: 'image',
    src: '/creations/zoom.jpeg',
  },
  {
    id: 'stane-tampon',
    category: 'affiches',
    title: 'STANE Group — Tampons',
    description: 'Affiche publicitaire pour une entreprise d’imprimerie.',
    type: 'image',
    src: '/creations/stanegroup3.jpeg',
  },
  {
    id: 'alloco-party',
    category: 'affiches',
    title: 'Alloco Party 2024',
    description: 'Affiche d’un événement chrétien (JBD), Cocody Angré 10ᵉ tranche.',
    type: 'image',
    src: '/creations/alloco party.jpeg',
  },
  {
    id: 'stane-textile',
    category: 'affiches',
    title: 'STANE Group — Textiles',
    description: 'Affiche publicitaire pour une entreprise d’imprimerie.',
    type: 'image',
    src: '/creations/stanegroup4.jpeg',
  },
  {
    id: 'stane-cachet',
    category: 'affiches',
    title: 'STANE Group — Cachets',
    description: 'Affiche publicitaire pour une entreprise d’imprimerie.',
    type: 'image',
    src: '/creations/stanegroup5.jpeg',
  },
];
