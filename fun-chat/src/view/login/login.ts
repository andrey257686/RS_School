import "./login.scss";

export default class LoginView {
  public loginContainer: HTMLDivElement;

  private loginForm: HTMLFormElement;

  private fieldSet: HTMLFieldSetElement;

  constructor() {
    this.loginContainer = document.createElement("div");
    this.loginForm = document.createElement("form");
    this.fieldSet = document.createElement("fieldset");

    this.createLoginContainer();
  }

  private createLoginContainer() {
    this.loginContainer.classList.add("login");
    this.loginContainer.appendChild(this.createForm());
  }

  private createForm() {
    this.loginForm.className = "login__form";
    this.loginForm.appendChild(this.createFieldset());
    for (let i = 0; i < 2; i += 1) {
      const button = document.createElement("button");
      button.className = "login__form_button";
      if (i === 0) {
        button.innerText = "Login";
        button.classList.add("form__button_login");
      } else {
        button.innerText = "Info";
        button.classList.add("form__button_info");
      }
      this.loginForm.appendChild(button);
    }
    return this.loginForm;
  }

  private createFieldset() {
    this.fieldSet.className = "login__fieldset fieldset";
    const legend = document.createElement("legend");
    legend.className = "fieldset__legend";
    legend.innerText = "Login";
    this.fieldSet.appendChild(legend);
    for (let i = 0; i < 2; i += 1) {
      const inputContainer = document.createElement("div");
      const label = document.createElement("label");
      label.className = "fieldset__label";
      if (i === 0) {
        label.innerText = "Name";
        label.classList.add("fieldset__label_name");
        label.setAttribute("for", "name");
        inputContainer.className = "fieldset__container fieldset__container_name";
        inputContainer.append(label);
      } else if (i === 1) {
        label.innerText = "Password";
        label.classList.add("fieldset__label_password");
        label.setAttribute("for", "password");
        inputContainer.className = "fieldset__container fieldset__container_password";
        inputContainer.append(label);
      }
      const input = document.createElement("input");
      input.className = "fieldset__input";
      if (i === 0) {
        input.type = "text";
        input.classList.add("fieldset__input_name");
        input.setAttribute("id", "name");
        inputContainer.append(input);
      } else if (i === 1) {
        input.type = "password";
        input.classList.add("fieldset__input_password");
        input.setAttribute("id", "password");
        inputContainer.append(input);
      }
      this.fieldSet.appendChild(inputContainer);
    }
    return this.fieldSet;
  }
}
