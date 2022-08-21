import { Cell } from "./cell";
import { GameSetting } from "./game-settings";
import { Grid } from "./grid";
import { Player } from "./player";

export class Game {
  isRunning = false;
  isEnded = false;
  winner: Player;


  private _players: Player[];
  public get players(): Player[] {
    return this._players;
  }
  public set players(v: Player[]) {
    this._players = v;
  }

  activePlayer: Player;

  private _setting: GameSetting;
  public get setting(): GameSetting {
    return this._setting;
  }
  private set setting(v: GameSetting) {
    this._setting = v;
  }

  private _grid: Grid;
  public get grid(): Grid {
    return this._grid;
  }
  private set grid(v: Grid) {
    this._grid = v;
  }

  moveCount = 0;

  constructor(setting: GameSetting) {
    this.setting = setting;
    this.grid = new Grid(setting.gridColCount);
    this.players = setting.players;
    this.activePlayer = setting.players[0];
  }

  isWin(cell: Cell) {
    return this.isLineWin(cell, 'HORIZONTAL') || this.isLineWin(cell, 'VERTICAL') || this.isDiagonalWin(cell);
  }

  isLineWin(cell: Cell, direction: 'VERTICAL' | 'HORIZONTAL'): boolean {
    let currentRow = cell.x;
    let currentCol = cell.y;
    let consecutiveSymbolCount = this.setting.consecutiveSymbolCount;
    let length = this.setting.gridColCount;
    let count = 1;
    let player = this.activePlayer;

    if (direction == 'HORIZONTAL') {
      for (let colIdx = currentCol + 1; colIdx < currentCol + consecutiveSymbolCount; colIdx++) {
        if (colIdx >= length) break;

        let neighborCell = this.grid.cells[currentRow][colIdx]
        if (!neighborCell.player) break;

        if (neighborCell.player.id == player.id) count++;
        if (count == consecutiveSymbolCount) return true;
      }

      for (let colIdx = currentCol - 1; colIdx > currentCol - consecutiveSymbolCount; colIdx--) {
        if (colIdx < 0) break;

        let neighborCell = this.grid.cells[currentRow][colIdx]
        if (!neighborCell.player) break;

        if (neighborCell.player.id == player.id) count++;
        if (count == consecutiveSymbolCount) return true;
      }
    } else {
      for (let rowIdx = currentRow + 1; rowIdx < currentRow + consecutiveSymbolCount; rowIdx++) {
        if (rowIdx >= length) break;

        let neighborCell = this.grid.cells[rowIdx][currentCol]
        if (!neighborCell.player) break;

        if (neighborCell.player.id == player.id) count++;
        if (count == consecutiveSymbolCount) return true;
      }

      for (let rowIdx = currentRow - 1; rowIdx > currentRow - consecutiveSymbolCount; rowIdx--) {
        if (rowIdx < 0) break;

        let neighborCell = this.grid.cells[rowIdx][currentCol]
        if (!neighborCell.player) break;

        if (neighborCell.player.id == player.id) count++;
        if (count == consecutiveSymbolCount) return true;
      }
    }

    return false;
  }

  isDiagonalWin(cell: Cell) {
    let currentRow = cell.x;
    let currentCol = cell.y;
    let consecutiveSymbolCount = this.setting.consecutiveSymbolCount;
    let length = this.setting.gridColCount;
    let count = 1;
    let player = this.activePlayer;

    for (let index = 1; index < consecutiveSymbolCount; index++) {
      let nextX = currentRow - index;
      let nextY = currentCol - index;
      if (nextY < 0 || nextX < 0) break;
      let neighborCell = this.grid.cells[nextX][nextY];

      if (neighborCell.player && neighborCell.player == player) count++;
      else break;
    }
    for (let index = 1; index < consecutiveSymbolCount; index++) {
      let nextX = currentRow + index;
      let nextY = currentCol + index;
      if (nextY >= length || nextX >= length) break;
      let neighborCell = this.grid.cells[nextX][nextY];

      if (neighborCell.player && neighborCell.player == player) count++;
      else break;

    }
    if (count == consecutiveSymbolCount) return true;
    count = 1;
    for (let index = 1; index < consecutiveSymbolCount; index++) {
      let nextX = currentRow + index;
      let nextY = currentCol - index;
      if (nextY < 0 || nextX >= length) break;
      let neighborCell = this.grid.cells[nextX][nextY];

      if (neighborCell.player && neighborCell.player == player) count++;
      else break;
    }
    for (let index = 1; index < consecutiveSymbolCount; index++) {
      let nextX = currentRow - index;
      let nextY = currentCol + index;
      if (nextY >= length || nextX < 0) break;
      let neighborCell = this.grid.cells[nextX][nextY];

      if (neighborCell.player && neighborCell.player == player) count++;
      else break;
    }


    return count == consecutiveSymbolCount;
  }

  isOutOfMove() {
    console.log(this.moveCount);

    return this.moveCount >= (Math.pow(this.setting.gridColCount, 2) - 1);
  }
}
