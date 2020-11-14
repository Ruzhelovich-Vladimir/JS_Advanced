"strict mode";
const products = [
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
    { id: 4, title: 'Gamepad', price: 4500 },
    { id: 1, title: 'Notebook', price: 20000 },
];

const default_good = {
    title: 'Notebook', price: 20000
}

/*2. Если функция только возвращает значение, то можно убрать фигурные скобки и убрать return */
const renderProduct = (title = default_good.title, price = default_good.price) =>
    `<div class="product-item">
         <img src="https://dummyimage.com/150x130/fff/aaa" alt="">
         <h3>${title}</h3>
         <p>${price}</p>
         <button class="by-btn">Добавить в корзину</button>
    </div>`;

const catalogInit = (list) => {
    const productList = list.map((item) => renderProduct(item.title, item.price));
    console.log(productList);
    /*3. При передачи массива, разделения элементов "," также будет отображены
    правильно будет соединить элементы в строку, без разделителя
    */
    document.querySelector('.products').innerHTML = productList.join('');
};

catalogInit(products);
