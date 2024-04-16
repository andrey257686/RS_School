import "./components.scss";

export default class Components {
  public header: HTMLHeadElement;

  private headerDescription: HTMLDivElement;

  public headerUserName: HTMLLabelElement;

  public footer: HTMLElement;

  public handleInfoClick: ((event: MouseEvent) => void) | undefined;

  public handleLogoutClick: ((event: MouseEvent) => void) | undefined;

  constructor() {
    this.header = document.createElement("header");
    this.headerDescription = document.createElement("div");
    this.headerUserName = document.createElement("label");
    this.footer = document.createElement("footer");
    // this.createHeader();
  }

  // private createHeader() {
  //   this.header.classList.add("header");
  //   this.header.innerHTML = `
  //   <a href='/main' class='nav-link'>chat</a>
  //   <a href='/login' class='nav-link'>login</a>
  //   <a href='/about' class='nav-link'>about</a>`;
  // }

  public create() {
    this.createHeader();
    this.createFooter();
  }

  private createHeader() {
    this.header.classList.add("header");
    this.header.appendChild(this.createHeaderDescription());
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "header__buttons";
    const buttonInfo = document.createElement("button");
    buttonInfo.className = "header__info header__button";
    buttonInfo.innerText = "Info";
    if (this.handleInfoClick) {
      buttonInfo.addEventListener("click", this.handleInfoClick);
    } else {
      console.log('Не определён прослушивтель для события "click"');
    }
    const buttonLogout = document.createElement("button");
    buttonLogout.className = "header__logout header__button";
    buttonLogout.innerText = "Logout";
    if (this.handleLogoutClick) {
      buttonLogout.addEventListener("click", this.handleLogoutClick);
    } else {
      console.log('Не определён прослушивтель для события "click"');
    }
    buttonContainer.appendChild(buttonInfo);
    buttonContainer.appendChild(buttonLogout);
    this.header.appendChild(buttonContainer);
  }

  private createHeaderDescription() {
    this.headerDescription.className = "header__description";
    this.headerUserName.className = "header__description_username";
    this.headerUserName.innerText = "userName";
    const labelAppName = document.createElement("label");
    labelAppName.className = "header__description_appname";
    labelAppName.innerText = "Fun chat";
    this.headerDescription.appendChild(this.headerUserName);
    this.headerDescription.appendChild(labelAppName);
    return this.headerDescription;
  }

  private createFooter() {
    this.footer.className = "footer";
    this.footer.appendChild(this.createSchoolContainer());
    this.footer.appendChild(this.createInfoContainer());
    const label = document.createElement("label");
    label.className = "footer__year";
    label.innerText = "2024";
    this.footer.appendChild(label);
  }

  private createSchoolContainer() {
    const schoolContainer = document.createElement("div");
    schoolContainer.className = "footer__school";
    const schoolLabel = document.createElement("label");
    schoolLabel.className = "footer__school_label";
    schoolLabel.innerText = "RS School";
    const schoolLogoContainer = document.createElement("div");
    schoolLogoContainer.className = "footer__school_logo";
    schoolLogoContainer.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="40px" height="40px" viewBox="0 0 56.000000 56.000000"
    preserveAspectRatio="xMidYMid meet">
   <g transform="translate(0.000000,56.000000) scale(0.100000,-0.100000)"
   fill="#000000" stroke="none">
   <path d="M186 544 c-70 -22 -149 -103 -170 -174 -34 -113 -11 -206 68 -286
   114 -113 278 -113 392 0 113 114 113 278 0 392 -80 79 -178 102 -290 68z m75
   -184 c23 -13 26 -62 4 -80 -13 -11 -14 -15 -2 -29 8 -9 20 -26 26 -38 11 -21
   10 -23 -19 -23 -25 0 -33 6 -47 35 -22 46 -43 46 -43 0 0 -31 -3 -35 -25 -35
   -25 0 -25 1 -25 90 l0 90 56 0 c30 0 64 -5 75 -10z m178 -3 c36 -18 38 -37 4
   -37 -16 0 -34 5 -40 11 -13 13 -47 4 -39 -10 3 -5 21 -12 39 -15 104 -19 99
   -101 -7 -113 -39 -5 -48 -2 -73 23 l-28 29 28 3 c15 2 34 -4 43 -13 19 -19 49
   -16 49 5 0 8 -19 21 -44 30 -24 8 -48 22 -54 31 -30 48 58 89 122 56z"/>
   <path d="M187 333 c-16 -15 -6 -33 18 -33 28 0 34 24 9 34 -19 7 -19 7 -27 -1z"/>
   </g>
   </svg>`;
    schoolContainer.appendChild(schoolLogoContainer);
    schoolContainer.appendChild(schoolLabel);
    return schoolContainer;
  }

  private createInfoContainer() {
    const infoContainer = document.createElement("div");
    infoContainer.className = "footer__info";
    const infoLabel = document.createElement("label");
    infoLabel.className = "footer__info_label";
    infoLabel.innerText = "andrey257686";
    const infoLogoContainer = document.createElement("div");
    infoLogoContainer.className = "footer__info_logo";
    infoLogoContainer.innerHTML = `<a href="https://github.com/andrey257686">
    <svg viewbox="0 0 100 100" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg> 
    </a>`;
    infoContainer.appendChild(infoLogoContainer);
    infoContainer.appendChild(infoLabel);
    return infoContainer;
  }

  public showUserName(username: string) {
    this.headerUserName.innerText = `${username}`;
  }
}
