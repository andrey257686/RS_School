import { validateErrorsName, validateErrorsPassword } from "../service/login.service";
import ApiService from "../service/api.service";
import { ResponseUserLogin, ResponseError } from "../types/types";

export default class AppModel {
  private nameErrors: string[] = [];

  private passwordErrors: string[] = [];

  private userName: string;

  private userPassword: string;

  public apiService: ApiService;

  constructor() {
    this.userName = "";
    this.userPassword = "";
    this.apiService = new ApiService();
  }

  public onOpenSocket() {
    const userCredentials = sessionStorage.getItem("userCredentials");
    if (userCredentials) {
      const { name, password } = JSON.parse(userCredentials);
      this.userName = name;
      this.userPassword = password;
      this.apiService.userLogin(this.userName, this.userPassword);
    }
  }

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

  public isValidFields(fn: (errors: string[], field: string) => void): boolean {
    const name: HTMLInputElement | null = document.querySelector(".fieldset__input_name");
    const password: HTMLInputElement | null = document.querySelector(".fieldset__input_password");
    if (!name || !password) {
      console.log("Нет имени или пароля");
      return false;
    }
    this.validateName(name.value, fn);
    this.validatePassword(password.value, fn);
    if (this.nameErrors.length === 0 && this.passwordErrors.length === 0) {
      this.userName = name.value;
      this.userPassword = password.value;
      return true;
    }
    return false;
  }

  public requestLoginUser() {
    this.apiService.userLogin(this.userName, this.userPassword);
  }

  public responseLogin(data: ResponseUserLogin) {
    if (data.payload.user.isLogined === true) {
      sessionStorage.setItem("userCredentials", JSON.stringify({ name: this.userName, password: this.userPassword }));
    }
  }

  public responseError(data: ResponseError) {
    console.log(data.payload.error);
  }
}
