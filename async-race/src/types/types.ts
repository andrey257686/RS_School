export interface Car {
  color: string;
  id: number;
  name: string;
}

export interface ModelInitGarage {
  cars: Car[];
  count: number;
}
