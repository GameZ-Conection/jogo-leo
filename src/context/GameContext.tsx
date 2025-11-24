'use client';
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import {
  BOARD_COLS,
  BOARD_ROWS,
  COSTS,
  START_RESOURCES,
  INCOME,
  RESEARCH,
} from '../lib/constants';
import type { CellData, Color, GameEvent, Player } from '../types';
import { useRouter } from 'next/navigation';

interface ResearchLevels {
  green: number;
  red: number;
  blue: number;
}

interface GameContextValue {
  board: CellData[][];
  money: number;
  time: number;
  morale: number;
  pendingPlacement: Color | null;
  research: ResearchLevels;
  events: GameEvent[];
  currentEvent: GameEvent | null;
  setEvents: (events: GameEvent[]) => void;
  chooseOption: (choiceId: number) => void;
  buy: (color: Exclude<Color, 'purple' | 'empty'>) => void;
  place: (row: number, col: number) => void;
  resetPending: () => void;
  buyResearch: (color: keyof ResearchLevels) => void;


  history: {
    eventId: number;
    eventTitle: string;
    choiceText: string;
    moraleChange: number;
    timeChange: number;
  }[];

  isLoaded: boolean;
  score: number;
  resetHistory: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

function buildInitialBoard(): CellData[][] {
  const board: CellData[][] = [];
  for (let r = 0; r < BOARD_ROWS; r++) {
    const row: CellData[] = [];
    for (let c = 0; c < BOARD_COLS; c++) {
      row.push({ row: r, col: c, color: 'empty' });
    }
    board.push(row);
  }

  // fábrica inicial roxa no centro
  const startR = Math.floor(BOARD_ROWS / 2);
  const startC = Math.floor(BOARD_COLS / 2);
  board[startR][startC] = { row: startR, col: startC, color: 'purple', fixed: true };
  return board;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  // Toast hook — ToastProvider wraps GameProvider in layout.tsx
  const { showToast } = useToast();
  const [board, setBoard] = useState<CellData[][]>(() => buildInitialBoard());
  const [money, setMoney] = useState(START_RESOURCES.money);
  const [time, setTime] = useState(START_RESOURCES.time);
  const [morale, setMorale] = useState(START_RESOURCES.morale);
  const [pendingPlacement, setPendingPlacement] = useState<Color | null>(null);
  const [research, setResearch] = useState<ResearchLevels>({ green: 0, red: 0, blue: 0 });
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  const [history, setHistory] = useState<GameContextValue["history"]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("player");
    if (saved) setPlayer(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("game_resources");
    if (saved) {
      const { money, time, morale } = JSON.parse(saved);
      setMoney(money);
      setTime(time);
      setMorale(morale);
    }
  }, []);

  // 📥 carregar histórico salvo no localStorage

