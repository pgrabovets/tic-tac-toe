import { Tile } from './types';
import { getAIMove } from './AIPlayer';

// CSS class names
const classes = {
  TILE_ITEM: 'tile'
}

export enum TileValue {
  X = 'x',
  O = 'o',
  EMPTY = ''
}

enum GameState {
  playing,
  wonPlayer,
  wonAI,
  gameTie,
}

interface BoardOptions {
  onPlayerWon(): void;
  onIAWon(): void;
  onTie(): void
}

let state = GameState.playing;

export function getWinner(board: Tile[]) {
  const winnigCombo: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4 ,6]
  ];

  let winner: string = TileValue.EMPTY;

  winnigCombo.forEach((line: number[]) => {
    let result:string = line.reduce((prev: string, index: number) => {
      return prev + board[index].value;
    }, TileValue.EMPTY);
    if (result == 'xxx') winner = TileValue.X;
    if (result === 'ooo') winner = TileValue.O;
  });

  return winner;
}

function checkTie(board: Tile[]): boolean {
  let  isTied: boolean = true;
  const emptyTile = board.find((tile: Tile) => {
    return tile.value == TileValue.EMPTY; 
  });
  if (emptyTile) isTied = false;
  return  isTied;
}

function update(board: Tile[], playerMoveIndex: number, opt: BoardOptions) {
  const playerTile = board[playerMoveIndex];
  if (playerTile.value != TileValue.EMPTY) return;
  if (state != GameState.playing) return;
  
  playerTile.value = TileValue.X;
  playerTile.element.innerText = playerTile.value;

  if (getWinner(board) == TileValue.X) {
    state = GameState.wonPlayer;
    opt.onPlayerWon();
    return;
  }

  const aiMoveIndex: number = getAIMove(board);
  const aiTile = board[aiMoveIndex];
  if (aiMoveIndex != -1) {
    aiTile.value = TileValue.O;
    aiTile.element.innerText = aiTile.value;
  }

  if (getWinner(board) == TileValue.O) {
    state = GameState.wonAI;
    opt.onIAWon();
    return;
  }

  if (checkTie(board)) {
    state = GameState.gameTie;
    opt.onTie();
    return;
  }
}

function createTileElement(id: number, className: string, content: string, onClick: (id: number) => void) {
  const tileEl: HTMLDivElement = document.createElement('div');
  tileEl.addEventListener('click', () => onClick(id));
  tileEl.className = className;
  tileEl.id = `tile-${id}`;
  tileEl.textContent = content;
  return tileEl;
}

export function clearBoard(board: Tile[]) {
  board.forEach((tile: Tile) => {
    tile.value = TileValue.EMPTY;
    tile.element.innerText = TileValue.EMPTY;
  })
  state = GameState.playing;
}

export function createBoard(opt: BoardOptions) { 
  let board: Tile[] = [];

  const handleClick = (id: number) => {
    update(board, id, opt);
  }

  for (let index = 0; index < 9; index++) {
    const value: string = TileValue.EMPTY;
    const tileEl: HTMLElement = createTileElement(index, classes.TILE_ITEM, value, handleClick);
    const tile: Tile = {
      id: index,
      value,
      element: tileEl
    }
    board.push(tile);
  }

  return board;
}
