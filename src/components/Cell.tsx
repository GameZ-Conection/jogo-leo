 'use client';
import React from 'react';
import Image from 'next/image';
import { useGame } from '@/src/context/GameContext';
import type { CellData } from '@/src/types';
import { FACTORY_IMAGES } from '@/src/lib/constants';

function getCellStyle(color: CellData['color']): string {
  switch (color) {
    case 'purple':
      return 'bg-gradient-to-br from-purple-700 to-purple-600 shadow-lg';
    case 'green':
      return 'bg-gradient-to-br from-emerald-700 to-emerald-600 shadow-lg';
    case 'red':
      return 'bg-gradient-to-br from-red-700 to-red-600 shadow-lg';
    case 'blue':
      return 'bg-gradient-to-br from-blue-700 to-blue-600 shadow-lg';
    case 'empty':
    default:
      return 'bg-transparent border border-dashed border-slate-500';
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
      className={`relative group aspect-square rounded-xl flex items-center justify-center transition-transform duration-200 transform hover:-translate-y-1 active:scale-95 ${getCellStyle(
        data.color
      )} ${pendingPlacement && data.color === 'empty' ? 'outline outline-2 outline-yellow-400' : ''}`}
      title={title}
      aria-label={title}
      role="button"
      onClick={handleClick}
      disabled={data.fixed || (!pendingPlacement && data.color === 'empty')}
      style={{
        backfaceVisibility: "visible",
        // Bônus: Isso também ajuda o navegador
        transform: "translateZ(0)"
      }}
    >
      {/* 3D inner wrapper so we can translateZ without breaking button hover transform */}
      <div
        className="relative flex items-center justify-center w-full h-full pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {imageSrc && (
          <div
            className="relative w-28 h-28"
            style={{
              transformStyle: 'preserve-3d',
              transform: hasFactory ? 'translateZ(32px) rotateZ(14deg)' : 'translateZ(8px) rotateZ(14deg)',
              transition: 'transform 220ms ease',
            }}
          >
            <Image
              src={imageSrc}
              alt={`Fábrica ${data.color}`}
              fill
              sizes="(max-width: 768px) 56px, 112px"
              style={{ objectFit: 'contain', backfaceVisibility: 'visible' }}
              className="transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* soft shadow on the ground to enhance depth */}
        <div
          aria-hidden
          className="absolute bottom-3 rounded-full bg-black/40"
          style={{
            width: '60%',
            height: '10px',
            filter: 'blur(6px)',
            transform: hasFactory ? 'translateZ(0px) scale(1.15)' : 'translateZ(0px) scale(0.95)',
            transition: 'transform 220ms ease, opacity 220ms',
            opacity: hasFactory ? 0.9 : 0.7,
          }}
        />
      </div>
      {pendingPlacement && data.color === 'empty' && (
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-400/10 rounded-md animate-pulse">
          <span className="text-yellow-400 text-xs font-semibold">Posicione</span>
        </div>
      )}

    </button>
  );
}
