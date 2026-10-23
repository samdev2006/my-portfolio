import * as THREE from 'three';
import { makeBandTexture, damp } from './helpers.js';

// Planète du Hero : bandes grises et bande orangée (référence : image spatiale fournie),
// trois lunes colorées sur des orbites inclinées, lignes orbitales fines.
const BANDS = {
  base: '#b5bac1',
  bands: [
    ['#c9ced5', 0, 40], ['#eceff2', 40, 34], ['#9aa0a8', 74, 26], ['#f0a93b', 100, 22],
    ['#d98a2b', 122, 10], ['#dfe3e8', 132, 36], ['#7d838c', 168, 30], ['#c2c7ce', 198, 26],
    ['#a7adb5', 224, 32],
  ],
};

const MOONS = [
  { r: 0.2, color: '#FF6B1A', orbit: 2.3, speed: 0.32, phase: 0.6, tilt: 0.35 },
  { r: 0.14, color: '#16C7D9', orbit: 2.9, speed: -0.22, phase: 2.4, tilt: -0.25 },
  { r: 0.11, color: '#4D8DFF', orbit: 1.75, speed: 0.46, phase: 4.1, tilt: 0.7 },
];

const ORBITS = [
  { rx: 1.9, color: '#4D8DFF' },
  { rx: 2.5, color: '#16C7D9' },
];

export function buildPlanet() {
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1.25, 64, 48),
    new THREE.MeshStandardMaterial({ map: makeBandTexture(BANDS), roughness: 0.92, metalness: 0 })
  );
  planet.rotation.z = 0.18;
  body.add(planet);

  ORBITS.forEach((orbit, i) => {
    const points = [];
    for (let a = 0; a <= 128; a += 1) {
      const t = (a / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(t) * orbit.rx, 0, Math.sin(t) * orbit.rx));
    }
    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: orbit.color, transparent: true, opacity: 0.38 })
    );
    line.rotation.x = 0.35 + i * 0.28;
    line.rotation.z = -0.3 + i * 0.4;
    body.add(line);
  });

  const spinners = MOONS.map((moon) => {
    const tilt = new THREE.Object3D();
    tilt.rotation.x = moon.tilt;
    tilt.rotation.z = moon.tilt * 0.6;
    const spinner = new THREE.Object3D();
    spinner.rotation.y = moon.phase;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(moon.r, 32, 24),
      new THREE.MeshStandardMaterial({
        color: moon.color,
        roughness: 0.7,
        emissive: moon.color,
        emissiveIntensity: 0.18,
      })
    );
    mesh.position.set(moon.orbit, 0, 0);
    spinner.add(mesh);
    tilt.add(spinner);
    body.add(tilt);
    return { spinner, speed: moon.speed };
  });

  const smooth = { x: 0, y: 0 };

  return {
    group,
    size: 3.2, // rayon englobant (planète + orbites), sert au cadrage dans l'ancre DOM
    update(dt, time, state) {
      planet.rotation.y += dt * 0.06;
      spinners.forEach(({ spinner, speed }) => {
        spinner.rotation.y += dt * speed;
      });
      // Parallaxe douce (curseur) + inclinaison liée à la progression de scroll.
      smooth.x = damp(smooth.x, state.pointer.x, 3, dt);
      smooth.y = damp(smooth.y, state.pointer.y, 3, dt);
      body.rotation.y = smooth.x * 0.3 + state.progress * 0.5;
      body.rotation.x = smooth.y * 0.16;
    },
  };
}
