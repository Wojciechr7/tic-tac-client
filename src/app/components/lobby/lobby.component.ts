import {Component, OnInit} from '@angular/core';
import {LobbyService} from '../../services/lobby.service';
import {Player} from '../../classes/player';
import {IPlayer} from '../../interfaces/iplayer';
import {IMessage} from '../../interfaces/imessage';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

    public online: string;
    public messages: Array<IMessage>;


    constructor(public ls: LobbyService, public as: AppService) {
        this.messages = [];
        this.online = '';
        this.ls.getPlayers().subscribe((players: IPlayer[]) => {
            this.ls.players = players.map((player: IPlayer) => new Player(player.name, player.id));
        });
    }

    public joinLobby(name): void {
        if (name.value) {
            this.ls.addPlayer(name.value);
            this.ls.setStorageName(name.value);
            name.value = '';
        }
    }

    public leaveLobby(): void {
        this.ls.removePlayer();

    }

    public messageHandler(msg) {
        if (msg.value) {
            if (this.ls.localPlayer) {
                this.ls.sendMessage(msg.value);
                msg.value = '';
            } else {
                alert('Join lobby first!');
            }
        }
    }

    public inviteToGame(name: string) {
        this.ls.sendInvite(name);
    }

    private scrollMessages() {
        const objDiv = document.getElementById('chat-container');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    ngOnInit() {
        this.ls
            .getOnline()
            .subscribe(data => {
                this.online = data;
            });

        this.ls
            .playersUpdate()
            .subscribe(data => {
                this.ls.players = data.map((player: IPlayer) => new Player(player.name, player.id));
            });

        this.ls
            .getMessages()
            .subscribe(data => {
                this.messages.push({
                    author: data.author,
                    content: data.msg
                });
                this.scrollMessages();
            });
        this.ls
            .getInvite()
            .subscribe(data => {
                if (confirm(`Do you want to play with ${data.from.name}?`)) {
                    this.ls.acceptInvite(data);
                    this.as.gameStarted = true;
                    this.ls.removePlayer();
                } else {
                    this.ls.cancelInvite(data);
                }
            });

        this.ls
            .handshake()
            .subscribe(data => {
                this.as.gameStarted = true;
                this.ls.removePlayer();
            });

        (<HTMLInputElement>document.getElementById('name-input')).value = this.ls.getStorageName();

    }

}
