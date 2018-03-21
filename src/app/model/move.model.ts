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
        //check pawn promotion
        let x_dst=Math.floor(src/8);
        if (chessBoard.board[src] == 'P')
            {
                if (x_dst == 0)
                {
                    this.pawn_promotion = true;
                }
            }
            else if (chessBoard.board[src] == 'p')
            {
                if (x_dst == 7)
                {
                    this.pawn_promotion = true;
                }
            }

    }
    public toString():string {
        let x_src=Math.floor(this.src/8);
        let y_src=this.src%8;
        let x_dst=Math.floor(this.dst/8);
        let y_dst=this.dst%8;
        let result=`${this.piece}[${x_src},${y_src}]-[${x_dst},${y_dst}]`;
        if (this.capture!=".") {
            result=result+" x"+this.capture;
        } else {
            result=result+" --";
        }
        if (this.pawn_promotion) {
            result+=" =Q";
        } else {
            result+="  ";
        }
        return result;
    }
}