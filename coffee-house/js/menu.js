import products from './products.json' assert { type: "json" };

const menuList = document.querySelector('.menu-grid');
const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal__container');
const category = 'coffee';

overlay.addEventListener('click', function() {
  modalWindow.innerHTML = '';
  overlay.style.display = 'none';
  modalWindow.style.display = 'none';
})

const productsArray = products.filter((product) => product.category === category);
let i = 0;


const createCardItem = function (product, id) {
  let item = document.createElement("li");
  item.className = "menu-grid__item menu-grid__item--" + i;
  let imageBox = document.createElement("div");
  imageBox.className = "coffee-block__image--box";
  let img = document.createElement("img");
  img.className = "coffee-block__image";
  img.src = product.image;
  img.alt = product.category;
  imageBox.appendChild(img);
  let textBlock = document.createElement("div");
  textBlock.className = "coffee-block__text";
  let textTop = document.createElement("div");
  textTop.className = "coffee-block__text--top";
  let title = document.createElement("h2");
  title.className = "coffee-block__title";
  title.textContent = product.name;
  let description = document.createElement("p");
  description.className = "coffee-block__description";
  description.textContent = product.description;
  textTop.appendChild(title);
  textTop.appendChild(description);
  let priceBlock = document.createElement("div");
  priceBlock.className = "coffee-block__price";
  priceBlock.textContent = "$" + product.price;
  textBlock.appendChild(textTop);
  textBlock.appendChild(priceBlock);
  item.appendChild(imageBox);
  item.appendChild(textBlock);
  return item;
}

const createModalWindow = function (product) {
  let imageBox = document.createElement("div");
  imageBox.className = "modal__image--box";
  let img = document.createElement("img");
  img.className = "modal__image";
  img.src = product.image;
  img.alt = product.category;
  imageBox.appendChild(img);
  let modalMenu = document.createElement("div");
  modalMenu.className = "modal__menu";
  let textBlock = document.createElement("div");
  textBlock.className = "modal__text modal__menu--text";
  let title = document.createElement("h3");
  title.className = "modal__text--title";
  title.textContent = product.name;
  let description = document.createElement("p");
  description.className = "modal__text--description";
  description.textContent = product.description;
  textBlock.appendChild(title);
  textBlock.appendChild(description);

  let sizeBlock = document.createElement("div");
  sizeBlock.className = "size modal__menu--size";
  let sizeTitle = document.createElement("p");
  sizeTitle.className = "size__title";
  sizeTitle.textContent = "Size";
  let sizeVariants = document.createElement("ul");
  sizeVariants.className = "size__variants list-reset";
  for (let key in product.sizes) {
    let classModifier = "";
    let letterModifier = ""
    switch (key) {
      case 's':
        classModifier = 'small';
        letterModifier = 's';
        break;
      case 'm':
        classModifier = 'medium';
        letterModifier = 'm';
        break;
      case 'l':
        classModifier = 'large';
        letterModifier = 'l';
        break;
    }
    let sizeItem = document.createElement('li');
    sizeItem.className = `size__variant size__${classModifier}` ;
    let sizeButton = document.createElement('button');
    sizeButton.className = `size__button size__button--${classModifier}` ;
    let sizeLetter = document.createElement("span");
    sizeLetter.className = "size__button--letter";
    sizeLetter.textContent = key.toUpperCase();
    let sizeText = document.createElement("span");
    sizeText.className = "size__button--text";
    sizeText.textContent = product.sizes[key].size;
    sizeButton.appendChild(sizeLetter);
    sizeButton.appendChild(sizeText);
    sizeItem.appendChild(sizeButton);
    sizeVariants.appendChild(sizeItem);
  }
  sizeBlock.appendChild(sizeTitle);
  sizeBlock.appendChild(sizeVariants);

  let additiviesBlock = document.createElement("div");
  additiviesBlock.className = "additivies modal__menu--additivies";
  let additiviesTitle = document.createElement("p");
  additiviesTitle.className = "additivies__title";
  additiviesTitle.textContent = "Additivies";
  let additiviesVariants = document.createElement("ul");
  additiviesVariants.className = "additivies__variants list-reset";
  let k = 1;
  for (let addOption of product.additives) {
    let additiviesItem = document.createElement('li');
    additiviesItem.className = `additivies__variant additivies__${addOption.name}` 
    let additiviesButton = document.createElement('button');
    additiviesButton.className = `additivies__button additivies__button--${addOption.name}` 
    let additiviesLetter = document.createElement("span")
    additiviesLetter.className = "additivies__button--letter"
    additiviesLetter.textContent = k;
    let additiviesText = document.createElement("span")
    additiviesText.className = "additivies__button--text"
    additiviesText.textContent = addOption.name;
    additiviesButton.appendChild(additiviesLetter);
    additiviesButton.appendChild(additiviesText);
    additiviesItem.appendChild(additiviesButton);
    additiviesVariants.appendChild(additiviesItem);
  }
  additiviesBlock.appendChild(additiviesTitle);
  additiviesBlock.appendChild(additiviesVariants);

  let priceBlock = document.createElement("div");
  priceBlock.className = "modal__price modal__menu--price";
  let priceTitle = document.createElement("p");
  priceTitle.className = "modal__price--title";
  priceTitle.textContent = "Total:";
  let priceAmount = document.createElement("div");
  priceAmount.className = "modal__price--amount";
  priceAmount.textContent = "$" + product.price;
  priceBlock.appendChild(priceTitle);
  priceBlock.appendChild(priceAmount);
  let alertBlock = document.createElement("div");
  alertBlock.className = "modal__alert modal__menu--alert";
  let alertImage = document.createElement("img");
  alertImage.className = "modal__alert--image";
  alertImage.src = "img/alert.svg";
  alertImage.alt = "Alert";
  let alertDescription = document.createElement("p");
  alertDescription.className = "modal__alert--description";
  alertDescription.textContent = "The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.";
  alertBlock.appendChild(alertImage);
  alertBlock.appendChild(alertDescription);
  let closeButton = document.createElement("button");
  closeButton.className = "modal__button--close";
  closeButton.textContent = "Close";
  modalMenu.appendChild(textBlock);
  modalMenu.appendChild(sizeBlock);
  modalMenu.appendChild(additiviesBlock);
  modalMenu.appendChild(priceBlock);
  modalMenu.appendChild(alertBlock);
  modalMenu.appendChild(closeButton);
  modalWindow.appendChild(imageBox);
  modalWindow.appendChild(modalMenu);
}

productsArray.forEach((product) => {
  let item = createCardItem(product, i);
  item.addEventListener('click', function(event) {
    event.preventDefault();
    createModalWindow(product);
    overlay.style.display = 'block';
    modalWindow.style.display = 'flex';
  })
  menuList.appendChild(item);
  i += 1;
})