"use client";
import React from "react";

export default function BonusModal({ bonuses, onClose }: { bonuses: any[], onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-600 text-center max-w-sm mx-auto animate-scaleIn">

                <h2 className="text-2xl font-bold mb-4 text-yellow-400 pixel-font">
                    🎉 Parabéns!
                </h2>

                <p className="text-slate-300 mb-4">
                    Sua descrição revelou traços fortes da sua personalidade e você recebeu:
                </p>

                <ul className="text-slate-100 text-lg mb-6 space-y-2">
                    {bonuses.map((bonus, i) => (
                        <li key={i} className="flex justify-center gap-2">
                            {bonus.money && <span>Dinheiro💰: +{bonus.money}</span>}
                            {bonus.time && <span>Tempo⏳: +{bonus.time}</span>}
                            {bonus.morale && <span>Moral💙: +{bonus.morale}</span>}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={onClose}
                    className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg font-semibold"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
