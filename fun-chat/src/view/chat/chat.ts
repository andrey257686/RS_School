import "./chat.scss";
import { UserStatus, Message } from "../../types/types";

export default class ChatView {
  public chatContainer: HTMLDivElement;

  private contactsField: HTMLElement;

  private contactsListContainer: HTMLDivElement;

  private contactsListOnline: HTMLUListElement;

  private contactsListOffline: HTMLUListElement;

  private dialogField: HTMLElement;

  private dialogFieldHeader: HTMLDivElement;

  private dialogFieldBody: HTMLDivElement;

  private dialogFieldSending: HTMLDivElement;

  private dialogFieldSendingForm: HTMLFormElement;

  public handleInputSearch: ((event: Event) => void) | undefined;

  public handleClickUser: ((event: Event) => void) | undefined;

  public handleSendMessage: ((event: SubmitEvent, message: string) => void) | undefined;

  constructor() {
    this.chatContainer = document.createElement("div");
    this.contactsField = document.createElement("aside");
    this.contactsListContainer = document.createElement("div");
    this.contactsListOnline = document.createElement("ul");
    this.contactsListOffline = document.createElement("ul");
    this.dialogField = document.createElement("article");
    this.dialogFieldHeader = document.createElement("div");
    this.dialogFieldBody = document.createElement("div");
    this.dialogFieldSending = document.createElement("div");
    this.dialogFieldSendingForm = document.createElement("form");
  }

  public create() {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.chatContainer.classList.add("chat");
    this.chatContainer.appendChild(this.createContactsField());
    this.chatContainer.appendChild(this.createDialogField());
  }

  private createContactsField() {
    this.contactsField.classList.add("chat__contacts");
    const input = document.createElement("input");
    input.className = "chat__contacts_search";
    input.placeholder = "Search...";
    input.type = "text";
    if (this.handleInputSearch) {
      input.addEventListener("input", this.handleInputSearch);
    } else {
      console.log('Не определён прослушивтель для события "input"');
    }
    this.contactsField.appendChild(input);
    this.contactsListContainer.className = "chat__contacts_list";
    this.contactsListOnline.className = "chat__contacts_list-online";
    this.contactsListOffline.className = "chat__contacts_list-offline";
    this.contactsListContainer.appendChild(this.contactsListOnline);
    this.contactsListContainer.appendChild(this.contactsListOffline);
    this.contactsField.appendChild(this.contactsListContainer);
    return this.contactsField;
  }

  private createDialogField() {
    this.dialogField.classList.add("chat__dialog");
    this.dialogFieldHeader.className = "chat__dialog_header dialog__header";
    const labelUserName = document.createElement("label");
    labelUserName.className = "dialog__header_username";
    labelUserName.innerText = "userName";
    this.dialogFieldHeader.appendChild(labelUserName);
    const labelUserStatus = document.createElement("label");
    labelUserStatus.className = "dialog__header_status";
    labelUserStatus.innerText = "status";
    this.dialogFieldHeader.appendChild(labelUserStatus);
    this.dialogFieldBody.className = "chat__dialog_body";
    this.dialogFieldSending.className = "chat__dialog_sending sending";
    this.dialogFieldSending.appendChild(this.createFormSending());
    this.dialogField.appendChild(this.dialogFieldHeader);
    this.dialogField.appendChild(this.dialogFieldBody);
    this.dialogField.appendChild(this.dialogFieldSending);
    return this.dialogField;
  }

  private createFormSending() {
    this.dialogFieldSendingForm.className = "sending__form";
    const input = document.createElement("input");
    input.className = "sending__form_input";
    input.type = "text";
    input.placeholder = "Message...";
    const button = document.createElement("button");
    button.className = "sending__form_button";
    button.innerText = "Send";
    button.type = "submit";
    if (this.handleSendMessage !== undefined) {
      this.dialogFieldSendingForm.addEventListener("submit", (event) => {
        this.handleSendMessage!.bind(this, event, input.value)();
        input.value = "";
      });
    } else {
      console.log('Не определён прослушивтель для события "submit"');
    }
    this.dialogFieldSendingForm.appendChild(input);
    this.dialogFieldSendingForm.appendChild(button);
    return this.dialogFieldSendingForm;
  }

  // public showUsersAll(users: UserStatus[]) {
  //   console.log(users);
  // }

  public showUsersOnline(users: UserStatus[]) {
    this.contactsListOnline.innerHTML = "";
    for (let i = 0; i < users.length; i += 1) {
      const userContainer = this.createUserContainer(users[i]);
      this.contactsListOnline.appendChild(userContainer);
    }
  }

