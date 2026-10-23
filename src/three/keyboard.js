import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { gsap } from '../animations/gsapAnimations.js';
import { COLORS, makeLabelTexture, damp } from './helpers.js';

// Libellés courts pour tenir sur une touche.
const SHORT = {
  'React.js': 'React',
  'Vue.js': 'Vue',
  'Nuxt.js': 'Nuxt',
  JavaScript: 'JS',
  Angular: 'NG',
  'Tailwind CSS': 'TW',
  'Spring Boot': 'Spring',
  'API REST': 'REST',
  Firebase: 'Fire',
  'VS Code': 'Code',
  Docker: 'Dock',
  GitHub: 'GitHub',
  'Création d’affiches': 'Affiche',
  'Montage vidéo': 'Vidéo',
  'Retouche photo': 'Photo',
  'Design graphique': 'Design',
};

const COLUMNS = 6;
const PITCH = 1.15;
const KEY_Y = 0.28;

/**
 * Clavier isométrique de touches « Tech Stack » (inspiré de la vidéo de référence).
 * Chaque touche = une technologie. Les touches montent à l'entrée (GSAP), se soulèvent au survol.
 */
export function buildKeyboard(items) {
  const group = new THREE.Group();
  const board = new THREE.Group();
  group.add(board);

  const rows = Math.ceil(items.length / COLUMNS);
  const width = COLUMNS * PITCH + 0.5;
  const depth = rows * PITCH + 0.5;

  const base = new THREE.Mesh(
    new RoundedBoxGeometry(width, 0.45, depth, 4, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x151a21, roughness: 0.55, metalness: 0.35 })
  );
  base.position.y = -0.32;
  board.add(base);

  const keyGeometry = new RoundedBoxGeometry(1, 0.55, 1, 4, 0.15);
  const labelGeometry = new THREE.PlaneGeometry(0.72, 0.72);
  const keys = [];

  items.forEach((item, index) => {
    const row = Math.floor(index / COLUMNS);
    const col = index % COLUMNS;
    const inRow = row === rows - 1 ? items.length - row * COLUMNS : COLUMNS;
    const accent = new THREE.Color(COLORS[item.color] || COLORS.volt);

    const material = new THREE.MeshStandardMaterial({
      color: accent.clone().multiplyScalar(0.6),
      roughness: 0.35,
      metalness: 0.15,
      emissive: accent,
      emissiveIntensity: 0,
    });
    const key = new THREE.Mesh(keyGeometry, material);
    key.position.set((col - (inRow - 1) / 2) * PITCH, KEY_Y - 4, (row - (rows - 1) / 2) * PITCH);

    const label = new THREE.Mesh(
      labelGeometry,
      new THREE.MeshBasicMaterial({
        map: makeLabelTexture(SHORT[item.name] || item.name.slice(0, 6)),
        transparent: true,
        depthWrite: false,
      })
    );
    label.rotation.x = -Math.PI / 2;
    label.position.y = 0.285;
    key.add(label);

    key.userData = { name: item.name, description: item.description, active: false, glow: 0 };
    board.add(key);
    keys.push(key);
  });

  let hovered = null;
  let highlightName = null;
  const smooth = { x: 0, y: 0 };

  const tweens = [];

  return {
    group,
    size: Math.hypot(width, depth) * 0.46,
    pickables: keys,

    /** Les touches montent une à une (back.out) quand le clavier entre à l'écran. */
    playIntro(instant = false) {
      keys.forEach((key, i) => {
        if (instant) {
          key.position.y = KEY_Y;
          key.userData.active = true;
          return;
        }
        tweens.push(
          gsap.to(key.position, {
            y: KEY_Y,
            duration: 0.9,
            delay: 0.25 + i * 0.035,
            ease: 'back.out(1.7)',
            onComplete: () => {
              key.userData.active = true;
            },
          })
        );
      });
    },

    setHover(mesh) {
      hovered = mesh;
    },
    setHighlight(name) {
      highlightName = name;
    },

    update(dt, time, state) {
      smooth.x = damp(smooth.x, state.pointer.x, 3, dt);
      smooth.y = damp(smooth.y, state.pointer.y, 3, dt);

      // Orientation isométrique, qui évolue avec le scroll et le curseur.
      board.rotation.x = 0.95 + smooth.y * 0.08;
      board.rotation.y = -0.75 + (state.progress - 0.5) * 1.2 + smooth.x * 0.12;
      board.rotation.z = Math.sin(time * 0.6) * 0.03;

      keys.forEach((key) => {
        if (!key.userData.active) return;
        const lifted = key === hovered || key.userData.name === highlightName;
        key.position.y = damp(key.position.y, KEY_Y + (lifted ? 0.32 : 0), 12, dt);
        key.userData.glow = damp(key.userData.glow, lifted ? 0.65 : 0, 10, dt);
        key.material.emissiveIntensity = key.userData.glow;
      });
    },

    dispose() {
      tweens.forEach((tween) => tween.kill());
      keys.forEach((key) => gsap.killTweensOf(key.position));
    },
  };
}
