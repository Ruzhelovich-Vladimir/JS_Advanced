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
    return fetch(`${API}catalogData.json`)
      .then(response => response.json())
      .catch((err) => {
        console.log(err);
      });
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
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
  }
}

const productList = new ProductList();
