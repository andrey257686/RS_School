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

  public route(href: string) {
    window.history.pushState({}, "", href);
    return this.handleLocation();
  }
}

export default Router;
