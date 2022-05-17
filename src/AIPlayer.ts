import { getRandomNum } from './utils';
import { Tile } from './types';
import { getWinner, TileValue } from './board';


function predictMove(board: Tile[], winner: string) {
  for (let index = 0; index < board.length; index++) {
    const tile: Tile = board[index];
    if (tile.value == TileValue.EMPTY) {
      tile.value = winner;
      if (getWinner(board) == winner) {
        tile.value = TileValue.EMPTY;
        return index;
      }
      tile.value = TileValue.EMPTY;
    }
  }
  return -1;
}

function getRandomMove(board: Tile[], positions: number[]): number {
  const empty = positions.filter((index) => {
    return board[index].value == TileValue.EMPTY;
  });

  if (empty.length > 1) {
    const randomIndex = getRandomNum(0, empty.length-1);
    return empty[randomIndex];
  }

  if (empty.length == 1) {
    return empty[0];
  }

  return -1;
}

export function getAIMove(board: Tile[]): number {
  let AIMoveIndex: number;

  // predict AI win move
  AIMoveIndex = predictMove(board, TileValue.O);
  if (AIMoveIndex != -1) return AIMoveIndex;

  // predict Player win move
  AIMoveIndex = predictMove(board, TileValue.X);
  if (AIMoveIndex != -1) return AIMoveIndex;

  // check center tile
  const CENTER_POS = 4;
  if (board[CENTER_POS].value == TileValue.EMPTY) return CENTER_POS;

  // check corners
  const cornersPosition: number[] = [0, 2, 6, 8];
  AIMoveIndex = getRandomMove(board, cornersPosition);
  if (AIMoveIndex != -1) return AIMoveIndex;

  // check middle
  const middlePosition: number[] = [1, 3, 5, 7];
  AIMoveIndex = getRandomMove(board, middlePosition);
  if (AIMoveIndex != -1) return AIMoveIndex;

  return -1;
}
