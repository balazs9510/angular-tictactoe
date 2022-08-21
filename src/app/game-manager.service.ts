import { Injectable } from '@angular/core';
import { Cell } from './models/cell';
import { Game } from './models/game';
import { GameSetting } from './models/game-settings';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  activeGame: Game;

  constructor() { }

  startNewGame(setting: GameSetting) {
    return new Game(setting);
  }

  setActiveGame(game: Game) {
    this.activeGame = game;
  }

  playerMove(cell: Cell) {
    if (!this.activeGame.isRunning || cell.player) return;

    cell.player = this.activeGame.activePlayer;
    console.log(cell);

    if (this.activeGame.isWin(cell)) {
      this.endGame();
      this.activeGame.winner = this.activeGame.activePlayer;
    } else if (this.activeGame.isOutOfMove()) {
      this.endGame();
    } else
      this.activeGame.activePlayer = this.activeGame.players[++this.activeGame.moveCount % 2];
  }
  endGame() {
    this.activeGame.isRunning = false;
    this.activeGame.isEnded = true;
  }
}
