export default class LoginView {
  public loginForm: HTMLDivElement;

  constructor() {
    this.loginForm = document.createElement("div");

    this.createLoginForm();
  }

  public createLoginForm() {
    this.loginForm.classList.add("login-form");
    this.loginForm.innerHTML = "login form";
  }
}
