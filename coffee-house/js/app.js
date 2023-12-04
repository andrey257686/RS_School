const headerEl = document.querySelector('.header');
const headerNavEl = document.querySelector('.header__nav');
const navListEl = document.querySelector('.nav__list');
const headerBurgerEl = document.querySelector('.header__burger');

function toggleBurgerButton() {
  document.querySelector('.header__burger').addEventListener('click', function() {
    this.classList.toggle('header__burger--active');
    headerEl.classList.toggle('open__header');
    headerNavEl.classList.toggle('header__nav--active');
    navListEl.classList.toggle('nav__list--active');
  })
}

function closeBurgerMenu() {
  document.querySelector('.header__nav').addEventListener('click', () => {
    headerEl.classList.contains('open__header') ? headerEl.classList.remove('open__header') : false ;
    headerNavEl.classList.contains('open') ? headerNavEl.classList.remove('header__nav--active') : false ;
    navListEl.classList.contains('nav__list--active') ? navListEl.classList.remove('nav__list--active') : false ;
    headerBurgerEl.classList.contains('header__burger--active') ? headerBurgerEl.classList.remove('header__burger--active') : false ;
  })
}

toggleBurgerButton();
closeBurgerMenu();
