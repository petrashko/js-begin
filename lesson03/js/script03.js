"use strict"

// Задание 1
function isPrimitive(num) {
    let flag = true;
    for (let i = 2; i < num; i++) {
        if ((num % i) === 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

const task1 = () => {
    const result = [];
    let i = 0;
    while (i <= 100) {
        if (isPrimitive(i)) {
            result.push(i);
        }
        i++;
    }
    return result;
}

// Задание 3a
const cart = [
    ['Рога', 9.4, 2],
    ['Копыта', 7.9, 4],
    ['Хвосты', 4.7, 1],
];

// Задание 3b
function countBasketPrice() {
    let total = 0;
    // Перебрать все товары в корзине
    cart.forEach((item, index, scr) => {
        // item[0]: название
        // item[1]: количество
        // item[2]: цена
        const cost = item[1] * item[2];
        total = total + cost;
    });

    // Округлить до двух знаков после запятой
    total = Math.floor(total * 100) / 100;
    return total;
}

const task3b = () => {
    return countBasketPrice();
}

// Задание 4
const task4 = () => {
    const result = [];
    for (let i=0; i < 10; result.push(i), i++) {
        //
    }
    return result;
}

// Задание 5
const task5 = () => {
    for (let row=0; row < 20; row++) {
        let str = '';
        for (let k=1; k <= row+1; k++) {
            str = str + '*';
        }
        console.log(str);
    }
}

const Lesson03 = {
    run: () => {
        console.log('Lesson 3');
        console.log();
        let res = task1();
        console.log(`task1: => ${res}`);
        console.log();
        console.log('task3a:');
        console.log(cart);
        console.log();
        console.log(`task3b: => Стоимость корзины = ${task3b()}`);
        console.log();
        res = task4();
        console.log(`task4: => ${res}`);
        console.log();
        console.log('task5:');
        task5();
    }
}

export {
    Lesson03
};