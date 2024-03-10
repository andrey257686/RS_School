import type Component from './components/base-component.ts';
import LoginPage from './pages/login/login.ts';

import Container from './page.ts';

class App {
  private readonly rootElement: HTMLElement;

  private readonly pageWrapper: Component;

  constructor(pageWrapper: Component, root: HTMLElement) {
    this.rootElement = root;
    this.pageWrapper = pageWrapper;
  }

  public start(): void {
    this.rootElement.append(this.pageWrapper.getNode());
  }

  public changePage(page: Component): void {
    this.pageWrapper.destroyChildren();
    this.pageWrapper.append(page);
    this.rootElement.append(this.pageWrapper.getNode());
  }
}
const app = new App(Container(LoginPage()), document.querySelector<HTMLDivElement>('.body')!);

export default app;

app.start();
