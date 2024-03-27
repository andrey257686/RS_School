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

  public async updateCar(name: string, color: string) {
    await this.appModel.updateCar(name, color);
  }

  public listeners() {
    const createButton: HTMLButtonElement | null = document.querySelector(".options__create_button");
    const updateButton: HTMLButtonElement | null = document.querySelector(".options__update_button");
    if (createButton !== null) {
      createButton.addEventListener("click", async () => {
        if ((document.querySelector(".options__create_name") as HTMLInputElement).value === "") {
          alert("Enter the name of the car");
        } else {
          const name: string = (document.querySelector(".options__create_name") as HTMLInputElement).value;
          const color: string = (document.querySelector(".options__create_color") as HTMLInputElement).value;
          await this.createCar(name, color);
        }
      });
    }
    if (updateButton !== null) {
      updateButton.addEventListener("click", async () => {
        if ((document.querySelector(".options__update_name") as HTMLInputElement).value === "") {
          alert("Enter the name of the car");
        } else {
          const name: string = (document.querySelector(".options__update_name") as HTMLInputElement).value;
          const color: string = (document.querySelector(".options__update_color") as HTMLInputElement).value;
          await this.updateCar(name, color);
        }
      });
    }
  }
}
