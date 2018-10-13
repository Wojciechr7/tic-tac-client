import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { SquareComponent } from './components/square/square.component';
import { LobbyComponent } from './components/lobby/lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
