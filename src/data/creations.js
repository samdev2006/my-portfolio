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
//  - title       : titre affiché ({ fr, en } pour le traduire)
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
  { id: 'all', label: { fr: 'Tout', en: 'All' } },
  { id: 'affiches', label: { fr: 'Affiches', en: 'Posters' } },
  { id: 'videos', label: { fr: 'Montage vidéo', en: 'Video editing' } },
  { id: 'photos', label: { fr: 'Retouche photo', en: 'Photo retouching' } },
];

export const creations = [
  {
    id: 'chill-in-christ',
    category: 'affiches',
    title: 'Chill in Christ',
    description: { fr: 'Affiche d’un événement chrétien, Cocody Angré 10ᵉ tranche.', en: 'Poster for a Christian event in Cocody Angré, Abidjan.' },
    type: 'image',
    src: '/creations/chiil in christ.jpeg',
  },
  {
    id: 'stane-pins',
    category: 'affiches',
    title: { fr: 'STANE Group — Pins', en: 'STANE Group — Pin badges' },
    description: { fr: 'Affiche publicitaire pour une entreprise d’imprimerie.', en: 'Advertising poster for a printing company.' },
    type: 'image',
    src: '/creations/stanegroup1.jpeg',
  },
  {
    id: 'ecole-du-disciple',
    category: 'affiches',
    title: { fr: 'L’École du Disciple', en: 'L’École du Disciple (Disciple School)' },
    description: { fr: 'Affiche d’un programme chrétien.', en: 'Poster for a Christian program.' },
    type: 'image',
    src: '/creations/EDD.jpeg',
  },
  {
    id: 'stane-cadre',
    category: 'affiches',
    title: { fr: 'STANE Group — Cadres photo', en: 'STANE Group — Photo frames' },
    description: { fr: 'Affiche publicitaire pour une entreprise d’imprimerie.', en: 'Advertising poster for a printing company.' },
    type: 'image',
    src: '/creations/stanegroup2.jpeg',
  },
  {
    id: 'rencontre-zoom',
    category: 'affiches',
    title: { fr: 'RDV des vendredis — Zoom', en: 'Friday meetups — Zoom' },
    description: { fr: 'Affiche d’une rencontre en ligne d’un programme chrétien.', en: 'Poster for an online meeting of a Christian program.' },
    type: 'image',
    src: '/creations/zoom.jpeg',
  },
  {
    id: 'stane-tampon',
    category: 'affiches',
    title: { fr: 'STANE Group — Tampons', en: 'STANE Group — Rubber stamps' },
    description: { fr: 'Affiche publicitaire pour une entreprise d’imprimerie.', en: 'Advertising poster for a printing company.' },
    type: 'image',
    src: '/creations/stanegroup3.jpeg',
  },
  {
    id: 'alloco-party',
    category: 'affiches',
    title: 'Alloco Party 2024',
    description: { fr: 'Affiche d’un événement chrétien (JBD), Cocody Angré 10ᵉ tranche.', en: 'Poster for a Christian event (JBD) in Cocody Angré, Abidjan.' },
    type: 'image',
    src: '/creations/alloco party.jpeg',
  },
  {
    id: 'stane-textile',
    category: 'affiches',
    title: { fr: 'STANE Group — Textiles', en: 'STANE Group — Custom apparel' },
    description: { fr: 'Affiche publicitaire pour une entreprise d’imprimerie.', en: 'Advertising poster for a printing company.' },
    type: 'image',
    src: '/creations/stanegroup4.jpeg',
  },
  {
    id: 'stane-cachet',
    category: 'affiches',
    title: { fr: 'STANE Group — Cachets', en: 'STANE Group — Company seals' },
    description: { fr: 'Affiche publicitaire pour une entreprise d’imprimerie.', en: 'Advertising poster for a printing company.' },
    type: 'image',
    src: '/creations/stanegroup5.jpeg',
  },
];
