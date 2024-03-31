import axios, { AxiosResponse } from "axios";
import AppView from "../view/appView";
import garageListeners from "../view/garage/garageListeners";
import winnersListeners from "../view/winners/winnersListeners";
import { Car, ModelInitGarage, CarWinners, ModelCarWinners } from "../types/types";
import { generateRandomCar, generateRandomColor } from "../services/generateCar";

export default class AppModel {
  private SERVER = "http://127.0.0.1:3000";

  public appView: AppView;

  public selectedId: number | undefined;

  public currentGaragePage: number = 1;

  public totalCountCars: number = 4;

  public totalCountWinners: number = 1;

  public currentWinnersPage: number = 1;

  public limitWinnersPage: number = 10;

  public limitGaragePage: number = 7;

  public orderWinnersBy: string = "ASC";

  public sortWinnersBy: string = "";

  public abortController: AbortController | undefined;

  public abortControllersArray: AbortController[] = [];

  constructor() {
    this.initializeListeners();
    this.appView = new AppView();
  }

  public initializeListeners() {
    garageListeners.handleCreateClick = this.handleCreateClick.bind(this);
    garageListeners.handleUpdateClick = this.handleUpdateClick.bind(this);
    garageListeners.handleRaceClick = this.handleRaceClick.bind(this);
    garageListeners.handleResetClick = this.handleResetClick.bind(this);
    garageListeners.handleGenerateClick = this.handleGenerateClick.bind(this);
    garageListeners.handleRemoveClick = this.handleRemoveClick.bind(this);
    garageListeners.handleSelectClick = this.handleSelectClick.bind(this);
    garageListeners.handleStartClick = this.handleStartClick.bind(this);
    garageListeners.handleStopClick = this.handleStopClick.bind(this);
    garageListeners.handleNextPageClick = this.handleNextPageClick.bind(this);
    garageListeners.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    winnersListeners.handlePrevPageClick = this.handlePrevPageClickWinners.bind(this);
    winnersListeners.handleNextPageClick = this.handleNextPageClickWinners.bind(this);
    winnersListeners.handleSortByWins = this.handleSortByWins.bind(this);
    winnersListeners.handleSortByTime = this.handleSortByTime.bind(this);
  }

  public handleCreateClick(): void {
    const name: string = (document.querySelector(".options__create_name") as HTMLInputElement).value;
    const color: string = (document.querySelector(".options__create_color") as HTMLInputElement).value;
    this.createCar(name, color);
  }

  public handleUpdateClick(): void {
    const name: string = (document.querySelector(".options__update_name") as HTMLInputElement).value;
    const color: string = (document.querySelector(".options__update_color") as HTMLInputElement).value;
    this.updateCar(name, color);
    this.appView.garageView.changeUpdateState(false);
  }

  public async handleRaceClick() {
    const tracks = Array.from(document.querySelectorAll(".track"));
    const promises = tracks.map((track) => {
      const abortController = new AbortController();
      const { signal } = abortController;
      this.abortControllersArray.push(abortController);
      return this.startRace(track as HTMLDivElement, signal);
    });
    Promise.any(promises)
      .then(async (result) => {
        if (result === null) {
          return;
        }
        let currentTime = 0;
        await this.getWinner(Number(result.id))
          .then(async (res) => {
            const bestTime: number = res.time < result.time ? res.time : result.time;
            currentTime = result.time;
            const currentWins = res.wins + 1;
            await this.updateWinner(Number(result.id), Number(bestTime.toFixed(3)), currentWins);
            await this.updateWinnersData();
          })
          .catch(async () => {
            currentTime = result.time;
            await this.createWinner(Number(result.id), Number(currentTime.toFixed(3)));
            await this.updateWinnersData();
          });
        const response = await this.getCar(Number(result.id));
        this.appView.components.showModal(response.data.name, currentTime);
        while (this.abortControllersArray.length > 0) {
          this.abortControllersArray.pop();
        }
      })
      .catch(() => {
        // console.log(err);
      });
  }

