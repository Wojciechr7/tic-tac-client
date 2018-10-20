import {Component, OnInit, Inject, Input, OnDestroy} from '@angular/core';
import {LobbyService} from '../../services/lobby.service';
import {Player} from '../../classes/player';
import {IPlayer} from '../../interfaces/iplayer';
import {IMessage} from '../../interfaces/imessage';
import {AppService} from '../../services/app.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GameService} from '../../services/game.service';
import {ISession} from '../../interfaces/isession';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {

    public online: string;
    public messages: Array<IMessage>;
    private inviteRef;
    private getOnlineRef;
    private playersUpdateRef;
    private getMessagesRef;
    private handshakeRef;
    private getOnlineOnceRef;


    constructor(public ls: LobbyService, public as: AppService, public gs: GameService, public dialog: MatDialog) {
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
        this.getOnlineRef = this.ls
            .getOnline()
            .subscribe(data => {
                this.online = data;
            });

        this.playersUpdateRef = this.ls
            .playersUpdate()
            .subscribe(data => {
                this.ls.players = data.map((player: IPlayer) => new Player(player.name, player.id));
            });

        this.getMessagesRef = this.ls
            .getMessages()
            .subscribe(data => {
                this.messages.push({
                    author: data.author,
                    content: data.msg
                });
                this.scrollMessages();
            });
        this.inviteRef = this.ls
            .getInvite()
            .subscribe(data => {
                const dialogRef = this.dialog.open(ConfirmDialog, {
                    data: [data]
                });

                dialogRef.backdropClick().subscribe(result => {
                    clearInterval(this.as.intervalRef);
                    this.ls.cancelInvite(data);
                    dialogRef.close();
                });
            });

        this.handshakeRef = this.ls
            .handshake()
            .subscribe((data: ISession) => {
                this.as.gameStarted = true;
                this.ls.removePlayer();
                this.gs.updateBoard(data);
                this.gs.session = data;
            });

        this.getOnlineOnceRef = this.ls.getOnlineOnce().subscribe((online: number) => {
            this.online = online.toString();
        });


        (<HTMLInputElement>document.getElementById('name-input')).value = this.ls.getStorageName();

    }

    ngOnDestroy() {
        this.inviteRef.unsubscribe();
        this.getOnlineRef.unsubscribe();
        this.playersUpdateRef.unsubscribe();
        this.getMessagesRef.unsubscribe();
        this.handshakeRef.unsubscribe();
        this.getOnlineOnceRef.unsubscribe();
    }

}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['lobby.component.scss']
})

export class ConfirmDialog implements OnInit {

    public progress: number;


    constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<ConfirmDialog>, public ls: LobbyService, public as: AppService) {
        this.progress = 0;
    }

    public confirm() {
        clearInterval(this.as.intervalRef);
        this.ls.acceptInvite(this.data[0]);
        /*this.as.gameStarted = true;*/
        /*this.ls.removePlayer();*/
        this.dialogRef.close();
    }

    public cancel() {
        clearInterval(this.as.intervalRef);
        this.ls.cancelInvite(this.data[0]);
        this.dialogRef.close();
    }

    private increaseProgress() {
        this.progress += 1;
        if (this.progress >= 100) {
            this.cancel();
        }
    }

    ngOnInit() {
        this.as.intervalRef = setInterval(() => {
            this.increaseProgress();
        }, 60);
    }

}
