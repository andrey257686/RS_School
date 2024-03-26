export interface Car {
  color: string;
  id: number;
  name: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface ModelInitGarage {
  cars: Car[];
  count: number | undefined;
}
export interface ModelInitWinners {
  winners: Winner[];
  count: number | undefined;
}

export interface CarWinners {
  color: string;
  name: string;
  wins: number;
  time: number;
}

export interface ModelCarWinners {
  carWinners: CarWinners[];
  count: number | undefined;
}