  public async handleResetClick() {
    const tracks = document.querySelectorAll(".track");
    const tracksPromises = [];
    while (this.abortControllersArray.length > 0) {
      this.abortControllersArray.pop()!.abort();
    }
    for (let i = 0; i < tracks.length; i += 1) {
      tracksPromises.push(this.stopRace(tracks[i] as HTMLDivElement));
    }
    Promise.all(tracksPromises);
  }

  public handleGenerateClick() {
    const promises = [];
    for (let i = 0; i < 100; i += 1) {
      promises.push(this.createCar(generateRandomCar(), generateRandomColor(), true));
    }
    Promise.all(promises).then(() => {
      this.updateCarsData();
    });
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
      this.appView.garageView.changeUpdateState(true);
      this.selectedId = Number(parentTrack.id);
      const name = parentTrack.querySelector(".track__controls_name")?.textContent;
      const color = parentTrack.querySelector("svg g")?.getAttribute("fill");
      if (name) {
        (inputUpdateName as HTMLInputElement).value = name;
      }
      if (color) {
        (inputUpdateColor as HTMLInputElement).value = color;
      }
    }
  }

  public async handleStartClick(event: MouseEvent) {
    const parentTrack = (event.target as Element).closest(".track");
    if (parentTrack !== null) {
      await this.startCar(parentTrack as HTMLDivElement);
    }
  }

  public async handleStopClick(event: MouseEvent) {
    const parentTrack = (event.target as Element).closest(".track");
    if (parentTrack !== null) {
      await this.stopCar(parentTrack as HTMLDivElement);
    }
  }

  public async handleNextPageClick(event: MouseEvent) {
    while (this.abortControllersArray.length > 0) {
      this.abortControllersArray.pop();
    }
    event.preventDefault();
    this.currentGaragePage += 1;
    await this.updateCarsData();
  }

  public async handlePrevPageClick(event: MouseEvent) {
    while (this.abortControllersArray.length > 0) {
      this.abortControllersArray.pop();
    }
    event.preventDefault();
    this.currentGaragePage -= 1;
    await this.updateCarsData();
  }

  public handleNextPageClickWinners(event: MouseEvent) {
    event.preventDefault();
    this.currentWinnersPage += 1;
    this.updateWinnersData();
  }

  public handlePrevPageClickWinners(event: MouseEvent) {
    event.preventDefault();
    this.currentWinnersPage -= 1;
    this.updateWinnersData();
  }

  public handleSortByWins() {
    if (this.orderWinnersBy === "ASC") {
      this.orderWinnersBy = "DESC";
    } else {
      this.orderWinnersBy = "ASC";
    }
    this.sortWinnersBy = "wins";
    this.updateWinnersData(this.sortWinnersBy, this.orderWinnersBy);
    this.appView.winnersView.updateSortByWins(this.orderWinnersBy);
  }

  public handleSortByTime() {
    if (this.orderWinnersBy === "ASC") {
      this.orderWinnersBy = "DESC";
    } else {
      this.orderWinnersBy = "ASC";
    }
    this.sortWinnersBy = "time";
    this.updateWinnersData(this.sortWinnersBy, this.orderWinnersBy);
    this.appView.winnersView.updateSortByTime(this.orderWinnersBy);
  }

  public checkGaragePagination() {
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

  public checkWinnersPagination() {
    if (Math.ceil(this.totalCountWinners / this.limitWinnersPage) <= this.currentWinnersPage) {
      this.appView.winnersView.toggleButtonPagination("next", true);
    } else {
      this.appView.winnersView.toggleButtonPagination("next", false);
    }
    if (this.currentWinnersPage === 1) {
      this.appView.winnersView.toggleButtonPagination("prev", true);
    } else {
      this.appView.winnersView.toggleButtonPagination("prev", false);
    }
  }

  public async updateCarsData() {
    await this.gerCars().then((response) => {
      const modelInitGarage: ModelInitGarage = {
        cars: response.data as Car[],
        count: response.headers["x-total-count"],
      };
      if (modelInitGarage.count !== undefined) {
        this.totalCountCars = modelInitGarage.count;
      }
      this.appView.garageView.updateGaragePage(modelInitGarage, this.currentGaragePage);
      this.checkGaragePagination();
    });
  }

  public async updateWinnersData(sort = "id", order = "ASC") {
    let sortMethod = sort;
    sortMethod = this.sortWinnersBy || "id";
    let orderMethod = order;
    orderMethod = this.orderWinnersBy || "ASC";
    await this.getWinners(sortMethod, orderMethod).then(async (response) => {
      const modelCarWinners: ModelCarWinners = {
        carWinners: [],
        count: response.headers["x-total-count"],
      };
      if (modelCarWinners.count !== undefined) {
        this.totalCountWinners = modelCarWinners.count;
      }
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
      this.appView.winnersView.updateWinnersPage(modelCarWinners, this.currentWinnersPage);
      this.checkWinnersPagination();
    });
  }

  public async getInitialData() {
    await this.updateCarsData();
    await this.updateWinnersData();
  }

  public async gerCars<T>(): Promise<AxiosResponse<T>> {
    const page = this.currentGaragePage;
    const response = await axios.get(`${this.SERVER}/garage?_limit=${this.limitGaragePage}&_page=${page}`);
    return response;
  }

  public async getWinners<T>(sort = "id", order = "ASC"): Promise<AxiosResponse<T>> {
    const page = this.currentWinnersPage;
    const response = await axios.get(
      `${this.SERVER}/winners?_limit=${this.limitWinnersPage}&_page=${page}&_sort=${sort}&_order=${order}`,
    );
    return response;
  }

  public async getCar(id: number): Promise<AxiosResponse<Car>> {
    const response = await axios.get(`${this.SERVER}/garage/${id}`);
    return response;
  }

  public async createCar(name: string, color: string, generation = false): Promise<void> {
    await axios.post(`${this.SERVER}/garage`, {
      name,
      color,
    });
    if (!generation) {
      this.updateCarsData();
    }
  }

  public async updateCar(name: string, color: string) {
    await axios.put(`${this.SERVER}/garage/${this.selectedId}`, {
      name,
      color,
    });
    await this.getInitialData();
  }

  public async deleteCar(id: number) {
    await axios.delete(`${this.SERVER}/garage/${id}`);
    try {
      await axios.delete(`${this.SERVER}/winners/${id}`);
    } catch (err) {
      console.log("No winner with this id");
    }
    await this.getInitialData();
  }

  public async startCar(track: HTMLDivElement) {
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    try {
      const response = await axios.patch(`${this.SERVER}/engine?id=${track.id}&status=started`);
      const { velocity, distance } = response.data;
      const time = distance / velocity / 1000;
      this.appView.garageView.moveCar(track, time);
      await axios.patch(`${this.SERVER}/engine?id=${track.id}&status=drive`, { signal });
      return {
        id: track.id,
        time,
      };
    } catch (error) {
      this.appView.garageView.stopCar(track);
      return null;
    }
  }

  public async startRace(track: HTMLDivElement, signal: AbortSignal) {
    try {
      const response = await axios.patch(`${this.SERVER}/engine?id=${track.id}&status=started`);
      const { velocity, distance } = response.data;
      const time = distance / velocity / 1000;
      this.appView.garageView.moveCar(track, time);
      await axios.patch(`${this.SERVER}/engine?id=${track.id}&status=drive`, { signal });
      if (!signal.aborted) {
        return {
          id: track.id,
          time,
        };
      }
      return null;
    } catch (error) {
      this.appView.garageView.stopCar(track);
      throw error;
    }
  }

  public async stopCar(track: HTMLDivElement) {
    if (this.abortController) {
      this.abortController.abort();
    }
    await axios.patch(`${this.SERVER}/engine?id=${track.id}&status=stopped`);
    this.appView.garageView.toBeginCar(track);
  }

  public async stopRace(track: HTMLDivElement) {
    await axios.patch(`${this.SERVER}/engine?id=${track.id}&status=stopped`);
    this.appView.garageView.toBeginCar(track);
  }

  public async createWinner(id: number, time: number, wins = 1) {
    return axios.post(`${this.SERVER}/winners`, {
      id,
      wins,
      time,
    });
  }

  public async updateWinner(id: number, time: number, wins: number) {
    return axios.patch(`${this.SERVER}/winners/${id}`, {
      wins,
      time,
    });
  }

  public async getWinner(id: number) {
    const response = await axios.get(`${this.SERVER}/winners/${id}`);
    return response.data;
  }
}
