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
    this.appModel.apiService.socket.onopen = () => {
      this.appModel.onOpenSocket();
    };
    this.appModel.apiService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "USER_LOGIN") {
        this.appModel.responseLogin(data);
      }
      if (data.type === "ERROR") {
        this.appModel.responseError(data);
      }
    };
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
    if (this.appModel.isValidFields(this.appView.loginView.showErrorValidation)) {
      this.appModel.requestLoginUser();
    }
  }
}
