import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import type { AnimeItem } from '@/data/tierList';

interface AnimeCardProps {
  item: AnimeItem;
  tierAccentRgb?: string;
  onRemove?: (id: string) => void;
  exporting?: boolean;
}

const CARD_W = 80;
const CARD_H = 112;

export default function AnimeCard({
  item,
  tierAccentRgb,
  onRemove,
  exporting = false,
}: AnimeCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative shrink-0 touch-none"
      {...attributes}
      {...listeners}
    >
      <div
        className="relative overflow-hidden rounded-xl border transition-all duration-300"
        style={{
          width: CARD_W,
          height: CARD_H,
          borderColor: tierAccentRgb
            ? `rgb(${tierAccentRgb} / 0.18)`
            : 'rgba(255,255,255,0.08)',
          boxShadow: isDragging
            ? `0 16px 40px -12px rgb(${tierAccentRgb ?? '99 102 241'} / 0.5)`
            : '0 4px 12px -4px rgba(0,0,0,0.4)',
        }}
      >
        <img
          src={item.coverUrl}
          alt={item.title}
          draggable={false}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
        {/* Hover title tooltip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 p-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="truncate text-[10px] font-semibold leading-tight text-white/95">
            {item.title}
          </p>
        </div>
        {/* Accent glow ring on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-inset transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: tierAccentRgb
              ? `inset 0 0 0 1px rgb(${tierAccentRgb} / 0.3)`
              : 'inset 0 0 0 1px rgba(255,255,255,0.12)',
          }}
        />
      </div>

      {/* Remove button — hidden during PNG export */}
      {!exporting && onRemove && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 opacity-0 backdrop-blur-md transition-all duration-200 hover:text-white group-hover:opacity-100"
          aria-label={`Rimuovi ${item.title}`}
        >
          <X className="h-3 w-3" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
