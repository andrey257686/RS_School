import Components from "./compenents/components";
import LoginView from "./login/login";
import ChatView from "./chat/chat";

export default class AppView {
  public loginView: LoginView;

  public chatView: ChatView;

  public components: Components;

  public container: HTMLDivElement;

  constructor() {
    this.loginView = new LoginView();
    this.chatView = new ChatView();
    this.components = new Components();

    this.container = document.createElement("div");
    this.container.classList.add("container");

    this.buildPage();
  }

  public buildPage() {
    document.querySelector("body")?.appendChild(this.components.header);
    document.querySelector("body")?.appendChild(this.container);
  }

  public renderContent(page: string) {
    this.container.innerHTML = "";
    if (page === "login") {
      this.container.appendChild(this.loginView.loginForm);
    }
    if (page === "chat") {
      this.container.appendChild(this.chatView.chat);
    }
  }
}
