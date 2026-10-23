import { useEffect, useRef } from 'react';
import { prefersReducedMotion, isCoarsePointer } from '../animations/gsapAnimations.js';
import { skillCategories } from '../data/skills.js';
import { useWorld } from './WorldContext.jsx';

// Les touches du clavier 3D proviennent directement des compétences (src/data/skills.js).
const KEY_ITEMS = skillCategories.flatMap((category) =>
  category.items.map((item) => ({ name: item.name, description: item.description, color: category.color }))
);

/**
 * Canvas Three.js fixe, plein écran, au-dessus du contenu mais sans capter les clics
 * (pointer-events: none). Le module 3D est chargé à la demande (code splitting).
 */
export default function World({ ready }) {
  const { setStatus } = useWorld();
  const canvasRef = useRef(null);
  const tipRef = useRef(null);
  const worldRef = useRef(null);
  const readyRef = useRef(ready);

  useEffect(() => {
    let cancelled = false;
    let world = null;

    const onHover = (info, x, y) => {
      const tip = tipRef.current;
      if (!tip) return;
      if (!info) {
        tip.style.opacity = '0';
        return;
      }
      tip.children[0].textContent = info.name;
      tip.children[1].textContent = info.description;
      tip.style.transform = `translate(${x + 18}px, ${y + 18}px)`;
      tip.style.opacity = '1';
    };

    import('../three/world.js')
      .then(({ createWorld }) => {
        if (cancelled || !canvasRef.current) return;
        try {
          world = createWorld(canvasRef.current, {
            items: KEY_ITEMS,
            reduced: prefersReducedMotion(),
            coarse: isCoarsePointer(),
            onHover,
            onFail: () => setStatus('failed'),
          });
          worldRef.current = world;
          world.setReady(readyRef.current);
          setStatus('ready');
        } catch (error) {
          // WebGL indisponible : les ancres affichent leur repli CSS.
          setStatus('failed');
        }
      })
      .catch(() => setStatus('failed'));

    return () => {
      cancelled = true;
      if (world) world.dispose();
      worldRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    readyRef.current = ready;
    if (worldRef.current) worldRef.current.setReady(ready);
  }, [ready]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
      />
      <div
        ref={tipRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[6] w-56 rounded-xl border border-mist/15 bg-void/90 px-3 py-2 opacity-0 shadow-xl backdrop-blur transition-opacity duration-150"
      >
        <p className="font-display text-sm font-semibold text-snow" />
        <p className="mt-0.5 text-xs leading-snug text-mist/80" />
      </div>
    </>
  );
}