  public showUsersOffline(users: UserStatus[]) {
    this.contactsListOffline.innerHTML = "";
    for (let i = 0; i < users.length; i += 1) {
      const userContainer = this.createUserContainer(users[i]);
      this.contactsListOffline.appendChild(userContainer);
    }
  }

  private createUserContainer(user: UserStatus) {
    const li = document.createElement("li");
    li.className = "chat__contacts_item";
    if (this.handleClickUser) {
      li.addEventListener("click", this.handleClickUser);
    } else {
      console.log('Не определён прослушивтель для события "click"');
    }
    const status = document.createElement("div");
    status.className = "chat__contacts_status";
    if (user.isLogined) {
      status.classList.add("chat__contacts_status-online");
    } else {
      status.classList.add("chat__contacts_status-offline");
    }
    const username = document.createElement("label");
    username.className = "chat__contacts_username";
    username.innerText = user.login;
    li.appendChild(status);
    li.appendChild(username);
    return li;
  }

  public filterUsers(text: string) {
    const users = document.querySelectorAll(".chat__contacts_item");
    for (let i = 0; i < users.length; i += 1) {
      if (!users[i].textContent?.toLowerCase().startsWith(text.toLowerCase())) {
        (users[i] as HTMLElement).style.display = "none";
      } else {
        (users[i] as HTMLElement).style.display = "flex";
      }
    }
  }

  public addOnlineUser(user: UserStatus) {
    const arrOfflineUsers = Array.from(this.contactsListOffline.children);
    const userContainer = arrOfflineUsers.find((item) => item.children[1].textContent === user.login);
    if (userContainer) {
      this.contactsListOffline.removeChild(userContainer);
      this.contactsListOnline.appendChild(userContainer);
      userContainer.children[0].classList.add("chat__contacts_status-online");
      userContainer.children[0].classList.remove("chat__contacts_status-offline");
    } else {
      const userContainerNew = this.createUserContainer(user);
      this.contactsListOnline.appendChild(userContainerNew);
    }
  }

  public addOfflineUser(user: UserStatus) {
    const arrOnlineUsers = Array.from(this.contactsListOnline.children);
    const userContainer = arrOnlineUsers.find((item) => item.children[1].textContent === user.login);
    if (userContainer) {
      this.contactsListOnline.removeChild(userContainer);
      this.contactsListOffline.appendChild(userContainer);
      userContainer.children[0].classList.add("chat__contacts_status-offline");
      userContainer.children[0].classList.remove("chat__contacts_status-online");
    }
    console.log(userContainer);
  }

  public openChat(target: HTMLElement) {
    const username = target.children[1].textContent;
    const status = target.children[0].classList.contains("chat__contacts_status-online") ? "online" : "offline";
    const headerUsername = document.querySelector(".dialog__header_username");
    const headerStatus = document.querySelector(".dialog__header_status");
    if (headerUsername && headerStatus) {
      headerUsername.textContent = username;
      headerStatus.textContent = status;
    }
  }

  public addMessage(message: Message) {
    const messageContainer = this.createMessageContainer(message);
    this.dialogFieldBody.appendChild(messageContainer);
    this.dialogFieldBody.scrollTop = this.dialogFieldBody.scrollHeight;
  }

  private createMessageContainer(message: Message) {
    const messageContainer = document.createElement("div");
    messageContainer.className = "message";
    const messageHeader = document.createElement("div");
    messageHeader.className = "message__header";
    const messageText = document.createElement("div");
    messageText.className = "message__text";
    messageText.textContent = message.text;
    const messageFooter = document.createElement("div");
    messageFooter.className = "message__footer";
    const labelUsername = document.createElement("label");
    labelUsername.className = "message__header_username";
    labelUsername.textContent = message.from;
    const labelDate = document.createElement("label");
    labelDate.className = "message__header_date";
    labelDate.textContent = new Date(message.datetime).toLocaleString();
    const labelStatusMsg = document.createElement("label");
    labelStatusMsg.className = "message__footer_status";
    labelStatusMsg.textContent = "статус";
    messageHeader.appendChild(labelUsername);
    messageHeader.appendChild(labelDate);
    labelStatusMsg.className = "message__footer_status";
    messageFooter.appendChild(labelStatusMsg);
    messageContainer.appendChild(messageHeader);
    messageContainer.appendChild(messageText);
    messageContainer.appendChild(messageFooter);
    return messageContainer;
  }
}
