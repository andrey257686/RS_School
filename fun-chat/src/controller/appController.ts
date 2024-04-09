// import AppModel from "../model/model";
import AppView from "../view/appView";
import Router from "./router";

export default class AppController {
  public appView: AppView;

  public router: Router;

  constructor() {
    this.appView = new AppView();
    this.router = new Router();
  }

  public initialize() {
    this.appView.buildPage();
    const page = this.router.handleLocation();
    if (page) {
      this.appView.renderContent(page);
    }
    this.listeners();
  }

  public listeners() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const page = this.router.route(event);
        if (page) {
          this.appView.renderContent(page);
        }
      });
    });
    window.addEventListener("popstate", (event) => {
      event.preventDefault();
      const page = this.router.handleLocation();
      if (page) {
        this.appView.renderContent(page);
      }
    });
  }
}
