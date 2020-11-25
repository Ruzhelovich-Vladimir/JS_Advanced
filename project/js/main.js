const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

// Переделать в ДЗ не использовать fetch а Promise
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};

const promiseGetRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  });
};

// –--------------------------------

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];
    // this.#fetchGoods();
    this.#getProducts()
      .then((data) => {
        this.#goods = [...data];
        // this.#goods = Array.from(data);
        this.#render();
      })
      .then(() => {
        //Инициализирую карзину, пока не придумал как это сделать вне класса
        this.basketList = new Basket(this.#goods);
      });
  }

  goodsPrice() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  // #fetchGoods() {
  //   getRequest(`${API}catalogData.json`, (data) => {
  //     console.log(data);
  //     this.#goods = JSON.parse(data);
  //     console.log(this.#goods);
  //     this.#render();
  //   });
  // }

  #getProducts() {
    // return fetch(`${API}catalogData.json`)
    return promiseGetRequest(`${API}catalogData.json`)
      .then(
        response => JSON.parse(response)
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }

  #render() {
    const container = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this.#allProducts.push(productObject);

      container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.product_name;
    this.id = product.id_product;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn" data-id="${this.id}">Купить</button>
                      </div>
                  </div>`;
  }
}

class BasketItem extends ProductItem { //Наследую класс GoodsItem, чтобы не повторять код
  /*
  Класс элемента карзины товара
  */
  constructor(product) {
    super(product); //Вызываю конструктор родителя
    this.qty = 1; //Добавляю новое свойство класса - количество
  }
  render() { //Разметка элемента карзины
    return ``
  }
}
class Basket {
  /*
  Класс карзины товаров
  */
  constructor(products) {
    this.allProducts = products;
    this.productsList = []; //Список товаров в карзине содержит элемент класса BasketItem

    // Добавляется слушатель события к копкам добавить
    document.querySelectorAll('.buy-btn').forEach((bottonItem) => bottonItem.addEventListener('click', (event) => {
      let id, inx;
      id = +event.target.dataset.id; // Получаем идентификатор из кнопки
      inx = this.allProducts.findIndex(product => product.id_product == id); // Ищем элемет в структуре json всех продуктов
      this.addBasketItem(this.allProducts[inx]); //Добавляем в карзину выбранный элемент
    }
    ));

    // Добавляется слушатель события к копкам "Карзина"
    document.querySelector('.basket').addEventListener('click', (event) => {
      document.querySelector(".list").insertAdjacentHTML('afterbegin', this.render());
      document.querySelector(".list").innerHTML = this.render();
    }
    );


  }

  addBasketItem(product) {
    /*
    Добавляем в карзину товар
    */
    let inx;
    inx = this.productsList.findIndex(item => item.id == product.id_product); //Ищем элемент массива по id
    if (inx > -1) {
      //Если товар уже добавляли, то увеличиваем кол-во на 1
      this.productsList[inx].qty += 1;
      console.log("Добавляем кол-во уже добавленного элемент в карзину", this.productsList[inx], this.productsList)
    }
    else {
      let basketItem;
      basketItem = new BasketItem(product)
      this.productsList.push(basketItem); //Добавляем новый элемент в карзину
      console.log("Добавляем новый элемент в карзину", basketItem, this.productsList)
    }
  }
  render() { //Разметка карзины

    let result = "";
    this.productsList.forEach(elem => {
      result = `${result}
    <li>
    <a href="#" title="${elem.product_name}" class="cart-product-image"><img src="${elem.img}" alt="Product"></a>
    <div class="text">
        <p class="product-name">${elem.title}</p>
        <p class="product-price"><span class="price">${elem.price} \u20bd</span></p>
        <p class="qty">Кол-во: ${elem.qty}</p>
    </div>
    <a class="close" href="#" title="close"><i class="fa fa-times-circle"></i></a>
    </li>
    `
    })

    return result
  }
}

const productList = new ProductList();
