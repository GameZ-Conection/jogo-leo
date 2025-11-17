"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/src/context/ToastContext";

export default function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const seen = localStorage.getItem("seen_onboarding");
    if (!seen) setOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem("seen_onboarding", "1");
    setOpen(false);
    showToast("Bem-vindo! Veja as dicas na barra lateral.", "success");
  };

  const startTutorial = () => {
    localStorage.setItem('seen_onboarding', '1');
    localStorage.setItem('show_tutorial', '1');
    setOpen(false);
    showToast('Iniciando tutorial...', 'info');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="glass max-w-xl w-full mx-4 p-6 rounded-lg z-10 animate-scaleIn">
        <h3 className="text-2xl font-bold mb-2">Bem-vindo ao Tycoon — Fábricas</h3>
        <p className="text-sm text-slate-300 mb-4">Aqui vão algumas dicas rápidas para começar:</p>
        <ul className="text-sm list-disc list-inside space-y-2 text-slate-300 mb-4">
          <li>Use o painel à esquerda para comprar fábricas e acompanhar recursos.</li>
          <li>Coloque fábricas no tabuleiro clicando em um espaço livre.</li>
          <li>Personalize eventos em Configurar Eventos para variar a experiência.</li>
        </ul>
        <div className="flex justify-end gap-2">
          <button onClick={startTutorial} className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700">Ver tutorial</button>
          <button onClick={close} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700">Entendi</button>
        </div>
      </div>
    </div>
  );
}
