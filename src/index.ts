import { Tile } from './types';
import { createBoard, clearBoard } from './board';
import { showMessage, hideMessage } from './message';
import { createButton } from './Button';

// CSS class names
const classes = {
  BUTTON_CONTAINER: 'btn-container',
  BOARD_CONTAINER: 'board',
  START_GAME_BUTTON: 'btn start-game-btn',
} 

const board = createBoard({
  onPlayerWon() {
    showMessage('"X" won the game!');
  },
  onIAWon() {
    showMessage('"O" won the game!');
  },
  onTie() {
    showMessage('Tie!');
  }
});

function render(board: Tile[], placeEl: HTMLElement) {
  board.forEach((tile: Tile) => {
    placeEl.appendChild(tile.element);
  })
}

const startNewGameBtn = createButton({
  innnerText: 'Start New Game',
  className: classes.START_GAME_BUTTON,
  onClick() {
    hideMessage();
    clearBoard(board);
  }
});

const btnContainer = document.querySelector('.' + classes.BUTTON_CONTAINER)!;
btnContainer.appendChild(startNewGameBtn);

render(
  board,
  document.querySelector('.' + classes.BOARD_CONTAINER)!
);
