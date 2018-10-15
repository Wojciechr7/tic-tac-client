import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {

  constructor(public gs: GameService) { }

  public messageHandler(msg) {
    console.log(msg.value);
    msg.value = '';
  }

  ngOnInit() {

  }

}
