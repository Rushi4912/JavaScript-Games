document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  const candyColors = [
    "url(images/red-candy.png)",
    "url(images/yellow-candy.png)",
    "url(images/orange-candy.png)",
    "url(images/purple-candy.png)",
    "url(images/green-candy.png)",
    "url(images/blue-candy.png)",
  ];
  let score = 0;
  function playMatchSound() {
    const matchSound = document.getElementById("matchSound");
    matchSound.play();
  }


  // create a board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true); // for dragging the square
      square.setAttribute("id", i);
      const randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

  // drag the candies
  let colorBeingDragged;
  let colorBeingReplaced;
  let colorIdBeingDragged;
  let colorIdBeingReplaced;
  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    colorIdBeingDragged = parseInt(this.id);
    console.log(this.id, "dragStart");
  }

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragOver");
  }
  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragEnter");
  }
  function dragLeave() {
    console.log(this.id, "dragLeave");
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    colorIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[colorIdBeingDragged].style.backgroundImage = colorBeingReplaced;

    console.log(this.id, "dragDrop");
  }

  function dragEnd() {
    // Check if the move is valid
    let validMoves = [
      colorIdBeingDragged - 1,
      colorIdBeingDragged - width,
      colorIdBeingDragged + 1,
      colorIdBeingDragged + width,
    ];

    let validMove = validMoves.includes(colorIdBeingReplaced);

    if (colorIdBeingReplaced && validMove) {
      colorIdBeingReplaced = null;
    } else if (colorIdBeingReplaced && !validMove) {
      // If the move is not valid, revert the colors
      let temp = squares[colorIdBeingReplaced].style.backgroundImage;
      squares[colorIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[colorIdBeingDragged].style.backgroundImage = temp;
    } else {
      // If there was no replacement, simply revert the dragged candy
      squares[colorIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }

    // Reset variables
    colorBeingDragged = null;
    colorBeingReplaced = null;
    colorIdBeingDragged = null;
    colorIdBeingReplaced = null;

    console.log(this.id, "dragEnd");
  }

  // checking for matches
  // check for row of three
  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decideColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decideColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        playMatchSound();
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForThree();

  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decideColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decideColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        playMatchSound();

        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnForThree();

  // drop candies

  function moveDown() {
    for (let i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  // check for row of four
  function checkRowForFour() {
    for (let i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decideColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decideColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        playMatchSound();

        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForFour();

  // check for column of four
  function checkColumnForFour() {
    for (let i = 0; i < 47; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decideColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decideColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        playMatchSound();
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnForFour();

  window.setInterval(function () {
    moveDown();
    checkRowForThree();
    checkColumnForThree();
    checkColumnForFour();
    checkRowForFour();
  }, 100);
});
