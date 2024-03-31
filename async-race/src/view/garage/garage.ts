import { ModelInitGarage, Car } from "../../types/types";
import garageListeners from "./garageListeners";
import "./garage.scss";

export default class GarageView {
  public garagePage: HTMLDivElement;

  public garageMenu: HTMLDivElement;

  public garageRaceControls: HTMLDivElement;

  public garageName: HTMLSpanElement;

  public garageContainer: HTMLDivElement;

  public garagePagination: HTMLDivElement;

  public countCars: number = 0;

  constructor() {
    this.garagePage = document.createElement("div");
    this.garageMenu = document.createElement("div");
    this.garageRaceControls = document.createElement("div");
    this.garageName = document.createElement("span");
    this.garageContainer = document.createElement("div");
    this.garagePagination = document.createElement("div");

    this.createGaragePage();
  }

  public createGaragePage() {
    this.garagePage.classList.add("garage");
    this.garagePage.append(this.renderMenu());
    this.garagePage.append(this.renderRaceControls());
    this.garagePage.append(this.renderName());
    this.garagePage.append(this.renderTracksContainer());
    this.garagePage.append(this.renderPagination());
  }

  public renderMenu() {
    this.garageMenu.classList.add("garage__menu");
    for (let i = 0; i < 2; i += 1) {
      const element: HTMLDivElement = document.createElement("div");
      if (i === 0) {
        element.classList.add("options");
        element.classList.add("garage__menu_create");
        const inputName: HTMLInputElement = document.createElement("input");
        inputName.classList.add("garage__menu_input");
        inputName.classList.add("options__create_name");
        inputName.type = "text";
        inputName.id = "create-name";
        const inputColor: HTMLInputElement = document.createElement("input");
        inputColor.classList.add("garage__menu_input");
        inputColor.classList.add("options__create_color");
        inputColor.type = "color";
        inputColor.id = "create-color";
        const button: HTMLButtonElement = document.createElement("button");
        button.classList.add("garage__menu_button");
        button.classList.add("options__create_button");
        button.textContent = "Create";
        if (garageListeners.handleCreateClick !== undefined) {
          button.addEventListener("click", garageListeners.handleCreateClick);
        }
        element.append(inputName, inputColor, button);
      } else {
        element.classList.add("options");
        element.classList.add("garage__menu_update");
        const inputName: HTMLInputElement = document.createElement("input");
        inputName.classList.add("garage__menu_input");
        inputName.classList.add("options__update_name");
        inputName.type = "text";
        inputName.id = "update-name";
        const inputColor: HTMLInputElement = document.createElement("input");
        inputColor.classList.add("garage__menu_input");
        inputColor.classList.add("options__update_color");
        inputColor.type = "color";
        inputColor.id = "update-color";
        const button: HTMLButtonElement = document.createElement("button");
        button.classList.add("garage__menu_button");
        button.classList.add("options__update_button");
        button.textContent = "Update";
        if (garageListeners.handleUpdateClick !== undefined) {
          button.addEventListener("click", garageListeners.handleUpdateClick);
        }
        element.append(inputName, inputColor, button);
      }
      this.garageMenu.appendChild(element);
    }
    return this.garageMenu;
  }

  public renderRaceControls() {
    this.garageRaceControls.classList.add("garage__controls");
    for (let i = 0; i < 3; i += 1) {
      const button: HTMLButtonElement = document.createElement("button");
      button.classList.add("garage__menu_button");
      if (i === 0) {
        button.classList.add("garage__controls_race");
        button.textContent = "Race";
        if (garageListeners.handleRaceClick !== undefined) {
          button.addEventListener("click", garageListeners.handleRaceClick);
        }
      } else if (i === 1) {
        button.classList.add("garage__controls_reset");
        button.textContent = "Reset";
        if (garageListeners.handleResetClick !== undefined) {
          button.addEventListener("click", garageListeners.handleResetClick);
        }
      } else if (i === 2) {
        button.classList.add("garage__controls_generate");
        button.textContent = "Generate cars";
        if (garageListeners.handleGenerateClick !== undefined) {
          button.addEventListener("click", garageListeners.handleGenerateClick!);
        }
      }
      this.garageRaceControls.appendChild(button);
    }
    return this.garageRaceControls;
  }

  public renderName() {
    this.garageName.classList.add("garage__name");
    return this.garageName;
  }

  public renderTracksContainer() {
    this.garageContainer.classList.add("garage__container");
    return this.garageContainer;
  }

