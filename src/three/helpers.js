import * as THREE from 'three';

export const COLORS = { volt: '#4D8DFF', sun: '#FF6B1A', ion: '#16C7D9' };

/** Libère géométries, matériaux et textures d'un objet 3D. */
export function disposeObject(root) {
  root.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      if (!material) return;
      if (material.map) material.map.dispose();
      material.dispose();
    });
  });
}

/** Texture de planète rayée (bandes à bords ondulés), générée sur un canvas : aucune image externe. */
export function makeBandTexture({ base, bands }) {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d');

  g.fillStyle = base;
  g.fillRect(0, 0, width, height);

  bands.forEach(([color, y, h]) => {
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(0, y);
    for (let x = 0; x <= width; x += 8) g.lineTo(x, y + Math.sin(x * 0.03 + y) * 4);
    for (let x = width; x >= 0; x -= 8) g.lineTo(x, y + h + Math.sin(x * 0.03 + y + h) * 4);
    g.closePath();
    g.fill();
  });

  g.strokeStyle = 'rgba(255,255,255,0.18)';
  g.lineWidth = 2;
  for (let i = 0; i < 9; i += 1) {
    const y = 14 + i * 27;
    g.beginPath();
    g.moveTo(0, y);
    for (let x = 0; x <= width; x += 16) g.lineTo(x, y + Math.sin(x * 0.05 + i * 2) * 5);
    g.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

/** Texture transparente portant le texte d'une touche du clavier. */
export function makeLabelTexture(text) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d');
  g.clearRect(0, 0, size, size);
  g.fillStyle = '#F5F7FA';
  g.textAlign = 'center';
  g.textBaseline = 'middle';

  // Réduit la police jusqu'à ce que le texte tienne dans la touche.
  let fontSize = 92;
  do {
    g.font = `700 ${fontSize}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, sans-serif`;
    fontSize -= 6;
  } while (g.measureText(text).width > size * 0.84 && fontSize > 24);

  g.fillText(text, size / 2, size / 2 + 4);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Interpolation exponentielle indépendante de la fréquence d'images. */
export function damp(current, target, lambda, dt) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}
