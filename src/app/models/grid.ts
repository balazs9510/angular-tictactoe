import { Cell } from "./cell";

export class Grid {
  cells: Cell[][];

  constructor(length: number) {
    this.initialize(length);
  }
  initialize(length: number) {
    this.cells = new Array(length);
    for (let col = 0; col < length; col++) {
      this.cells[col] = new Array(length);
      for (let row = 0; row < length; row++) {
        this.cells[col][row] = new Cell(col, row);
      }
    }
  }
}
