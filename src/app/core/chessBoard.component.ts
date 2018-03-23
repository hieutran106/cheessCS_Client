import { ModalContentComponent } from './modalContent.component';
import { RestService } from './../model/rest.service';
import { Observable } from 'rxjs/Observable';
import { King } from './../model/chesspiece/king.model';
import { Queen } from './../model/chesspiece/queen.model';
import { Bishop } from './../model/chesspiece/bishop.model';
import { Knight } from './../model/chesspiece/knight.model';
import { Rook } from './../model/chesspiece/rook.model';
import { Pawn } from './../model/chesspiece/pawn.model';
import { Move } from './../model/move.model';
import { ChessBoard } from './../model/ChessBoard';
import { Component, TemplateRef } from '@angular/core';
import 'rxjs/add/observable/of';
import "rxjs/add/operator/map";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: "chessBoard",
    templateUrl: "chessBoard.component.html"
})
export class ChessBoardComponent {
    chessBoard: ChessBoard;
    highlightMap: number[] = Array(64).fill(0);
    isSelected: boolean = false;
    possibleMove: Move[] = null;
    fenString: string = null;

    //historyMoves
    private historyMoves: Move[] = [];
    historyMovesStr: string = "";
    //config
    enableDebugMode: boolean = false;
    enableAI: boolean = true;
    //AI move
    thinkLabel: string = "";
    isRequesting: boolean = false;
    //modal
    modalRef: BsModalRef;
    modalLabel="";

    constructor(private restService: RestService, private modalService: BsModalService) {
        this.chessBoard = new ChessBoard();
        //test
        this.chessBoard.Load("4k3/8/8/1q2R3/8/8/8/4K3 w 3");
        this.fenString = this.chessBoard.getFEN();
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
                if (color == this.chessBoard.activeColor) {
                    //highlight cell
                    this.isSelected = true;
                    this.highlightCells(index);
                } else {
                    console.log("Wrong active color");
                }
            }
        } else {
            //make move if possible move
            if (this.possibleMove != null) {
                this.possibleMove.forEach(move => {
                    if (move.dst == index) {
                        //Make a move
                        this.makeMove(move);

                    }
                });
            }
            //then clear selection
            this.highlightMap.fill(0);
            this.isSelected = false;
        }
    }
    private highlightCells(index: number) {
        let moves: Move[] = null;
        let piece = this.chessBoard.board[index];
        let row = Math.floor(index / 8);
        let col = index % 8;
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
        console.log("chessboard component: " + moves);
        if (moves != null) {
            this.possibleMove = moves;
            moves.forEach(move => {
                this.highlightMap[move.dst] = 1;
            });
        }
        //current cell
        this.highlightMap[index] = 1;
    }
    get boardInfo() {
        return JSON.stringify({
            activeColor: this.chessBoard.activeColor,
            fullMove: this.chessBoard.fullMove
        });
    }
    private makeMove(move: Move) {
        this.chessBoard.makeMove(move);
        this.historyMoves.push(move);
        this.fenString = this.chessBoard.getFEN();
        if (this.chessBoard.activeColor == false) {
            this.historyMovesStr += `${this.chessBoard.fullMove}. ${move}`;
        } else {
            this.historyMovesStr += `  ${move}\n`;
        }
        if (!this.enableDebugMode) {
            let status = this.checkEndGame();
            if (status!=0) {
                return;
            }
        }
        if (!this.enableAI) {
            return;
        }
        if (this.chessBoard.activeColor == false) {
            this.thinkLabel="Computer is thinking .......";
            let bestMove = this.getAIMove().subscribe(move => {
                console.log(move);
                this.thinkLabel="";
                this.makeMove(move);
            }, error => {
                this.thinkLabel="Network error";
            });

        }
    }
    undoMove() {
        let move: Move = this.historyMoves.pop();
        if (move != null) {
            this.chessBoard.undoMove(move);
            this.fenString = this.chessBoard.getFEN();
            let endIndex: number = this.chessBoard.activeColor ? -21 : -20;
            let newHistory = this.historyMovesStr.slice(0, endIndex);
            this.historyMovesStr = newHistory;
        }

    }
    private getAIMove(): Observable<Move> {
        if (this.chessBoard.fullMove == 1 && this.chessBoard.activeColor == false) {
            let move = new Move(1 * 8 + 4, 3 * 8 + 4, this.chessBoard);
            return Observable.of(move);
        }
        else if (this.chessBoard.fullMove == 2 && this.chessBoard.activeColor == false) {
            let move = new Move(0 * 8 + 1, 2 * 8 + 2, this.chessBoard);
            return Observable.of(move);
        }
        else {
            return this.restService.getNextMove(this.fenString).map(res => {
                return new Move(res.Src, res.Dst, this.chessBoard);
            });
        }
    }
    loadFen() {
        this.chessBoard.Load(this.fenString);
    }
    openModal() {
        let status=1;
        let modalOptions= {
            ignoreBackdropClick:true,
            keyboard:false,
            initialState: {
                title:(status==1)?"You won. Congratulation." :
                "You lose. Waana try another game?"
            }
        };
        this.modalRef=this.modalService.show(ModalContentComponent,modalOptions);
        this.modalService.onHidden.subscribe((reason: string) => {
            this.resetGame();
        });
    }
    private checkEndGame() {
        let status=this.chessBoard.checkEndGame();
        if (status!=0) {
            let modalOptions= {
                ignoreBackdropClick:true,
                keyboard:false,
                initialState: {
                    title:(status==1)?"You won. Congratulation." :
                    "You lose. Waana try another game?"
                }
            };
            this.modalRef=this.modalService.show(ModalContentComponent,modalOptions);
            this.modalService.onHidden.subscribe((reason: string) => {
                this.resetGame();
            });

        }
        return status;
    }
    private resetGame() {
        this.chessBoard.reset();
        this.fenString = this.chessBoard.getFEN();
        this.historyMoves=[];
        this.historyMovesStr="";
    }


}