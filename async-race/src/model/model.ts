import axios, { AxiosResponse } from "axios";
import AppView from "../view/appView";
import { Car, ModelInitGarage } from "../types/types";

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
        count: response.headers.xTotalCount,
      };
      this.appView.renderPage(modelInitGarage);
    });
  }

  public async gerCars<T>(): Promise<AxiosResponse<T>> {
    const response = await axios.get(`${this.SERVER}/garage`);
    return response;
  }
}
