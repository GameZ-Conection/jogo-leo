'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSound } from '@/src/context/SoundContext';

export default function SettingsButton() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { enabled, toggle } = useSound();

    return (
        <>
            <button
                onClick={() => setOpen((s) => !s)}
                title="Configurações"
                aria-label="Abrir configurações"
                className="
        fixed top-4 right-4 z-50
        bg-slate-800 hover:bg-slate-700
        text-slate-200 hover:text-white
        p-3 rounded-full
        shadow-lg shadow-slate-900/40
        transition-transform duration-200 hover:rotate-90
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
            >
                {/* ícone de engrenagem em SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.045 1.724 1.724 0 012.341.39 1.724 1.724 0 001.045 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.045 2.573 1.724 1.724 0 01-.39 2.341 1.724 1.724 0 00-2.573 1.045c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.045 1.724 1.724 0 01-2.341-.39 1.724 1.724 0 00-1.045-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.045-2.573 1.724 1.724 0 01.39-2.341 1.724 1.724 0 002.573-1.045z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </button>

            {open && (
                <div className="fixed right-4 top-16 z-50 w-64 glass p-4 rounded-lg border border-slate-700/30 shadow-lg">
                    <h3 className="text-sm font-semibold mb-2">Configurações</h3>
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <div className="text-xs text-slate-300">Som</div>
                            <div className="text-2xs text-slate-400">Efeitos sonoros do jogo</div>
                        </div>
                        <button
                            onClick={() => toggle()}
                            className={`px-3 py-1 rounded-full ${enabled ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}
                            aria-pressed={enabled}
                        >
                            {enabled ? 'Ativado' : 'Desativado'}
                        </button>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setOpen(false)} className="px-3 py-1 rounded-md bg-slate-700">Fechar</button>
                        <button onClick={() => router.push('/config')} className="px-3 py-1 rounded-md bg-blue-600">Abrir Config</button>
                    </div>
                </div>
            )}
        </>
    );
}
