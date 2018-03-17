export class ChessBoard {
    board:number[];
    activeColor: boolean;
    fullMove:number;

    constructor() {
        this.board=Array(64).fill(0);
    }
    public Load(fen:string) {
        let block:string[]=fen.split(' ');
        
        //process piece placement
        let tokens:string[]=block[0].split('/');
        if (tokens.length==8) {
            for (let i=0;i<8;i++) {
                let index=0;
                for (let j=0;j<tokens[i].length;j++) {
                    let number=Number(tokens[i].charAt(j));
                    if (number==NaN) {
                        //Character is a chess piece
                        this.board[i*8+index]=tokens[i].charCodeAt(j);
                    } else {
                        for (let k=0;k<number;k++) {
                            this.board[i*8+index+k]=".".charCodeAt(0);
                        }
                        index+=number;
                    }
                }
                
            }
        } else {
            console.log("Invalid FEN notation");
            return;
        }
        //active color and full move
        this.activeColor=(block[1]=="w")?true:false;
        this.fullMove=Number(block[block.length-1]);
        
    }
}