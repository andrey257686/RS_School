import AppModel from "../model/model";

export default class AppController {
  public appModel: AppModel;

  constructor() {
    this.appModel = new AppModel();
  }

  public async initialize() {
    await this.appModel.getInitialData();
    this.listeners();
  }

  public async createCar(name: string, color: string) {
    await this.appModel.createCar(name, color);
  }

  public listeners() {
    const createButton: HTMLButtonElement | null = document.querySelector(".options__create_button");
    if (createButton !== null) {
      createButton.addEventListener("click", async () => {
        if ((document.querySelector(".options__create_name") as HTMLInputElement).value === "") {
          alert("Enter the name of the car");
          return;
        }
        const name: string = (document.querySelector(".options__create_name") as HTMLInputElement).value;
        const color: string = (document.querySelector(".options__create_color") as HTMLInputElement).value;
        await this.createCar(name, color);
      });
    }
  }
}
