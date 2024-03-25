import axios from "axios";
import { Car } from "../model/types";

export default class AppController {
  private SERVER = "http://127.0.0.1:3000";

  public async gerCars(): Promise<Car[]> {
    const response = await axios.get(`${this.SERVER}/garage`);
    return response.data;
  }
}
