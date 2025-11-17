'use client';
import React from 'react';
import { useGame } from '@/src/context/GameContext';
import type { CellData } from '@/src/types';
import { FACTORY_IMAGES } from '@/src/lib/constants';

function getCellStyle(color: CellData['color']): string {
  switch (color) {
    case 'purple':
      return '-purple-700';
    case 'green':
      return '-green-600';
    case 'red':
      return '-red-600';
    case 'blue':
      return '-blue-600';
    case 'empty':
    default:
      return '-slate-700 border border-dashed border-slate-500';
  }
}

export default function Cell({ data }: { data: CellData }) {
  const { place, pendingPlacement } = useGame();

  const handleClick = () => {
    if (data.fixed) return;
    if (!pendingPlacement) return;
    if (data.color !== 'empty') return;
    place(data.row, data.col);
  };

  const title = data.fixed
    ? '🏭 Fábrica inicial (fixa)'
    : data.color === 'empty'
      ? pendingPlacement
        ? 'Clique para posicionar aqui'
        : 'Espaço vazio'
      : 'Fábrica ativa';

  const hasFactory = data.color !== 'empty';
  const imageSrc =
    data.color !== 'empty'
      ? FACTORY_IMAGES[data.color as Exclude<typeof data.color, 'empty'>]
      : null;

  return (
    <button
      className={`relative aspect-square rounded-md flex items-center justify-center transition-transform duration-150 active:scale-50 hover:-translate-y-0.5 ${getCellStyle(
        data.color
      )} ${pendingPlacement && data.color === 'empty' ? 'outline outline-2 outline-yellow-400' : ''}`}
      title={title}
      onClick={handleClick}
      disabled={data.fixed || (!pendingPlacement && data.color === 'empty')}
      style={{
        backfaceVisibility: "visible",
        // Bônus: Isso também ajuda o navegador
        transform: "translateZ(0)"
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`Fábrica ${data.color}`}
          className="w-100 h-20 object-contain"
          style={{
            backfaceVisibility: "visible",
            // Bônus: Isso também ajuda o navegador
            transform: "translateZ(0) rotateZ(40deg) rotateX(0deg)",
            scale: '3'
          }}
        />
      )}
      {pendingPlacement && data.color === 'empty' && (
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-400/10 rounded-md animate-pulse">
          <span className="text-yellow-400 text-xs font-semibold">Posicione</span>
        </div>
      )}

    </button>
  );
}
