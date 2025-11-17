export type Color = 'purple' | 'green' | 'red' | 'blue' | 'empty';

export interface CellData {
  row: number;
  col: number;
  color: Color;
  fixed?: boolean;
}

export interface Choice {
  id: number;
  text: string;
  moraleChange: number;
  timeChange: number;
}

export interface GameEvent {
  id: number;
  title: string;
  description: string;
  choices: Choice[];
}

export interface Player {
  avatar: string;
  name: string;
  surname: string;
  age: number;
  description: string;
}
