# Portfolio spatial — Adouko Dieudonné Samuel Ebenzer

Portfolio immersif de développeur Full-Stack, inspiré d'un univers spatial (reliefs noirs superposés, planètes, orbites, étoiles).

**Stack :** React 18 · Vite 5 · Tailwind CSS 3 · GSAP + ScrollTrigger · **Three.js** · Lucide React

**Sections :** Accueil · À propos · Compétences (clavier 3D) · Projets · **Créations** (affiches, montage vidéo, retouche photo) · Parcours · Formation · Services · Contact (globe 3D)

> ⚠️ **État des vérifications (à lire en premier)**
> Cette archive a été produite dans un environnement **sans accès au registre npm**. Par conséquent :
>
> | Vérification | Statut |
> |---|---|
> | Contrôle statique des imports/exports entre fichiers | ✅ exécuté |
> | `npm install` | ❌ **non exécuté** |
> | `npm run build` | ❌ **non exécuté** |
> | Test dans un navigateur (rendu, animations GSAP, scène Three.js, menu mobile, console) | ❌ **non exécuté** |
> | Test du formulaire, du téléchargement du CV, du responsive | ❌ **non exécuté** |
>
> Le code a été écrit avec soin, mais **il n'a jamais été compilé ni affiché**. Au premier lancement, des petites erreurs ou ajustements visuels sont possibles. Lancez `npm install` puis `npm run dev`, et si quelque chose ne fonctionne pas, copiez le message d'erreur : il sera simple à corriger. Aucun fichier `package-lock.json` n'est fourni (il sera créé par `npm install`).

---

## 1. Prérequis

- **Node.js 18 ou plus récent** (20 LTS recommandé) et **npm** (installé avec Node).
- Un éditeur de code (VS Code).
- Un navigateur récent compatible WebGL (Chrome, Edge, Firefox, Safari).

### Installer Node.js

1. Rendez-vous sur <https://nodejs.org> et téléchargez la version **LTS**.
2. Installez-la, puis vérifiez dans un terminal :

```bash
node -v
npm -v
```

## 2. Installation des dépendances

Dans le dossier du projet :

```bash
npm install
```

## 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez l'adresse affichée (en général <http://localhost:5173>).

## 4. Créer la version de production

```bash
npm run build
```

Le résultat est généré dans le dossier `dist/`.

## 5. Prévisualiser la version de production

```bash
npm run preview
```

---

## 6. Personnaliser le portfolio

Tout se configure dans `src/data/` : **aucun composant React à modifier** pour les cas courants.

### Modifier mon profil — `src/data/profile.js`

Nom, titre, textes du Hero et de « À propos », e-mail, téléphone, localisation, liens, formation, services, disponibilité de stage, expériences.

> **Règle :** une valeur vide (`''`) signifie « information non fournie ». Le lien ou bloc correspondant est alors affiché comme **désactivé** ou masqué. Rien n'est inventé : **les coordonnées, le parcours professionnel, les dates et l'établissement sont volontairement vides** et à renseigner par vous.

À renseigner en priorité :

```js
contact: { email: 'vous@exemple.com', phone: '', location: 'Ville, Pays', formEndpoint: '' },
socials: { github: 'https://github.com/votre-pseudo', linkedin: 'https://www.linkedin.com/in/votre-profil', other: [] },
education: [{ degree: 'Licence 3 Professionnelle en Génie Logiciel', school: '…', period: '…' }],
```

### Ajouter une expérience (stage, mission…)

Dans `profile.js`, tableau `experiences` (vide par défaut — seules de vraies expériences doivent y figurer) :

```js
experiences: [
  {
    period: '2025',
    type: 'Stage',
    role: 'Stagiaire développeur',
    organization: 'Nom de l’organisation',
    description: 'Ce que vous avez réellement fait.',
    highlights: ['Réalisation 1', 'Réalisation 2'],
    stack: ['React', 'Firebase'],
  },
],
```

Tant que le tableau est vide, une carte « prochaine étape » honnête s'affiche à la place.

### Ajouter un projet — `src/data/projects.js`

Ajoutez un objet au tableau `projects` :

```js
{
  id: 'mon-projet',
  name: 'Mon projet',
  tagline: 'Une phrase d’accroche',
  description: 'Description du projet.',
  problem: 'Le problème résolu.',
  features: ['Fonctionnalité 1', 'Fonctionnalité 2'],
  tech: ['React', 'Firebase'],
  repoUrl: 'https://github.com/votre-pseudo/mon-projet', // '' = lien désactivé
  demoUrl: '',                                            // '' = lien désactivé
  image: { src: '/images/mon-projet.webp', alt: 'Capture de la page d’accueil' }, // ou null
  planet: 'sun',            // visuel provisoire : 'sun' | 'teal' | 'ringed' | 'blue'
  placeholder: false,
  visualIsPlaceholder: true // passez à false quand vous fournissez une vraie capture
}
```

