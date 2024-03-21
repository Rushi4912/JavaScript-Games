// Define html element

document.addEventListener('DOMContentLoaded', () => {
  draw();
});

document.addEventListener('keydown', (event) => {
  const key = key.event;
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
  
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > 1) {
    
    return;
  }
  snake.unshift(head);
  snake.pop();
  draw();
});

  const board = document.getElementById("game-board");
  let snake = [{ x: 10, y: 10 }];
  let food = generateFood();
  let gridSize = 20;
  function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
  }

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
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
  }
 
function move() {
      

}
