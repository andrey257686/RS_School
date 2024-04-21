import Components from "./compenents/components";
import LoginView from "./login/login";
import ChatView from "./chat/chat";
import ModalView from "./modal/modal";
import AboutView from "./about/about";

export default class AppView {
  public loginView: LoginView;

  public chatView: ChatView;

  public components: Components;

  public modal: ModalView;

  public aboutView: AboutView;

  public container: HTMLDivElement;

  constructor() {
    this.loginView = new LoginView();
    this.chatView = new ChatView();
    this.components = new Components();
    this.aboutView = new AboutView();
    this.modal = new ModalView();

    this.container = document.createElement("div");
    this.container.classList.add("container");
  }

  public buildPage() {
    this.loginView.create();
    this.chatView.create();
    this.modal.create();
    this.aboutView.create();
    this.components.create();
    document.querySelector("body")?.appendChild(this.container);
  }

  public renderContent(page: string) {
    this.container.innerHTML = "";
    if (page === "login") {
      this.container.innerHTML = "";
      this.container.appendChild(this.loginView.loginContainer);
    }
    if (page === "chat") {
      this.container.innerHTML = "";
      this.container.appendChild(this.components.header);
      this.container.appendChild(this.chatView.chatContainer);
      this.container.appendChild(this.components.footer);
    }
    if (page === "about") {
      this.container.innerHTML = "";
      this.container.appendChild(this.aboutView.aboutContainer);
    }
  }

  public showModal(message: string, isConnectionError = false) {
    this.modal.modalLabel.innerText = message;
    if (isConnectionError) {
      this.modal.modalButton.style.display = "none";
    } else {
      this.modal.modalButton.style.display = "block";
    }
    this.container.appendChild(this.modal.modalContainer);
    this.container.appendChild(this.modal.overflow);
  }

  public closeModal() {
    this.modal.modalContainer.remove();
    this.modal.overflow.remove();
    // this.container.removeChild(this.modal.modalContainer);
    // this.container.removeChild(this.modal.overflow);
  }
}
