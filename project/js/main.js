/*
    1.  Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. 
        Продумайте, какие методы понадобятся для работы с этими сущностями.
    2.  Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
*/
"strict mode";

const html_currency = "&#8381;" //Символ рубля


class GoodsItem {
    /*
    Коласс продукта
    */

    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    render() {
        return `
            <div id=${this.id} class="goods-item">
                <img src="https://dummyimage.com/150x130/fff/aaa" alt="photo">
                <h3 class="title">${this.title}</h3>
                <p class="price">${this.price}${html_currency}</p>
                <button class="add-bascket" type="button" date-id=${this.id}>Добавить</button>
            </div>`;
    }
}

class GoodsList {
    /*
    Коласс списка продукта
    */

    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        //Получение списка товаров
        this.goods = [ //Пока определяем формально
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
            { id: 5, title: 'Notebook', price: 20000 },
            { id: 6, title: 'Mouse', price: 1500 },
            { id: 7, title: 'Keyboard', price: 5000 },
            { id: 8, title: 'Gamepad', price: 4500 },
            { id: 9, title: 'Notebook', price: 20000 },
            { id: 10, title: 'Mouse', price: 1500 },
            { id: 11, title: 'Keyboard', price: 5000 },
            { id: 12, title: 'Gamepad', price: 4500 },
            { id: 13, title: 'Gamepad', price: 4500 },
            { id: 14, title: 'Notebook', price: 20000 },
        ];
    }
    render() {
        // Вывод разметки списка товаров
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id, good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

class BasketItem extends GoodsItem { //Наследую класс GoodsItem, чтобы не повторять код
    /*
    Класс элемента карзины товара
    */
    constructor(id, title, price) {
        super(id, title, price); //Вызываю конструктор родителя
        this.qty = 1;            //Добавляю новое свойство класса - количество
    }
    render() { //Разметка элемента карзины
        return ``
    }
}
class Basket {
    /*
    Класс карзины товаров
    */
    constructor() {
        this.goods = []; //Список товаров в карзине содержит элемент класса BasketItem
    }

    addBasketItem(id, title, price) {
        /*
        Добавляем в карзину товар
        */
        let inx;
        inx = this.goods.findIndex(item => item.id == id); //Ищем элемент массива по id
        if (inx > -1) {
            //Если товар уже добавляли, то увеличиваем кол-во на 1
            this.goods[inx].qty += 1;
            console.log("Добавляем кол-во уже добавленного элемент в карзину", this.goods[inx], this.goods)
        }
        else {
            let basketItem;
            basketItem = new BasketItem(id, title, price)
            this.goods.push(basketItem); //Добавляем новый элемент в карзину
            console.log("Добавляем новый элемент в карзину", basketItem, this.goods)
        }
    }
    render() { //Разметка карзины
        return ``
    }
}

/* отрисовка товаров */
const list = new GoodsList();
list.fetchGoods();
list.render();

/* инициализируем карзину */
let basket = new Basket();

const getGood = (id) => document.getElementById(id);


const buttonItems = document.querySelectorAll('.add-bascket').forEach((bottonItem) => bottonItem.addEventListener('click', (event) => {
    let id, title, price;
    id = +event.target.getAttribute("date-id"); // Получаем идентификатор
    elemenGood = getGood(id);                   // Получаем элемет по идентификатору
    title = elemenGood.querySelector(".title").innerText; //В найденом элементе получаем наименование
    price = +elemenGood.querySelector(".price").innerText.slice(0, -1); //В найденом элементе получаем цену
    basket.addBasketItem(id, title, price); //Добавляем в карзину выбранный элемент
}
));
