// MONDE 3D : un seul canvas Three.js fixe pour toute la page (comme dans la vidéo de référence).
// Chaque objet 3D (planète du Hero, clavier "Tech Stack", globe du Contact) est rattaché à un
// élément DOM « ancre » ([data-world-anchor="hero|skills|contact"]). À chaque image, la position
// et la taille de l'ancre à l'écran pilotent celles de l'objet : l'objet suit donc le scroll,
// le responsive et les transformations GSAP de la page sans aucune position codée en dur.
import * as THREE from 'three';
import { gsap } from '../animations/gsapAnimations.js';
import { disposeObject } from './helpers.js';
import { buildPlanet } from './planet.js';
import { buildKeyboard } from './keyboard.js';
import { buildGlobe } from './globe.js';

const FOV = 35;
const CAMERA_Z = 14;

export function createWorld(canvas, { items, reduced, coarse, onHover, onFail }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !coarse,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
  camera.position.set(0, 0, CAMERA_Z);

  // Lumières : soleil chaud en haut à gauche, ambiance bleutée, liseré bleu à l'arrière.
  const sun = new THREE.DirectionalLight(0xfff1e0, 2.6);
  sun.position.set(-4, 3, 8);
  scene.add(sun);
  scene.add(new THREE.AmbientLight(0x4a5b78, 0.6));
  const rim = new THREE.PointLight(0x4d8dff, 16, 30);
  rim.position.set(5, -2, -3);
  scene.add(rim);

  const modules = {
    hero: buildPlanet(),
    skills: buildKeyboard(items),
    contact: buildGlobe(),
  };
  Object.values(modules).forEach((mod) => {
    mod.group.visible = false;
    mod.intro = { value: reduced ? 1 : 0 }; // échelle d'apparition animée par GSAP
    mod.entered = false;
    scene.add(mod.group);
  });

  const state = { pointer: { x: 0, y: 0 }, progress: 0 };
  const ndc = new THREE.Vector2(2, 2);
  const raycaster = new THREE.Raycaster();
  let clientX = 0;
  let clientY = 0;
  let pointerActive = false;
  let ready = false;
  let drawn = false;
  let frame = 0;
  let lastHoverName = null;

  const visibleHeight = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  let anchors = {};

  const queryAnchors = () => {
    anchors = {};
    document.querySelectorAll('[data-world-anchor]').forEach((el) => {
      anchors[el.dataset.worldAnchor] = el;
    });
  };

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    queryAnchors();
  };
  resize();
  window.addEventListener('resize', resize);

  const onPointerMove = (event) => {
    clientX = event.clientX;
    clientY = event.clientY;
    pointerActive = true;
    ndc.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    if (!reduced) {
      state.pointer.x = ndc.x;
      state.pointer.y = -ndc.y;
    }
  };
  if (!coarse) window.addEventListener('pointermove', onPointerMove, { passive: true });

  // Les badges de compétences (DOM) peuvent soulever la touche correspondante.
  const onSkillHighlight = (event) => modules.skills.setHighlight(event.detail || null);
  window.addEventListener('world:skill', onSkillHighlight);

  const enter = (mod) => {
    if (reduced) {
      mod.intro.value = 1;
      if (mod.playIntro) mod.playIntro(true);
      return;
    }
    gsap.to(mod.intro, { value: 1, duration: 1.8, ease: 'expo.out' });
    if (mod.playIntro) mod.playIntro();
  };

  const tick = (time, deltaMs) => {
    const dt = reduced ? 0 : Math.min(deltaMs / 1000, 0.05);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;

    frame += 1;
    if (frame % 90 === 0) queryAnchors();

    const unitsPerPixel = visibleHeight / h;
    let anyVisible = false;

    Object.entries(modules).forEach(([name, mod]) => {
      const el = anchors[name];
      if (!el) {
        mod.group.visible = false;
        return;
      }
      const rect = el.getBoundingClientRect();
      const visible =
        rect.width > 0 && rect.height > 0 && rect.bottom > -80 && rect.top < h + 80 && (name !== 'hero' || ready);
      mod.group.visible = visible;
      if (!visible) return;
      anyVisible = true;

      if (!mod.entered) {
        mod.entered = true;
        enter(mod);
      }

      // Position : centre de l'ancre -> coordonnées monde sur le plan z = 0.
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mod.group.position.set((cx - w / 2) * unitsPerPixel, -(cy - h / 2) * unitsPerPixel, 0);

      // Taille : l'objet tient dans le plus petit côté de l'ancre.
      const scale = (Math.min(rect.width, rect.height) * unitsPerPixel) / (mod.size * 2);
      mod.group.scale.setScalar(Math.max(scale * mod.intro.value, 0.0001));

      // Progression de l'ancre dans la fenêtre (0 = entre par le bas, 1 = sort par le haut).
      state.progress = THREE.MathUtils.clamp((h - rect.top) / (h + rect.height), 0, 1);
      mod.update(dt, time, state);
    });

    // Survol des touches du clavier (lancer de rayon) : soulèvement + infobulle.
    if (onHover) {
      const keyboard = modules.skills;
      let hit = null;
      if (keyboard.group.visible && pointerActive && !coarse) {
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(keyboard.pickables, false);
        hit = hits.length ? hits[0].object : null;
      }
      keyboard.setHover(hit);
      const name = hit ? hit.userData.name : null;
      if (hit) onHover(hit.userData, clientX, clientY);
      else if (lastHoverName) onHover(null);
      lastHoverName = name;
    }

    if (anyVisible) {
      renderer.render(scene, camera);
      drawn = true;
    } else if (drawn) {
      renderer.clear();
      drawn = false;
    }
  };

  gsap.ticker.add(tick);

  const onContextLost = (event) => {
    event.preventDefault();
    if (onFail) onFail(new Error('Contexte WebGL perdu'));
  };
  canvas.addEventListener('webglcontextlost', onContextLost);

  return {
    setReady(value) {
      ready = Boolean(value);
    },
    dispose() {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('world:skill', onSkillHighlight);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      Object.values(modules).forEach((mod) => {
        gsap.killTweensOf(mod.intro);
        if (mod.dispose) mod.dispose();
      });
      disposeObject(scene);
      renderer.dispose();
    },
  };
}
