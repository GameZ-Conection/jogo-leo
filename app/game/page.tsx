'use client';
import { GameProvider } from '@/src/context/GameContext';
import Board from '@/src/components/Board';
import EventModal from '@/src/components/EventModal';
import SettingsButton from '@/src/components/SettingsButton';
import SideMenu from '@/src/components/SideMenu';
import DynamicMenuContent from '@/src/components/DynamicMenuContent';
import { MenuProvider } from '@/src/context/MenuContext';

export default function GamePage() {
    return (
        <GameProvider>
            <MenuProvider>
                <main className="flex min-h-screen bg-slate-900 text-slate-100 relative">
                    {/* Menu lateral com HUD dentro */}
                    <SideMenu />

                    {/* Conteúdo principal */}
                    <div className="flex-1 p-6 ml-72 transition-all">
                        <header className="mb-6">
                            <h1 className="text-3xl font-bold mb-1">🏭 Tycoon — Fábricas</h1>
                            <p className="text-slate-400">
                                Construa, pesquise e mantenha sua moral em alta!
                            </p>
                        </header>

                        <Board />
                        <DynamicMenuContent />
                        <EventModal />
                        <SettingsButton />
                    </div>
                </main>
            </MenuProvider>
        </GameProvider>
    );
}
