import { Move } from './../move.model';
import { ChessBoard } from './../ChessBoard';

export class Queen {
    public static generateMove(row: number, col: number, chessBoard: ChessBoard): Move[] {
        let possibleMoves: Move[] = [];
        //Color of chess piece at [x,y]
        let upperCase = chessBoard.board[row * 8 + col].toUpperCase();
        let color: boolean = chessBoard.board[row * 8 + col] == upperCase;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let step = 1;
                while (true) {
                    let x_des = row + i * step;
                    let y_des = col + j * step;
                    if (ChessBoard.isValidCoordinate(x_des,y_des)) {
                        if (chessBoard.board[x_des*8+col]==".") {
                            possibleMoves.push(new Move(row*8+col,x_des*8+col,chessBoard));
                            step++;
                        } else if (chessBoard.canCapture(x_des,y_des,color)) {
                            possibleMoves.push(new Move(row*8+col,x_des*8+col,chessBoard));
                            break;
                        } else break;
                    }
                }
            }
        }
        return possibleMoves;
    }
}