import { Component, OnInit } from '@angular/core';
import { GameManagerService } from '../game-manager.service';
import { Cell } from '../models/cell';
import { Grid } from '../models/grid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {
  constructor(public gameManager: GameManagerService) {
  }

  ngOnInit(): void {
  }

  onCellClick(cell: Cell){
    this.gameManager.playerMove(cell);
  }
}
