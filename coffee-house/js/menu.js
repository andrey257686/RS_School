import products from './products.json' assert { type: "json" };

const menuList = document.querySelector('.menu-grid');
const category = 'coffee';

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

productsArray.forEach((product) => {
  menuList.appendChild(createCardItem(product, i));
  i += 1;
})