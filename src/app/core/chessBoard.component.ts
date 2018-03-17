import { ChessBoard } from './../model/ChessBoard';
import { Component } from '@angular/core';
@Component({
    selector:"chessBoard",
    templateUrl: "chessBoard.component.html"
})
export class ChessBoardComponent {
    chessBoard: ChessBoard;
    constructor() {
        this.chessBoard=new ChessBoard();
        
    }
}