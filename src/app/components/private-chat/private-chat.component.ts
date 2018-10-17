import { Component, OnInit, OnDestroy } from '@angular/core';
import {GameService} from '../../services/game.service';
import {IMessage} from '../../interfaces/imessage';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit, OnDestroy {

  public messages: Array<IMessage>;
  private messagerRef;

  constructor(public gs: GameService) {
      this.messages = [];
  }

  public messageHandler(msg) {
    this.gs.sendMessage(msg.value);
    msg.value = '';
  }

  ngOnInit() {
    this.messagerRef = this.gs.pmUpdate().subscribe((data: IMessage) => {
      this.messages.push(data);
    });
  }

  ngOnDestroy() {
    this.messagerRef.unsubscribe();
  }

}
