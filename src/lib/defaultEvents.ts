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
    {
        id: 4,
        title: "Falta de matéria-prima",
        description:
            "O estoque de matéria-prima está acabando e o fornecedor atual não consegue entregar no prazo.",
        choices: [
            {
                id: 0,
                text: "Comprar de um fornecedor alternativo mais caro",
                moraleChange: 0,
                timeChange: -10,
            },
            {
                id: 1,
                text: "Reduzir temporariamente a produção",
                moraleChange: -5,
                timeChange: +5,
            },
            {
                id: 2,
                text: "Pressionar o fornecedor atual",
                moraleChange: -10,
                timeChange: -2,
            },
            {
                id: 3,
                text: "Ignorar o problema",
                moraleChange: -15,
                timeChange: 0,
            },
        ],
    },
    {
        id: 5,
        title: "Conflito interno entre equipes",
        description:
            "Duas equipes estão em conflito sobre responsabilidades e isso está afetando a produtividade.",
        choices: [
            {
                id: 0,
                text: "Promover uma reunião de mediação",
                moraleChange: +10,
                timeChange: -5,
            },
            {
                id: 1,
                text: "Reorganizar a estrutura das equipes",
                moraleChange: +5,
                timeChange: -10,
            },
            {
                id: 2,
                text: "Ignorar o problema e esperar melhorar",
                moraleChange: -15,
                timeChange: 0,
            },
            {
                id: 3,
                text: "Demitir um dos líderes envolvidos",
                moraleChange: -5,
                timeChange: -5,
            },
        ],
    },
    {
        id: 6,
        title: "Falha no sistema de TI",
        description:
            "O servidor principal caiu e diversas operações estão paralisadas até que o sistema seja restaurado.",
        choices: [
            {
                id: 0,
                text: "Acionar suporte técnico 24h",
                moraleChange: 0,
                timeChange: -15,
            },
            {
                id: 1,
                text: "Tentar reiniciar o sistema rapidamente",
                moraleChange: -5,
                timeChange: -5,
            },
            {
                id: 2,
                text: "Migrar dados temporariamente para uma solução emergencial",
                moraleChange: -2,
                timeChange: -10,
            },
            {
                id: 3,
                text: "Aguardar até o horário comercial",
                moraleChange: -20,
                timeChange: 0,
            },
        ],
    },
    {
        id: 7,
        title: "Inspeção surpresa de qualidade",
        description:
            "Auditores chegaram para uma inspeção surpresa e querem avaliar todos os processos da fábrica.",
        choices: [
            {
                id: 0,
                text: "Direcionar toda equipe para deixar tudo impecável",
                moraleChange: -5,
                timeChange: -10,
            },
            {
                id: 1,
                text: "Apresentar os processos como estão e confiar no trabalho feito",
                moraleChange: +5,
                timeChange: -2,
            },
            {
                id: 2,
                text: "Tentar adiar a inspeção",
                moraleChange: -10,
                timeChange: +2,
            },
            {
                id: 3,
                text: "Ignorar e seguir com a rotina",
                moraleChange: -20,
                timeChange: 0,
            },
        ],
    },

];
