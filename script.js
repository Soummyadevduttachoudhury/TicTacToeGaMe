document.addEventListener('DOMContentLoaded', () => {
    
    const board = document.getElementById('board');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('resetBtn');
  
    let currentPlayer = 'X';
    let gameActive = true;
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    function handleCellClick(clickedCellEvent) {
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(clickedCell.dataset.index);
   
      if (clickedCell.textContent !== '' || !gameActive) {
        return;
      }
  
      clickedCell.textContent = currentPlayer;
  
      if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
       
      }
  
      if (checkDraw()) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
        
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    function checkWin() {
      return winningConditions.some(condition => {
        return condition.every(index => {
          return board.children[index].textContent === currentPlayer;
        });
      });
      
    }
    
    function checkDraw() {
      return [...board.children].every(cell => {
        return cell.textContent !== '';
      });
      
    }
  
    function resetGame() {
      currentPlayer = 'X';
      gameActive = true;
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
      Array.from(board.children).forEach(cell => {
        cell.textContent = '';
      });
    }
    
    function createBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
      }
    }
    
    resetButton.addEventListener('click', resetGame);
    createBoard();
   
  });
 
 
