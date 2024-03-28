import axios, { AxiosResponse } from "axios";
import AppView from "../view/appView";
import { Car, ModelInitGarage, CarWinners, ModelCarWinners } from "../types/types";

export default class AppModel {
  private SERVER = "http://127.0.0.1:3000";

  public appView: AppView;

  public selectedId: number | undefined;

  public currentGaragePage: number = 1;

  public totalCountCars: number = 4;

  public currentWinnersPage: number = 1;

  public limitGaragePage: number = 7;

  constructor() {
    this.appView = new AppView();
    this.initializeListeners();
  }

  public async handleRemoveClick(event: MouseEvent): Promise<void> {
    const parentTrack = (event.target as Element).closest(".track");
    if (parentTrack !== null) {
      await this.deleteCar(Number(parentTrack.id));
    }
  }

  public handleSelectClick(event: MouseEvent): void {
    const parentTrack = (event.target as Element).closest(".track");
    const inputUpdateName = document.querySelector(".options__update_name");
    const inputUpdateColor = document.querySelector(".options__update_color");
    if (parentTrack) {
      this.selectedId = Number(parentTrack.id);
      const name = parentTrack.querySelector(".track__controls_name")?.textContent;
      const color = parentTrack.querySelector("svg g")?.getAttribute("fill");
      if (name) {
        inputUpdateName?.setAttribute("value", name);
      }
      if (color) {
        inputUpdateColor?.setAttribute("value", color);
      }
    }
  }

  public async handleNextPageClick(event: MouseEvent) {
    event.preventDefault();
    this.currentGaragePage += 1;
    await this.getInitialData();
  }

  public async handlePrevPageClick(event: MouseEvent) {
    event.preventDefault();
    this.currentGaragePage -= 1;
    await this.getInitialData();
  }

  public initializeListeners() {
    this.appView.garageView.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.appView.garageView.handleSelectClick = this.handleSelectClick.bind(this);
    this.appView.garageView.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.appView.garageView.handlePrevPageClick = this.handlePrevPageClick.bind(this);
  }

  public checkPagination() {
    if (Math.ceil(this.totalCountCars / this.limitGaragePage) <= this.currentGaragePage) {
      this.appView.garageView.toggleButtonPagination("next", true);
    } else {
      this.appView.garageView.toggleButtonPagination("next", false);
    }
    if (this.currentGaragePage === 1) {
      this.appView.garageView.toggleButtonPagination("prev", true);
    } else {
      this.appView.garageView.toggleButtonPagination("prev", false);
    }
  }

  public async getInitialData() {
    await this.gerCars().then((response) => {
      const modelInitGarage: ModelInitGarage = {
        cars: response.data as Car[],
        count: response.headers["x-total-count"],
      };
      if (modelInitGarage.count !== undefined) {
        this.totalCountCars = modelInitGarage.count;
      }
      this.appView.renderPage({ dataGarage: modelInitGarage, page: this.currentGaragePage });
      this.checkPagination();
    });

    await this.getWinners().then(async (response) => {
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
      this.appView.renderPage({ dataWinners: modelCarWinners, page: this.currentWinnersPage });
    });
  }

  public async gerCars<T>(): Promise<AxiosResponse<T>> {
    const page = this.currentGaragePage;
    const response = await axios.get(`${this.SERVER}/garage?_limit=${this.limitGaragePage}&_page=${page}`);
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

  public async createCar(name: string, color: string): Promise<AxiosResponse<Car>> {
    const response = await axios.post(`${this.SERVER}/garage`, {
      name,
      color,
    });
    // const modelCar = {
    //   id: response.data.id,
    //   name: response.data.name,
    //   color: response.data.color,
    // };
    this.getInitialData();
    // this.appView.garageView.addTrack(modelCar);
    return response;
  }

  public async updateCar(name: string, color: string) {
    await axios.put(`${this.SERVER}/garage/${this.selectedId}`, {
      name,
      color,
    });
    this.getInitialData();
  }

  public async deleteCar(id: number) {
    await axios.delete(`${this.SERVER}/garage/${id}`);
    try {
      await axios.delete(`${this.SERVER}/winners/${id}`);
    } catch (err) {
      console.log("There is no winner with this id");
    }
    this.getInitialData();
  }
}
