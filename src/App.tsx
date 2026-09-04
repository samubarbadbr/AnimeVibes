import { useCallback, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  pointerWithin,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { toPng } from 'html-to-image';
import { Award, Sparkles } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  DEFAULT_STATE,
  STORAGE_KEY,
  type AnimeItem,
  type Tier,
  type TierListState,
} from '@/data/tierList';
import AmbientBackground from '@/components/AmbientBackground';
import Controls from '@/components/Controls';
import TierRow from '@/components/TierRow';
import UnrankedPool from '@/components/UnrankedPool';
import AnimeCard from '@/components/AnimeCard';

const NEW_TIER_COLORS = [
  '239 68 68',
  '249 115 22',
  '234 179 8',
  '34 197 94',
  '20 184 166',
  '99 102 241',
  '168 85 247',
  '236 72 153',
];

export default function App() {
  const [state, setState] = useLocalStorage<TierListState>(
    STORAGE_KEY,
    DEFAULT_STATE,
  );
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const activeItem = useMemo(
    () => state.items.find((i) => i.id === activeItemId) ?? null,
    [activeItemId, state.items],
  );

  // Group items by tier
  const itemsByTier = useMemo(() => {
    const map: Record<string, AnimeItem[]> = {};
    for (const tier of state.tiers) map[tier.id] = [];
    const unranked: AnimeItem[] = [];
    for (const item of state.items) {
      const tierId = state.placements[item.id];
      if (tierId && map[tierId]) {
        map[tierId].push(item);
      } else {
        unranked.push(item);
      }
    }
    return { map, unranked };
  }, [state]);

  const handleDragStart = useCallback((e: DragStartEvent) => {
    setActiveItemId(String(e.active.id));
  }, []);

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveItemId(null);
      const { active, over } = e;
      if (!over) return;

      const activeId = String(active.id);
      let overId = String(over.id);

      // Determine target tier: either the over item's tier, or a droppable tier id, or unranked pool
      let targetTier: string | undefined;

      if (overId === 'unranked-pool') {
        targetTier = undefined;
      } else if (state.tiers.some((t) => t.id === overId)) {
        targetTier = overId;
      } else {
        // over is an anime card — find which tier it belongs to
        const overPlacement = state.placements[overId];
        targetTier = overPlacement;
      }

      // Reorder: if dropping on an existing card within the same tier, swap order
      setState((prev) => {
        const placements = { ...prev.placements };
        const items = [...prev.items];

        // Move active item to target tier
        placements[activeId] = targetTier;

        // If over is a card and different from active, reorder items array
        if (overId !== activeId && overId !== 'unranked-pool') {
          const activeIdx = items.findIndex((i) => i.id === activeId);
          const overIdx = items.findIndex((i) => i.id === overId);
          if (activeIdx !== -1 && overIdx !== -1) {
            const [moved] = items.splice(activeIdx, 1);
            items.splice(overIdx, 0, moved);
          }
        }

        return { ...prev, placements, items };
      });
    },
    [state.tiers, state.placements, setState],
  );

  const handleRenameTier = useCallback(
    (id: string, label: string) => {
      setState((prev) => ({
        ...prev,
        tiers: prev.tiers.map((t) =>
          t.id === id ? { ...t, label } : t,
        ),
      }));
    },
    [setState],
  );

  const handleRemoveTier = useCallback(
    (id: string) => {
      setState((prev) => {
        const placements = { ...prev.placements };
        for (const itemId of Object.keys(placements)) {
          if (placements[itemId] === id) {
            placements[itemId] = undefined;
          }
        }
        return {
          ...prev,
          tiers: prev.tiers.filter((t) => t.id !== id),
          placements,
        };
      });
    },
    [setState],
  );

  const handleAddTier = useCallback(() => {
    setState((prev) => {
      const idx = prev.tiers.length;
      const color = NEW_TIER_COLORS[idx % NEW_TIER_COLORS.length];
      // Default tiers cover S-F (indices 0-5). New tiers start at G (char 71).
      const charCode = 71 + (idx - 6);
      const label = charCode <= 90 ? String.fromCharCode(charCode) : `T${idx}`;
      const newTier: Tier = {
        id: `tier-${Date.now()}`,
        label,
        accentRgb: color,
      };
      return { ...prev, tiers: [...prev.tiers, newTier] };
    });
  }, [setState]);

  const handleUpload = useCallback(
    (item: AnimeItem) => {
      setState((prev) => ({
        ...prev,
        items: [...prev.items, item],
      }));
    },
    [setState],
  );

  const handleRemoveAnime = useCallback(
    (id: string) => {
      setState((prev) => {
        const placements = { ...prev.placements };
        delete placements[id];
        return {
          ...prev,
          items: prev.items.filter((i) => i.id !== id),
          placements,
        };
      });
    },
    [setState],
  );

  const handleReset = useCallback(() => {
    if (
      window.confirm(
        'Sei sicuro di voler ripristinare la tier list? Tutte le modifiche andranno perse.',
      )
    ) {
      setState(DEFAULT_STATE);
    }
  }, [setState]);

  const handleExport = useCallback(async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(exportRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0b0b0e',
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `anime-tier-list-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveItemId(null)}
    >
      <div className="relative min-h-screen">
        <AmbientBackground />

        <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
          {/* Header */}
          <header className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent/20 bg-accent/10"
                  style={{ boxShadow: '0 0 20px -4px rgb(var(--accent-rgb) / 0.4)' }}
                >
                  <Award className="h-4 w-4 accent-text" strokeWidth={2.2} />
                </div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  Anime <span className="accent-text">//</span> Tier List
                </span>
              </div>
              <h1 className="text-[clamp(1.6rem,4.5vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
                Costruisci la tua classifica
              </h1>
            </div>
          </header>

          {/* Controls */}
          <Controls
            onExport={handleExport}
            onUpload={handleUpload}
            onAddTier={handleAddTier}
            onReset={handleReset}
            isExporting={isExporting}
          />

          {/* Tier list board (export capture target) */}
          <div
            ref={exportRef}
            className="mt-5 flex flex-col gap-2.5 rounded-3xl p-3 sm:mt-6 sm:gap-3 sm:p-4"
          >
            {state.tiers.map((tier) => (
              <TierRow
                key={tier.id}
                tier={tier}
                items={itemsByTier.map[tier.id] ?? []}
                onRename={handleRenameTier}
                onRemove={handleRemoveTier}
                onRemoveAnime={handleRemoveAnime}
                exporting={isExporting}
              />
            ))}

            {/* Unranked pool */}
            <div className="mt-4">
              <UnrankedPool
                items={itemsByTier.unranked}
                onRemoveAnime={handleRemoveAnime}
                exporting={isExporting}
              />
            </div>
          </div>

          {/* Hint */}
          <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] text-white/30">
            <Sparkles className="h-3 w-3" />
            Trascina le copertine tra le righe · Doppio clic su un livello per rinominarlo
          </p>
        </div>

        {/* Drag overlay — floating card following cursor/touch */}
        <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {activeItem ? (
            <AnimeCard item={activeItem} />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
