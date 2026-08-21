import { useRef } from 'react';
import { Download, Plus, RotateCcw, Upload } from 'lucide-react';
import type { AnimeItem } from '@/data/tierList';

interface ControlsProps {
  onExport: () => void;
  onUpload: (item: AnimeItem) => void;
  onAddTier: () => void;
  onReset: () => void;
  isExporting: boolean;
}

export default function Controls({
  onExport,
  onUpload,
  onAddTier,
  onReset,
  isExporting,
}: ControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpload({
            id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            title: file.name.replace(/\.[^.]+$/, ''),
            coverUrl: reader.result,
            custom: true,
          });
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  return (
    <div className="glass sticky top-4 z-30 flex flex-wrap items-center gap-2 rounded-2xl border border-white/8 px-3 py-2.5 sm:px-4">
      <button
        onClick={onAddTier}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12.5px] font-medium text-white/75 transition-all duration-300 hover:border-white/25 hover:text-white"
      >
        <Plus className="h-3.5 w-3.5" />
        Aggiungi riga
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12.5px] font-medium text-white/75 transition-all duration-300 hover:border-white/25 hover:text-white"
      >
        <Upload className="h-3.5 w-3.5" />
        Carica anime
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={onReset}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12.5px] font-medium text-white/75 transition-all duration-300 hover:border-red-500/30 hover:text-red-400"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </button>

      <div className="ml-auto">
        <button
          onClick={onExport}
          disabled={isExporting}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-[12.5px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] disabled:opacity-60"
          style={{
            boxShadow: '0 8px 24px -8px rgb(var(--accent-rgb) / 0.5)',
          }}
        >
          <Download className="h-3.5 w-3.5" />
          {isExporting ? 'Esportazione…' : 'Esporta PNG'}
        </button>
      </div>
    </div>
  );
}
