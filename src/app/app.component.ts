import { Component, OnInit } from '@angular/core';
import { GameManagerService } from './game-manager.service';
import { GameSetting } from './models/game-settings';
import { Player } from './models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  player1 = 'Player1';
  player2 = 'Player2';

  gameSettings: GameSetting = {
    consecutiveSymbolCount: 3,
    gridColCount: 3,
    players: this.getPlayers()
  };
  starterPlayer: string;
  nonStarterPlayer: string;

  constructor(public gameManager: GameManagerService) {
    this.resetGame()
  }

  startGame() {
    if (this.gameManager.activeGame.isRunning) return;
    this.resetGame();
    this.gameManager.activeGame.isRunning = true;
  }

  resetGame() {
    this.gameSettings.players = this.getPlayers();
    let newGame = this.gameManager.startNewGame(this.gameSettings)
    this.gameManager.setActiveGame(newGame);
  }


  getPlayers(): Player[] {
    return [{ id: this.player1, symbol: 'X' }, { id: this.player2, symbol: 'O' }];
  }
}
