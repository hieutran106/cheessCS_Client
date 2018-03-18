import { ChessBoard } from './../model/ChessBoard';
import { Component } from '@angular/core';
@Component({
    selector:"chessBoard",
    templateUrl: "chessBoard.component.html"
})
export class ChessBoardComponent {
    chessBoard: ChessBoard;
    possibleMovesMap:number[];
    constructor() {
        this.chessBoard=new ChessBoard();
        this.possibleMovesMap = Array(64).fill(0);
        this.possibleMovesMap[0]=1;
        this.possibleMovesMap[12]=1;
        this.possibleMovesMap[13]=1;
    }
    getPossibleMovesClasses(index:number):string {
        if (this.possibleMovesMap[index]!=0) {
            return "possibleMoveEmpty";
        } else return "";
    }
    clickAtIndex(index:number) {
        this.possibleMovesMap[index]=1;
        console.log(index);
    }
}