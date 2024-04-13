import { validateErrorsName, validateErrorsPassword } from "../service/login.service";

export default class AppModel {
  private nameErrors: string[] = [];

  private passwordErrors: string[] = [];

  public validateName(name: string, fn: (errors: string[], field: string) => void): string[] {
    this.nameErrors = validateErrorsName(name);
    fn(this.nameErrors, "name");
    return this.nameErrors;
  }

  public validatePassword(password: string, fn: (errors: string[], field: string) => void): string[] {
    this.passwordErrors = validateErrorsPassword(password);
    fn(this.passwordErrors, "password");
    return this.passwordErrors;
  }

  public validateFields(fn: (errors: string[], field: string) => void) {
    const name: HTMLInputElement | null = document.querySelector(".fieldset__input_name");
    const password: HTMLInputElement | null = document.querySelector(".fieldset__input_password");
    if (!name || !password) {
      console.log("Нет имени или пароля");
    } else {
      this.validateName(name.value, fn);
      this.validatePassword(password.value, fn);
    }
    if (this.nameErrors.length === 0 && this.passwordErrors.length === 0) {
      console.log(true); // можно логиниться
    } else {
      console.log(false); // нельзя логиниться
    }
  }
}
