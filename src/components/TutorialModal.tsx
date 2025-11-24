"use client";
import React, { useEffect, useState } from 'react';
import { useToast } from '@/src/context/ToastContext';
import { useSound } from '@/src/context/SoundContext';

const steps = [
  {
    title: 'Painel lateral',
    desc: 'Aqui você acompanha recursos, moral, tempo e compra fábricas.',
  },
  {
    title: 'Comprar fábrica',
    desc: 'Use a área de Fábricas para comprar uma. Depois posicione no tabuleiro.',
  },
  {
    title: 'Tabuleiro',
    desc: 'Clique em um espaço vazio para posicionar sua fábrica comprada.',
  },
  {
    title: 'Eventos',
    desc: 'A cada pouco tempo podem aparecer eventos; escolha opções para lidar com eles.',
  },
];

export default function TutorialModal() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { showToast } = useToast();
  const { play } = useSound();

  useEffect(() => {
    const should = localStorage.getItem('show_tutorial');
    if (should === '1') setOpen(true);
  }, []);

  const close = (finish = false) => {
    setOpen(false);
    localStorage.removeItem('show_tutorial');
    if (finish) localStorage.setItem('seen_tutorial', '1');
    showToast('Tutorial encerrado', 'info');
  };

  if (!open) return null;

  const step = steps[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => close(false)} />
      <div className="glass max-w-lg w-full mx-4 p-6 rounded-lg z-10 animate-slideUp">
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p className="text-sm text-slate-300 mb-4">{step.desc}</p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">Passo {index + 1} de {steps.length}</div>
          <div className="space-x-2">
            <button disabled={index===0} onClick={() => { setIndex(i => i-1); play('click'); }} className="px-3 py-1 rounded-md bg-slate-700/60">Anterior</button>
            {index < steps.length - 1 ? (
              <button onClick={() => { setIndex(i => i+1); play('click'); }} className="px-3 py-1 rounded-md bg-blue-600">Próximo</button>
            ) : (
              <button onClick={() => { close(true); play('success'); }} className="px-3 py-1 rounded-md bg-emerald-500">Concluir</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
