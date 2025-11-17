'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-900 text-slate-100">
      <h1 className="text-5xl font-bold mb-8">🏭 GameZ — Fábricas</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push('/character')}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md text-xl font-semibold transition"
        >
          ▶️ Iniciar jogo
        </button>

        <button
          onClick={() => router.push('/config')}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-xl font-semibold transition"
        >
          ⚙️ Configurar eventos
        </button>
      </div>

      <p className="text-slate-400 mt-6 text-sm">
        Crie seus eventos antes de iniciar o jogo.
      </p>
    </main>
  );
}
