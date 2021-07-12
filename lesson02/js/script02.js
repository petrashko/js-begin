"use strict"

// Задание 2
const task2 = () => {
    let a = 2;
    let x = 1 + (a *= 2);
    console.log(`task2: 1 + (2 *= 2) => ${x}`);
}

// Задание 3
const task3 = (a, b) => {
    let result = null;
    if ((a >= 0) && (b >= 0)) {
        result = a - b;
    }
    else if ((a < 0) && (b < 0)) {
        result = a * b;
    }
    else {
        result = a + b;
    }
    return result;
}

// Задание 4
const task4 = (a) => {
    const result = [];
    switch(a) {
        case 0: result.push(a++);
        case 1: result.push(a++);
        case 2: result.push(a++);
        case 3: result.push(a++);
        case 4: result.push(a++);
        case 5: result.push(a++);
        case 6: result.push(a++);
        case 7: result.push(a++);
        case 8: result.push(a++);
        case 9: result.push(a++);
        case 10: result.push(a++);
        case 11: result.push(a++);
        case 12: result.push(a++);
        case 13: result.push(a++);
        case 14: result.push(a++);
        case 15: result.push(a++); break;
        default:
            return 'Введите число в промежутке [0..15]';
    }
    return result;
}

// Задание 5, 6
class MyMath {
    sum = (a, b) => a + b;
    subtract = (a, b) => a - b;
    multiply = (a, b) => a * b;
    division = (a, b) => a / b;
    //
    mathOperation = (a, b, op) => {
        let result = null;
        switch(op.trim()) {
            case '+':
                result = this.sum(a, b);
                break;
            case '-':
                result = this.subtract(a, b);
                break;
            case '*':
                result = this.multiply(a, b);
                break;
            case '/':
                result = this.division(a, b);
                break;
            default:
                result = null;
        }
        return result;
    }
}

// Задание 7
const task7 = () => {
    console.log(`task7: null == 0 => ${null == 0}`);
    console.log(`task7: null === 0 => ${null === 0}`);
}

// Задание 8
const task8 = (val, pow) => {
    if (pow === 1) {
        return val;
    }
    return val * task8(val, pow-1);
}

const Lesson02 = {
    run: () => {
        console.log('Lesson 2');
        console.log();
        task2();
        console.log();
        console.log(`task3: 5, 4 => ${task3(5, 4)}` );
        console.log(`task3: -5, -4 => ${task3(-5, -4)}` );
        console.log(`task3: -5, 4 => ${task3(-5, 4)}` );
        console.log();
        console.log('task4: 0 => ' + task4(0));
        console.log('task4: 9 => ' + task4(9));
        console.log('task4: 15 => ' + task4(15));
        console.log('task4: 20 => ' + task4(20));
        console.log();
        const myMath = new MyMath();
        console.log(`task5: 5 + 10 => ${myMath.sum(5, 10)}` );
        console.log(`task5: 5 - 10 => ${myMath.subtract(5, 10)}` );
        console.log(`task5: 5 * 10 => ${myMath.multiply(5, 10)}` );
        console.log(`task5: 5 / 10 => ${myMath.division(5, 10)}` );
        console.log();
        console.log(`task6: 5 + 10 => ${myMath.mathOperation(5, 10, '+')}` );
        console.log(`task6: 5 - 10 => ${myMath.mathOperation(5, 10, '-')}` );
        console.log(`task6: 5 * 10 => ${myMath.mathOperation(5, 10, '*')}` );
        console.log(`task6: 5 / 10 => ${myMath.mathOperation(5, 10, '/')}` );
        console.log();
        task7();
        console.log();
        console.log(`task8: 2 ** 8 => ${task8(2, 8)}` );
        console.log();
    }
}

export {
    Lesson02
};