  // 1. load
  useEffect(() => {
    const savedHistory = localStorage.getItem("game_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    setIsLoaded(true);
  }, []);

  // 2. save ONLY after it has been loaded
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("game_history", JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const resetHistory = () => {
    setHistory([]);
    localStorage.setItem("game_history", JSON.stringify([]));
  };

  // 📥 carregar eventos salvos no localStorage
  useEffect(() => {
    const saved = localStorage.getItem('game_events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setEvents(parsed);
      } catch (err) {
        console.error('Erro ao carregar eventos:', err);
      }
    }
  }, []);

  // 💾 salvar automaticamente quando eventos mudarem
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('game_events', JSON.stringify(events));
    }
  }, [events]);

  // 💥 iniciar eventos a cada 30s (se houver)
  useEffect(() => {
    if (events.length === 0) return;

    const interval = setInterval(() => {
      // Use a forma funcional para checar o estado anterior
      setCurrentEvent((prevEvent) => {
        // Se um evento já estiver ativo (prevEvent !== null),
        // não faça nada e mantenha o evento atual.
        if (prevEvent) {
          return prevEvent;
        }

        // Se não houver evento (prevEvent === null), sorteie um novo.
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        try {
          showToast?.(`Evento: ${randomEvent.title}`, 'info');
        } catch {}
        return randomEvent;
      });
    }, 10000); // 10 segundos

    return () => clearInterval(interval);
  }, [events]);

  // 💰 loop de geração de renda (a cada 1s)
  useEffect(() => {
    const interval = setInterval(() => {
      setMoney((m) => {
        let income = 0;
        board.flat().forEach((cell) => {
          if (cell.color !== 'empty') {
            const base = INCOME[cell.color];
            if (cell.color === 'purple') income += base;
            else {
              const lvl = research[cell.color as keyof ResearchLevels];
              const multi = Math.pow(RESEARCH[cell.color as keyof ResearchLevels].multiplier, lvl);
              income += base * multi;
            }
          }
        });
        return Math.floor(m + income);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [board, research]);

  const chooseOption = (choiceId: number) => {
    if (!currentEvent) return;
    const choice = currentEvent.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    // registra histórico
    setHistory(prev => [
      ...prev,
      {
        eventId: currentEvent.id,
        eventTitle: currentEvent.title,
        choiceText: choice.text,
        moraleChange: choice.moraleChange,
        timeChange: choice.timeChange
      }
    ]);


    setMorale((m) => Math.max(0, Math.min(100, m + choice.moraleChange)));
    setTime((t) => Math.max(0, Math.min(100, t + choice.timeChange)));

    setEvents((prev) => {
      const updated = prev.filter((ev) => ev.id !== currentEvent.id);
      localStorage.setItem('game_events', JSON.stringify(updated));

      // ✔️ Se NÃO houver mais eventos, vai direto para o relatório
      if (updated.length === 0) {
        setTimeout(() => {
          router.push('/game/report');
        }, 500); // delayzinho pra UX ficar suave
      }

      return updated;
    });

    setCurrentEvent(null);
    try { showToast?.('Opção escolhida', 'info'); } catch {}
  };



  // 🏗️ compra simples (placeholder)
  const buy = (color: Exclude<Color, 'purple' | 'empty'>) => {
    const cost = COSTS[color];
    if (money < cost.money || time < cost.time || morale < cost.morale) {
      showToast?.('Recursos insuficientes!', 'error');
      return;
    }
    setMoney((m) => m - cost.money);
    setTime((t) => t - cost.time);
    setMorale((mo) => mo - cost.morale);
    setPendingPlacement(color);
    showToast?.('Compra realizada: posicione a fábrica no tabuleiro', 'success');
  };

  const place = (row: number, col: number) => {
    if (!pendingPlacement) return;
    setBoard((prev) => {
      const copy = prev.map((r) => r.slice());
      const target = copy[row][col];
      if (target.color !== 'empty') return prev;
      copy[row][col] = { ...target, color: pendingPlacement, fixed: false };
      return copy;
    });
    setPendingPlacement(null);
    try { showToast?.('Fábrica posicionada', 'success'); } catch {}
  };

  // ✅ compra de pesquisa
  const buyResearch = (color: keyof ResearchLevels) => {
    const currentLevel = research[color];
    const base = RESEARCH[color].baseCost;
    const multiplier = Math.pow(2, currentLevel);
    const cost = {
      money: Math.floor(base.money * multiplier),
      time: Math.floor(base.time * multiplier),
      morale: Math.floor(base.morale * multiplier),
    };

    if (money < cost.money || time < cost.time || morale < cost.morale) {
      showToast?.('Recursos insuficientes para pesquisa!', 'error');
      return;
    }

    setMoney((m) => m - cost.money);
    setTime((t) => t - cost.time);
    setMorale((mo) => mo - cost.morale);
    setResearch((r) => ({ ...r, [color]: r[color] + 1 }));
    showToast?.('Pesquisa concluída!', 'success');
  };


  const resetPending = () => setPendingPlacement(null);

  const applyBonus = (bonusList: any[]) => {
    let newMoney = START_RESOURCES.money;
    let newTime = START_RESOURCES.time;
    let newMorale = START_RESOURCES.morale;

    bonusList.forEach(bonus => {
      if (bonus.money) newMoney += bonus.money;
      if (bonus.time) newTime += bonus.time;
      if (bonus.morale) newMorale += bonus.morale;
    });

    // salva no estado
    setMoney(newMoney);
    setTime(newTime);
    setMorale(newMorale);

    // salva no localStorage
    localStorage.setItem("game_resources", JSON.stringify({
      money: newMoney,
      time: newTime,
      morale: newMorale,
    }));
    try { showToast?.('Bônus aplicado', 'success'); } catch {}
  };

  function calculateScore(history: any[]) {
    if (history.length === 0) return 50; // neutro

    let moraleSum = 0;
    let timeSum = 0;

    history.forEach(h => {
      moraleSum += h.moraleChange;
      timeSum += h.timeChange;
    });

    // média simples
    let score = 50 + (moraleSum + timeSum);

    // limita entre 0 e 100
    return Math.max(0, Math.min(100, score));
  }




  const value = {
    board,
    money,
    time,
    morale,
    pendingPlacement,
    research,
    events,
    currentEvent,
    setEvents,
    chooseOption,
    buy,
    place,
    resetPending,
    buyResearch,
    player,
    setPlayer,
    applyBonus,
    history,
    setHistory,
    isLoaded,
    score: calculateScore(history),
    resetHistory,
  };


  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
