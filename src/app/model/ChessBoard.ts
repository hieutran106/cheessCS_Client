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
        console.log(this.board);

    }
    public getPieceAt(index: number): string {
        let piece = this.board[index];
        let pieceHTML = this.dict[piece];
        //console.log("piece: "+piece+" HTML:"+pieceHTML);
        return pieceHTML;
    }
    public reset() {
        let startingPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w";
        this.Load(startingPosition);
        this.activeColor = true;
        this.fullMove = 1;
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
        let upperCase = this.board[row * 8 + col].toUpperCase();
        let dstColor: boolean = this.board[row * 8 + col] == upperCase;
        return (pieceColor != dstColor) ? true : false;
    }

}