export interface ResponseError {
  id: string;
  type: "ERROR";
  payload: {
    error: string;
  };
}

export interface ResponseUserLogin {
  id: string;
  type: "USER_LOGIN";
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
}

export interface ResponseUserLogout {
  id: string;
  type: "USER_LOGOUT";
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
}

export interface UserStatus {
  login: string;
  isLogined: boolean;
}

export interface ResponseActiveUsers {
  id: string;
  type: "USER_ACTIVE";
  payload: {
    users: UserStatus[];
  };
}

export interface ResponseInactiveUsers {
  id: string;
  type: "USER_INACTIVE";
  payload: {
    users: UserStatus[];
  };
}

export enum ErrorTypeResponse {
  INCORRECT_PASSWORD = "incorrect password",
  USER_ALREADY_AUTHORIZED = "a user with this login is already authorized",
}

export enum ErrorTypeShow {
  INCORRECT_PASSWORD = "Incorrect password.",
  USER_ALREADY_AUTHORIZED = "A user with this login is already authorized.",
}
