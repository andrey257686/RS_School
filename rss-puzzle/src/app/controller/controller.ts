import Component from '../components/base-component.ts';
import LoginPage from '../pages/login/login.ts';
import StartPage from '../pages/start/start.ts';
import { app } from '../app.ts';

export default class Controller {
  public currentPage: Component;

  constructor(currentPage = LoginPage()) {
    this.currentPage = currentPage;
  }

  public changePage(page: Component): void {
    this.currentPage = page;
    app.changePage(this.currentPage);
  }

  public isAuthorized(): boolean {
    const data = localStorage.getItem('userData');
    if (data) {
      const parsedData = JSON.parse(data);
      this.changePage(StartPage(parsedData.name, parsedData.surname));
      return true;
    }
    this.changePage(LoginPage());
    return false;
  }
}
