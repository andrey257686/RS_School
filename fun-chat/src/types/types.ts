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
