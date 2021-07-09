"use strict"

function celsiusToFahrenheit(degrees) {
    const fahr = degrees * (9 / 5) + 32;
    console.log(`${degrees} градусов по Цельсию: ${fahr} по Фаренгейту`);
}

function copyString() {
    const name = 'Василий';
    let admin = null;
    admin = name.slice(0, name.length);
    console.log(`admin: ${admin}`);
}

class MyTest {
    funcTest() {
        const tmp = 1000 + "108";
        console.log('1000 + "108" = ' + tmp);
    }
}

const Lesson01 = {
    run: () => {
        celsiusToFahrenheit(19);
        //
        copyString();
        //
        const myTest = new MyTest();
        myTest.funcTest();
    }
}

export {
    Lesson01
};