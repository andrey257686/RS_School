import AppModel from "../model/appModel";
import AppView from "../view/appView";
import Router from "./router";

export default class AppController {
  public appView: AppView;

  public appModel: AppModel;

  public router: Router;

  public currentPage: string = "";

  constructor() {
    this.appView = new AppView();
    this.appModel = new AppModel();
    this.router = new Router();
  }

  public initialize() {
    this.initializeListeners();
    this.appView.buildPage();
    // const page = this.router.handleLocation();
    // if (page) {
    //   this.appView.renderContent(page);
    // }
    this.listeners();
  }

  public listeners() {
    window.addEventListener("popstate", (event) => {
      event.preventDefault();
      this.changePage();
    });
    this.appModel.apiService.socket.onopen = () => {
      this.changePage();
    };
    this.appModel.apiService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "USER_LOGIN") {
        this.appModel.responseLogin(data, this.changePage.bind(this));
      }
      if (data.type === "ERROR") {
        this.appModel.responseError(data, this.appView.showModal.bind(this.appView));
      }
    };
  }

  private initializeListeners() {
    this.appView.loginView.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.appView.loginView.handleInputName = this.handleInputName.bind(this);
    this.appView.loginView.handleInputPassword = this.handleInputPassword.bind(this);
    this.appView.loginView.handleSubmitForm = this.handleLoginButtonClick.bind(this);
    this.appView.loginView.handleInfoClick = this.handleInfoClick.bind(this);
    this.appView.modal.handleCloseModal = this.handleCloseModal.bind(this);
    this.appView.aboutView.handleCloseAbout = this.handleCloseAbout.bind(this);
  }

  private changePage(href?: string) {
    let page = "";
    let currentHref = href;
    if (window.location.pathname === "/about" && !href) {
      currentHref = "/about";
    } else if (this.appModel.isUserLogined() && href !== "/about") {
      currentHref = "/main";
    } else if (href !== "/about") {
      currentHref = "/login";
    }
    if (!currentHref) {
      page = this.router.handleLocation();
    } else {
      page = this.router.route(currentHref);
    }
    if (page) {
      this.currentPage = page;
      this.appView.renderContent(page);
    }
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

  private handleInfoClick(event: Event) {
    event.preventDefault();
    this.changePage("/about");
  }

  private handleCloseModal() {
    this.appView.closeModal();
  }

  private handleCloseAbout() {
    this.changePage("/main");
  }
}
