import { Move } from './../move.model';
import { ChessBoard } from './../ChessBoard';

export class Rook {
    public static generateMove(row: number, col: number, chessBoard: ChessBoard): Move[] {
        let possibleMoves: Move[] = [];
        //Color of chess piece at [x,y]
        let upperCase = chessBoard.board[row * 8 + col].toUpperCase();
        let color: boolean = chessBoard.board[row * 8 + col] == upperCase;
        let delta =[[1,0],[-1,0],[0,1],[0,-1]];

        for (let i=0;i<delta.length;i++) {
            let step=1;
            while (true) {
                let x_des = row + delta[i][0] * step;
                let y_des = col + delta[i][1] * step;
                if (ChessBoard.isValidCoordinate(x_des,y_des)) {
                    if (chessBoard.board[x_des*8+col]==".") {
                        possibleMoves.push(new Move(row*8+col,x_des*8+col,chessBoard));
                        step++;
                    } else if (chessBoard.canCapture(x_des,y_des,color)) {
                        possibleMoves.push(new Move(row*8+col,x_des*8+col,chessBoard));
                        break;
                    } else break;
                } else break;
                
            }
        }
        console.log(possibleMoves);
        return possibleMoves;
    }
}