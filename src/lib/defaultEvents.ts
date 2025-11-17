import type { GameEvent } from '@/src/types';

export const DEFAULT_EVENTS: GameEvent[] = [
    {
        id: 1,
        title: 'Motivação em queda',
        description:
            'Os funcionários estão desmotivados devido ao excesso de trabalho. O que você faz?',
        choices: [
            {
                id: 0,
                text: 'Organiza um dia de folga remunerada',
                moraleChange: +15,
                timeChange: -10,
            },
            {
                id: 1,
                text: 'Distribui bônus de desempenho',
                moraleChange: +10,
                timeChange: -5,
            },
            {
                id: 2,
                text: 'Ignora o problema',
                moraleChange: -15,
                timeChange: 0,
            },
            {
                id: 3,
                text: 'Reunião motivacional com café e bolo',
                moraleChange: +8,
                timeChange: -2,
            },
        ],
    },
    {
        id: 2,
        title: 'Pane na linha de produção',
        description:
            'Uma das fábricas apresentou falhas no sistema elétrico e precisa de manutenção urgente.',
        choices: [
            {
                id: 0,
                text: 'Chama técnicos especializados',
                moraleChange: 0,
                timeChange: -15,
            },
            {
                id: 1,
                text: 'Ordena a equipe a consertar por conta própria',
                moraleChange: -10,
                timeChange: -5,
            },
            {
                id: 2,
                text: 'Desliga temporariamente a produção',
                moraleChange: -5,
                timeChange: -10,
            },
            {
                id: 3,
                text: 'Ignora o problema até piorar',
                moraleChange: -20,
                timeChange: 0,
            },
        ],
    },
    {
        id: 3,
        title: 'Proposta de expansão',
        description:
            'Um investidor quer financiar a expansão de suas fábricas em troca de participação nos lucros.',
        choices: [
            {
                id: 0,
                text: 'Aceita o investimento imediatamente',
                moraleChange: +10,
                timeChange: -5,
            },
            {
                id: 1,
                text: 'Negocia melhores condições',
                moraleChange: +5,
                timeChange: -2,
            },
            {
                id: 2,
                text: 'Recusa a proposta',
                moraleChange: 0,
                timeChange: +5,
            },
            {
                id: 3,
                text: 'Ignora o investidor',
                moraleChange: -5,
                timeChange: 0,
            },
        ],
    },
];
