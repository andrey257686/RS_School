import GarageView from "./garage/garage";
import Components from "./components/components";
import { ModelInitGarage } from "../types/types";

export default class AppView {
  public garageView: GarageView;

  public components: Components;

  public container: HTMLDivElement;

  constructor() {
    this.container = this.createContainer();
    this.garageView = new GarageView();
    this.components = new Components();
    this.container.appendChild(this.garageView.garagePage);
  }

  public renderPage(data: ModelInitGarage) {
    document.querySelector("body")?.appendChild(this.components.header);
    document.querySelector("body")?.appendChild(this.container);
    this.garageView.renderTracks(data);
  }

  public createContainer() {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("container");
    return element;
  }
}
