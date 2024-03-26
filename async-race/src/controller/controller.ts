import axios from "axios";
import { Car } from "../types/types";
import AppModel from "../model/model";

export default class AppController {
  private SERVER = "http://127.0.0.1:3000";

  public appModel: AppModel;

  constructor() {
    this.appModel = new AppModel();
  }

  public async gerCars(): Promise<Car[]> {
    const response = await axios.get(`${this.SERVER}/garage`);
    return response.data;
  }

  public initialize() {
    this.appModel.getInitialData();
  }
}
