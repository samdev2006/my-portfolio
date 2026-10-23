// Galerie « Créations » : affiches, montages vidéo, retouches photo…
//
// COMMENT AJOUTER UNE RÉALISATION
//  1. Déposez le fichier dans public/creations/ (images .webp/.jpg/.png, vidéos .mp4).
//  2. Ajoutez un objet au tableau `creations` ci-dessous.
//  3. Supprimez les entrées « emplacement » (src et youtube vides) quand vous avez vos vraies œuvres.
//
// Champs :
//  - id         : identifiant unique
//  - category   : 'affiches' | 'videos' | 'photos' (ou une catégorie que vous ajoutez dans creationCategories)
//  - title      : titre affiché
//  - description: courte description (client, contexte, outils… uniquement des faits réels)
//  - type       : 'image' | 'video'
//  - src        : chemin du fichier, ex. '/creations/affiche-concert.webp' (image) ou '/creations/clip.mp4' (vidéo)
//  - youtube    : identifiant YouTube (ex. 'dQw4w9WgXcQ') pour une vidéo hébergée sur YouTube (remplace src)
//  - poster     : image de couverture d'une vidéo (facultatif)
//  - before     : pour une retouche photo, image « avant » (src = image « après ») -> comparateur avant/après
//  - ratio      : 'portrait' | 'landscape' | 'square' (forme de la vignette)
//  - year       : année (facultatif)
//
// Une entrée sans `src` ni `youtube` est affichée comme « Emplacement libre » (non cliquable).

export const creationCategories = [
  { id: "all", label: "Tout" },
  { id: "affiches", label: "Affiches" },
  { id: "videos", label: "Montage vidéo" },
  { id: "photos", label: "Retouche photo" },
];

export const creations = [
  {
    id: "affiche-1",
    category: "affiches",
    title: "Affiche Alloco party (2024-JBD)",
    description: "Affiche d'un évènement chrétiens Cocody Angré 10ème tranche",
    type: "image",
    src: "/creations/alloco party.jpeg",
    ratio: "portrait",
  },
  {
    id: "affiche-2",
    category: "affiches",
    title: "Affiche Chill in Christ",
    description: "Affiche d'un évènement chrétiens Cocody Angré 10ème tranche",
    type: "image",
    src: "/creations/chiil in christ.jpeg",
    ratio: "portrait",
  },
  {
    id: "affiche-3",
    category: "affiches",
    title: "Affiche Ecole du Disciple",
    description: "Affiche d'un programme chrétiens chrétiens.",
    type: "image",
    src: "/creations/EDD.jpeg",
    ratio: "portrait",
  },
  {
    id: "affiche-4",
    category: "affiches",
    title: "Rencontre zoom",
    description: "Affiche d'un programme chrétiens chrétiens.",
    type: "image",
    src: "/creations/zoom.jpeg",
    ratio: "portrait",
  },
  {
    id: "affiche-5",
    category: "affiches",
    title: "Affiche Pins STANE GROUP",
    description: "Affiche pour une entreprise d'imprimerie",
    type: "image",
    src: "/creations/stanegroup1.jpeg",
    ratio: "portrait",
  },
  {
    id: "affiche-6",
    category: "affiches",
    title: "Affiche Cadre photo STANE GROUP",
    description: "Affiche pour une entreprise d'imprimerie",
    type: "image",
    src: "/creations/stanegroup2.jpeg",
    ratio: "portrait",
  },
  {
    id: "affiche-7",
    category: "affiches",
    title: "Affiche Tampon STANE GROUP",
    description: "Affiche pour une entreprise d'imprimerie",
    type: "image",
    src: "/creations/stanegroup3.jpeg",
    ratio: "portrait",
  },
  {
    id: "affiche-7",
    category: "affiches",
    title: "Affiche Personnalisez vos textiles STANE GROUP",
    description: "Affiche pour une entreprise d'imprimerie",
    type: "image",
    src: "/creations/stanegroup4.jpeg",
    ratio: "portrait",
  },
  {
    id: "affiche-8",
    category: "affiches",
    title: "Affiche Personnalisez vos Cachet STANE GROUP",
    description: "Affiche pour une entreprise d'imprimerie",
    type: "image",
    src: "/creations/stanegroup5.jpeg",
    ratio: "portrait",
  },

  //VIDEO
  {
    id: "video-1",
    category: "videos",
    title: "Montage vidéo — emplacement libre",
    description: "",
    type: "video",
    src: "",
    youtube: "",
    poster: "",
    ratio: "landscape",
  },
  {
    id: "photo-1",
    category: "photos",
    title: "Retouche photo — emplacement libre",
    description: "",
    type: "image",
    src: "",
    before: "",
    ratio: "square",
  },
];
