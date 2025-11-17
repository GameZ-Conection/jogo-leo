export const BOARD_ROWS = 5;
export const BOARD_COLS = 5;

export const COSTS = {
  green: { money: 10, time: 5, morale: 2 },
  red: { money: 15, time: 8, morale: 3 },
  blue: { money: 20, time: 10, morale: 4 },
};

export const FACTORY_IMAGES = {
  purple: '/images/factory-purple1-removebg-preview.png',
  green: '/images/factory-green1-removebg-preview.png',
  red: '/images/factory-red1-removebg-preview.png',
  blue: '/images/factory-blue1-removebg-preview.png',
};

export const RESEARCH_IMAGES = {
  green: '/icon-pesquisa/icon-pesquisa-verde-removebg-preview.png',
  red: '/icon-pesquisa/icon-pesquisa-vermelha-removebg-preview.png',
  blue: '/icon-pesquisa/icon-pesquisa-roxo-removebg-preview.png',
}

export const START_RESOURCES = {
  money: 100,
  time: 50,
  morale: 30,
};

export const INCOME = {
  purple: 1,
  green: 2,
  red: 3,
  blue: 5,
};

export const RESEARCH = {
  green: { baseCost: { money: 100, time: 20, morale: 10 }, multiplier: 1.5 },
  red: { baseCost: { money: 150, time: 25, morale: 12 }, multiplier: 1.4 },
  blue: { baseCost: { money: 200, time: 30, morale: 15 }, multiplier: 1.3 },
};

// regeneração por segundo
export const REGEN = {
  time: 2,
  morale: 1,
};
