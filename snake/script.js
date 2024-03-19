// define html element
const board = document.getElementById("game-board");
let snake = [{ x: 10, y: 10 }];

function draw(){

     // board.innerHTML = '';
     drawSnake();
}
// draw snake
function drawSnake() {
     snake.forEach((segment) => {
          const snakeElement = createGameElement('div', 'snake');
     });
     setPosition(snakeElement, segment);
     board.appendChild(snakeElement);
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
draw();