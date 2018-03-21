import { King } from './../model/chesspiece/king.model';
import { Queen } from './../model/chesspiece/queen.model';
import { Bishop } from './../model/chesspiece/bishop.model';
import { Knight } from './../model/chesspiece/knight.model';
import { Rook } from './../model/chesspiece/rook.model';
import { Pawn } from './../model/chesspiece/pawn.model';
import { Move } from './../model/move.model';
import { ChessBoard } from './../model/ChessBoard';
import { Component } from '@angular/core';
@Component({
    selector: "chessBoard",
    templateUrl: "chessBoard.component.html"
})
export class ChessBoardComponent {
    chessBoard: ChessBoard;
    highlightMap: number[] = Array(64).fill(0);
    isSelected: boolean = false;
    possibleMove:Move[]=null;
    fenString:string = null;
    
    constructor() {
        this.chessBoard = new ChessBoard();
        this.fenString=this.chessBoard.getFEN();
    }
    getPossibleMovesClasses(index: number): string {
        if (this.highlightMap[index] != 0) {
            return "possibleMoveEmpty";
        } else return "";
    }
    clickAtIndex(index: number) {
        if (this.isSelected == false) {
            let pice = this.chessBoard.board[index];
            if (pice != ".") {
                //check color
                let upperCase = pice.toUpperCase();
                let color: boolean = (pice == upperCase);
                if (color==this.chessBoard.activeColor) {
                    //highlight cell
                    this.isSelected=true;
                    this.highlightCells(index);
                } else {
                    console.log("Wrong active color");
                }
            }
        } else {
            //make move if possible move
            if (this.possibleMove!=null) {
                this.possibleMove.forEach(move => {
                    if (move.dst == index) {
                        //Make a move
                        this.chessBoard.makeMove(move);
                        this.fenString=this.chessBoard.getFEN();
                    }
                });
            }
            //then clear selection
            this.highlightMap.fill(0);
            this.isSelected=false;
        }
    }
    private highlightCells(index:number) {
        let moves:Move[]=null;
        let piece = this.chessBoard.board[index];
        let row=Math.floor(index/8);
        let col=index%8;
        console.log(`Click on [${row},${col}]`);
        switch (piece.toUpperCase()) {
            case 'P':
                    moves = Pawn.generateMove(row, col, this.chessBoard);
                    break;
                case 'R':
                    moves = Rook.generateMove(row, col, this.chessBoard);
                    break;
                case 'N':
                    moves = Knight.generateMove(row, col, this.chessBoard);
                    break;
                case 'B':
                    moves = Bishop.generateMove(row, col, this.chessBoard);
                    break;
                case 'Q':
                    moves = Queen.generateMove(row, col, this.chessBoard);
                    break;
                case 'K':
                    moves = King.generateMove(row, col, this.chessBoard);
                    break;
                default:
                    break;
        }
        //active highlight map
        console.log("chessboard component: "+moves);
        if (moves!=null) {
            this.possibleMove=moves;
            moves.forEach(move => {
                this.highlightMap[move.dst]=1;
            });
        }
        //current cell
        this.highlightMap[index]=1;
    }
    test() {
        this.chessBoard.board[0]="K";
    }
    
}