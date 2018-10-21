import { Component, OnInit } from '@angular/core';
import {LobbyService} from '../../services/lobby.service';
import {AppService} from '../../services/app.service';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public ls: LobbyService, public as: AppService, public gs: GameService) { }

    public leaveHandler() {
        this.ls.leaveGame();
        this.as.gameStarted = false;
    }

  ngOnInit() {
  }

}
