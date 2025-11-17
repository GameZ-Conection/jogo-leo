'use client';
import React from 'react';
import { useMenu } from '@/src/context/MenuContext';
import { useGame } from '@/src/context/GameContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SideMenu() {
    const { activeTab, setActiveTab } = useMenu();
    const { money, morale, time, board } = useGame();
    const { player } = useGame();
    const router = useRouter();

    // 🏭 contagem de fábricas por cor
    const factoryCount = React.useMemo(() => {
        const counts = { green: 0, red: 0, blue: 0, purple: 0 };
        board.flat().forEach((cell) => {
            if (cell.color !== 'empty') counts[cell.color as keyof typeof counts]++;
        });
        return counts;
    }, [board]);

    return (
        <aside className="w-72 bg-slate-800 border-r border-slate-700 flex flex-col h-screen fixed left-0 top-0">

            {/* PERFIL DO PLAYER */}
            {player && (
                <div className="flex flex-col items-center text-center mb-4 mt-6">
                    <Image
                        src={player.avatar}
                        width={80}
                        height={80}
                        alt="avatar do jogador"
                        className="pixel-image rounded-md mb-2"
                    />

                    <h2 className="font-bold text-lg pixel-font">
                        {player.name} {player.surname}
                    </h2>

                    <p className="text-sm text-slate-400">
                        {player.age} anos
                    </p>
                </div>
            )}


            {/* Cabeçalho */}
            <div className="px-4 py-6 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-slate-100">Painel</h2>
            </div>

            {/* HUD */}
            <div className="px-4 py-5 space-y-4 border-b border-slate-700">
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
                    <h3 className="text-sm text-slate-400 mb-2">🏭 Fábricas</h3>
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
            </div>

            {/* Tabs */}
            <nav className="p-3 flex flex-col gap-3">
                <button
                    onClick={() => setActiveTab('shop')}
                    className={`text-left py-2 px-3 rounded-md transition ${activeTab === 'shop'
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-300 hover:bg-slate-700/50'
                        }`}
                >
                    🏗️ Fábricas
                </button>

                <button
                    onClick={() => setActiveTab('research')}
                    className={`text-left py-2 px-3 rounded-md transition ${activeTab === 'research'
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-300 hover:bg-slate-700/50'
                        }`}
                >
                    🧪 Pesquisas
                </button>

                <button
                    className={`text-left py-2 px-3 rounded-md transition`}
                    onClick={() => router.push('/game/report')}
                >
                    📜 Relatórios
                </button>
            </nav>
        </aside >
    );
}
