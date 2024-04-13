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

export enum ErrorTypeResponse {
  INCORRECT_PASSWORD = "incorrect password",
  USER_ALREADY_AUTHORIZED = "a user with this login is already authorized",
}

export enum ErrorTypeShow {
  INCORRECT_PASSWORD = "Incorrect password.",
  USER_ALREADY_AUTHORIZED = "A user with this login is already authorized.",
}
