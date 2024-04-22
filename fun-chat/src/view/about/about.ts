import "./about.scss";

export default class AboutView {
  public aboutContainer: HTMLDivElement;

  public handleCloseAbout: ((event: MouseEvent) => void) | undefined;

  constructor() {
    this.aboutContainer = document.createElement("div");
  }

  public create() {
    this.createAboutContainer();
  }

  private createAboutContainer() {
    this.aboutContainer.classList.add("about");
    const aboutHeader = document.createElement("h3");
    aboutHeader.classList.add("about__header");
    aboutHeader.innerText = "Fun chat";
    const aboutDescription = document.createElement("p");
    aboutDescription.classList.add("about__description");
    aboutDescription.innerHTML =
      "Hello, this is my Fun chat &#128232. I hope you're not 'Reviewer 3' who likes to downgrade &#128078;. Don't be too hard on the review, we're just learning &#128588;. I might not get something done by the deadline &#8987;. Good luck with your studies. &#129302";
    const aboutButton = document.createElement("button");
    aboutButton.classList.add("about__button");
    aboutButton.innerText = "Close";
    aboutButton.setAttribute("type", "button");
    if (this.handleCloseAbout) {
      aboutButton.addEventListener("click", this.handleCloseAbout);
    } else {
      console.log('Не определён прослушивтель для события "click"');
    }
    this.aboutContainer.appendChild(aboutHeader);
    this.aboutContainer.appendChild(aboutDescription);
    this.aboutContainer.appendChild(aboutButton);
  }
}
