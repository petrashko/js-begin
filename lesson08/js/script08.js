"use strict"

const test = () => {
    if (!("a" in window)) {
        var a = 1;
    }
    console.log(a);  // => 1
    
    var b = function a(x) {
        x && func1(--x);
    };
    console.log(a);  // => 1
    
    function fuc2(x) {
        return x * 2;
    }
    var func2;
    console.log(func2); // => Понятия не имею )))
    
    function func3(x, y, a) {
        arguments[2] = 10;  // => 3
        console.log(a);
    }
    func3(1, 2, 3);
    
    function func4() {
        console.log(this);  // => null
    }
    func4.call(null);
}

//*******************************************************************

const Lesson08 = {
    run: () => {
        console.log('Lesson 8');
        console.log();
        test();
    }
}

export {
    Lesson08
};