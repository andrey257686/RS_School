import { validateErrorsName, validateErrorsPassword } from "../service/login.service";
import ApiService from "../service/api.service";
import { ResponseUserLogin, ResponseError, ErrorTypeResponse, ErrorTypeShow } from "../types/types";

export default class AppModel {
  private nameErrors: string[] = [];

  private passwordErrors: string[] = [];

  private userName: string;

  private userPassword: string;

  public isLogined: boolean;

  public apiService: ApiService;

  constructor() {
    this.userName = "";
    this.userPassword = "";
    this.isLogined = false;
    this.apiService = new ApiService();
  }

  // public onOpenSocket(fn: (page: string) => void) {
  //   const userCredentials = sessionStorage.getItem("userCredentials");
  //   if (userCredentials) {
  //     const { name, password } = JSON.parse(userCredentials);
  //     this.userName = name;
  //     this.userPassword = password;
  //     this.apiService.userLogin(this.userName, this.userPassword);
  //   } else {
  //     fn("/login");
  //   }
  // }

  public isUserLogined(): boolean {
    const userCredentials = sessionStorage.getItem("userCredentials");
    if (userCredentials) {
      const { name, password, isLogined } = JSON.parse(userCredentials);
      this.isLogined = isLogined;
      if (this.isLogined) {
        this.userName = name;
        this.userPassword = password;
      }
    }
    return this.isLogined;
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

  public responseLogin(
    data: ResponseUserLogin,
    changePage: (page: string) => void,
    showUserName: (name: string) => void,
  ) {
    if (data.payload.user.isLogined === true) {
      console.log("Пользователь авторизован");
      this.isLogined = true;
      sessionStorage.setItem(
        "userCredentials",
        JSON.stringify({ name: this.userName, password: this.userPassword, isLogined: true }),
      );
      showUserName(this.userName);
      changePage(`/main`);
    }
  }

  public requestLogoutUser() {
    this.apiService.userLogout(this.userName, this.userPassword);
  }

  public responseLogout(data: ResponseUserLogin, changePage: (page: string) => void) {
    this.userName = "";
    this.userPassword = "";
    this.isLogined = false;
    sessionStorage.setItem(
      "userCredentials",
      JSON.stringify({ name: this.userName, password: this.userPassword, isLogined: data.payload.user.isLogined }),
    );
    changePage(`/login`);
  }

  public responseError(data: ResponseError, fn: (message: string) => void) {
    console.log(data.payload.error);
    if (data.payload.error === ErrorTypeResponse.INCORRECT_PASSWORD) {
      fn(ErrorTypeShow.INCORRECT_PASSWORD);
    }
    if (data.payload.error === ErrorTypeResponse.USER_ALREADY_AUTHORIZED) {
      fn(ErrorTypeShow.USER_ALREADY_AUTHORIZED);
    }
  }
}
