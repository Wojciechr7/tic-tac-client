import { Component, OnInit } from '@angular/core';
import {LobbyService} from '../../services/lobby.service';
import {AppService} from '../../services/app.service';
import {ISession} from '../../interfaces/isession';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  public sessions: Array<ISession>;

  constructor(public ls: LobbyService, public as: AppService) {
    this.sessions = [];
  }

  ngOnInit() {
    this.ls.sessions.subscribe((sessions: ISession[]) => this.sessions = sessions);

    this.ls.getSession().subscribe((sessions: ISession[]) => this.sessions = sessions);
  }

}
