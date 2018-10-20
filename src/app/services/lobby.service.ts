import {Injectable} from '@angular/core';
import {Player} from '../classes/player';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppSettings} from '../app.const';
import {IPlayer} from '../interfaces/iplayer';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import {ISession} from '../interfaces/isession';

@Injectable({
    providedIn: 'root'
})
export class LobbyService {

    public players: Array<Player>;
    private url: string;
    public localPlayer: string;
    public sessions: Observable<ISession[]>;

    constructor(private http: HttpClient, private socket: Socket) {
        this.url = AppSettings.url;
        this.localPlayer = '';
        this.sessions = this.socket
            .fromEvent<any>('update-sessions')
            .pipe(map( data => data.sessions ));
    }

    public getPlayers(): Observable<IPlayer[]> {
        return this.http.get<IPlayer[]>(this.url + '/players');
    }
    public getSession(): Observable<ISession[]> {
        return this.http.get<ISession[]>(this.url + '/session');
    }
    public getOnlineOnce(): Observable<number> {
        return this.http.get<number>(this.url + '/online');
    }

    public addPlayer(data) {
        this.socket.emit('add-player', data);
        this.localPlayer = data;
    }

    public removePlayer() {
        this.socket.emit('remove-player', {});
        this.localPlayer = '';
    }

    public getOnline() {
        return this.socket
            .fromEvent<any>('online')
            .pipe(map( data => data.online ));
    }

    public playersUpdate() {
        return this.socket
            .fromEvent<any>('players-update')
            .pipe(map( data => data.players ));
    }
    public sendMessage(msg: string) {
        this.socket.emit('send-message', {msg: msg});
    }

    public getMessages() {
        return this.socket
            .fromEvent<any>('update-messages')
            .pipe(map( data => data ));
    }

    public sendInvite(name: string) {
        this.socket.emit('invite-player', {name: name});
    }

    public getInvite() {
        return this.socket
            .fromEvent<any>('private-invite')
            .pipe(map( data => data ));
    }
    public acceptInvite(data) {
        this.socket.emit('accept-invite', data);
    }

    public handshake() {
        return this.socket
            .fromEvent<any>('handshake')
            .pipe(map( data => data ));
    }
  /*  public getActualData() {
        return this.socket
            .fromEvent<any>('actual-data')
            .pipe(map( data => data ));
    }*/

/*    public handshakeBack(data) {
        this.socket.emit('handshake-back', data);
    }*/

    public cancelInvite(data) {
        this.socket.emit('cancel-invite', data);
    }

    public leaveGame() {
        this.socket.emit('leave-game', {});
    }

    public closeGame() {
        return this.socket
            .fromEvent<any>('close-game')
            .pipe(map( data => data ));
    }



    public getStorageName() {
        return JSON.parse(localStorage.getItem('name'));
    }
    public setStorageName(name: string) {
        localStorage.setItem('name', JSON.stringify(name));
    }

}
