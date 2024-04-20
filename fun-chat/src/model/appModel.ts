import { validateErrorsName, validateErrorsPassword } from "../service/login.service";
import ApiService from "../service/api.service";
import {
  UserStatus,
  ResponseUserLogin,
  ResponseUserLogout,
  ResponseActiveUsers,
  ResponseInactiveUsers,
  ResponseExternalLogin,
  ResponseExternalLogout,
  ResponseSendMessage,
  Message,
  ResponseError,
  ErrorTypeResponse,
  ErrorTypeShow,
  ResponseMessageFromUser,
  ResponseDeliverMessages,
  ResponseReadMessages,
  ResponseDeleteMessage,
} from "../types/types";

export default class AppModel {
  private nameErrors: string[] = [];

  private passwordErrors: string[] = [];

  private userName: string;

  private userPassword: string;

  public isLogined: boolean;

  public userOnline: UserStatus[] = [];

  public userOffline: UserStatus[] = [];

  public apiService: ApiService;

  public currentRecipient: string = "";

  private usersWithUnreadMessages: { username: string; unreadMessages: Set<string> }[] = [];

  private usersWithUndeliveredMessages: { username: string; undeliveredMessages: Set<string> }[] = [];

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
      this.getUserAll();
      changePage(`/main`);
    }
  }

  public requestLogoutUser() {
    this.apiService.userLogout(this.userName, this.userPassword);
  }

  public responseLogout(data: ResponseUserLogout, _changePage: (page: string) => void) {
    this.userName = "";
    this.userPassword = "";
    this.isLogined = false;
    sessionStorage.setItem(
      "userCredentials",
      JSON.stringify({ name: this.userName, password: this.userPassword, isLogined: data.payload.user.isLogined }),
    );
    _changePage(`/login`);
  }

  // public responseActiveInactiveUsers(
  //   data: ResponseActiveUsers | ResponseInactiveUsers,
  //   _showUsersAll: (users: UserStatus[]) => void,
  // ) {
  //   this.userAll = [...this.userAll, ...data.payload.users];
  //   _showUsersAll(this.userAll);
  //   console.log(this.userAll);
  // }

  public responseActiveUsers(data: ResponseActiveUsers, _showUsersOnline: (users: UserStatus[]) => void) {
    this.userOnline = [...data.payload.users];
    for (let i = 0; i < this.userOnline.length; i += 1) {
      if (this.userOnline[i].login === this.userName) {
        this.userOnline.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < this.userOnline.length; i += 1) {
      this.requestFetchMessages(this.userOnline[i].login);
    }
    _showUsersOnline(this.userOnline);
    this.apiService.getInactiveUsers();
  }

  public responseInactiveUsers(data: ResponseInactiveUsers, _showUsersOffline: (users: UserStatus[]) => void) {
    // this.userAll = [...this.userAll, ...data.payload.users];
    this.userOffline = [...data.payload.users];
    for (let i = 0; i < this.userOffline.length; i += 1) {
      this.requestFetchMessages(this.userOffline[i].login);
    }
    _showUsersOffline(this.userOffline);
  }

  public responseError(data: ResponseError, fn: (message: string) => void) {
    console.log(data.payload.error);
    if (data.payload.error === ErrorTypeResponse.INCORRECT_PASSWORD) {
      fn(ErrorTypeShow.INCORRECT_PASSWORD);
    }
    if (data.payload.error === ErrorTypeResponse.USER_ALREADY_AUTHORIZED) {
      fn(ErrorTypeShow.USER_ALREADY_AUTHORIZED);
    } else {
      fn(data.payload.error);
    }
  }

  public responseExternalLogin(data: ResponseExternalLogin, _addOnlineUser: (user: UserStatus) => void) {
    this.userOnline.push(data.payload.user);
    this.userOffline = this.userOffline.filter((user) => user.login !== data.payload.user.login);
    _addOnlineUser(data.payload.user);
  }

  public responseExternalLogout(data: ResponseExternalLogout, _addOfflineUser: (user: UserStatus) => void) {
    this.userOffline.push(data.payload.user);
    this.userOnline = this.userOnline.filter((user) => user.login !== data.payload.user.login);
    _addOfflineUser(data.payload.user);
  }

  public getUserAll() {
    this.apiService.getActiveUsers();
  }

  public setRecipient(username: string) {
    this.currentRecipient = username;
  }

  public requestSendMessage(message: string) {
    this.apiService.sendMessage(this.currentRecipient, message);
  }

  public responseSendMessage(
    data: ResponseSendMessage,
    _addMessage: (message: Message, isFromMe: boolean) => void,
    _showUnreadMessagesCount: (username: string, count: number) => void,
  ) {
    if (data.payload.message.to === this.userName) {
      if (data.payload.message.from === this.currentRecipient) {
        _addMessage(data.payload.message, false);
      }
      let userWithUnreadMessages = this.usersWithUnreadMessages.find(
        (user) => user.username === data.payload.message.from,
      );
      if (userWithUnreadMessages) {
        userWithUnreadMessages.unreadMessages.add(data.payload.message.id);
      } else {
        userWithUnreadMessages = {
          username: data.payload.message.from,
          unreadMessages: new Set(),
        };
        userWithUnreadMessages.unreadMessages.add(data.payload.message.id);
        this.usersWithUnreadMessages.push(userWithUnreadMessages);
      }
      _showUnreadMessagesCount(userWithUnreadMessages.username, userWithUnreadMessages.unreadMessages.size);
    }
    if (data.payload.message.from === this.userName) {
      if (!data.payload.message.status.isDelivered) {
        let userWithUndeliveredMessages = this.usersWithUndeliveredMessages.find(
          (user) => user.username === data.payload.message.to,
        );
        if (userWithUndeliveredMessages) {
          userWithUndeliveredMessages.undeliveredMessages.add(data.payload.message.id);
        } else {
          userWithUndeliveredMessages = {
            username: data.payload.message.to,
            undeliveredMessages: new Set(),
          };
          userWithUndeliveredMessages.undeliveredMessages.add(data.payload.message.id);
          this.usersWithUndeliveredMessages.push(userWithUndeliveredMessages);
        }
      }
      _addMessage(data.payload.message, true);
    }
  }

  public requestFetchMessages(username: string) {
    this.apiService.fetchMessages(username);
  }

  public responseFetchMessages(
    data: ResponseMessageFromUser,
    _addMessage: (message: Message, isFromMe: boolean) => void,
    _showUnreadMessagesCount: (username: string, count: number) => void,
  ) {
    for (let i = 0; i < data.payload.messages.length; i += 1) {
      if (data.payload.messages[i].to === this.userName) {
        _addMessage(data.payload.messages[i], false);
        if (data.payload.messages[i].status.isReaded === false) {
          let userWithUnreadMessages = this.usersWithUnreadMessages.find(
            (user) => user.username === data.payload.messages[i].from,
          );
          if (userWithUnreadMessages) {
            userWithUnreadMessages.unreadMessages.add(data.payload.messages[i].id);
          } else {
            userWithUnreadMessages = {
              username: data.payload.messages[i].from,
              unreadMessages: new Set(),
            };
            userWithUnreadMessages.unreadMessages.add(data.payload.messages[i].id);
            this.usersWithUnreadMessages.push(userWithUnreadMessages);
          }
          // последнее собщение для данного юзера
          // if (i === data.payload.messages.length - 1) {
          _showUnreadMessagesCount(userWithUnreadMessages.username, userWithUnreadMessages.unreadMessages.size);
          // }
        }
      }
      if (data.payload.messages[i].from === this.userName) {
        _addMessage(data.payload.messages[i], true);
      }
    }
  }

  public responseDeliverMessage(
    data: ResponseDeliverMessages,
    _setMessageStatus: (messageId: string, status: string) => void,
  ) {
    _setMessageStatus(data.payload.message.id, "isDelivered");
  }

  public requestReadMessage() {
    const userWithUnreadMessages = this.usersWithUnreadMessages.find((user) => user.username === this.currentRecipient);
    if (userWithUnreadMessages) {
      while (userWithUnreadMessages.unreadMessages.size > 0) {
        this.apiService.statusReadMessage(userWithUnreadMessages.unreadMessages.values().next().value);
        userWithUnreadMessages.unreadMessages.delete(userWithUnreadMessages.unreadMessages.values().next().value);
      }
    }
  }

  public responseReadMessage(
    data: ResponseReadMessages,
    _setMessageStatus: (messageId: string, status: string) => void,
    _showUnreadMessagesCount: (username: string, count: number) => void,
  ) {
    _setMessageStatus(data.payload.message.id, "isReaded");
    _showUnreadMessagesCount(this.currentRecipient, 0);
    // console.log(data);
  }

  public requestDeleteMessage(messageId: string) {
    this.apiService.deleteMessage(messageId);
  }

  public responseDeleteMessage(
    data: ResponseDeleteMessage,
    _removeMessage: (messageId: string) => void,
    _showUnreadMessagesCount: (username: string, count: number) => void,
  ) {
    console.log(data);
    console.log(this.usersWithUnreadMessages);
    for (let i = 0; i < this.usersWithUnreadMessages.length; i += 1) {
      const arrUnreadMessages = Array.from(this.usersWithUnreadMessages[i].unreadMessages);
      for (let j = 0; j < arrUnreadMessages.length; j += 1) {
        if (arrUnreadMessages[j] === data.payload.message.id) {
          this.usersWithUnreadMessages[i].unreadMessages.delete(arrUnreadMessages[j]);
          _showUnreadMessagesCount(
            this.usersWithUnreadMessages[i].username,
            this.usersWithUnreadMessages[i].unreadMessages.size,
          );
          break;
        }
      }
    }
    _removeMessage(data.payload.message.id);
  }
}
