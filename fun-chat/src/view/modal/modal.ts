import "./modal.scss";

export default class ModalView {
  public overflow: HTMLDivElement;

  public modalContainer: HTMLDivElement;

  public modalLabel: HTMLLabelElement;

  private modalButton: HTMLButtonElement;

  public handleCloseModal: ((event: MouseEvent) => void) | undefined;

  constructor() {
    this.overflow = document.createElement("div");
    this.modalContainer = document.createElement("div");
    this.modalLabel = document.createElement("label");
    this.modalButton = document.createElement("button");
  }

  public create() {
    this.overflow.classList.add("overflow");
    this.createModalContainer();
  }

  public createModalContainer() {
    this.modalContainer.classList.add("modal");
    this.modalLabel.classList.add("modal__label");
    this.modalButton.classList.add("modal__button");
    this.modalButton.innerText = "Close";
    if (this.handleCloseModal) {
      this.modalButton.addEventListener("click", this.handleCloseModal);
    } else {
      console.log('Не определён прослушивтель для события "click"');
    }
    this.modalContainer.appendChild(this.modalLabel);
    this.modalContainer.appendChild(this.modalButton);
  }
}
