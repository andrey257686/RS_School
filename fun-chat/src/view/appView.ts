import Components from "./compenents/components";
import LoginView from "./login/login";
import ChatView from "./chat/chat";
import ModalView from "./modal/modal";

export default class AppView {
  public loginView: LoginView;

  public chatView: ChatView;

  public components: Components;

  public modal: ModalView;

  public container: HTMLDivElement;

  constructor() {
    this.loginView = new LoginView();
    this.chatView = new ChatView();
    this.components = new Components();
    this.modal = new ModalView();

    this.container = document.createElement("div");
    this.container.classList.add("container");
  }

  public buildPage() {
    this.loginView.create();
    this.modal.create();
    document.querySelector("body")?.appendChild(this.components.header);
    document.querySelector("body")?.appendChild(this.container);
  }

  public renderContent(page: string) {
    this.container.innerHTML = "";
    if (page === "login") {
      this.container.appendChild(this.loginView.loginContainer);
    }
    if (page === "chat") {
      this.container.appendChild(this.chatView.chat);
    }
  }

  public showModal(message: string) {
    this.modal.modalLabel.innerText = message;
    this.container.appendChild(this.modal.modalContainer);
    this.container.appendChild(this.modal.overflow);
  }

  public closeModal() {
    this.container.removeChild(this.modal.modalContainer);
    this.container.removeChild(this.modal.overflow);
  }
}
