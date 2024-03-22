// Define html element
const board = document.getElementById("game-board");
let snake = [{ x: 10, y: 10 }];
let gridSize = 20;
let food = generateFood();
let direction = { x: 0, y: 0 };
let gameSpeed = 200;
let score = document.getElementById('score');
document.addEventListener("DOMContentLoaded", () => {
  draw();
  setInterval(moveSnake, gameSpeed);
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const head = { ...snake[0] };

  switch (key) {
    case "ArrowUp":
  direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      direction = { x:1, y:0 };
      break;
    default:
      return;
  }
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


function moveSnake(){
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;
  if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
    resetGame();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    // generate random food
    food = generateFood();
    snake.unshift(head);
  } else {
    snake.unshift(head);
    snake.pop();
  }
  draw();
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = { x: 0, y: 0 };

  // update the board 
  draw();
}

function upDateScore() {
  
}