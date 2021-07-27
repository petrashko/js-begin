"use strict"

// Задание 1 - кнопки для добавления товаров к корзину

// Каталог товаров
const productList = [
    {id: 1, title: 'Рога', price: 9.4, amount: 0},
    {id: 2, title: 'Копыта', price: 7.9, amount: 0},
    {id: 3, title: 'Хвосты', price: 4.7,  amount: 0}
];

// Корзина
const cart = {
    // Список товаров в корзине
    productList: [],


    addProduct(productId) {
        //console.log(productId);
        let product = this.productList.find((item, index, srcList) => {
            return item.id === parseInt(productId);
        });

        // Если такой товар уже есть в корзине
        if (product) {
            product.amount++;
        }
        // Иначе, добавить новый товар в корзину
        else {
            const newProduct = productList.find((item) => {
                return item.id === parseInt(productId);
            });

            product = Object.assign({}, newProduct);
            this.productList.push(product);
            product.amount++;
        }
    },

    getCost() {
        if (this.productList.length === 0) {
            return 0;
        }

        // Вычислить стоимость товаров в корзине
        let cost = this.productList.reduce((total, item, index, srcList) => {
            return total + item.price * item.amount;
        }, 0);

        // Округлить до двух знаков после запятой
        cost = Math.floor(cost * 100) / 100;
        return cost;
    },

    getInfo() {
        if (this.productList.length === 0) {
            return 'Корзина пуста';
        }
        let info = 'В корзине:';

        this.productList.forEach(item => {
            info += ` ${item.title}: ${item.amount} штук(а) `;
        });
        
        // Вычислить стоимость товаров в корзине
        let cost = this.getCost();
        info += ` <br> на общую сумму ${cost} рублей `;

        return info;
    }
}

// Online магазин
const shop = {
    catalogDiv: null,
    cartDiv: null,

    //
    addToCart(ev) {
        cart.addProduct(ev.target.dataset.productId);
    },

    // Обновить информацию о корзине
    updateInfo() {
        const infoStr = cart.getInfo();
        this.cartDiv.innerHTML = `<p>${infoStr}</p>`;
    },

    //
    init() {
        // Выводим каталог товаров с кнопками "добавить в корзину"
        this.catalogDiv = document.querySelector('.catalog');

        productList.forEach((item, index, srcList) => {
            const prodDiv = document.createElement('div');
            prodDiv.classList.add('text-center');
            prodDiv.style.flexDirection = 'column';
            const prodStr = `Название ${item.title}; Цена ${item.price.toFixed(2)}`;
            prodDiv.insertAdjacentHTML('beforeend', `<p>${prodStr}</p>`);

            const addButton = document.createElement('button');
            addButton.classList.add('add-to-cart');
            addButton.dataset.productId = item.id;
            addButton.textContent = 'Добавить';
            prodDiv.append(addButton);

            // Навесить обработчик добавления товара в корзину
            addButton.addEventListener('click', (event) => {
                this.addToCart(event);
                this.updateInfo();
            });

            this.catalogDiv.append(prodDiv);
        });
        
        
        // Вывод информации о корзине
        this.cartDiv = document.querySelectorAll('.cart-info')[0];
        const infoStr = cart.getInfo();
        this.cartDiv.insertAdjacentHTML('beforeend', `<p>${infoStr}</p>`);
    }
}

// Задание 2 - Слайдер в модальном окне
const carousel = {
    currentNum: 1,
    imgTag: null,
    closeButton: null,
    modalWindow: null,
    modalWrap: null,
    arrowLeft: null,
    arrowRight: null,
    
    thumbs: null,

    init() {
        this.closeButton = document.getElementById('close');
        this.modalWindow = document.getElementById('carousel');
        this.modalWrap = this.modalWindow.querySelector('.carousel-wrap');
        this.arrowLeft = this.modalWindow.querySelector('.carousel-arrow-left');
        this.arrowRight = this.modalWindow.querySelector('.carousel-arrow-right');
        
        this.thumbs = document.getElementById('thumbs');

        // По клику на картинке, открыть модальное окно с выбранным изображением
        this.thumbs.addEventListener('click', (ev) => {
            const thumb = ev.target.closest('li');

            if (!thumb) {
                return;
            }
            ev.preventDefault();

            this.currentNum = thumb.dataset.imageNum;
            //console.log(this.currentNum);
            this.imgTag = document.createElement('img');
            this.imgTag.src = `images/imgProd-${this.currentNum}.jpg`;
            this.imgTag.alt = 'picture';

            this.modalWrap.innerHTML = '';
            this.modalWrap.append(this.imgTag);
            
            this.modalWindow.style.display = 'block';
        });

        // Закрыть модальное окно
        this.closeButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.modalWindow.style.display = 'none';
        });

        // Листаем картинки вперед
        this.arrowRight.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.changeImage(ev, 'forward');
        });

        // Листаем картинки назад
        this.arrowLeft.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.changeImage(ev, 'back');
        });
    },

    changeImage(ev, direction) {
        if (direction === 'forward') { this.currentNum++; }
        else { this.currentNum--; }

        if (this.currentNum > 12) { this.currentNum = 1; }
        if (this.currentNum < 1) { this.currentNum = 12 }

        this.imgTag.src = `images/imgProd-${this.currentNum}.jpg`;
    }
}

//*******************************************************************

const Lesson06 = {
    run: () => {
        console.log('Lesson 6');
        console.log();
        //
        shop.init();
        //
        carousel.init();
    }
}

export {
    Lesson06
};
