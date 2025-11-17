'use client';
import PlayerCard from '@/src/components/PlayerCard';
import ReportCharts from '@/src/components/ReportCharts';
import { useGame } from '@/src/context/GameContext';
import { useRouter } from 'next/navigation';

export default function ReportPage() {

    const router = useRouter();
    const { history, isLoaded, resetHistory } = useGame();
    if (!isLoaded) {
        return (
            <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex items-center justify-center">
                <p className="pixel-font text-xl text-slate-400 animate-pulse">
                    Carregando relatório...
                </p>
            </main>
        );
    }
    return (

        <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center">

            {/* 🔼 BOTÃO NO TOPO */}
            <div className="w-full max-w-6xl mb-6 flex">
                <button

                    onClick={() => {
                        resetHistory();
                        router.push('/')
                    }}
                    className="
                        bg-yellow-500 
                        hover:bg-yellow-600 
                        text-slate-900 
                        font-bold 
                        px-8 
                        py-3 
                        rounded-lg 
                        pixel-font
                        shadow-lg
                        border-2 
                        border-yellow-300
                        transition 
                        active:scale-95
                    "
                >
                    ⬅️ Voltar ao Menu Principal
                </button>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReportCharts />
                <PlayerCard />
            </div>

            <section className="w-full max-w-6xl mt-10 bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-xl pixel-font">
                <h1 className="text-3xl font-bold mb-6 pixel-font">📜 Relatório Final</h1>

                {history.length === 0 && (
                    <p className="text-slate-400">Nenhuma decisão registrada.</p>
                )}

                <div className="space-y-4">
                    {history.map((h, i) => (
                        <div key={i} className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                            <h2 className="text-xl text-yellow-400 pixel-font">{h.eventTitle}</h2>
                            <p className="mt-2">Você escolheu: <b className="text-yellow-300">{h.choiceText}</b></p>
                            <p className="text-sm text-slate-400 mt-2">
                                💙 Moral: {h.moraleChange >= 0 ? "+" : ""}{h.moraleChange}<br />
                                ⏳ Tempo: {h.timeChange >= 0 ? "+" : ""}{h.timeChange}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}
