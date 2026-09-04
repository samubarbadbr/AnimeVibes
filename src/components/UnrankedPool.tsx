import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import type { AnimeItem } from '@/data/tierList';
import AnimeCard from './AnimeCard';

interface UnrankedPoolProps {
  items: AnimeItem[];
  onRemoveAnime: (id: string) => void;
  exporting?: boolean;
}

export default function UnrankedPool({
  items,
  onRemoveAnime,
  exporting = false,
}: UnrankedPoolProps) {
  const { setNodeRef, isOver } = useDroppable({ id: 'unranked-pool' });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-3xl border p-4 transition-all duration-300 sm:p-5 ${
        isOver
          ? 'border-white/20 bg-white/[0.04]'
          : 'border-white/[0.06] bg-white/[0.015]'
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/50">
          Anime non classificati
        </h2>
        <span className="text-[12px] font-medium text-white/30">
          {items.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={rectSortingStrategy}
        >
          {items.map((item) => (
            <AnimeCard
              key={item.id}
              item={item}
              onRemove={onRemoveAnime}
              exporting={exporting}
            />
          ))}
        </SortableContext>
        {items.length === 0 && (
          <div className="flex h-[112px] w-full items-center justify-center">
            <span className="text-[13px] font-medium text-white/25">
              Tutti gli anime sono stati classificati.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
