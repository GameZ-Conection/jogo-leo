'use client';
import React, { useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useGame } from '@/src/context/GameContext';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

export default function ReportCharts() {
    const { history } = useGame();

    // calcula evolução dos atributos
    const moraleDataset = useMemo(() => {
        let total = 30; // moral inicial
        return history.map(h => {
            total += h.moraleChange;
            return total;
        });
    }, [history]);

    const timeDataset = useMemo(() => {
        let total = 50; // tempo inicial
        return history.map(h => {
            total += h.timeChange;
            return total;
        });
    }, [history]);

    const labels = history.map((_, i) => `Evento ${i + 1}`);

    const data = {
        labels,
        datasets: [
            {
                label: 'Moral',
                data: moraleDataset,
                borderColor: '#36a2eb',
                backgroundColor: 'rgba(54,162,235,0.3)',
                tension: 0.3,
                fill: true,
            },
            {
                label: 'Tempo',
                data: timeDataset,
                borderColor: '#facc15',
                backgroundColor: 'rgba(250,204,21,0.3)',
                tension: 0.3,
                fill: true,
            },
        ],
    };

    return (
        <div className="bg-slate-800 border border-slate-600 p-4 rounded-lg shadow-lg pixel-font">
            <h2 className="text-xl text-yellow-400 mb-4">
                📊 Evolução dos Atributos
            </h2>

            <Line
                data={data}
                options={{
                    responsive: true,
                    animation: { duration: 800 },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#fff',
                                font: { family: "'Press Start 2P', cursive" }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: '#ccc' },
                            grid: { color: '#444' },
                        },
                        y: {
                            ticks: { color: '#ccc' },
                            grid: { color: '#444' },
                        }
                    }
                }}
            />
        </div>
    );
}
