import type Component from './components/base-component.ts';
import Controller from './controller/controller.ts';
import GamePage from './pages/game/game.ts';

import Container from './page.ts';

const controller = new Controller();

class App {
  private readonly rootElement: HTMLElement;

  private readonly pageWrapper: Component;

  constructor(pageWrapper: Component, root: HTMLElement) {
    this.rootElement = root;
    this.pageWrapper = pageWrapper;
  }

  public start(): void {
    // controller.isAuthorized(); закоментил чтобы грузить startpage
    this.rootElement.append(this.pageWrapper.getNode());
  }

  public changePage(page: Component): void {
    this.pageWrapper.destroyChildren();
    this.pageWrapper.append(page);
    this.rootElement.append(this.pageWrapper.getNode());
  }
}

// const app = new App(Container(controller.currentPage), document.querySelector<HTMLDivElement>('.body')!); закоментил чтобы грузить startpage
const app = new App(GamePage(), document.querySelector<HTMLDivElement>('.body')!);

export { controller, app };

app.start();
