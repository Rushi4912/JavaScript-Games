// define html element
const board = document.getElementById("game-board");
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let gridSize = 20;

function draw(){

     board.innerHTML = '';
     drawSnake();
}
// draw snake
function drawSnake() {
     snake.forEach((segment) => {
          const snakeElement = createGameElement('div', 'snake');
           setPosition(snakeElement, segment);
           board.appendChild(snakeElement);
     });

}

function createGameElement(tag,className) {
     const element = document.createElement(tag);
     element.className = className;
     return element;

}
function setPosition(element, position) {
     element.style.gridColumn = position.x;
     element.style.gridRow = position.y;
}
// draw();

// draw function food
function drawFood() {
     const foodElement = createGameElement('div', 'food');
     setPosition(foodElement, food);
     board.appendChild(foodElement);
}

function generateFood() {
     const x = Math.floor(Math.random()*gridSize) + 1;
     const y = Math.floor(Math.random() * gridSize) + 1;
     return { x, y };
}