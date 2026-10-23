// Planète générée en CSS pur (dégradés radiaux) : légère et facile à animer.
// Utilisée dans le loader, les visuels de projets, les services et en repli de la scène 3D.

const SURFACES = {
  sun: 'radial-gradient(circle at 32% 28%, #ffbf66 0%, #ff6b1a 48%, #b53a00 100%)',
  teal: 'radial-gradient(circle at 32% 28%, #4fe6ee 0%, #16a6b8 50%, #08475a 100%)',
  blue:
    'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.28), transparent 45%), repeating-linear-gradient(0deg, #3b5fa8 0 9px, #2c4a8a 9px 14px, #4d7ad0 14px 20px)',
  moon: 'radial-gradient(circle at 32% 28%, #e6e9ed 0%, #a3a9b1 55%, #4d535b 100%)',
  tan: 'radial-gradient(circle at 32% 28%, #f0d3a0 0%, #b08850 55%, #5b4426 100%)',
  dark:
    'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.18), transparent 45%), repeating-linear-gradient(0deg, #2c3036 0 10px, #3a3f46 10px 13px, #25292e 13px 22px)',
  banded:
    'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.25), transparent 50%), linear-gradient(170deg, #cfd4da 0 22%, #f0a93b 22% 30%, #eceff2 30% 46%, #8e949c 46% 62%, #dfe3e8 62% 78%, #a7adb5 78% 100%)',
};

/**
 * @param variant 'sun' | 'teal' | 'blue' | 'moon' | 'tan' | 'dark' | 'banded'
 * @param size    taille CSS (ex. 120 ou '12rem')
 * @param ring    ajoute un anneau orbital
 */
export default function Planet({ variant = 'moon', size = 96, ring = false, className = '', style }) {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: dimension, height: dimension, ...style }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: SURFACES[variant] || SURFACES.moon,
          boxShadow:
            'inset -14px -18px 34px rgba(0,0,0,0.55), inset 6px 6px 14px rgba(255,255,255,0.08), 0 18px 40px -12px rgba(0,0,0,0.7)',
        }}
      />
      {ring && (
        <span
          className="absolute left-1/2 top-1/2 rounded-[50%] border-[3px] border-mist/50"
          style={{
            width: '190%',
            height: '52%',
            transform: 'translate(-50%, -50%) rotate(-18deg)',
            boxShadow: '0 0 0 6px rgba(216,221,227,0.12)',
            clipPath: 'none',
          }}
        />
      )}
    </span>
  );
}
