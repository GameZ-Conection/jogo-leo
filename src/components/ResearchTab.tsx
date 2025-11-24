'use client';
import React from 'react';
import { useGame } from '../context/GameContext';
import { RESEARCH } from '../lib/constants';

export default function ResearchTab() {
  const { money, time, morale, research, buyResearch } = useGame();

  const getCost = (color: keyof typeof RESEARCH) => {
    const lvl = research[color];
    const base = RESEARCH[color].baseCost;
    const mult = Math.pow(2, lvl);
    return {
      money: Math.floor(base.money * mult),
      time: Math.floor(base.time * mult),
      morale: Math.floor(base.morale * mult),
    };
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-slate-100">🧪 Pesquisas</h2>
      <p className="text-slate-300 mb-3">
        Melhore grupos de fábricas para aumentar o lucro por segundo.
      </p>

      <div className="flex flex-col gap-2">
        {(['green', 'red', 'blue'] as const).map((color) => {
          const cost = getCost(color);
          const affordable =
            money >= cost.money &&
            time >= cost.time &&
            morale >= cost.morale;

          const colorClass =
            color === 'green'
              ? 'bg-green-600 hover:bg-green-700'
              : color === 'red'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700';

          return (
            <button
              key={color}
              onClick={() => buyResearch(color)}
              disabled={!affordable}
              className={`capitalize text-white rounded-lg py-2 px-3 flex justify-between items-center transition ${colorClass} ${!affordable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <span>
                {color} — Nível {research[color]}
              </span>
              <span className="text-sm text-slate-200">
                ${cost.money} / ⏳{cost.time} / 💙{cost.morale}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
