import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {LobbyService} from '../../services/lobby.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    constructor(public ls: LobbyService, public as: AppService) {
    }

    ngOnInit() {
    }

    public leaveHandler() {
        this.ls.leaveGame();
        this.as.gameStarted = false;
    }

}
