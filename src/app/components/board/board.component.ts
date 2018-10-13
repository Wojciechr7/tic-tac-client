import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(public as: AppService) { }

  ngOnInit() {
  }

}
