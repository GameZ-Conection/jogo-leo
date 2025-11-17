'use client';
import React, { useState, useEffect } from 'react';
import { useGame } from '@/src/context/GameContext';
import type { GameEvent, Choice } from '@/src/types';
import { DEFAULT_EVENTS } from '@/src/lib/defaultEvents';
import { useRouter } from 'next/navigation';

export default function ConfigPage() {
    const router = useRouter();
    const { setEvents } = useGame();

    const [localEvents, setLocalEvents] = useState<GameEvent[]>([]);

    // 📥 carregar eventos salvos do localStorage
    useEffect(() => {
        const saved = localStorage.getItem('game_events');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) setLocalEvents(parsed);
            } catch (err) {
                console.error('Erro ao carregar eventos:', err);
            }
        }
    }, []);

    // 💾 salvar automaticamente sempre que o usuário edita algo
    useEffect(() => {
        if (localEvents.length > 0) {
            localStorage.setItem('game_events', JSON.stringify(localEvents));
        }
    }, [localEvents]);

    const addEvent = () => {
        if (localEvents.length >= 7) {
            alert('Máximo de 7 eventos alcançado!');
            return;
        }
        const newEvent: GameEvent = {
            id: Date.now(),
            title: '',
            description: '',
            choices: Array.from({ length: 4 }).map((_, i) => ({
                id: i,
                text: '',
                moraleChange: 0,
                timeChange: 0,
            })),
        };
        setLocalEvents((prev) => [...prev, newEvent]);
    };

    const updateEvent = (id: number, field: keyof GameEvent, value: any) => {
        setLocalEvents((prev) =>
            prev.map((ev) => (ev.id === id ? { ...ev, [field]: value } : ev))
        );
    };

    const updateChoice = (
        eventId: number,
        choiceId: number,
        field: keyof Choice,
        value: any
    ) => {
        setLocalEvents((prev) =>
            prev.map((ev) =>
                ev.id === eventId
                    ? {
                        ...ev,
                        choices: ev.choices.map((ch) =>
                            ch.id === choiceId ? { ...ch, [field]: value } : ch
                        ),
                    }
                    : ev
            )
        );
    };

    const deleteEvent = (id: number) => {
        setLocalEvents((prev) => prev.filter((ev) => ev.id !== id));
    };

    const saveEvents = () => {
        setEvents(localEvents);
        localStorage.setItem('game_events', JSON.stringify(localEvents));
        alert('✅ Eventos salvos com sucesso!');
    };

    const restoreDefaultEvents = () => {
        if (
            !confirm('Tem certeza? Isso apagará todos os eventos atuais e restaurará os padrões.')
        )
            return;
        setLocalEvents(DEFAULT_EVENTS);
        localStorage.setItem('game_events', JSON.stringify(DEFAULT_EVENTS));
        setEvents(DEFAULT_EVENTS);
        alert('✅ Eventos padrão restaurados!');
    };


    return (
        <main className="p-6 max-w-4xl mx-auto space-y-6 text-slate-100 relative ">
            <button
                onClick={() => router.push('/')}
                className="absolute top-4 left-4 bg-slate-700 hover:bg-slate-600 p-3 rounded-full"
                title="Voltar ao menu"
            >
                🏠
            </button>

            <h1 className="text-3xl font-bold mb-4">⚙️ Configuração de Eventos</h1>

            <div className="flex gap-3">
                <button
                    onClick={addEvent}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                    + Adicionar evento
                </button>

                <button
                    onClick={restoreDefaultEvents}
                    className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md"
                >
                    🔄 Restaurar eventos padrão
                </button>
            </div>

            {/* Lista de eventos persistente */}
            {localEvents.length === 0 ? (
                <p className="text-slate-400 text-sm mt-4">
                    Nenhum evento criado ainda.
                </p>
            ) : (
                localEvents.map((ev) => (
                    <div
                        key={ev.id}
                        className="bg-slate-800 p-4 rounded-lg border border-slate-700 mt-4"
                    >
                        <div className="flex justify-between items-start">
                            <input
                                type="text"
                                placeholder="Título do evento"
                                value={ev.title}
                                onChange={(e) => updateEvent(ev.id, 'title', e.target.value)}
                                className="w-full mb-2 p-2 rounded bg-slate-700 text-slate-100"
                            />
                            <button
                                onClick={() => deleteEvent(ev.id)}
                                className="ml-3 text-red-400 hover:text-red-500"
                                title="Excluir evento"
                            >
                                🗑️
                            </button>
                        </div>

                        <textarea
                            placeholder="Descrição"
                            value={ev.description}
                            onChange={(e) => updateEvent(ev.id, 'description', e.target.value)}
                            className="w-full mb-4 p-2 rounded bg-slate-700 text-slate-100"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ev.choices.map((ch) => (
                                <div key={ch.id} className="bg-slate-700 p-2 rounded">
                                    <input
                                        type="text"
                                        placeholder={`Escolha ${ch.id + 1}`}
                                        value={ch.text}
                                        onChange={(e) =>
                                            updateChoice(ev.id, ch.id, 'text', e.target.value)
                                        }
                                        className="w-full mb-2 p-1 rounded bg-slate-600 text-slate-100"
                                    />
                                    <div className="flex gap-2 text-sm">
                                        <label>
                                            💙 Moral:
                                            <input
                                                type="number"
                                                value={ch.moraleChange}
                                                onChange={(e) =>
                                                    updateChoice(
                                                        ev.id,
                                                        ch.id,
                                                        'moraleChange',
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-16 ml-1 rounded bg-slate-600 text-center text-slate-100"
                                            />
                                        </label>
                                        <label>
                                            ⏳ Tempo:
                                            <input
                                                type="number"
                                                value={ch.timeChange}
                                                onChange={(e) =>
                                                    updateChoice(
                                                        ev.id,
                                                        ch.id,
                                                        'timeChange',
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-16 ml-1 rounded bg-slate-600 text-center text-slate-100"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}

            {localEvents.length > 0 && (
                <button
                    onClick={saveEvents}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
                >
                    💾 Salvar eventos
                </button>
            )}
        </main>
    );
}
