import GarageView from "./garage/garage";
import Components from "./components/components";

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

  public createContainer() {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("container");
    return element;
  }
}
