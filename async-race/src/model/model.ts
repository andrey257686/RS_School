import axios, { AxiosResponse } from "axios";
import AppView from "../view/appView";
import { Car, ModelInitGarage, CarWinners, ModelCarWinners } from "../types/types";

export default class AppModel {
  private SERVER = "http://127.0.0.1:3000";

  public appView: AppView;

  constructor() {
    this.appView = new AppView();
  }

  public getInitialData() {
    this.gerCars().then((response) => {
      const modelInitGarage: ModelInitGarage = {
        cars: response.data as Car[],
        count: response.headers["x-total-count"],
      };
      this.appView.renderPage({ dataGarage: modelInitGarage });
    });

    this.getWinners().then(async (response) => {
      const modelCarWinners: ModelCarWinners = {
        carWinners: [],
        count: response.headers["x-total-count"],
      };
      if (Array.isArray(response.data)) {
        const carWinnersPromises: Promise<CarWinners>[] = [];
        response.data.forEach((winner) => {
          carWinnersPromises.push(
            this.getCar(winner.id).then((responseWinner) => ({
              color: responseWinner.data.color,
              name: responseWinner.data.name,
              wins: winner.wins,
              time: winner.time,
            })),
          );
        });
        const carWinners = await Promise.all(carWinnersPromises);
        modelCarWinners.carWinners.push(...carWinners);
      }
      this.appView.renderPage({ dataWinners: modelCarWinners });
    });
  }

  public async gerCars<T>(): Promise<AxiosResponse<T>> {
    const response = await axios.get(`${this.SERVER}/garage?_limit=10`);
    return response;
  }

  public async getWinners<T>(): Promise<AxiosResponse<T>> {
    const response = await axios.get(`${this.SERVER}/winners?_limit=10`);
    return response;
  }

  public async getCar(id: number): Promise<AxiosResponse<Car>> {
    const response = await axios.get(`${this.SERVER}/garage/${id}`);
    return response;
  }
}
