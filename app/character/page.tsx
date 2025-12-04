'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGame } from '@/src/context/GameContext';
import { KEYWORD_BONUSES } from '@/src/lib/keywords';
import BonusModal from '@/src/components/BonusModal';

const CHARACTERS = Array.from({ length: 12 }, (_, i) => `/characters/char${i + 1}.png`);

export default function CharacterCreationPage() {
    const router = useRouter();

    const [showIntro, setShowIntro] = useState(true);

    const [selected, setSelected] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');

    const isValid = selected !== null && name && surname && age;

    const { setPlayer, applyBonus } = useGame();

    const [bonusModalOpen, setBonusModalOpen] = useState(false);
    const [appliedBonuses, setAppliedBonuses] = useState<any[]>([]);


    const handleConfirm = () => {
        if (!isValid) return alert("Complete todos os campos!");

        const newPlayer = {
            avatar: CHARACTERS[selected],
            name,
            surname,
            age: Number(age),
            description,
        };

        // 🔍 verifica palavras-chave
        const descLower = description.toLowerCase();

        const bonuses: { money?: number; time?: number; morale?: number }[] = [];

        KEYWORD_BONUSES.forEach(({ word, bonus }) => {
            if (descLower.includes(word)) {
                bonuses.push(bonus);
            }
        });



        // aplica bônus
        applyBonus(bonuses);

        // Guardar para exibir no modal
        setAppliedBonuses(bonuses);
        // salva jogador
        setPlayer(newPlayer);
        localStorage.setItem("player", JSON.stringify(newPlayer));

        console.log('Descrição:', description);
        console.log('Bônus encontrados:', bonuses);

        // router.push('/game');

        setBonusModalOpen(true);
    };

    return (

        <main className="min-h-screen bg-slate-900 text-slate-100 p-6 flex justify-center">

            {bonusModalOpen && (
                <BonusModal
                    bonuses={appliedBonuses}
                    onClose={() => router.push('/game')}
                />
            )}


            {showIntro && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-slate-800 p-6 rounded-xl max-w-md text-center border border-slate-600 shadow-xl" style={{
                        fontFamily: "'Press Start 2P', cursive",
                    }}>
                        <h2 className="text-2xl font-bold mb-3 pixel-font">🎮 Bem-vindo ao GameZ!</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            A primeira coisa que você deve fazer é escrever uma pequena descrição sobre
                            a sua personalidade.<br /><br />
                            Depois nos informe seu nome, sobrenome e idade.
                        </p>

                        <p className="text-yellow-400 text-sm mb-6">
                            💡 Dica: certas palavras da sua descrição podem te dar bônus iniciais 😉
                        </p>

                        <button
                            onClick={() => setShowIntro(false)}
                            className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-semibold"
                        >
                            Começar
                        </button>
                    </div>
                </div>
            )}


            {/* CONTAINER PRINCIPAL */}
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">

                {/* FOLHA DE CADERNO */}
                <div className="flex-1 flex flex-col">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="
      w-full flex-1 h-full p-8 pixel-input rounded-lg shadow-xl resize-none
      bg-[linear-gradient(to_bottom,#d9e4f5_1px,transparent_1px)] 
      bg-[length:100%_2rem] 
      border-l-[6px] border-l-red-500 
      bg-white text-slate-900
    "
                        style={{
                            lineHeight: "2rem",
                        }}
                        placeholder="Escreva a história do personagem..."
                    />
                </div>

                {/* PERSONAGENS + INPUTS */}
                <div className="flex-1">

                    <h1 className="text-3xl font-bold mb-4 pixel-font">
                        🧍 Escolha seu Personagem
                    </h1>

                    {/* GRID DE AVATARES */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                        {CHARACTERS.map((src, index) => (
                            <button
                                key={index}
                                onClick={() => setSelected(index)}
                                className={`p-2 rounded-lg border-2 transition flex items-center justify-center
                  ${selected === index ? 'border-yellow-400 bg-yellow-400/10' : 'border-slate-700'}
                  hover:border-yellow-300`}
                            >
                                <Image
                                    src={src}
                                    width={100}
                                    height={100}
                                    alt="Avatar"
                                    className="pixel-image"
                                />
                            </button>
                        ))}
                    </div>

                    {/* INPUTS */}
                    <div className="space-y-3">
                        <input
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 pixel-input"
                        />

                        <input
                            placeholder="Sobrenome"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 pixel-input"
                        />

                        <input
                            placeholder="Idade"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            type="number"
                            className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 pixel-input"
                        />

                        <button
                            disabled={!isValid}
                            onClick={handleConfirm}
                            className={`w-full py-3 rounded-lg font-semibold transition
                ${isValid ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-slate-600 cursor-not-allowed'}
              `}
                        >
                            Confirmar Personagem
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
