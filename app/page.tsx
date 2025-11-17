'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100 overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600 opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-600 opacity-5 blur-3xl rounded-full"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo/Título */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="mb-6 inline-block">
            <span className="text-7xl drop-shadow-lg animate-bounce-soft">🏭</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-slideUp">
            Tycoon — Fábricas
          </h1>
          <p className="text-xl text-slate-300 font-light">Construa seu império industrial</p>
        </div>

        {/* Cards de Ações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl w-full">
          {/* Card - Iniciar Jogo */}
          <button
            onClick={() => router.push('/character')}
            className={`group card button-hover p-8 text-center transition-all duration-700 transform cursor-pointer ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="mb-4 text-5xl group-hover:scale-110 transition-transform">▶️</div>
            <h2 className="text-2xl font-bold mb-2 text-emerald-400">Iniciar Jogo</h2>
            <p className="text-slate-300 text-sm">Crie seu personagem e comece sua jornada</p>
            <div className="mt-4 inline-block px-4 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-xs text-emerald-300 group-hover:bg-emerald-500/40 transition-all">
              Novo jogo
            </div>
          </button>

          {/* Card - Configurar Eventos */}
          <button
            onClick={() => router.push('/config')}
            className={`group card button-hover p-8 text-center transition-all duration-700 transform cursor-pointer ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="mb-4 text-5xl group-hover:scale-110 transition-transform">⚙️</div>
            <h2 className="text-2xl font-bold mb-2 text-blue-400">Configurar Eventos</h2>
            <p className="text-slate-300 text-sm">Personalize os eventos do seu jogo</p>
            <div className="mt-4 inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-xs text-blue-300 group-hover:bg-blue-500/40 transition-all">
              Recomendado
            </div>
          </button>
        </div>

        {/* Dica */}
        <div className={`glass rounded-lg p-4 max-w-md text-center transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '600ms' }}>
          <p className="text-sm text-slate-300">
            💡 <span className="font-semibold text-slate-100">Dica:</span> Crie seus eventos personalizados antes de iniciar o jogo para uma melhor experiência.
          </p>
        </div>

        {/* Rodapé */}
        <div className={`mt-16 text-center text-slate-500 text-xs transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '800ms' }}>
          <p>© 2025 Tycoon — Fábricas. Construa, Expanda, Domine.</p>
        </div>
      </div>
    </main>
  );
}
