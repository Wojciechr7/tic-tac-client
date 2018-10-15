import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Socket} from 'ngx-socket-io';
import {Square} from '../classes/square';
import {Observable} from 'rxjs';
import {ISession} from '../interfaces/isession';
import {AppSettings} from '../app.const';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private url: string;
    public grid: Square[][];

    constructor(private http: HttpClient, private socket: Socket) {
        this.url = AppSettings.url;

        this.createSquares();

    }

    private createSquares() {
        this.grid = new Array(3).fill(0).map((v, i) => new Array(3).fill(0).map((v, j) => new Square(i, j)));
        this.grid = this.grid.map((col, i) => this.grid.map(row => row[i]));
        this.grid = this.grid.reverse();
    }

    public updateBoard(data: ISession) {
        let squares = data.squares.map((col, i) => data.squares.map(row => row[i]));
        squares = squares.reverse();

        squares.forEach((row, x) => {
           row.forEach((square, y)  => {
               if (squares[x][y].sign !== this.grid[x][y].sign) {
                   this.grid[x][y].sign = squares[x][y].sign;
               }
            });
        });
    }

    public getGameInfo() {
        return this.socket
            .fromEvent<any>('game-info')
            .pipe(map( data => data ));
    }
    public gameOver() {
        return this.socket
            .fromEvent<any>('game-over')
            .pipe(map( data => data ));
    }

    public attack(square: Square) {
        this.socket.emit('attack', {x: square.x, y: square.y});
    }

    public determineWinner(fp, sp, actual): string {
        return fp.socket === actual ? sp.name : fp.name;
    }



}
