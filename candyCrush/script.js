document.addEventListener('DOMContentLoaded', () => {
     
     const grid = document.querySelector(".grid");
     const width = 8;
     const squares = [];
     const candyColor = [
          'red',
          'yellow',
          'orange',
          'purple',
          'green',
          'blue'
     ]

     // create a board
     function createBoard() {
          for (let i = 0; i < width * width; i++){
               const square = document.createElement('div');
               square.setAttribute('draggable', true); // for dragging the square
               square.setAttribute('id', i);
               const randomColor = Math.floor(Math.random() * candyColor.length);
               square.style.backgroundColor = candyColor[randomColor];
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


     function checkRowForThree(){

          for (let i = 0; i < 61; i++){

               let rowOfThree = [i, i + 1, i + 2];
               let decideColor = squares[i].style.backgroundColor;
               const isBlank = squares[i].style.backgroundColor = '';

               if (rowOfThree.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)) {
                    
                    rowOfThree.forEach(index => {
                         squares[index].style.backgroundColor = '';
                    })
               }
          }
     }
})