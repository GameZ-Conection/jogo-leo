'use client';
import React from 'react';
import { useMenu } from '@/src/context/MenuContext';
import { useGame } from '@/src/context/GameContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SideMenu() {
    const { activeTab, setActiveTab } = useMenu();
    const gameContext = useGame();
    const { money, morale, time, board } = gameContext;
    const player = (gameContext as any).player;
    const router = useRouter();

    // 🏭 contagem de fábricas por cor
    const factoryCount = React.useMemo(() => {
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
        <aside className="w-72 glass border-r border-blue-500/20 flex flex-col h-screen fixed left-0 top-0 z-50 overflow-y-auto">
            {/* PERFIL DO PLAYER */}
            {player && (
                <div className="flex flex-col items-center text-center mb-4 mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 mx-3">
                    <Image
                        src={player.avatar}
                        width={80}
                        height={80}
                        alt="avatar do jogador"
                        className="pixel-image rounded-md mb-3 border-2 border-blue-500/50 hover:border-emerald-500/50 transition-all"
                    />

                    <h2 className="font-bold text-lg pixel-font text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">
                        {player.name}
                    </h2>

                    <p className="text-xs text-slate-400 mt-1">
                        {player.age} anos
                    </p>
                </div>
            )}


            {/* Cabeçalho */}
            <div className="px-4 py-6 border-b border-blue-500/20">
                <h2 className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">📊 Painel</h2>
            </div>

            {/* HUD */}
            <div className="px-4 py-5 space-y-3 border-b border-blue-500/20">
                {/* Dinheiro */}
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-green-500/50 transition-all">
                    <span className="text-xs text-slate-400">💰 Dinheiro</span>
                    <div className="text-xl font-bold text-green-400">${money.toLocaleString()}</div>
                </div>

                {/* Moral */}
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-blue-500/50 transition-all">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>{getMoraleIcon(morale)} Moral</span>
                        <span className="text-blue-300 font-semibold">{morale}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden progress-bar">
                        <div
                            className={`h-full transition-all duration-500 ${morale > 60
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
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>⏳ Tempo</span>
                        <span className="text-purple-300 font-semibold">{time}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden progress-bar">
                        <div
                            className={`h-full transition-all duration-500 ${time > 60
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
                <div className="pt-3 border-t border-blue-500/20">
                    <h3 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">🏭 Fábricas</h3>
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
            </div>

            {/* Tabs */}
            <nav className="p-4 flex flex-col gap-2">
                <button
                    onClick={() => setActiveTab('shop')}
                    className={`text-left py-3 px-4 rounded-lg transition button-hover ${activeTab === 'shop'
                        ? 'bg-blue-600 text-white border border-blue-400'
                        : 'text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
                        }`}
                >
                    🏗️ Fábricas
                </button>

                <button
                    onClick={() => setActiveTab('research')}
                    className={`text-left py-3 px-4 rounded-lg transition button-hover ${activeTab === 'research'
                        ? 'bg-blue-600 text-white border border-blue-400'
                        : 'text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
                        }`}
                >
                    🧪 Pesquisas
                </button>

                <button
                    className="text-left py-3 px-4 rounded-lg transition button-hover text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
                    onClick={() => router.push('/game/report')}
                >
                    📜 Relatórios
                </button>
            </nav>
        </aside>
    );
}
