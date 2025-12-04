// Em /components/Board.tsx

'use client';
import React from 'react';
import { useGame } from '@/src/context/GameContext';
import Cell from './Cell';
import { BOARD_COLS, BOARD_ROWS } from '@/src/lib/constants';

import BackgroundMusic from '@/public/BackgroundMusic';

export default function Board() {
  const { board } = useGame();

  return (
    <>
      <BackgroundMusic /> {/* Música toca apenas enquanto o tabuleiro existir */}

      <section
        className="p-4 rounded-xl border border-slate-700 flex flex-col items-center overflow-hidden"
        style={{
          backgroundImage: "url('/map/background_map111.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          perspective: "1200px",
          paddingTop: "6rem",
          paddingBottom: "6rem",
        }}>

        <h2 className="text-xl font-semibold mb-4 text-slate-100">Tabuleiro</h2>

        <div
          className="grid justify-center"
          style={{
            gridTemplateColumns: `repeat(${BOARD_COLS}, 7rem)`,
            gridTemplateRows: `repeat(${BOARD_ROWS}, 7rem)`,
            gap: '1rem',

            marginTop: '-3rem',

            // Suas transformações 3D
            transform: "rotateX(45deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",

            // 👇 A CORREÇÃO É ESTA LINHA 👇
            backfaceVisibility: "visible"
          }}
        >
          {board.flat().map((cell) => (
            <Cell key={`${cell.row}-${cell.col}`} data={cell} />
          ))}
        </div>
      </section>
    </>
  );
}
