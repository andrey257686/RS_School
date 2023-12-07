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
const sliderControls = document.querySelectorAll('.favorites__control');

let changeControls = function(offset) {
  switch (offset) {
    case 0:
      sliderControls[0].classList.add('favorites__control--active');
      sliderControls[1].classList.remove('favorites__control--active');
      sliderControls[2].classList.remove('favorites__control--active');
      break;
    case 480:
      sliderControls[0].classList.remove('favorites__control--active');
      sliderControls[1].classList.add('favorites__control--active');
      sliderControls[2].classList.remove('favorites__control--active');
      break;
    case 960:
      sliderControls[0].classList.remove('favorites__control--active');
      sliderControls[1].classList.remove('favorites__control--active');
      sliderControls[2].classList.add('favorites__control--active');
      break;
  }
}

changeControls(offset);

document.querySelector('.favorites__button--right').addEventListener('click', function(){
  offset = offset + 480;
  if (offset > 960) {
    offset = 0;
  }
  changeControls(offset);
  sliderLine.style.left = -offset + 'px';
});

document.querySelector('.favorites__button--left').addEventListener('click', function () {
  offset = offset - 480;
  if (offset < 0) {
    offset = 960;
  }
  changeControls(offset);
  sliderLine.style.left = -offset + 'px';
});

let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posFinal = 0;

let swipeStart = function() {

  let evt = (event.type.search('touch')) !== -1 ? event.touches[0] : event;
  console.log(evt);

  posInit = posX1 = evt.clientX;

  sliderLine.style.transition = '';

  document.addEventListener('touchmove', swipeAction);
  document.addEventListener('mousemove', swipeAction);
  document.addEventListener('touchend', swipeEnd);
  document.addEventListener('mouseup', swipeEnd);
}

let swipeAction = function() {

  let evt = (event.type.search('touch') !== -1) ? event.touches[0] : event

  posX1 = evt.clientX;

  sliderLine.style.left = -(posInit - posX1) + 'px';
}

let swipeEnd = function() {
  posFinal = posInit - posX1;

  document.removeEventListener('touchmove', swipeAction);
  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('touchend', swipeEnd);
  document.removeEventListener('mouseup', swipeEnd);

  if (Math.abs(posFinal) > 30) {
    if (posFinal < 0) {
      offset = offset - 480;
      if (offset < 0) {
        offset = 960;
      }
    }
    if (posFinal > 0) {
      offset = offset + 480;
      if (offset > 960) {
        offset = 0;
      }
    }
  }
  changeControls(offset);
  sliderLine.style.left = -offset + 'px';

};


sliderLine.addEventListener('mousedown', function(event) {
  swipeStart(event);
});
sliderLine.addEventListener('touchstart', function(event) {
  swipeStart(event);
});