import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public gameStarted: boolean;
  public intervalRef;

  constructor() {
    this.gameStarted = false;

  }



}
