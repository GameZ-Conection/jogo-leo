'use client';
import React, { useMemo } from 'react';
import { useGame } from '@/src/context/GameContext';

export default function HUD() {
    const { money, morale, time, board } = useGame();

    // 🏭 contagem de fábricas por cor
    const factoryCount = useMemo(() => {
        const counts = { green: 0, red: 0, blue: 0, purple: 0 };
        board.flat().forEach((cell) => {
            if (cell.color !== 'empty') counts[cell.color as keyof typeof counts]++;
        });
        return counts;
    }, [board]);

    return (
        <aside
            className="
        fixed right-4 top-1/2 -translate-y-1/2
        bg-slate-800 border border-slate-700
        rounded-xl p-4 w-60
        shadow-lg shadow-slate-900/40
        text-slate-100 space-y-4
      "
        >
            <h2 className="text-lg font-semibold text-center">📊 Status do Jogo</h2>

            {/* Dinheiro */}
            <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">💰 Dinheiro</span>
                <span className="text-green-400 font-bold">${money}</span>
            </div>

            {/* Moral */}
            <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>💙 Moral</span>
                    <span>{morale}%</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-300 ${morale > 60
                            ? 'bg-green-500'
                            : morale > 30
                                ? 'bg-yellow-500'
                                : 'bg-red-600'
                            }`}
                        style={{ width: `${morale}%` }}
                    />
                </div>
            </div>

            {/* Tempo */}
            <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>⏳ Tempo</span>
                    <span>{time}%</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-300 ${time > 60
                            ? 'bg-green-500'
                            : time > 30
                                ? 'bg-yellow-500'
                                : 'bg-red-600'
                            }`}
                        style={{ width: `${time}%` }}
                    />
                </div>
            </div>

            {/* Fábricas */}
            <div className="pt-2 border-t border-slate-700">
                <h3 className="text-sm text-slate-400 mb-2">🏭 Fábricas ativas</h3>
                <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                        <span className="text-green-400">Verdes</span>
                        <span>{factoryCount.green}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-red-400">Vermelhas</span>
                        <span>{factoryCount.red}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-blue-400">Azuis</span>
                        <span>{factoryCount.blue}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-purple-400">Roxas</span>
                        <span>{factoryCount.purple}</span>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
