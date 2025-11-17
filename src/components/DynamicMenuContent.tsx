'use client';
import React from 'react';
import { useMenu } from '@/src/context/MenuContext';
import { useGame } from '@/src/context/GameContext';
import { COSTS, FACTORY_IMAGES, RESEARCH } from '@/src/lib/constants';

export default function DynamicMenuContent() {
    const { activeTab } = useMenu();
    const { money, time, morale, buy, research, buyResearch } = useGame();

    if (!activeTab) return null;

    if (activeTab === 'shop') {
        return (
            <section className="mt-8 bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-3">🏗️ Comprar Fábrica</h3>
                <div className="flex flex-wrap gap-3">
                    {(['green', 'red', 'blue'] as const).map((color) => {
                        const cost = COSTS[color];
                        const colorClass =
                            color === 'green'
                                ? 'bg-green-600 hover:bg-green-700'
                                : color === 'red'
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : 'bg-blue-600 hover:bg-blue-700';

                        const affordable =
                            money >= cost.money && time >= cost.time && morale >= cost.morale;

                        return (
                            <button
                                key={color}
                                onClick={() => buy(color)}
                                disabled={!affordable}
                                className={`capitalize text-white rounded-lg py-2 px-4 flex flex-col items-center transition ${colorClass} ${!affordable ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                <span className="font-medium"> <img
                                    src={FACTORY_IMAGES[color]}
                                    alt={`Fábrica ${color}`}
                                    className="w-12 h-12 object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                                /></span>
                                <span className="text-xs text-slate-200">
                                    ${cost.money} / ⏳{cost.time} / 💙{cost.morale}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>
        );
    }

    if (activeTab === 'research') {
        return (
            <section className="mt-8 bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-3">🧪 Pesquisas</h3>
                <div className="flex flex-wrap gap-3">
                    {(['green', 'red', 'blue'] as const).map((color) => {
                        const base = RESEARCH[color].baseCost;
                        const lvl = research[color];
                        const mult = Math.pow(2, lvl);
                        const cost = {
                            money: Math.floor(base.money * mult),
                            time: Math.floor(base.time * mult),
                            morale: Math.floor(base.morale * mult),
                        };
                        const colorClass =
                            color === 'green'
                                ? 'bg-green-600 hover:bg-green-700'
                                : color === 'red'
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : 'bg-blue-600 hover:bg-blue-700';

                        const affordable =
                            money >= cost.money && time >= cost.time && morale >= cost.morale;

                        return (
                            <button
                                key={color}
                                onClick={() => buyResearch(color)}
                                disabled={!affordable}
                                className={`capitalize text-white rounded-lg py-2 px-4 flex flex-col items-center transition ${colorClass} ${!affordable ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                <span className="font-medium">
                                    {color} — Nível {lvl}
                                </span>
                                <span className="text-xs text-slate-200">
                                    ${cost.money} / ⏳{cost.time} / 💙{cost.morale}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>
        );
    }

    return null;
}
