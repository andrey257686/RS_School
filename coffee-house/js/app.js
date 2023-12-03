document.querySelector('.header__burger').addEventListener('click', function() {
  this.classList.toggle('header__burger--active');
  document.querySelector('.header').classList.toggle('open__header');
  document.querySelector('.header__nav').classList.toggle('open');
  document.querySelector('.nav__list').classList.toggle('open');
})
