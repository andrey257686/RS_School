let offset = 0;
let offsetResolution = window.screen.width < 768 ? 348 : 480;
const sliderLine = document.querySelector('.slide__line');
const sliderControls = document.querySelectorAll('.favorites__control--progress');
let isPaused = false;
const slideContainer = document.querySelector('.slide__container')
slideContainer.addEventListener('mouseover', function() {
  isPaused = true;
})
slideContainer.addEventListener('mouseout', function() {
  isPaused = false;
})


let changeControls = function(offset) {
  switch (offset) {
    case 0:
      sliderControls[0].classList.add('favorites__control--active');
      sliderControls[1].classList.remove('favorites__control--active');
      sliderControls[2].classList.remove('favorites__control--active');
      break;
    case (offsetResolution):
      sliderControls[0].classList.remove('favorites__control--active');
      sliderControls[1].classList.add('favorites__control--active');
      sliderControls[2].classList.remove('favorites__control--active');
      break;
    case (offsetResolution*2):
      sliderControls[0].classList.remove('favorites__control--active');
      sliderControls[1].classList.remove('favorites__control--active');
      sliderControls[2].classList.add('favorites__control--active');
      break;
  }
}

changeControls(offset);

let changeSlide = function(offset) {
  sliderLine.style.left = -offset + 'px';
}

let timerOffset = 0;
let timerControls = '';
let timerSlide = '';
let widthOffset = 0;
let progressBar = document.querySelector('.favorites__control--active');

let autoTimer = function () {
  clearInterval(timerSlide);
  progressBar = document.querySelector('.favorites__control--active');
  let autoTimerControls = function () {
    clearInterval(timerControls);
    timerControls = setInterval(function() {
      if (!isPaused) {
        widthOffset = widthOffset + 1;
        if (widthOffset > 100) {
          widthOffset = 0;
        } 
        progressBar.style.width = widthOffset + '%';
      }
    } ,50)
  }
  autoTimerControls();

  timerSlide = setInterval(function() {
    if (!isPaused) {
      offset = offset + offsetResolution;
      if (offset > offsetResolution*2) {
        offset = 0;
      }
      changeSlide(offset);
      changeControls(offset);
      progressBar.style.width = 0;
      widthOffset = 0;
      progressBar = document.querySelector('.favorites__control--active');
      autoTimerControls();
    }
  }, 5000)
}

autoTimer();

document.querySelector('.favorites__button--right').addEventListener('click', function () {
  offset = offset + offsetResolution;
  if (offset > offsetResolution*2) {
    offset = 0;
  }
  progressBar.style.width = 0;
  widthOffset = 0;
  changeSlide(offset);
  changeControls(offset);
  autoTimer();
});

document.querySelector('.favorites__button--left').addEventListener('click', function () {
  offset = offset - offsetResolution;
  if (offset < 0) {
    offset = offsetResolution*2;
  }
  progressBar.style.width = 0;
  widthOffset = 0;
  changeSlide(offset);
  changeControls(offset);
  autoTimer();
});

let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posFinal = 0;

let swipeStart = function() {

  let evt = (event.type.search('touch')) !== -1 ? event.touches[0] : event;

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
      offset = offset - offsetResolution;
      if (offset < 0) {
        offset = offsetResolution*2;
      }
    }
    if (posFinal > 0) {
      offset = offset + offsetResolution;
      if (offset > offsetResolution*2) {
        offset = 0;
      }
    }
  }
  progressBar.style.width = 0;
  widthOffset = 0;
  changeSlide(offset);
  changeControls(offset);
  autoTimer();

};


sliderLine.addEventListener('mousedown', function(event) {
  swipeStart(event);
});
sliderLine.addEventListener('touchstart', function(event) {
  swipeStart(event);
});
