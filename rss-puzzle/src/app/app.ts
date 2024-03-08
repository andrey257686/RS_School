import type Component from './components/base-component.ts';

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
}
const app = new App(Container(), document.querySelector<HTMLDivElement>('.body')!);

app.start();
