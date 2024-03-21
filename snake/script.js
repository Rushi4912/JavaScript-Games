// Define html element
const board = document.getElementById("game-board");
let snake = [{ x: 10, y: 10 }];
let gridSize = 20;
let food = generateFood();
document.addEventListener('DOMContentLoaded', () => {
  draw();
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  const head = { ...snake[0] };

  switch (key) {
    case 'ArrowUp':
      head.y -= 1;
      break;
    case 'ArrowDown':
      head.y += 1;
      break;
    case 'ArrowLeft':
      head.x -= 1;
      break;
    case 'ArrowRight':
      head.x += 1;
      break;
    default:
      return;
  }
  
  if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
    
    return;
  }
  snake.unshift(head);
  snake.pop();
  draw();
});
  
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

function drawSnake() {
  snake.forEach((segment) => {
    console.log("inside in drawSnake function");
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
  element.style.gridColumnStart = position.x;
  element.style.gridRowStart = position.y;
}

// Draw food
function drawFood() {
  const foodElement = createGameElement("div", "food");
  console.log("in drawFood function");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
  console.log("after drawFood function");
}
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}
