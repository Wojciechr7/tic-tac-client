import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';


import {AppComponent} from './app.component';
import {BoardComponent} from './components/board/board.component';
import {SquareComponent} from './components/square/square.component';
import {ConfirmDialog, LobbyComponent} from './components/lobby/lobby.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressBarModule
} from '@angular/material';
import { SessionsComponent } from './components/sessions/sessions.component';

const config: SocketIoConfig = {url: 'http://localhost:3001', options: {}};

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        SquareComponent,
        LobbyComponent,
        ConfirmDialog,
        SessionsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ConfirmDialog]
})
export class AppModule {
}
