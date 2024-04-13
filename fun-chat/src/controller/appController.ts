import AppModel from "../model/appModel";
import AppView from "../view/appView";
import Router from "./router";

export default class AppController {
  public appView: AppView;

  public appModel: AppModel;

  public router: Router;

  constructor() {
    this.appView = new AppView();
    this.appModel = new AppModel();
    this.router = new Router();
  }

  public initialize() {
    this.initializeListeners();
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

  private initializeListeners() {
    this.appView.loginView.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.appView.loginView.handleInputName = this.handleInputName.bind(this);
    this.appView.loginView.handleInputPassword = this.handleInputPassword.bind(this);
    this.appView.loginView.handleSubmitForm = this.handleLoginButtonClick.bind(this);
  }

  private handleInputName(event: Event) {
    const target = event.target as HTMLInputElement;
    this.appModel.validateName(target.value, this.appView.loginView.showErrorValidation);
  }

  private handleInputPassword(event: Event) {
    const target = event.target as HTMLInputElement;
    this.appModel.validatePassword(target.value, this.appView.loginView.showErrorValidation);
  }

  private handleLoginButtonClick(event: Event) {
    event.preventDefault();
    this.appModel.validateFields(this.appView.loginView.showErrorValidation);
    console.log("click");
  }
}
