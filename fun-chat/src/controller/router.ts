class Router {
  routes: Record<string, string> = {
    "/": "chat",
    "/login": "login",
    "/about": "about",
  };

  public handleLocation() {
    const path = window.location.pathname;
    const page = this.routes[path];
    return page;
  }

  public route(event: Event) {
    window.history.pushState({}, "", (event.target as HTMLAnchorElement).href);
    return this.handleLocation();
  }
}

export default Router;
