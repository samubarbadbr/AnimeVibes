import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Trash2, Check } from 'lucide-react';
import type { AnimeItem, Tier } from '@/data/tierList';
import AnimeCard from './AnimeCard';

interface TierRowProps {
  tier: Tier;
  items: AnimeItem[];
  onRename: (id: string, label: string) => void;
  onRemove: (id: string) => void;
  onRemoveAnime: (id: string) => void;
  exporting?: boolean;
}

export default function TierRow({
  tier,
  items,
  onRename,
  onRemove,
  onRemoveAnime,
  exporting = false,
}: TierRowProps) {
  const { setNodeRef, isOver } = useDroppable({ id: tier.id });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(tier.label);

  const commitRename = () => {
    const trimmed = draft.trim();
    if (trimmed) onRename(tier.id, trimmed);
    setEditing(false);
  };

  const sortedIds = items.map((i) => i.id);

  return (
    <div
      ref={setNodeRef}
      className={`relative flex items-stretch overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOver
          ? 'border-white/20 bg-white/[0.05]'
          : 'border-white/[0.06] bg-white/[0.015]'
      }`}
      style={{
        boxShadow: isOver ? `inset 0 0 40px -8px rgb(${tier.accentRgb} / 0.2)` : 'none',
      }}
    >
      {/* Tier label */}
      <div
        className="flex shrink-0 flex-col items-center justify-center px-3 sm:px-5"
        style={{
          width: exporting ? 72 : 64,
          background: `linear-gradient(180deg, rgb(${tier.accentRgb} / 0.14), rgb(${tier.accentRgb} / 0.04))`,
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {editing && !exporting ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitRename();
              if (e.key === 'Escape') setEditing(false);
            }}
            className="w-full rounded-md border border-white/15 bg-black/40 px-1.5 py-0.5 text-center text-[20px] font-bold text-white outline-none"
            maxLength={4}
          />
        ) : (
          <button
            onDoubleClick={() => !exporting && setEditing(true)}
            onClick={() => !exporting && setEditing(true)}
            className="select-none text-[clamp(20px,5vw,28px)] font-bold leading-none transition-transform duration-300 hover:scale-105"
            style={{
              color: `rgb(${tier.accentRgb})`,
              textShadow: `0 0 24px rgb(${tier.accentRgb} / 0.4)`,
            }}
            title="Doppio clic per rinominare"
          >
            {tier.label}
          </button>
        )}

        {!exporting && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(tier.id);
            }}
            className="mt-1.5 text-white/20 transition-colors hover:text-red-400"
            aria-label="Elimina riga"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Drop zone with cards */}
      <div className="flex flex-1 flex-wrap gap-2 p-2.5 sm:gap-3 sm:p-3.5">
        <SortableContext items={sortedIds} strategy={horizontalListSortingStrategy}>
          {items.map((item) => (
            <AnimeCard
              key={item.id}
              item={item}
              tierAccentRgb={tier.accentRgb}
              onRemove={onRemoveAnime}
              exporting={exporting}
            />
          ))}
        </SortableContext>
        {items.length === 0 && (
          <div className="flex h-[112px] flex-1 items-center justify-center">
            <span className="text-[12px] font-medium text-white/20">
              Trascina qui gli anime
            </span>
          </div>
        )}
      </div>

      {/* Edit check button while editing */}
      {editing && !exporting && (
        <button
          onClick={commitRename}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/70"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
