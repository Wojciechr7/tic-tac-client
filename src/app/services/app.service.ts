import { Injectable } from '@angular/core';
import {Square} from '../classes/square';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public squares: Array<Square>;
  public gameStarted: boolean;

  constructor() {
    this.squares = this.createSquares();
    this.gameStarted = false;

  }


  private createSquares() {
    return [...Array(9).keys()].map((el, index) => new Square(index));
  }


}
