// ============ Реализация Бургера ============

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

// ============ Реализация Карусели ============

let offset = 0;
const sliderLine = document.querySelector('.slide__line');

document.querySelector('.favorites__button--right').addEventListener('click', function(){
  offset = offset + 480;
  if (offset > 960) {
    offset = 0;
  }
  sliderLine.style.left = -offset + 'px';
});

document.querySelector('.favorites__button--left').addEventListener('click', function () {
  offset = offset - 480;
  if (offset < 0) {
    offset = 960;
  }
  sliderLine.style.left = -offset + 'px';
});

let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posFinal = 0;

let swipeStart = function() {

  posInit = posX1 = event.layerX;

  sliderLine.style.transition = '';

  document.addEventListener('mousemove', swipeAction);
  document.addEventListener('mouseup', swipeEnd);
}

let swipeAction = function() {

  posX1 = event.layerX;
  console.log(`posX1 = ${posX1}`);
  console.log(`posInit = ${posInit}`);

  sliderLine.style.left = -(posInit - posX1) + 'px';
}

let swipeEnd = function() {
  posFinal = posInit - posX1;

  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('mouseup', swipeEnd);

  if (Math.abs(posFinal) > 30) {
    if (posInit < posX1) {
      if (posInit > 0 && posInit < 480){
        sliderLine.style.left = -960 + 'px';
      }
      if (posInit > 480 && posInit < 960){
        sliderLine.style.left = 0 + 'px';
      }
      if (posInit > 960){
        sliderLine.style.left = -480 + 'px';
      }
    } else if (posInit > posX1) {
      if (posInit > 0 && posInit < 480){
        sliderLine.style.left = -480 + 'px';
      }
      if (posInit > 480 && posInit < 960){
        sliderLine.style.left = -960 + 'px';
      }
      if (posInit > 960){
        sliderLine.style.left = 0 + 'px';
      }
    }
  }

};

sliderLine.addEventListener('mousedown', function(event) {
  swipeStart(event);
});