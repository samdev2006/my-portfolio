import { useMemo, useState } from 'react';
import useGsap from '../hooks/useGsap.js';
import { standardSectionAnimations } from '../animations/gsapAnimations.js';
import { creationCategories, creations } from '../data/creations.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CreationCard, { isEmptyCreation } from '../components/CreationCard.jsx';
import Lightbox from '../components/Lightbox.jsx';

export default function Creations() {
  const [filter, setFilter] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);
  const [openId, setOpenId] = useState(null);

  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    standardSectionAnimations(ref.current);
  }, []);

  const visible = useMemo(
    () => creations.filter((item) => filter === 'all' || item.category === filter),
    [filter]
  );
  // La visionneuse ne parcourt que les réalisations réelles (pas les emplacements libres).
  const openable = useMemo(() => visible.filter((item) => !isEmptyCreation(item)), [visible]);
  const openIndex = openable.findIndex((item) => item.id === openId);
  const current = openIndex >= 0 ? openable[openIndex] : null;
  const allEmpty = creations.every(isEmptyCreation);

  const changeFilter = (id) => {
    setFilter(id);
    setAnimateCards(true);
  };

  return (
    <div ref={ref}>
      <Section id="creations" wave="b">
        <SectionHeading
          id="creations"
          eyebrow="04 · Créations"
          title="Au-delà du code : l’image et le mouvement."
          description="Affiches, montages vidéo et retouches photo : mes réalisations graphiques, à côté du développement."
        />

        <div data-reveal role="group" aria-label="Filtrer les créations" className="mb-8 flex flex-wrap gap-2">
          {creationCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={filter === category.id}
              onClick={() => changeFilter(category.id)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                filter === category.id
                  ? 'border-sun bg-sun text-void'
                  : 'border-mist/20 text-mist/80 hover:border-ion hover:text-snow'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {allEmpty && (
          <p data-reveal className="mb-8 max-w-xl text-sm text-mist/70">
            Galerie en cours de constitution : les premières réalisations seront ajoutées prochainement.
          </p>
        )}

        {visible.length > 0 ? (
          <ul data-reveal className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {visible.map((item, index) => (
              <CreationCard
                key={item.id}
                item={item}
                index={index}
                animate={animateCards}
                onOpen={(selected) => setOpenId(selected.id)}
              />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-mist/70">Aucune réalisation dans cette catégorie pour le moment.</p>
        )}
      </Section>

      {current && (
        <Lightbox
          item={current}
          hasPrev={openIndex > 0}
          hasNext={openIndex < openable.length - 1}
          onClose={() => setOpenId(null)}
          onPrev={() => setOpenId(openable[openIndex - 1].id)}
          onNext={() => setOpenId(openable[openIndex + 1].id)}
        />
      )}
    </div>
  );
}
