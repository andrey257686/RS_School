import "./login.scss";

export default class LoginView {
  public loginContainer: HTMLDivElement;

  private loginForm: HTMLFormElement;

  private fieldSet: HTMLFieldSetElement;

  public handleLoginButtonClick: ((event: MouseEvent) => void) | undefined;

  public handleInputName: ((event: Event) => void) | undefined;

  public handleInputPassword: ((event: Event) => void) | undefined;

  public handleSubmitForm: ((event: Event) => void) | undefined;

  public handleInfoClick: ((event: MouseEvent) => void) | undefined;

  constructor() {
    this.loginContainer = document.createElement("div");
    this.loginForm = document.createElement("form");
    this.fieldSet = document.createElement("fieldset");
  }

  public create() {
    this.createLoginContainer();
  }

  private createLoginContainer() {
    this.loginContainer.classList.add("login");
    this.loginContainer.appendChild(this.createForm());
  }

  private createForm() {
    this.loginForm.className = "login__form";
    if (this.handleSubmitForm) {
      this.loginForm.addEventListener("submit", this.handleSubmitForm);
    } else {
      console.log('Не определён прослушивтель для события "submit"');
    }
    this.loginForm.appendChild(this.createFieldset());
    for (let i = 0; i < 2; i += 1) {
      const button = document.createElement("button");
      button.className = "login__form_button";
      if (i === 0) {
        button.innerText = "Login";
        button.setAttribute("type", "submit");
        button.classList.add("form__button_login");
        if (this.handleLoginButtonClick) {
          button.addEventListener("click", this.handleLoginButtonClick);
        } else {
          console.log('Не определён прослушивтель  для кнопки "Login"');
        }
      } else {
        button.innerText = "Info";
        if (this.handleInfoClick) {
          button.addEventListener("click", this.handleInfoClick);
        } else {
          console.log('Не определён прослушивтель для события "click"');
        }
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
      input.required = true;
      input.className = "fieldset__input";
      const containerError = document.createElement("div");
      containerError.className = "fieldset__errors";
      if (i === 0) {
        input.type = "text";
        input.classList.add("fieldset__input_name");
        input.setAttribute("id", "name");
        if (this.handleInputName) {
          input.addEventListener("input", this.handleInputName);
        } else {
          console.log('Не определён прослушивтель  для input "Name"');
        }
        inputContainer.append(input);
        containerError.classList.add("fieldset__errors_name");
        inputContainer.append(containerError);
      } else if (i === 1) {
        input.type = "password";
        input.classList.add("fieldset__input_password");
        input.setAttribute("id", "password");
        if (this.handleInputPassword) {
          input.addEventListener("input", this.handleInputPassword);
        } else {
          console.log('Не определён прослушивтель  для input "Password"');
        }
        inputContainer.append(input);
        containerError.classList.add("fieldset__errors_password");
        inputContainer.append(containerError);
      }
      this.fieldSet.appendChild(inputContainer);
    }
    return this.fieldSet;
  }

  public showErrorValidation(errors: string[], field: string) {
    let errorContainer: HTMLDivElement | null = null;
    if (field === "name") {
      errorContainer = document.querySelector(".fieldset__errors_name");
    } else if (field === "password") {
      errorContainer = document.querySelector(".fieldset__errors_password");
    }
    if (errorContainer) {
      errorContainer.innerText = "";
      errors.forEach((error) => {
        const errorElement = document.createElement("p");
        errorElement.className = "fieldset__error";
        errorElement.innerText = error;
        errorContainer.append(errorElement);
      });
    }
  }
}
