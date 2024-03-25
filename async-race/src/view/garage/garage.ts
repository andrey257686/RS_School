import { Car } from "../../model/types";

export default class GarageView {
  public garagePage: HTMLDivElement;

  public garageContainer: HTMLDivElement;

  public garageTracks: HTMLDivElement[] | undefined;

  constructor() {
    this.garageContainer = this.createGarageContainer();

    this.garagePage = this.createGaragePage();
  }

  public createGarageContainer() {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("garage__tracks");
    return element;
  }

  public createGaragePage() {
    this.garagePage = document.createElement("div");
    this.garagePage.classList.add("garage");
    this.garagePage.appendChild(this.garageContainer);
    return this.garagePage;
  }

  public renderTracks(data: Car[]) {
    this.garageContainer.innerHTML = "";
    data.forEach((car, idx) => {
      const element: HTMLDivElement = document.createElement("div");
      element.classList.add(`garage__tracks_${idx}`);
      element.id = String(car.id);
      element.textContent = car.name;
      this.garageContainer.appendChild(element);
    });
  }
}
