export default class ChatView {
  public chat: HTMLDivElement;

  constructor() {
    this.chat = document.createElement("div");
    this.createLoginForm();
  }

  private createLoginForm() {
    this.chat.classList.add("chat");
    this.chat.innerHTML = "chat";
  }
}
