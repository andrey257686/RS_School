export default class Components {
  public header: HTMLHeadElement;

  constructor() {
    this.header = document.createElement("header");
    this.createHeader();
  }

  private createHeader() {
    this.header.classList.add("header");
    this.header.innerHTML = `
    <a href='/' class='nav-link'>chat</a>
    <a href='/login' class='nav-link'>login</a>
    <a href='/about' class='nav-link'>about</a>`;
  }
}
