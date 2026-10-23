import * as THREE from 'three';
import { damp } from './helpers.js';

/**
 * Globe de la section Contact (inspiré de la vidéo de référence) :
 * sphère sombre, maillage fin, points lumineux, anneaux inclinés et satellites en orbite.
 */
export function buildGlobe() {
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);

  const globe = new THREE.Group();
  body.add(globe);

  globe.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 48, 36),
      new THREE.MeshStandardMaterial({ color: 0x0b1533, roughness: 0.85, emissive: 0x050c22 })
    )
  );

  globe.add(
    new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.42, 28, 18)),
      new THREE.LineBasicMaterial({ color: 0x4d8dff, transparent: true, opacity: 0.28 })
    )
  );

  // Points lumineux répartis sur la surface (cyan, quelques-uns orange).
  const count = 320;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cyan = new THREE.Color('#16C7D9');
  const orange = new THREE.Color('#FF6B1A');
  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 1.45;
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    const color = Math.random() > 0.9 ? orange : cyan;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  const dotsGeometry = new THREE.BufferGeometry();
  dotsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  dotsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  globe.add(new THREE.Points(dotsGeometry, new THREE.PointsMaterial({ size: 0.06, vertexColors: true, sizeAttenuation: true })));

  // Anneaux inclinés : chacun porte un satellite qui tourne autour du globe.
  const rings = [
    { radius: 1.95, color: 0x4d8dff, tiltX: 1.15, tiltZ: 0.3, speed: 0.5, sat: 0xff6b1a },
    { radius: 2.35, color: 0x16c7d9, tiltX: 0.6, tiltZ: -0.5, speed: -0.32, sat: 0xf5f7fa },
  ];
  const spinners = rings.map((ring) => {
    const tilt = new THREE.Object3D();
    tilt.rotation.x = ring.tiltX;
    tilt.rotation.z = ring.tiltZ;

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(ring.radius, 0.025, 8, 140),
      new THREE.MeshBasicMaterial({ color: ring.color, transparent: true, opacity: 0.75 })
    );
    torus.rotation.x = Math.PI / 2; // le tore est dans le plan XY par défaut : on le couche
    tilt.add(torus);

    const spinner = new THREE.Object3D();
    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 24, 16),
      new THREE.MeshStandardMaterial({ color: ring.sat, emissive: ring.sat, emissiveIntensity: 0.5, roughness: 0.5 })
    );
    satellite.position.set(ring.radius, 0, 0);
    spinner.add(satellite);
    tilt.add(spinner);
    body.add(tilt);
    return { spinner, speed: ring.speed };
  });

  const smooth = { x: 0, y: 0 };

  return {
    group,
    size: 2.7,
    update(dt, time, state) {
      globe.rotation.y += dt * 0.18;
      spinners.forEach(({ spinner, speed }) => {
        spinner.rotation.y += dt * speed;
      });
      smooth.x = damp(smooth.x, state.pointer.x, 3, dt);
      smooth.y = damp(smooth.y, state.pointer.y, 3, dt);
      body.rotation.y = smooth.x * 0.35;
      body.rotation.x = smooth.y * 0.2 + (state.progress - 0.5) * 0.3;
    },
  };
}
