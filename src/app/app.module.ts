import { SquareAttrDirective } from './core/squareAttr.directive';
import { ChessBoardComponent } from './core/chessBoard.component';
import { User } from './model/user.model';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navBar.component';
import { RestService } from './model/rest.service';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,NavbarComponent, LoginComponent, DashBoardComponent,ChessBoardComponent,SquareAttrDirective
  ],
  imports: [
    BrowserModule, routing, FormsModule, HttpModule,ModalModule.forRoot()
  ],
  providers: [RestService, User],
  bootstrap: [AppComponent]
})
export class AppModule { }
