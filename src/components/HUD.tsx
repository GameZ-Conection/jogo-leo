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

    const getMoraleIcon = (morale: number) => {
        if (morale > 60) return '😊';
        if (morale > 30) return '😐';
        return '😞';
    };

    return (
        <aside className="fixed right-4 top-1/2 -translate-y-1/2 glass rounded-xl p-5 w-64 shadow-2xl text-slate-100 space-y-4 border border-blue-500/20 max-h-[90vh] overflow-y-auto z-40">
            <h2 className="text-lg font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">
                📊 Status do Jogo
            </h2>

            {/* Dinheiro */}
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-green-500/50 transition-all">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">💰 Dinheiro</span>
                </div>
                <div className="text-2xl font-bold text-green-400">${money.toLocaleString()}</div>
            </div>

            {/* Moral */}
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-blue-500/50 transition-all">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                    <span>{getMoraleIcon(morale)} Moral</span>
                    <span className="text-blue-300 font-semibold">{morale}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden progress-bar">
                    <div
                        className={`h-full transition-all duration-500 ${
                            morale > 60
                                ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                                : morale > 30
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                                    : 'bg-gradient-to-r from-red-500 to-red-600'
                        }`}
                        style={{ width: `${morale}%` }}
                    />
                </div>
            </div>

            {/* Tempo */}
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-purple-500/50 transition-all">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                    <span>⏳ Tempo</span>
                    <span className="text-purple-300 font-semibold">{time}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden progress-bar">
                    <div
                        className={`h-full transition-all duration-500 ${
                            time > 60
                                ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                                : time > 30
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                                    : 'bg-gradient-to-r from-red-500 to-red-600'
                        }`}
                        style={{ width: `${time}%` }}
                    />
                </div>
            </div>

            {/* Fábricas */}
            <div className="pt-3 border-t border-slate-700">
                <h3 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">🏭 Fábricas ativas</h3>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center hover:bg-green-500/20 transition-all">
                        <div className="text-xs text-green-300">Verdes</div>
                        <div className="text-lg font-bold text-green-400">{factoryCount.green}</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-center hover:bg-red-500/20 transition-all">
                        <div className="text-xs text-red-300">Vermelhas</div>
                        <div className="text-lg font-bold text-red-400">{factoryCount.red}</div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center hover:bg-blue-500/20 transition-all">
                        <div className="text-xs text-blue-300">Azuis</div>
                        <div className="text-lg font-bold text-blue-400">{factoryCount.blue}</div>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2 text-center hover:bg-purple-500/20 transition-all">
                        <div className="text-xs text-purple-300">Roxas</div>
                        <div className="text-lg font-bold text-purple-400">{factoryCount.purple}</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
