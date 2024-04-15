import "./chat.scss";

export default class ChatView {
  public chatContainer: HTMLDivElement;

  private contactsField: HTMLElement;

  private contactsList: HTMLUListElement;

  private dialogField: HTMLElement;

  private dialogFieldHeader: HTMLDivElement;

  private dialogFieldBody: HTMLDivElement;

  private dialogFieldSending: HTMLDivElement;

  private dialogFieldSendingForm: HTMLFormElement;

  constructor() {
    this.chatContainer = document.createElement("div");
    this.contactsField = document.createElement("aside");
    this.contactsList = document.createElement("ul");
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
    this.contactsList.className = "chat__contacts_list";
    this.contactsField.appendChild(this.contactsList);
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
}
