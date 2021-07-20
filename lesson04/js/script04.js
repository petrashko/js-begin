"use strict"

// Задание 1
const numberToObject = (num) => {
    if ((num < 0) || (num > 999)) {
        console.log('Ошибка: число должно быть в интервале [0, 999]');
        return {};
    }

    const obj = {
        units: 0,
        dozens: 0,
        hundreds: 0,
    }

    obj.units = num % 10;

    num = num - obj.units;
    if (num === 0) {
        return obj;
    }

    obj.dozens = Math.round((num % 100) / 10);

    num = num - (obj.dozens * 10);
    if (num === 0) {
        return obj;
    }

    obj.hundreds = Math.round(num / 100);

    return obj;
}


// Задание 2.2
const classProduct = {
    id: null,
    categoryId: null,
    title: null,
    price: null
}

//
classProduct.id = 1; classProduct.title = 'Рога'; classProduct.price = 9.4;
const product1 = Object.assign({}, classProduct);
//
classProduct.id = 2; classProduct.title = 'Копыта'; classProduct.price = 7.9;
const product2 = Object.assign({}, classProduct);
//
classProduct.id = 3; classProduct.title = 'Хвосты'; classProduct.price = 4.7;
const product3 = Object.assign({}, classProduct);

const cart = {
    // Общая стоимость товаров в корзине
    cost: 0,
    
    // Список товаров в корзине
    productList: [
        {product: product1, amount: 2},
        {product: product2, amount: 4},
        {product: product3, amount: 1}
    ],

    // Задание 2.3
    getCost() {
        let total = 0;
        // Перебрать все товары в корзине
        this.productList.forEach((item, index, scr) => {
            // item.product.title: название
            // item.product.price: цена
            // item.amount: количество
            const cost = item.product.price * item.amount;
            total = total + cost;
        });

        // Округлить до двух знаков после запятой
        this.cost = Math.floor(total * 100) / 100;
        return this.cost;
    }
}

// Задание 3

// Теже объекты, что и в задание 2.2. Плюс объект категория товара
const classCategory = {
    id: null,
    name: ''
}

const classCatalog = {
    // Массив категорий
    categoryList: [
        {
            // Массив с объектами товаров конкретной категории
            categoryId: [
                {productId: 1}, {productId: 2}, {productId: 3}
            ]
        },
        {
            // Массив с объектами товаров конкретной категории
            categoryId: [
                {productId: 4}, {productId: 5}, {productId: 6}
            ]
        },
        // ...
        {
            // Массив с объектами товаров конкретной категории
            categoryId: [
                {productId: 97}, {productId: 98}, {productId: 99}
            ]
        }
    ]
}

//*******************************************************************

const Lesson04 = {
    run: () => {
        console.log('Lesson 4');
        console.log();
        let res = numberToObject(0);
        console.log(`task1: 0 => единицы: ${res.units}; десятки: ${res.dozens}; сотни: ${res.hundreds};`);
        res = numberToObject(9);
        console.log(`task1: 9 => единицы: ${res.units}; десятки: ${res.dozens}; сотни: ${res.hundreds};`);
        res = numberToObject(50);
        console.log(`task1: 50 => единицы: ${res.units}; десятки: ${res.dozens}; сотни: ${res.hundreds};`);
        res = numberToObject(74);
        console.log(`task1: 74 => единицы: ${res.units}; десятки: ${res.dozens}; сотни: ${res.hundreds};`);
        res = numberToObject(100);
        console.log(`task1: 100 => единицы: ${res.units}; десятки: ${res.dozens}; сотни: ${res.hundreds};`);
        res = numberToObject(945);
        console.log(`task1: 945 => единицы: ${res.units}; десятки: ${res.dozens}; сотни: ${res.hundreds};`);
        console.log('task1: 1000 =>');
        res = numberToObject(1000);
        console.log();
        cart.getCost();
        console.log(`task2.3: => Стоимость корзины = ${cart.cost}`);
    }
}

export {
    Lesson04
};