import { Move } from './../move.model';
import { ChessBoard } from './../ChessBoard';

export class Knight {
    public static generateMove(row: number, col: number, chessBoard: ChessBoard): Move[] {
        let delta = [[-1, -2], [-2, -1], [-2, +1],
        [-1, +2], [1, +2], [+2, +1],
        [+2, -1], [+1, -2]];
        let possibleMoves: Move[] = [];
        //Color of chess piece at [x,y]
        let upperCase = chessBoard.board[row * 8 + col].toUpperCase();
        let color: boolean = chessBoard.board[row * 8 + col] == upperCase;
        for (let i = 0; i < delta.length; i++) {
            let x_des = row + delta[i][0];
            let y_des = col + delta[i][1];
            if (ChessBoard.isValidCoordinate(x_des, y_des)
                && (chessBoard.board[x_des * 8 + y_des] == "." || chessBoard.canCapture(x_des, y_des, color))) {
                possibleMoves.push(new Move(row * 8 + col, x_des * 8 + y_des, chessBoard));
            }
        }
        return possibleMoves;
    }
}