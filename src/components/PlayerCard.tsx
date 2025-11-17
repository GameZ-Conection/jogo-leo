'use client';
import Image from 'next/image';
import { useGame } from '@/src/context/GameContext';
import { scoreColor } from '@/src/utils/colorScore';


export default function PlayerCard() {
    const { player, score, money } = useGame();

    if (!player) return null;

    const color = scoreColor(score);

    return (
        <div className="bg-slate-800 border border-slate-600 p-6 rounded-lg shadow-xl flex flex-col items-center pixel-font">
            <Image
                src={player.avatar}
                width={160}
                height={160}
                alt="Avatar"
                className="pixel-image mb-4"
            />

            <h2 className="text-2xl text-yellow-400 mb-2">{player.name} {player.surname}</h2>

            <p className="text-slate-300 text-sm">
                Idade: <span className="text-white">{player.age}</span>
            </p>

            {/* 💰 Dinheiro ganho */}
            <p className="mt-3 text-lg text-green-400 font-bold">
                💰 Dinheiro ganho: <span className="text-white">{money}</span>
            </p>

            <p className="mt-2 font-bold" style={{ background: color, padding: '4px 8px', borderRadius: '4px', fontSize: '2.25rem' }}>
                {score}
            </p>

        </div>
    );
}
