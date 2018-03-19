import { ChessBoard } from './ChessBoard';
export class Move {
    public src:number;
    public dst:number;
    public piece:string;
    public capture:string;
    public pawn_promotion:boolean;
    constructor(src:number, dst:number, chessBoard: ChessBoard) {
        this.src=src;
        this.dst=dst;
        this.piece = chessBoard.board[src];
        this.capture = chessBoard.board[dst];
    }
}