import axios from "axios";

export default class Loader {
  private SERVER = "http://127.0.0.1:3000";

  public async gerCars<T>(): Promise<T> {
    const response = await axios.get<T>(`${this.SERVER}/garage`);
    return response.data;
  }
}
