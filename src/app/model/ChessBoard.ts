import { Move } from './move.model';
export class ChessBoard {
    public board: string[];
    public activeColor: boolean;
    public fullMove: number;
    private dict;

    constructor() {
        this.board = Array(64).fill(0);
        this.dict = {
            ".": "",
            "r": "\u265C",
            "n": "\u265E",
            "b": "\u265D",
            "q": "\u265B",
            "k": "\u265A",
            "p": "\u265F",

            "R": "\u2656",
            "N": "\u2658",
            "B": "\u2657",
            "Q": "\u2655",
            "K": "\u2654",
            "P": "\u2659",
        };
        this.reset();
    }
    public getPieceAt(index: number): string {
        let piece = this.board[index];
        let pieceHTML = this.dict[piece];
        //console.log("piece: "+piece+" HTML:"+pieceHTML);
        return pieceHTML;
    }
    public reset() {
        let startingPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w 1";
        this.Load(startingPosition);
    }
    public Load(fen: string) {
        let block: string[] = fen.split(' ');

        //process piece placement
        let tokens: string[] = block[0].split('/');
        if (tokens.length == 8) {
            for (let i = 0; i < 8; i++) {
                let index = 0;
                for (let j = 0; j < tokens[i].length; j++) {
                    let piece = tokens[i].charAt(j);
                    let number = Number(piece);
                    if (isNaN(number)) {
                        //Character is a chess piece
                        this.board[i * 8 + index] = piece;
                        index++;
                    } else {
                        for (let k = 0; k < number; k++) {
                            this.board[i * 8 + index + k] = ".";
                        }
                        index += number;
                    }
                }

            }
        } else {
            console.log("Invalid FEN notation");
            return;
        }
        //active color and full move
        this.activeColor = (block[1] == "w") ? true : false;
        this.fullMove = Number(block[block.length - 1]);
    }
    public static isValidCoordinate(row: number, col: number): boolean {
        if ((0 <= row && row <= 7) && (0 <= col && col <= 7))
            return true;
        else return false;
    }
    public canCapture(row: number, col: number, pieceColor: boolean) {
        let piece = this.board[row*8+col];
        if (piece!=".") {
            let upperCase = piece.toUpperCase();
            let dstColor: boolean = this.board[row * 8 + col] == upperCase;
            return (pieceColor != dstColor) ? true : false;
        } else return false;
        
    }
    public makeMove(move:Move) {
        //Update board data
        this.board[move.src]=".";
        this.board[move.dst]=move.piece;

        if (move.pawn_promotion)
        {
            this.board[move.dst]=this.activeColor?"Q":"q";
        }
        //update active color and full move
        if (this.activeColor==true)
        {
            this.activeColor = false;
        } else
        {
            this.fullMove++;
            this.activeColor = true;
        }
    }
    public undoMove(move:Move) {
        //Update board data
        this.board[move.src] = move.piece;
        this.board[move.dst] = move.capture;

        //update active color and full move
        if (this.activeColor==false)
        {
            this.activeColor = true;
        } else
        {
            this.activeColor = false;
            this.fullMove--;
        }
    }
    public getFEN():string {
        let fen_str=new Array();
        for (let i=0;i<8;i++) {
            let number=0;
            for (let j=0;j<8;j++) {
                if (this.board[i*8+j]!=".") {
                    fen_str.push(this.board[i*8+j]);
                } else {
                    number++;
                    let next=j+1;
                    if (next==8 || this.board[i*8+next]!=".") {
                        fen_str.push(number);
                        number=0;
                    }
                }
            }
            if (i<7) {
                fen_str.push("/");
            }
        }
        fen_str.push(this.activeColor?" w":" b");
        fen_str.push(" "+this.fullMove);
        return fen_str.join("");
    }

}