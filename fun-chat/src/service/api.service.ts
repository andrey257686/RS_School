export default class ApiService {
  public socket: WebSocket;

  constructor() {
    this.socket = new WebSocket("ws://localhost:4000");
    // this.connect();
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

  public userLogout(login: string, password: string) {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "USER_LOGOUT",
        payload: {
          user: {
            login,
            password,
          },
        },
      }),
    );
  }

  public getActiveUsers() {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "USER_ACTIVE",
        payload: null,
      }),
    );
  }

  public getInactiveUsers() {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "USER_INACTIVE",
        payload: null,
      }),
    );
  }

  public sendMessage(user: string, text: string) {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "MSG_SEND",
        payload: {
          message: {
            to: user,
            text,
          },
        },
      }),
    );
  }

  public fetchMessages(user: string) {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "MSG_FROM_USER",
        payload: {
          user: {
            login: user,
          },
        },
      }),
    );
  }

  public statusReadMessage(id: string) {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "MSG_READ",
        payload: {
          message: {
            id,
          },
        },
      }),
    );
  }

  public deleteMessage(id: string) {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "MSG_DELETE",
        payload: {
          message: {
            id,
          },
        },
      }),
    );
  }

  public editMessage(id: string, text: string) {
    this.socket.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type: "MSG_EDIT",
        payload: {
          message: {
            id,
            text,
          },
        },
      }),
    );
  }

  public connect() {
    this.socket = new WebSocket("ws://localhost:4000");
  }
}
