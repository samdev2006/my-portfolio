# Portfolio — Dieudonné S.E. Adouko

Portfolio de développeur Full-Stack : projets, créations visuelles, parcours et formulaire de contact.

**En ligne :** <https://my-portfolio-ten-sigma-97.vercel.app>

**Stack :** React 18 · Vite 5 · Tailwind CSS 3 · GSAP (ScrollTrigger) · Lucide · polices auto-hébergées (Bricolage Grotesque, Inter, JetBrains Mono via Fontsource)

## Lancer le projet

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # génère dist/
npm run preview   # prévisualise dist/
```

Node.js 18 ou plus récent.

> **Erreur `ECONNRESET` pendant `npm install` ?** Certains réseaux bloquent le TLS 1.3 vers le registre npm (hébergé chez Cloudflare). Forcez le TLS 1.2 :
> `NODE_OPTIONS="--tls-max-v1.2" npm install`

## Modifier le contenu

Tout le contenu se trouve dans `src/data/` : aucun composant à modifier pour les cas courants. Une valeur vide (`''` ou `[]`) masque le bloc correspondant.

### Français / anglais

Le site existe en français (par défaut) et en anglais. Le visiteur choisit avec le bouton **FR / EN** de la navigation ou la palette `Ctrl + K`. Son choix est mémorisé, et l'adresse `?lang=en` ouvre directement la version anglaise (à partager avec un recruteur anglophone).

- **Contenu** (`src/data/`) : un texte traduisible s'écrit `{ fr: '…', en: '…' }`. Une simple chaîne (`'React'`, un nom propre) est identique dans les deux langues. Si l'anglais manque, le français s'affiche.
  ```js
  tagline: { fr: 'Gestion financière pour les PME', en: 'Financial management for small businesses' },
  ```
- **Interface** (boutons, titres de section, messages du formulaire…) : `src/i18n/ui.js`.
- **CV en anglais** : déposez le PDF dans `public/cv/` et renseignez `cv.pathEn` dans `profile.js`. En attendant, la version anglaise propose le CV français avec la mention « Resume (French) ».

| Fichier | Contenu |
|---|---|
| `profile.js` | Nom, textes de l'accueil et de « À propos », contact, réseaux, CV, expériences, formation, services, navigation |
| `projects.js` | Projets (description, fonctionnalités, technologies, liens, capture) |
| `creations.js` | Galerie : affiches, vidéos (fichier ou YouTube), retouches avant / après |
| `skills.js` | Compétences par catégorie et bandeau défilant de l'accueil |

### Ajouter un projet

Déposez la capture dans `public/images/` (`.webp`, ~1600 px de large), puis ajoutez un objet dans `projects.js` :

```js
{
  id: 'mon-projet',
  name: 'Mon projet',
  tagline: 'Une phrase d’accroche',
  status: 'En ligne',               // 'En ligne' | 'En cours' | ''
  description: 'Ce que fait l’application.',
  problem: 'Le problème résolu.',
  features: ['Fonctionnalité 1', 'Fonctionnalité 2'],
  tech: ['React', 'Spring Boot'],
  repoUrl: 'https://github.com/samdev2006/mon-projet', // dépôt PUBLIC, sinon 404
  demoUrl: 'https://mon-projet.vercel.app',
  image: { src: '/images/mon-projet.webp', alt: 'Page d’accueil de Mon projet' }, // ou null
  accent: '#FF6B1A',                // couleur de la couverture si image = null
}
```

### Ajouter une création

Déposez le fichier dans `public/creations/` puis ajoutez une entrée dans `creations.js` (le mode d'emploi est en tête du fichier). L'`id` doit être unique. Une catégorie sans réalisation n'apparaît pas dans les filtres.

### Photo de l'accueil

`public/images/samuel.webp` est un portrait détouré (fond transparent, cadré jusqu'à la taille), référencé par `photo` dans `profile.js`. Pour la changer, fournissez un PNG ou WebP **à fond transparent** (un fond blanc jurerait avec le thème sombre) ; `photo: null` retire la photo.

### CV

Le PDF est `public/cv/cv-samuel.pdf`. Les boutons « CV » se désactivent automatiquement si le fichier est absent.

### Formulaire de contact

Les messages passent par Formspree (`contact.formEndpoint` dans `profile.js`). Laissez la valeur vide pour que le formulaire ouvre plutôt la messagerie du visiteur (`mailto:`).

### Image de partage

`public/images/og-cover.png` (1200 × 630) est l'aperçu affiché sur LinkedIn, WhatsApp, etc. Les balises `og:*` de `index.html` utilisent l'adresse complète du site : mettez-les à jour si le domaine change.

## Fonctionnalités

- **Activité GitHub en direct** (`sections/GithubActivity.jsx`) : statistiques, langages et 6 derniers dépôts publics, lus depuis l'API GitHub à partir de `socials.github` (cache 1 h dans le navigateur, message de repli si l'API ne répond pas). Les forks et le dépôt README du profil sont ignorés. Ajoutez une description à vos dépôts sur GitHub : elle s'affiche sur les cartes.
- **Palette de commandes** : `Ctrl + K` / `⌘ + K` (ou le bouton « Rechercher » de la barre de navigation) pour aller à une section, copier l'e-mail, télécharger le CV, ouvrir GitHub ou LinkedIn.
- **Barre de lecture** sous la navigation.
- **Référencement** : données structurées `Person` (JSON-LD) dans `index.html`, `public/robots.txt` et `public/sitemap.xml`. Mettez à jour leur adresse si le domaine change.
- **Message dans la console** pour les développeurs curieux.

## Architecture

```
src/
├── data/          contenus (profile, projects, creations, skills)
├── sections/      Hero, About, Skills, Projects, Creations, Journey, Services, Contact, Footer
├── components/    Navbar, Section, SectionHeading, Button, CvButton, ProjectCard,
│                  CreationCard, Lightbox, BeforeAfter
├── i18n/          LanguageContext (langue, tr()), ui.js (textes de l’interface FR / EN)
├── animations/    gsapAnimations.js : révélations au scroll (IntersectionObserver + GSAP)
├── hooks/         useGsap (gsap.context nettoyé au démontage), useCvAvailable
└── App.jsx · main.jsx · index.css
```

## Choix techniques

- **Animations** : GSAP dans `gsap.context()` (annulé au démontage). Le contenu est visible par défaut et n'est masqué qu'au moment où l'animation démarre ; `prefers-reduced-motion` désactive tout mouvement.
- **Accessibilité** : HTML sémantique, lien d'évitement, focus visible, menu mobile et visionneuse utilisables au clavier (Échap, flèches, focus piégé), erreurs de formulaire reliées aux champs.
- **Performance** : aucune bibliothèque 3D, polices auto-hébergées, captures en WebP, images de la galerie chargées à la demande.

## Déployer

Vercel ou Netlify : framework **Vite**, commande `npm run build`, dossier `dist`.
