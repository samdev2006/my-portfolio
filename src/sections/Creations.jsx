import { useMemo, useState } from 'react';
import { creationCategories, creations } from '../data/creations.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CreationCard, { isEmptyCreation } from '../components/CreationCard.jsx';
import Lightbox from '../components/Lightbox.jsx';

const items = creations.filter((item) => !isEmptyCreation(item));
const labelOf = (id) => (creationCategories.find((c) => c.id === id) || { label: id }).label;

export default function Creations() {
  const [filter, setFilter] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);
  const [openId, setOpenId] = useState(null);

  // Seules les catégories qui contiennent au moins une réalisation sont proposées.
  const categories = useMemo(
    () => creationCategories.filter((c) => c.id === 'all' || items.some((item) => item.category === c.id)),
    []
  );
  const visible = useMemo(() => items.filter((item) => filter === 'all' || item.category === filter), [filter]);
  const openIndex = visible.findIndex((item) => item.id === openId);
  const current = openIndex >= 0 ? visible[openIndex] : null;

  if (!items.length) return null;

  const filters =
    categories.length > 2 ? (
      <div role="group" aria-label="Filtrer les créations" className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={filter === category.id}
            onClick={() => {
              setFilter(category.id);
              setAnimateCards(true);
            }}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === category.id
                ? 'border-paper bg-paper text-ink'
                : 'border-line text-stone hover:border-paper/40 hover:text-paper'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <>
      <Section id="creations" className="border-t border-line">
        <SectionHeading
          id="creations"
          index="04"
          label="Créations"
          title="Au-delà du code : l’image."
          text="Affiches et visuels réalisés pour des événements, des communautés et des entreprises. Cliquez sur une image pour l’agrandir."
          aside={filters}
        />

        <ul data-reveal className="columns-2 gap-4 sm:gap-5 lg:columns-3">
          {visible.map((item, index) => (
            <CreationCard
              key={item.id}
              item={item}
              index={index}
              animate={animateCards}
              categoryLabel={labelOf(item.category)}
              onOpen={(selected) => setOpenId(selected.id)}
            />
          ))}
        </ul>
      </Section>

      {current && (
        <Lightbox
          item={current}
          categoryLabel={labelOf(current.category)}
          position={`${openIndex + 1} / ${visible.length}`}
          hasPrev={openIndex > 0}
          hasNext={openIndex < visible.length - 1}
          onClose={() => setOpenId(null)}
          onPrev={() => setOpenId(visible[openIndex - 1].id)}
          onNext={() => setOpenId(visible[openIndex + 1].id)}
        />
      )}
    </>
  );
}
