export default class Components {
  public header: HTMLHeadElement;

  constructor() {
    this.header = this.createHeader();
  }

  public createHeader() {
    const element: HTMLHeadElement = document.createElement("header");
    element.classList.add("header");
    element.appendChild(this.createLogo());
    return element;
  }

  public createLogo() {
    const element: HTMLHeadingElement = document.createElement("h1");
    element.classList.add("header__logo");
    element.textContent = "Async Race";
    return element;
  }
}
