// import products from './products.json' assert { type: "json" };

fetch("./js/products.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error('Response was not ok');
    }
    return res.json();
  })
  .then((products) => {
    const menuList = document.querySelector('.menu-grid');
    const overlay = document.querySelector('.overlay');
    const modalWindow = document.querySelector('.modal__container');
    const categoriesList = document.querySelectorAll('.categories__item');
    const categoriesButtonList = document.querySelectorAll('.categories__item--button');
    const menu = document.querySelector('.menu');
    let indexLastShownItem;
    let category = 'coffee';
    let categoryMap = new Map();
    categoryMap.set(0, "coffee"); 
    categoryMap.set(1, "tea"); 
    categoryMap.set(2, "dessert");
    const mediaQueryMax = window.matchMedia('(max-width: 768px)');
    const mediaQueryMin = window.matchMedia('(min-width: 769px)');
    for (let i = 0; i < 3; i++) {
      categoriesList[i].addEventListener('click', function() {
        category = categoryMap.get(i);
        menuList.innerHTML = '';
        changeCategory(i);
        updateMenu(category);
      })
    }

    let changeCategory = function(i) {
      switch (i) {
        case 0:
          categoriesButtonList[0].classList.add('categories__item--active');
          categoriesButtonList[1].classList.remove('categories__item--active');
          categoriesButtonList[2].classList.remove('categories__item--active');
          break;
        case (1):
          categoriesButtonList[0].classList.remove('categories__item--active');
          categoriesButtonList[1].classList.add('categories__item--active');
          categoriesButtonList[2].classList.remove('categories__item--active');
          break;
        case (2):
          categoriesButtonList[0].classList.remove('categories__item--active');
          categoriesButtonList[1].classList.remove('categories__item--active');
          categoriesButtonList[2].classList.add('categories__item--active');
          break;
      }
    }

    overlay.addEventListener('click', function() {
      modalWindow.innerHTML = '';
      overlay.style.display = 'none';
      modalWindow.style.display = 'none';
      priceAdditivies = 0;
      priceSize = 0;
    })

    const createCardItem = function (product, id) {
      let item = document.createElement("li");
      item.className = "menu-grid__item menu-grid__item--" + id;
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
        k +=1;
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

    const createRefreshButton = function (length) {
      let divElement = document.createElement("div");
      let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let path1Element = document.createElementNS("http://www.w3.org/2000/svg", "path");
      let path2Element = document.createElementNS("http://www.w3.org/2000/svg", "path");
      divElement.className = "menu__refresh";
      path1Element.setAttribute("d", "M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8");
      path1Element.setAttribute("stroke", "#403F3D");
      path1Element.setAttribute("stroke-linecap", "round");
      path1Element.setAttribute("stroke-linejoin", "round");
      path2Element.setAttribute("d", "M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3");
      path2Element.setAttribute("stroke", "#403F3D");
      path2Element.setAttribute("stroke-linecap", "round");
      path2Element.setAttribute("stroke-linejoin", "round");
      svgElement.setAttribute("width", "24");
      svgElement.setAttribute("height", "24");
      svgElement.setAttribute("viewBox", "0 0 24 24");
      svgElement.setAttribute("fill", "none");
      svgElement.appendChild(path1Element);
      svgElement.appendChild(path2Element);
      divElement.appendChild(svgElement);
      return divElement;
    }

    const showItems = function () {
      let i = indexLastShownItem + 1;
      for (i; i <= indexLastShownItem + 4; i++) {
        const menuItem = document.querySelector(`.menu-grid__item--${i}`);
        menuItem.style.display = 'flex';
      }
      indexLastShownItem = i - 1;
    }

    let priceFinished;
    let priceSize = 0;
    let priceAdditivies = 0;
    const changePrice = function(product, option, type) {
      let priceInitial = Number(product.price);
      let priceDelta;
      switch (type) {
        case ('size'):
          priceDelta = Number(product.sizes[option]['add-price']);
          priceSize = priceInitial + priceDelta;
          break;
        case ('additivies'):
          priceDelta = option === 'asc' ? 0.50 : -0.50;
          priceAdditivies += priceDelta;
      }
      priceSize = priceSize === 0 ? Number(product.price) : priceSize;
      priceFinished = priceSize + priceAdditivies;
      const priceElement = document.querySelector('.modal__price--amount');
      priceElement.textContent = "$" + priceFinished.toFixed(2);
    }

    const handleClickSize = function(product) {
      const sizeButtonList = document.querySelectorAll('.size__button');
      for (let i = 0; i < sizeButtonList.length; i++) {
        sizeButtonList[i].addEventListener('click', function() {
          switch (i) {
            case 0:
              sizeButtonList[0].classList.add('size__active');
              changePrice(product, 's', 'size');
              sizeButtonList[1].classList.remove('size__active');
              sizeButtonList[2].classList.remove('size__active');
              break;
            case (1):
              sizeButtonList[0].classList.remove('size__active');
              sizeButtonList[1].classList.add('size__active');
              changePrice(product, 'm', 'size');
              sizeButtonList[2].classList.remove('size__active');
              break;
            case (2):
              sizeButtonList[0].classList.remove('size__active');
              sizeButtonList[1].classList.remove('size__active');
              sizeButtonList[2].classList.add('size__active');
              changePrice(product, 'l', 'size');
              break;
          }
        })
      }
    }

    const handleClickAdditivies = function(product) {
      const additiviesButtonList = document.querySelectorAll('.additivies__button');
      for (let i = 0; i < additiviesButtonList.length; i++) {
        additiviesButtonList[i].addEventListener('click', function() {
          switch (i) {
            case 0:
              additiviesButtonList[0].classList.toggle('additivies__active');
              additiviesButtonList[0].classList.contains('additivies__active') ? changePrice(product, 'asc', 'additivies') : changePrice(product, 'desc', 'additivies');
              break;
            case (1):
              additiviesButtonList[1].classList.toggle('additivies__active');
              additiviesButtonList[1].classList.contains('additivies__active') ? changePrice(product, 'asc', 'additivies') : changePrice(product, 'desc', 'additivies');
              break;
            case (2):
              additiviesButtonList[2].classList.toggle('additivies__active');
              additiviesButtonList[2].classList.contains('additivies__active') ? changePrice(product, 'asc', 'additivies') : changePrice(product, 'desc', 'additivies');
              break;
          }
        })
      }
    }

    let productsArray = [];
    let refreshButton = "";
    const updateMenu = function(category) {
      productsArray = products.filter((product) => product.category === category);
      let i = 0;
      priceAdditivies = 0;
      priceSize = 0;
      productsArray.forEach((product) => {
        let item = createCardItem(product, i);
        item.addEventListener('click', function(event) {
          event.preventDefault();
          createModalWindow(product);
          document.querySelector('.size__button--small').classList.add("size__active");
          handleClickSize(product);
          handleClickAdditivies(product);
          overlay.style.display = 'block';
          modalWindow.style.display = 'flex';
        })
        menuList.appendChild(item);
        i += 1;
      })
      if (productsArray.length != 4) {
        if (mediaQueryMax.matches) {
          indexLastShownItem = 3;
        }
        else {
          indexLastShownItem = 7;
        }
      }
      else {
        indexLastShownItem = 3;
      }
      if (!document.querySelector('.menu__refresh')) {                            // необходимо для того чтобы при переключении категорий заново не рисовалась кнопка
        const refreshButtonElement = createRefreshButton(productsArray.length);
        menu.appendChild(refreshButtonElement);
        refreshButton = document.querySelector('.menu__refresh')
        refreshButton.addEventListener('click', function() {
          showItems();
          if (indexLastShownItem == productsArray.length - 1) {
            refreshButton.style.display = 'none';
          }
        })
      }
      if (indexLastShownItem == productsArray.length - 1) {
        refreshButton.style.display = 'none';
      }
      if (indexLastShownItem !== productsArray.length - 1) {
        refreshButton.style.display = 'flex';
      }
    }   
    updateMenu(category);
    function handleTabletChangeMax(e) {
      if (e.matches) {
        menuList.innerHTML = '';
        updateMenu(category);
      }
    }
    mediaQueryMax.addListener(handleTabletChangeMax)
    handleTabletChangeMax(mediaQueryMax)
    function handleTabletChangeMin(e) {
      if (e.matches) {
        menuList.innerHTML = '';
        updateMenu(category);
      }
    }
    mediaQueryMin.addListener(handleTabletChangeMin)
    handleTabletChangeMin(mediaQueryMin)
});
