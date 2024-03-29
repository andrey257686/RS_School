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
          (document.querySelector(".winners") as HTMLDivElement).style.visibility = "hidden";
          (document.querySelector(".winners") as HTMLDivElement).style.height = "0px";
          (document.querySelector(".garage") as HTMLDivElement).style.visibility = "visible";
          (document.querySelector(".garage") as HTMLDivElement).style.height = "auto";
        });
      } else {
        button.textContent = "To winners";
        button.classList.add("header__button_winners");
        button.addEventListener("click", () => {
          (document.querySelector(".winners") as HTMLDivElement).style.visibility = "visible";
          (document.querySelector(".winners") as HTMLDivElement).style.height = "auto";
          (document.querySelector(".garage") as HTMLDivElement).style.visibility = "hidden";
          (document.querySelector(".garage") as HTMLDivElement).style.height = "0px";
        });
      }
      element.appendChild(button);
    }
    return element;
  }
}
