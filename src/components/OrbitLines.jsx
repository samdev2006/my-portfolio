// Lignes orbitales fines (SVG). `pathLength=1` permet de les "dessiner" au scroll avec GSAP
// via l'attribut data-orbit (voir animations/gsapAnimations.js -> drawOrbits).

export default function OrbitLines({ className = '', color = '#4D8DFF', count = 3, tilt = -18 }) {
  return (
    <svg
      viewBox="0 0 800 800"
      aria-hidden="true"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ellipse
          key={i}
          data-orbit
          cx="400"
          cy="400"
          rx={170 + i * 95}
          ry={70 + i * 42}
          transform={`rotate(${tilt + i * 6} 400 400)`}
          stroke={color}
          strokeOpacity={0.5 - i * 0.12}
          strokeWidth="1.2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0"
        />
      ))}
      <circle cx="400" cy="400" r="3" fill={color} fillOpacity="0.6" />
    </svg>
  );
}
