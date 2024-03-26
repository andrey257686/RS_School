import "./components.scss";

export default class Components {
  public header: HTMLHeadElement;

  constructor() {
    this.header = this.createHeader();
  }

  public createHeader() {
    const element: HTMLHeadElement = document.createElement("header");
    element.classList.add("header");
    element.appendChild(this.createButtonsHeader());
    element.appendChild(this.createLogo());
    return element;
  }

  public createLogo() {
    const element: HTMLHeadingElement = document.createElement("h1");
    element.classList.add("header__logo");
    element.textContent = "Async Race";
    return element;
  }

  public createButtonsHeader() {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("header__buttons");
    for (let i = 0; i < 2; i += 1) {
      const button: HTMLButtonElement = document.createElement("button");
      button.classList.add("header__button");
      if (i === 0) {
        button.textContent = "To garage";
        button.classList.add("header__button_garage");
        button.addEventListener("click", () => {
          (document.querySelector(".winners") as HTMLDivElement).style.display = "none";
          (document.querySelector(".garage") as HTMLDivElement).style.display = "block";
        });
      } else {
        button.textContent = "To winners";
        button.classList.add("header__button_winners");
        button.addEventListener("click", () => {
          (document.querySelector(".garage") as HTMLDivElement).style.display = "none";
          (document.querySelector(".winners") as HTMLDivElement).style.display = "block";
        });
      }
      element.appendChild(button);
    }
    return element;
  }
}
