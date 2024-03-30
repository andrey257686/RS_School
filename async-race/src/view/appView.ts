import GarageView from "./garage/garage";
import WinnersView from "./winners/winners";
import Components from "./components/components";
// import { ModelInitGarage, ModelCarWinners } from "../types/types";

export default class AppView {
  public garageView: GarageView;

  public winnersView: WinnersView;

  public components: Components;

  public container: HTMLDivElement;

  constructor() {
    this.container = this.createContainer();
    this.garageView = new GarageView();
    this.winnersView = new WinnersView();
    this.components = new Components();
    this.container.appendChild(this.garageView.garagePage);
    this.container.appendChild(this.winnersView.winnersPage);
    this.buildPage();
  }

  public buildPage() {
    document.querySelector("body")?.appendChild(this.components.header);
    document.querySelector("body")?.appendChild(this.container);
  }

  public createContainer() {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("container");
    return element;
  }
}
