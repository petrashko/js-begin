"use strict"

const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
    // END: validate() {
};

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);

                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    render(snakePointsArray, foodPoint, obstaclePointList) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

        // obstaclePoinList: Массив с точками препятствий
        obstaclePointList.forEach((obstaclePoint, index) => {
            const obstacleCell = this.cells[`x${obstaclePoint.x}_y${obstaclePoint.y}`];
            obstacleCell.classList.add('obstacle');
            this.usedCells.push(obstacleCell);
        });
    },
};

const snake = {
    config: config,
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some((snakePoint) => {
            return snakePoint.x === point.x && snakePoint.y === point.y;
        });
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextStepHeadPoint());
        this.getBody().pop();
    },

    growUp() {
        const lastBodyIdx = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIdx];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        this.getBody().push(lastBodyPointClone);
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];
        // Задание 3 - убрать границы поля
        let newX = firstPoint.x;
        let newY = firstPoint.y;

        switch(this.direction) {
            case 'up':
                //return {x: firstPoint.x, y: firstPoint.y - 1};
                newY--;
                if (newY < 0) {
                    // Змейка появляется снизу
                    newY = this.config.getRowsCount() - 1;
                }
                break;
            case 'right':
                //return {x: firstPoint.x + 1, y: firstPoint.y};
                newX++;
                if (newX >= this.config.getColsCount()) {
                    // Змейка появляется слева
                    newX = 0;
                }
                break;
            case 'down':
                //return {x: firstPoint.x, y: firstPoint.y + 1};
                newY++;
                if (newY >= this.config.getRowsCount()) {
                    // Змейка появляется сверху
                    newY = 0;
                }
                break;
            case 'left':
                //return {x: firstPoint.x - 1, y: firstPoint.y};
                newX--;
                if (newX < 0) {
                    // Змейка появляется справа
                    newX = this.config.getColsCount() - 1;
                }
                break;
        }

        return {x: newX, y: newY};
    },
};

/*
const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};
*/

// Чтобы не дублировать код (для препятствия), решил создать класс
class Point2D {
    x = null;
    y = null;

    constructor() {
        //
    }

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    }

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    }

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    }
}

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food: new Point2D(),
    // Задание 2 - временные препятствия на поле
    // obstaclePoinList: Массив с точками препятствий
    obstaclePointList: [new Point2D(), new Point2D(), new Point2D(), new Point2D(), new Point2D()],
    status,

    tickInterval: null,
    obstacleInterval: null,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
               console.error(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.setEventHandlers();
        this.reset();
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
    },

    playClickHandler() {
        if (this.status.isPlaying()) this.stop();
        else if (this.status.isStopped()) this.play();
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        // Сгенерировать массив с точками препятствий
        this.getObstaclePointList();
        this.updateScore();
        this.render();
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    getRandomFreeCoordinates() {
        // this.obstaclePointList: Массив с точками препятствий
        const exclude = [this.food.getCoordinates(), ...this.obstaclePointList, ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            }

            if (!exclude.some((exPoint) => exPoint.x === rndPoint.x && exPoint.y === rndPoint.y)) return rndPoint;
        }
    },

    // Сгенерировать массив с точками препятствий
    getObstaclePointList() {
        this.obstaclePointList.forEach((obstaclePoint, index) => {
            obstaclePoint.setCoordinates(this.getRandomFreeCoordinates());
        });
    },

    play() {
        this.status.setPlaying();
        //
        this.tickInterval = setInterval(() => {
            this.tickHandler();
        }, 1000 / this.config.getSpeed());

        // Каждые 10 секунд обновлять точки с новыми препятствиями
        // и удалить старые
        this.obstacleInterval = setInterval(() => {
            // Сгенерировать массив с точками препятствий
            this.getObstaclePointList();
        }, 10000);
        
        this.setPlayButton('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        // Остановить генерацию препятсвий
        clearInterval(this.obstacleInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        // Остановить генерацию препятсвий
        clearInterval(this.obstacleInterval);
        this.setPlayButton('Игра закончена', true);
    },

    tickHandler() {
        if (!this.canMakeStep()) {
            return this.finish();
        }
    
        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            this.updateScore();

            if (this.isGameWon()) this.finish();
        }

        this.snake.makeStep();
        this.render();
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        let flag = false;
        // this.obstaclePointList: Массив с точками препятствий
        for (let obstaclePoint of this.obstaclePointList) {
            // Столкнулись с препятствием
            if (obstaclePoint.isOnPoint(nextHeadPoint) === true) {
                flag = true;
                break;
            }

        }

        return !this.snake.isOnPoint(nextHeadPoint) &&
            // Столкнулись с препятствием
            !flag; //&&
            // Задание 3 - убрать границы поля
            /*
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
            */
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.obstaclePointList);
    },

    // Задание 1 - Вывод баллов
    updateScore() {
        const spanScore = document.getElementById('score');
        spanScore.textContent = this.snake.getBody().length - 1;
        if (this.isGameWon()) {
            spanScore.textContent += ' Вы победили!!!';
        }
    }
};

//*******************************************************************

const Lesson07 = {
    run: () => {
        console.log('Lesson 7');
        console.log();
        //
        game.init({rowsCount: 30, colsCount: 30, speed: 1, winFoodCount: 5});
    }
}

export {
    Lesson07
};