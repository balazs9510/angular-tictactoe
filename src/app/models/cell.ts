import { Player } from "./player";

export class Cell {
  x: number;
  y: number;
  player: Player | null  = null;

  constructor(x :number, y: number) {
    this.x = x;
    this.y = y;
  }
}
