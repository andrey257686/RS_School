import "./chat.scss";
import { UserStatus } from "../../types/types";

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

  private onlineUsersItemArray: HTMLLIElement[] = [];

  private offlineUsersItemArray: HTMLLIElement[] = [];

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
      this.contactsListOnline.appendChild(this.createUserContainer(users[i]));
    }
  }

  public showUsersOffline(users: UserStatus[]) {
    this.contactsListOffline.innerHTML = "";
    for (let i = 0; i < users.length; i += 1) {
      this.contactsListOffline.appendChild(this.createUserContainer(users[i]));
    }
  }

  private createUserContainer(user: UserStatus) {
    const li = document.createElement("li");
    li.className = "chat__contacts_item";
    const status = document.createElement("div");
    status.className = "chat__contacts_status";
    if (user.isLogined) {
      status.classList.add("chat__contacts_status-online");
      this.onlineUsersItemArray.push(li);
    } else {
      status.classList.add("chat__contacts_status-offline");
      this.offlineUsersItemArray.push(li);
    }
    const username = document.createElement("label");
    username.className = "chat__contacts_username";
    username.innerText = user.login;
    li.appendChild(status);
    li.appendChild(username);
    return li;
  }
}
