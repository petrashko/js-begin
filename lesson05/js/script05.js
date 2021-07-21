"use strict"

// Задание 1 - генерация шахматной доски
const task1 = () => {
    const letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const borderStyle = '1px solid black';
    
    const board = document.querySelector('.chess-board');
    
    for (let row=0; row < 9; row++) {
        const rowDiv = document.createElement('div');
        //console.log(rowDiv);
        rowDiv.classList.add('chess-board-row');
        board.append(rowDiv);
    
        for (let col=0; col < 9; col++) {
            const colDiv = document.createElement('div');
            colDiv.classList.add('chess-board-cell');
            colDiv.classList.add('text-center');
            // Выводим буквы
            if ((row === 0) && (col > 0)) {
                colDiv.textContent = letterList[col-1];
                colDiv.style.borderBottom = borderStyle;
            }
            // Выводим цифры
            if ((col === 0) && (row > 0)) {
                colDiv.textContent = row;
                colDiv.style.borderRight = borderStyle;
            }
            // Раскрасить доску
            if ((col > 0) && (row > 0)) {
                if (((row % 2 === 1) && (col % 2 === 1)) || ((row % 2 === 0) && (col % 2 === 0))) {
                    colDiv.style.backgroundColor = '#000000';
                }
                else {
                    colDiv.style.backgroundColor = '#FFFFFF';
                }
            }
            // Добавить границу справа и снизу
            if ((row === 8) && (col > 0)) {
                colDiv.style.borderBottom = borderStyle
            }
            if ((col === 8) && (row > 0)) {
                colDiv.style.borderRight = borderStyle;
            }
                        
            rowDiv.append(colDiv);
        }
    }
}

// Задание 2 - вывод информации о корзине
const cart = {
    // Список товаров в корзине
    productList: [
        {title: 'Рога', price: 9.4, amount: 2},
        {title: 'Копыта', price: 7.9, amount: 4},
        {title: 'Хвосты', price: 4.7,  amount: 1}
    ],

    getInfo() {
        if (this.productList.length === 0) {
            return 'Корзина пуста';
        }

        // Вычислить стоимость товаров в корзине
        let cost = this.productList.reduce((total, item, index, srcList) => {
            return total + item.price * item.amount;
        }, 0);

        // Округлить до двух знаков после запятой
        cost = Math.floor(cost * 100) / 100;
        return `В корзине: ${this.productList.length} товаров на сумму ${cost} рублей`;
    }
}

// Задание 2.2
const task2_2 = () => {
    const cartDiv = document.querySelectorAll('.cart-info')[1];
    const infoStr = cart.getInfo();
    cartDiv.insertAdjacentHTML('beforeend', `<p>${infoStr}</p>`);
}

// Задание 2.1
const task2_1 = () => {
    const cartDiv = document.querySelectorAll('.cart-info')[0];
    // Пустая корзина
    cart.productList = [];
    const infoStr = cart.getInfo();
    cartDiv.insertAdjacentHTML('afterbegin', `<p>${infoStr}</p>`);
}

// Задание 3 - вывод товаров из каталога при загрузке страницы
const catalog = [
    {title: 'Рога', price: 9.4, amount: 2},
    {title: 'Копыта', price: 7.9, amount: 4},
    {title: 'Хвосты', price: 4.7,  amount: 1}
];

const createCatalog = () => {
    const catalogDiv = document.getElementById('catalog');
    
    let paragrafList = catalog.map((item, index) => {
        return `<p>Товар: ${item.title}; Цена: ${item.price}; Количество: ${item.amount}</p>`;
    });

    catalogDiv.insertAdjacentHTML('beforeend', paragrafList.join(''));
}

const task3 = () => {
    window.addEventListener('load', createCatalog);
}

//*******************************************************************

const Lesson05 = {
    run: () => {
        console.log('Lesson 5');
        console.log();
        task1();
        task2_2();
        task2_1();
        task3();
    }
}

export {
    Lesson05
};