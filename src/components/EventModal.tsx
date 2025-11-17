'use client';
import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import Image from 'next/image';

const NPC_IDLE = "/npc/elder_idle.png";
const NPC_TALK = "/npc/elder_talk.png";

export default function EventModal() {
    const { currentEvent, chooseOption } = useGame();
    const [displayedText, setDisplayedText] = useState('');
    const [isTalking, setIsTalking] = useState(true);

    // 💡 Esta variável local 'clean' é a única fonte da verdade.
    // Não precisamos mais do estado `cleanText`.
    const [clean, setClean] = useState("");
    const isTypingFinished = displayedText.length === clean.length;

    // Em EventModal.tsx, substitua seu useEffect por este:

    useEffect(() => {
        if (!currentEvent) return;

        // 1. Limpar a string
        const raw = String(currentEvent.description ?? "");
        const cleanedString = raw
            .replace(/^\uFEFF/, "") // remove BOM
            .replace(/undefined/gi, "")
            .replace(/\r/g, "")
            .replace(/\n{2,}/g, "\n") // normalizar
            .trimStart();

        setClean(cleanedString);
        setDisplayedText("");
        setIsTalking(true); // Garante que a animação comece

        // 2. Lógica de "fala" (NPC)
        // Definimos 'talking' aqui para que 'typing' possa acessá-lo
        const talking = setInterval(() => {
            setIsTalking(prev => !prev);
        }, 250);

        // 3. Lógica de digitação
        let i = 0;
        const typing = setInterval(() => {
            // Usamos a string limpa diretamente
            if (i >= cleanedString.length) {
                clearInterval(typing);     // Para a digitação
                clearInterval(talking);   // PARA A FALA
                setIsTalking(false);      // Garante a imagem IDLE

                console.log("⏳ Digitação e fala finalizadas");
                return;
            }

            setDisplayedText(cleanedString.substring(0, i + 1));
            i++;
        }, 35); // 35ms

        // 4. Limpeza (caso o componente desmonte ANTES de terminar)
        return () => {
            clearInterval(typing);
            clearInterval(talking);
        };
    }, [currentEvent]);



    if (!currentEvent) return null;

    const avatarSrc = isTalking ? NPC_TALK : NPC_IDLE;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50">
            <div className="w-full max-w-4xl bg-slate-900 border-t-4 border-slate-700 p-4 flex gap-4">
                {/* ... Avatar ... */}
                <div className="w-32 h-32 bg-slate-800 border-2 border-slate-600 rounded-lg flex items-center justify-center">
                    <Image src={avatarSrc} width={128} height={128} alt="NPC" />
                </div>

                <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-yellow-400 pixel-font">
                        {currentEvent.title}
                    </h2>

                    <p className="text-slate-200 mt-2 leading-relaxed whitespace-pre-line">
                        {displayedText}
                    </p>

                    {/* 💡 Condição de exibição usa a flag 'isTypingFinished' */}
                    {isTypingFinished && (
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            {currentEvent.choices.map(ch => (
                                <button
                                    key={ch.id}
                                    onClick={() => chooseOption(ch.id)}
                                    className="bg-slate-700 hover:bg-slate-600 py-3 px-4 rounded-md text-left"
                                >
                                    <div className="font-semibold">{ch.text}</div>
                                    <div className="text-sm text-slate-400 mt-1">
                                        💙 {ch.moraleChange >= 0 ? "+" : ""}{ch.moraleChange}
                                        &nbsp; ⏳ {ch.timeChange >= 0 ? "+" : ""}{ch.timeChange}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}