import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../../services/app.service';
import {LobbyService} from '../../services/lobby.service';
import {GameService} from '../../services/game.service';
import {Square} from '../../classes/square';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

    private closeGameRef;
    private getGameInfoRef;
    private gameOverRef;
    private drawRef;


    constructor(public ls: LobbyService, public as: AppService, public gs: GameService) {
    }






    public attackHandler(square: Square) {
        this.gs.attack(square);
    }

    ngOnInit() {
        this.closeGameRef = this.ls.closeGame().subscribe(() => {
            this.as.gameStarted = false;
        });

        this.getGameInfoRef = this.gs.getGameInfo().subscribe((data) => {
            this.gs.session = data;
           this.gs.updateBoard(data);
        });

        this.gameOverRef = this.gs.gameOver().subscribe((data) => {
            this.gs.session = data;
            const winner = this.gs.determineWinner(data.from, data.to, data.actualPlayer);
            alert(`Player ${winner} won the game.`);
            this.gs.updateBoard(data);
        });

        this.drawRef = this.gs.draw().subscribe((data) => {
            this.gs.session = data;
            alert(`Nobody win.`);
            this.gs.updateBoard(data);
        });



    }

    ngOnDestroy() {
        this.closeGameRef.unsubscribe();
        this.getGameInfoRef.unsubscribe();
        this.gameOverRef.unsubscribe();
        this.drawRef.unsubscribe();
    }

}
