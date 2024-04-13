export default class ApiService {
  public socket: WebSocket;

  constructor() {
    this.socket = new WebSocket("ws://localhost:4000");
  }

  public userLogin(login: string, password: string) {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "USER_LOGIN",
        payload: {
          user: {
            login,
            password,
          },
        },
      }),
    );
  }
}
