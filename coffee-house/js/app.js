// ============ Реализация Бургера ============

const headerEl = document.querySelector(".header");
const headerNavEl = document.querySelector(".header__nav");
const navListEl = document.querySelector(".nav__list");
const headerBurgerEl = document.querySelector(".header__burger");
let burgerVisible = false;

function toggleBurgerButton() {
  document.querySelector(".header__burger").addEventListener("click", function () {
    burgerVisible = burgerVisible === false ? true : false;
    // document.body.style.overflow = burgerVisible === false ? "" : "hidden";
    this.classList.toggle("header__burger--active");
    headerNavEl.classList.toggle("header__nav--active");
    navListEl.classList.toggle("nav__list--active");
  });
}

function closeBurgerMenu() {
  document.querySelector(".header__nav").addEventListener("click", () => {
    burgerVisible = burgerVisible === false ? true : false;
    // document.body.style.overflow = burgerVisible === false ? "" : "hidden";
    headerNavEl.classList.contains("open")
      ? headerNavEl.classList.remove("header__nav--active")
      : false;
    navListEl.classList.contains("nav__list--active")
      ? navListEl.classList.remove("nav__list--active")
      : false;
    headerBurgerEl.classList.contains("header__burger--active")
      ? headerBurgerEl.classList.remove("header__burger--active")
      : false;
  });
}

toggleBurgerButton();
closeBurgerMenu();