  public renderPagination() {
    this.garagePagination.classList.add("garage__pagination");
    const buttonPrev: HTMLButtonElement = document.createElement("button");
    buttonPrev.classList.add("garage__pagination_prev");
    buttonPrev.classList.add("garage__pagination_button");
    if (garageListeners.handlePrevPageClick !== undefined) {
      buttonPrev.addEventListener("click", garageListeners.handlePrevPageClick);
    }
    buttonPrev.textContent = "PREV";
    const currentPage: HTMLSpanElement = document.createElement("span");
    currentPage.classList.add("garage__pagination_curPage");
    const buttonNext: HTMLButtonElement = document.createElement("button");
    buttonNext.classList.add("garage__pagination_next");
    buttonNext.classList.add("garage__pagination_button");
    if (garageListeners.handleNextPageClick !== undefined) {
      buttonNext.addEventListener("click", garageListeners.handleNextPageClick);
    }
    buttonNext.textContent = "NEXT";
    this.garagePagination.append(buttonPrev, currentPage, buttonNext);
    return this.garagePagination;
  }

  public updateGaragePage(data: ModelInitGarage, page: number) {
    this.updateGarageName(data);
    this.updateGarageContainer(data);
    this.updatePagination(page);
  }

  public updateGarageContainer(data: ModelInitGarage) {
    this.garageContainer.innerHTML = "";
    const { cars } = data;
    cars.forEach((car) => {
      const element: HTMLDivElement = document.createElement("div");
      element.classList.add(`track`);
      element.id = String(car.id);
      element.prepend(this.renderControl(car.name));
      element.append(this.renderTrackRoad(car.color));
      this.garageContainer.appendChild(element);
    });
  }

  public updateGarageName(data: ModelInitGarage) {
    const { count } = data;
    const element: HTMLSpanElement | null = document.querySelector(".garage__name");
    if (element !== null) {
      element.textContent = `Garage (${count})`;
    }
  }

  public updatePagination(page: number) {
    const element: HTMLSpanElement | null = document.querySelector(".garage__pagination_curPage");
    if (element !== null) {
      element.textContent = `${page}`;
    }
  }

  public renderControl(name: string) {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("track__controls");
    element.append(this.renderCarButtons());
    element.append(this.renderEngineButtons());
    const elementName: HTMLSpanElement = document.createElement("span");
    elementName.classList.add("track__controls_name");
    elementName.textContent = name;
    element.append(elementName);
    return element;
  }

  public renderCarButtons() {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("track__controls_car");
    for (let i = 0; i < 2; i += 1) {
      const button: HTMLButtonElement = document.createElement("button");
      button.classList.add("track__button");
      if (i === 0) {
        button.textContent = "Select";
        button.classList.add("track__button_select");
        if (garageListeners.handleSelectClick !== undefined) {
          button.addEventListener("click", garageListeners.handleSelectClick);
        }
      } else {
        button.textContent = "Remove";
        button.classList.add("track__button_remove");
        if (garageListeners.handleRemoveClick !== undefined) {
          button.addEventListener("click", garageListeners.handleRemoveClick);
        }
      }
      element.appendChild(button);
    }
    return element;
  }

  public renderEngineButtons() {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("track__controls_engine");
    for (let i = 0; i < 2; i += 1) {
      const button: HTMLButtonElement = document.createElement("button");
      button.classList.add("track__button");
      if (i === 0) {
        button.textContent = "Start";
        button.classList.add("track__button_start");
        if (garageListeners.handleStartClick !== undefined) {
          button.addEventListener("click", garageListeners.handleStartClick);
        }
      } else {
        button.textContent = "Stop";
        button.classList.add("track__button_stop");
        button.setAttribute("disabled", "true");
        button.classList.add("disabled");
        if (garageListeners.handleStopClick !== undefined) {
          button.addEventListener("click", garageListeners.handleStopClick);
        }
      }
      element.appendChild(button);
    }
    return element;
  }

  public renderTrackRoad(color: string) {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("track__road");
    element.append(this.renderCar(color));
    element.append(this.renderFinishLine());
    return element;
  }

  public renderFinishLine() {
    const element: HTMLDivElement = document.createElement("img");
    element.classList.add("track__road_finish");
    element.setAttribute("src", "./assets/finish1.jpg");
    return element;
  }