Déposez les captures dans `public/images/`. Tant qu'`image` vaut `null`, un visuel de planète est affiché avec la mention **« Visuel provisoire »**.

> Les projets **MyEEBDevent** et **Application de gestion de clients** sont préremplis à partir de vos indications. Vérifiez que les fonctionnalités et technologies listées correspondent exactement à la version réellement exposée.

### Ajouter mes créations (affiches, montage vidéo, retouche photo) — `src/data/creations.js`

La section **Créations** est une galerie filtrable (Tout / Affiches / Montage vidéo / Retouche photo) avec une visionneuse plein écran (clavier : ← → Échap).

1. Déposez vos fichiers dans `public/creations/` (images `.webp`/`.jpg`/`.png`, vidéos `.mp4`).
2. Ajoutez une entrée dans le tableau `creations` de `src/data/creations.js` (le mode d'emploi est en tête du fichier) :

```js
// Affiche
{ id: 'affiche-concert', category: 'affiches', title: 'Affiche du concert', description: 'Format A3…',
  type: 'image', src: '/creations/affiche-concert.webp', ratio: 'portrait', year: 2026 },

// Vidéo hébergée avec le site
{ id: 'clip-1', category: 'videos', title: 'Clip de présentation', type: 'video',
  src: '/creations/clip-1.mp4', poster: '/creations/clip-1.jpg', ratio: 'landscape' },

// Vidéo YouTube (recommandé pour les fichiers lourds)
{ id: 'clip-2', category: 'videos', title: 'Aftermovie', type: 'video', youtube: 'ID_DE_LA_VIDEO', ratio: 'landscape' },

// Retouche photo avec comparateur avant / après
{ id: 'retouche-1', category: 'photos', title: 'Portrait retouché', type: 'image',
  before: '/creations/portrait-avant.webp', src: '/creations/portrait-apres.webp', ratio: 'square' },
```

3. Supprimez les trois entrées « emplacement libre » quand vous avez vos vraies créations. Tant qu'une entrée n'a ni `src` ni `youtube`, elle est affichée comme « Emplacement libre » (non cliquable) : aucune fausse réalisation n'est présentée.

> Conseils : images de moins de 400 Ko et 1600 px de large ; vidéos `.mp4` (H.264) légères ou, mieux, YouTube. N'indiquez dans `description` que des faits réels (client, contexte).

### Modifier les services — `src/data/profile.js` (tableau `services`)

Chaque service a `group` (`'dev'` = Développement, `'creation'` = Création visuelle), `icon` (Globe, LayoutDashboard, Server, Smartphone, Database, Wrench, Palette, Film, Camera), `title`, `text` et `color` (`sun` | `volt` | `ion`). Pour un nouvel icône, importez-le dans `src/sections/Services.jsx` et ajoutez-le à l'objet `ICONS`.

### Ajouter une compétence — `src/data/skills.js`

Ajoutez `{ name: 'Nom', description: 'Courte description' }` dans `items` de la bonne catégorie (ou créez une catégorie). Aucun pourcentage de maîtrise n'est affiché volontairement.

### Remplacer le CV

1. Placez votre PDF dans `public/cv/` sous le nom **`cv-samuel.pdf`**.
2. C'est tout : le bouton « Télécharger mon CV » devient actif automatiquement (il est grisé tant que le fichier est absent).
3. Pour un autre nom de fichier, modifiez `cv.path` dans `profile.js`. Le nom du fichier téléchargé se règle avec `cv.downloadName`.

Aucun faux CV n'est fourni.

### Modifier les liens sociaux

`profile.js` → `socials.github`, `socials.linkedin`, `socials.other`. Un lien vide est affiché désactivé.

### Télécharger le code source du portfolio

Cette archive ZIP **est** le code source complet. Pour proposer un bouton de téléchargement sur le site, placez le ZIP dans `public/` puis renseignez `sourceCode.zipPath` dans `profile.js` (ex. `'/portfolio-samuel-fullstack.zip'`). Le CV (PDF) et le code source (ZIP) sont deux éléments distincts.

---

## 7. Configurer le formulaire de contact

Par défaut, **aucun message n'est envoyé par un serveur** : à la validation, le formulaire ouvre votre application de messagerie avec le sujet et le message préremplis (`mailto:`). Il faut pour cela renseigner `contact.email`. Le formulaire l'indique clairement à l'utilisateur.

### Brancher un vrai service d'envoi (exemple : Formspree)

1. Créez un formulaire sur <https://formspree.io> et copiez son URL (ex. `https://formspree.io/f/abcdwxyz`).
2. Collez-la dans `src/data/profile.js` :

```js
contact: { /* … */ formEndpoint: 'https://formspree.io/f/abcdwxyz' },
```

Le formulaire envoie alors les données en JSON (nom, e-mail, sujet, message) par `POST`, et affiche un message de succès ou d'erreur. Tout service acceptant un POST JSON convient (Formspree, Getform, Basin…). Pour EmailJS, Resend ou un backend maison, adaptez la fonction `onSubmit` dans `src/sections/Contact.jsx`.

---

## 8. Déployer

### Vercel

1. Poussez le projet sur GitHub.
2. Sur <https://vercel.com>, **Add New → Project**, importez le dépôt.
3. Framework : **Vite** (détecté automatiquement). Commande de build : `npm run build`. Dossier de sortie : `dist`.

### Netlify

1. Poussez le projet sur GitHub.
2. Sur <https://netlify.com>, **Add new site → Import an existing project**.
3. Commande de build : `npm run build`. Dossier à publier : `dist`.

(Ou en ligne de commande : `npm run build`, puis glisser-déposer le dossier `dist/` sur Netlify Drop.)

---

## 9. Architecture

```
portfolio-samuel/
├── public/                 favicon.svg, images/ (og-cover.svg), cv/ (déposez cv-samuel.pdf), creations/ (vos créations)
├── src/
│   ├── animations/gsapAnimations.js   enregistrement GSAP/ScrollTrigger + animations réutilisables
│   ├── three/              world.js (scène Three.js unique), planet.js, keyboard.js, globe.js, helpers.js
│   ├── components/         Navbar, SpaceBackground, StarField, Planet, OrbitLines,
│   │                       World + WorldContext (canvas 3D fixe, zones « ancres » + repli CSS),
│   │                       CreationCard, Lightbox, BeforeAfter,
│   │                       Button, CvButton, SectionHeading, Section, ProjectCard, ProjectVisual,
│   │                       SkillBadge, Loader, CustomCursor, ScrollProgress, BackToTop
│   ├── sections/           Hero, About, Skills, Projects, Creations, Experience, Education, Services, Contact, Footer
│   ├── data/               profile.js, projects.js, skills.js, creations.js   ← vos contenus
│   ├── hooks/              useGsap (gsap.context), useMagnetic, useMediaQuery, useCvAvailable
│   ├── App.jsx · main.jsx · index.css
├── index.html              SEO, Open Graph, Twitter Card
└── …                       vite / tailwind / postcss configs, package.json, .gitignore
```

## 10. Choix techniques

- **GSAP** : toutes les animations sont créées dans `gsap.context()` (hook `useGsap`) et annulées au démontage. Les éléments restent visibles par défaut (`gsap.from`) : le contenu est lisible même si les animations sont désactivées.
- **Three.js (monde 3D unique)** : un seul canvas fixe (`components/World.jsx`, chargé à la demande) dessine trois objets : la **planète rayée** du Hero (lunes et orbites), le **clavier 3D « Tech Stack »** (une touche par technologie de `skills.js`, qui se soulève au survol — y compris au survol des badges) et le **globe maillé** de la section Contact (anneaux et satellites). Chaque objet est attaché à une zone du DOM (`data-world-anchor`) : sa position et sa taille suivent le scroll, le responsive et les animations GSAP. Textures générées en canvas (aucune image externe). Ressources libérées au démontage ; repli automatique sur des planètes CSS si WebGL est indisponible.
- **Animations GSAP** : intro orchestrée du Hero, titres mot par mot, apparition des touches du clavier (`back.out`), lignes orbitales dessinées au scroll, parallaxe, boutons magnétiques, filtres de la galerie. Les révélations au scroll utilisent `IntersectionObserver` : un contenu ne peut pas rester caché si la mise en page change (polices, images).
- **Accessibilité** : HTML sémantique, lien d'évitement, états de focus visibles, menu mobile utilisable au clavier (Échap, piégeage du focus), `prefers-reduced-motion` respecté (animations GSAP désactivées, objets 3D immobiles).
- **Mobile** : parallaxe au curseur et curseur personnalisé désactivés sur écran tactile ; rendu 3D allégé (pixel ratio réduit, pas de survol) ; la planète est placée au-dessus du texte.
- **Curseur personnalisé** : simple halo ajouté au curseur système, qui reste visible.

## 11. Limites connues / étapes restantes

- Vérifications non exécutées (voir le tableau en haut) : à faire au premier lancement.
- Polices : pile système (aucune ressource externe). Pour une police personnalisée, ajoutez-la dans `index.html` / `tailwind.config.js`.
- `og-cover.svg` : certains réseaux sociaux préfèrent un PNG/JPG 1200×630 (voir `public/images/LISEZMOI.txt`).
- Inspiration : les interactions (clavier 3D, globe de contact, galerie) s'inspirent de portfolios 3D vus dans votre vidéo ; les visuels sont propres à ce projet (thème spatial), aucun asset n'a été copié.
- À renseigner par vous : vos créations (`src/data/creations.js`), e-mail, liens GitHub/LinkedIn, établissement et dates de formation, expériences, liens et captures des projets, CV.
