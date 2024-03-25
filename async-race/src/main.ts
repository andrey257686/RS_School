import AppController from "./controller/controller";
import AppView from "./view/appView";

class App {
  public appController: AppController;

  public appView: AppView;

  constructor() {
    this.appController = new AppController();
    this.appView = new AppView();
  }

  start() {
    document.querySelector("body")?.appendChild(this.appView.components.header);
    document.querySelector("body")?.appendChild(this.appView.container);
    this.appController.gerCars().then((data) => {
      this.appView.garageView.renderTracks(data);
    });
  }
}

const app = new App();
app.start();
