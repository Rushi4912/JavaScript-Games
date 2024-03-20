// Define html element
const board = document.getElementById("game-board");
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let gridSize = 20;

function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

draw();

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// Draw food
function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

function generateFood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * gridSize) + 1;
    y = Math.floor(Math.random() * gridSize) + 1;
  } while (snake.some((segment) => segment.x === x && segment.y === y)); // Ensure food doesn't overlap with snake
  return { x, y };
}
 // Call draw function to display the snake and food
