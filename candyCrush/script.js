document.addEventListener('DOMContentLoaded', () => {
     
     const grid = document.querySelector(".grid");
     const scoreDisplay = document.getElementById('score');
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

     // create a board
     function createBoard() {
          for (let i = 0; i < width * width; i++){
               const square = document.createElement('div');
               square.setAttribute('draggable', true); // for dragging the square
               square.setAttribute('id', i);
               const randomColor = Math.floor(Math.random() * candyColors.length);
               square.style.backgroundColor = candyColors[randomColor];
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
     squares.forEach(square => square.addEventListener('dragstart', dragStart));
     squares.forEach(square => square.addEventListener('dragend', dragEnd));
     squares.forEach(square => square.addEventListener('dragover', dragOver));
     squares.forEach(square => square.addEventListener('dragenter', dragEnter));
     squares.forEach(square => square.addEventListener('dragleave', dragLeave));
     squares.forEach(square => square.addEventListener('drop', dragDrop));


     function dragStart() {
          colorBeingDragged = this.style.backgroundColor;
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
          colorBeingReplaced = this.style.backgroundColor;
          colorIdBeingReplaced = parseInt(this.id);
          this.style.backgroundColor = colorBeingDragged;
          squares[colorIdBeingDragged].style.backgroundColor = colorBeingReplaced;

          console.log(this.id, 'dragDrop');
     }
     function dragEnd() {
          // for valid move

          let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged  + width,
          ];
          let validMove = validMoves.includes(squareIdBeingReplaced);

          if (squareIdBeingReplaced && validMove) {
               
               squareIdBeingReplaced = null;
          } else if (squareIdBeingReplaced && !validMove) {
               squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
               squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
          } else {
               squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
          }
       console.log(this.id, "dragEnd");
     }


     // checking for matches 
     // check for row of three
     function checkRowForThree(){

          for (let i = 0; i < 61; i++){

               let rowOfThree = [i, i + 1, i + 2];
               let decideColor = squares[i].style.backgroundColor;
               const isBlank = squares[i].style.backgroundColor === '';
               const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

               if (notValid.includes(i)) {
                    continue;
               }

               if (rowOfThree.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)) {
                    score += 3;
                    scoreDisplay.innerHTML = score;
                    rowOfThree.forEach(index => {
                         squares[index].style.backgroundColor = '';
                    })
               }
          }
     }
      checkRowForThree();

     function checkColumnForThree() {
       for (let i = 0; i < 47; i++) {
         let columnOfThree = [i, i + width, i + width*2];
         let decideColor = squares[i].style.backgroundColor;
         const isBlank = squares[i].style.backgroundColor === "";

         if (
           columnOfThree.every(
             (index) =>
               squares[index].style.backgroundColor === decideColor && !isBlank
           )
         ) {
            score += 3;
            scoreDisplay.innerHTML = score;

           columnOfThree.forEach((index) => {
             squares[index].style.backgroundColor = "";
           });
         }
       }
     }
     checkColumnForThree();

     // drop candies

     function moveDown() {
          
          for (let i = 0; i < 55; i++){

               if (squares[i + width].style.backgroundColor === '') {
                    
                    squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
                    squares[i].style.backgroundColor = '';
                    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                    const isFirstRow = firstRow.includes(i);
                    if (isFirstRow && squares[i].style.backgroundColor === '') {
                         let randomColor = Math.floor(Math.random() * candyColors.length);
                         squares[i].style.backgroundColor = candyColors[randomColor];
                    }
               }
          }
     }


     // check for row of four
      function checkRowForFour() {
        for (let i = 0; i < 60; i++) {
          let rowOfFour = [i, i + 1, i + 2,i+3];
          let decideColor = squares[i].style.backgroundColor;
          const isBlank = squares[i].style.backgroundColor === "";
          const notValid = [
            5,6, 7,13, 14, 15, 21,22, 23, 29,30, 31, 37,38, 39,45, 46, 47, 53,54, 55
          ];

          if (notValid.includes(i)) {
            continue;
          }

          if (
            rowOfFour.every(
              (index) =>
                squares[index].style.backgroundColor === decideColor && !isBlank
            )
          ) {
               score += 4;
            scoreDisplay.innerHTML = score;

            rowOfFour.forEach((index) => {
              squares[index].style.backgroundColor = "";
            });
          }
        }
      }
      checkRowForFour();

     // check for column of four
      function checkColumnForFour() {
        for (let i = 0; i < 47; i++) {
          let columnOfFour = [i, i + width, i + width * 2,i+width*3];
          let decideColor = squares[i].style.backgroundColor;
          const isBlank = squares[i].style.backgroundColor === "";

          if (
            columnOfFour.every(
              (index) =>
                squares[index].style.backgroundColor === decideColor && !isBlank
            )
          ) {
               score += 4;
               scoreDisplay.innerHTML = score;
            columnOfFour.forEach((index) => {
              squares[index].style.backgroundColor = "";
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
})