import { Move } from './../move.model';
import { ChessBoard } from './../ChessBoard';

export class Pawn {
    public static generateMove(row: number, col: number, chessBoard: ChessBoard): Move[] {
        let possibleMoves: Move[] = [];
        //Color of chess piece at [x,y]
        let upperCase = chessBoard.board[row * 8 + col].toUpperCase();
        let color: boolean = chessBoard.board[row * 8 + col] == upperCase;

        let dx = (color==true)?-1:1;
        //Move ahead, no capture
        if (chessBoard.board[(row+dx)*8+col]=="."
            && ChessBoard.isValidCoordinate(row+dx,col)) {
            //Check pawn promotion later
            //
            possibleMoves.push(new Move(row*8+col,(row+dx)*8+col,chessBoard));
        }
        //capture, diagonally forward one square to the left or right
        //dy = -1 : to the left; dy = 1: to the right
        for (let dy=-1;dy<=1;dy=dy+2) {
            let x_des=row+dx;
            let y_des=col+dy;
            if (ChessBoard.isValidCoordinate(x_des,y_des) && chessBoard.canCapture(x_des,y_des,color)) {
                //Check pawn promotion later
                //
                possibleMoves.push(new Move(row*8+col,x_des*8+y_des,chessBoard));
            }
        }
        //Move two squares from starting point
        if (color==true) { //color == WHITE
            if (row==6 && chessBoard.board[5*8+col]=="." && chessBoard.board[4*8+col]==".") {
                possibleMoves.push(new Move(row*8+col,4*8+col,chessBoard));
            }
        } else { //color == BLACK
            if (row==1 && chessBoard.board[2*8+col]=="." && chessBoard.board[3*8+col]==".") {
                possibleMoves.push(new Move(row*8+col,3*8+col,chessBoard));
            }
        }
        return possibleMoves;
    }
}