  public renderCar(color: string) {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add("track__road_car");
    element.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"    width="100px" height="50px" viewBox="0 0 1280.000000 640.000000"    preserveAspectRatio="xMidYMid meet">   <metadata>   Created by potrace 1.15, written by Peter Selinger 2001-2017   </metadata>   <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"   fill=${color} stroke="none">   <path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6   -10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91   -250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340   -49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3   -150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418   0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64   -126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622   756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302   140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263   l-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22   259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239   -63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1   -116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45   525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50   680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0   -226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332   -208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341   10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66  -422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36   -485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83   54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12   -67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134   274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11   -27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z"/>   <path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262   -467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493   -551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23   86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50   -354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220   1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360   0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z"/>   <path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120   -114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z"/>   <path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28   22 c-34 28 -138 70 -193 79 l-40 7 0 -162z"/>   <path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0   165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z"/>   <path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0   165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z"/>   <path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29   58 -13 0 -29 -8 -34 -18z"/>   <path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57   9 153 -71 153 -27 0 -44 -8 -66 -29z"/>   <path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16   -54 -2z"/>   <path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67   -62 36z"/>   <path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123   113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z"/>   <path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71   195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z"/>   <path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25   -70 0z"/>   <path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7   0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z"/>   <path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223  232 -230 231 -3 0 -11 -3 -17 -6z"/>   <path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24   -411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118   380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86   -407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96   33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176   238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207   81 364 77 109 -3 143 -7 210 -30z"/>   <path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80   119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z"/>   <path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20   -163 84 -207 91 l-43 7 0 -162z"/>   <path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0   165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z"/>   <path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45   -88 241 -108 241 -4 0 -57 -51 -119 -112z"/>   <path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64   -10 68 -14 2 -31 -3 -38 -10z"/>   <path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0   -44 -6 -64 -31z"/>   <path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20   -54 2z"/>   <path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13   -24 13 -3 0 -14 -6 -24 -13z"/>   <path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120   109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z"/>   <path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177   79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z"/>   <path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43   -67 12z"/>   <path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108   10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115   -113z"/>   <path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186   61 239 98 16 10 -216 242 -234 235z"/>   </g>   </svg>   `;
    return element;
  }

  public toggleButtonPagination(buttonName: string, on: boolean) {
    const button = document.querySelector(`.garage__pagination_${buttonName}`);
    if (on) {
      button?.setAttribute("disabled", "true");
      button?.classList.add("disabled");
    } else {
      button?.removeAttribute("disabled");
      button?.classList.remove("disabled");
    }
  }

  public addTrack(car: Car) {
    const element: HTMLDivElement = document.createElement("div");
    element.classList.add(`track`);
    element.id = String(car.id);
    element.prepend(this.renderControl(car.name));
    element.append(this.renderTrackRoad(car.color));
    this.countCars += 1;
    this.garageName!.textContent = `Garage (${this.countCars})`;
    this.garageContainer.appendChild(element);
  }

  public moveCar(track: HTMLDivElement, time: number) {
    const buttonStart = track.querySelector(".track__button_start");
    console.log(buttonStart);
    buttonStart?.classList.add("disabled");
    buttonStart?.setAttribute("disabled", "true");
    const buttonStop = track.querySelector(".track__button_stop");
    buttonStop?.classList.remove("disabled");
    buttonStop?.removeAttribute("disabled");
    const currentCar = track.querySelector(".track__road_car");
    const currentCarWidth = (currentCar as HTMLDivElement).offsetWidth;
    const roadWidth = (track.querySelector(".track__road") as HTMLDivElement).offsetWidth;
    const newPosition = roadWidth - currentCarWidth;
    (currentCar as HTMLDivElement).style.transition = `transform ${time}s linear`;
    (currentCar as HTMLDivElement).style.transform = `translateX(${newPosition}px)`;
  }

  public stopCar(track: HTMLDivElement) {
    const currentCar = track.querySelector(".track__road_car");
    const transformValue = getComputedStyle(currentCar!).transform;
    const currentPositionX = transformValue ? parseFloat(transformValue.split(",")[4]) : 0;

    (currentCar as HTMLDivElement).style.transition = "";
    (currentCar as HTMLDivElement).style.transform = `translateX(${currentPositionX}px)`;
  }

  public toBeginCar(track: HTMLDivElement) {
    const buttonStop = track.querySelector(".track__button_stop");
    buttonStop?.classList.add("disabled");
    buttonStop?.setAttribute("disabled", "true");
    const buttonStart = track.querySelector(".track__button_start");
    buttonStart?.classList.remove("disabled");
    buttonStart?.removeAttribute("disabled");
    const currentCar = track.querySelector(".track__road_car");
    (currentCar as HTMLDivElement).style.transition = "";
    (currentCar as HTMLDivElement).style.transform = `translateX(0px)`;
  }
}
