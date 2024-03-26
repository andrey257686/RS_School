import AppController from "./controller/controller";

class App {
  public appController: AppController;

  // public appView: AppView;

  constructor() {
    this.appController = new AppController();
  }

  start() {
    this.appController.initialize();
  }
}

const app = new App();
app.start();
