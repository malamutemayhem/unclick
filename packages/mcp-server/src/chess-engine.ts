export type Piece = "K" | "Q" | "R" | "B" | "N" | "P" | "k" | "q" | "r" | "b" | "n" | "p";
export type Color = "white" | "black";

export interface Square {
  file: number;
  rank: number;
}

export interface Move {
  from: Square;
  to: Square;
  piece: Piece;
  capture?: Piece;
  promotion?: Piece;
}

function sq(file: number, rank: number): Square { return { file, rank }; }
function inBounds(s: Square): boolean { return s.file >= 0 && s.file < 8 && s.rank >= 0 && s.rank < 8; }
function isWhite(p: Piece): boolean { return p === p.toUpperCase(); }

export class ChessBoard {
  board: (Piece | null)[][];
  turn: Color = "white";
  moveHistory: Move[] = [];

  constructor() {
    this.board = Array.from({ length: 8 }, () => new Array(8).fill(null));
  }

  static standard(): ChessBoard {
    const b = new ChessBoard();
    const backRank: Piece[] = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    for (let f = 0; f < 8; f++) {
      b.board[0][f] = backRank[f] as Piece;
      b.board[1][f] = "P";
      b.board[6][f] = "p";
      b.board[7][f] = backRank[f].toLowerCase() as Piece;
    }
    return b;
  }

  get(s: Square): Piece | null {
    if (!inBounds(s)) return null;
    return this.board[s.rank][s.file];
  }

  set(s: Square, piece: Piece | null): void {
    if (inBounds(s)) this.board[s.rank][s.file] = piece;
  }

  makeMove(move: Move): void {
    this.set(move.to, move.promotion ?? move.piece);
    this.set(move.from, null);
    this.moveHistory.push(move);
    this.turn = this.turn === "white" ? "black" : "white";
  }

  generateMoves(color?: Color): Move[] {
    const c = color ?? this.turn;
    const moves: Move[] = [];
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const piece = this.board[r][f];
        if (!piece) continue;
        const pieceWhite = isWhite(piece);
        if ((c === "white" && !pieceWhite) || (c === "black" && pieceWhite)) continue;
        this.generatePieceMoves(sq(f, r), piece, moves);
      }
    }
    return moves;
  }

  private generatePieceMoves(from: Square, piece: Piece, moves: Move[]): void {
    const type = piece.toUpperCase();
    const white = isWhite(piece);

    const addMove = (to: Square) => {
      if (!inBounds(to)) return false;
      const target = this.get(to);
      if (target && isWhite(target) === white) return false;
      moves.push({ from, to, piece, capture: target ?? undefined });
      return !target;
    };

    const slide = (dirs: [number, number][]) => {
      for (const [df, dr] of dirs) {
        for (let i = 1; i < 8; i++) {
          if (!addMove(sq(from.file + df * i, from.rank + dr * i))) break;
        }
      }
    };

    switch (type) {
      case "P": {
        const dir = white ? 1 : -1;
        const startRank = white ? 1 : 6;
        const promoRank = white ? 7 : 0;
        const fwd = sq(from.file, from.rank + dir);
        if (inBounds(fwd) && !this.get(fwd)) {
          if (fwd.rank === promoRank) {
            const promos: Piece[] = white ? ["Q", "R", "B", "N"] : ["q", "r", "b", "n"];
            for (const p of promos) moves.push({ from, to: fwd, piece, promotion: p });
          } else {
            moves.push({ from, to: fwd, piece });
            if (from.rank === startRank) {
              const fwd2 = sq(from.file, from.rank + dir * 2);
              if (!this.get(fwd2)) moves.push({ from, to: fwd2, piece });
            }
          }
        }
        for (const df of [-1, 1]) {
          const cap = sq(from.file + df, from.rank + dir);
          if (inBounds(cap) && this.get(cap) && isWhite(this.get(cap)!) !== white) {
            moves.push({ from, to: cap, piece, capture: this.get(cap)! });
          }
        }
        break;
      }
      case "N":
        for (const [df, dr] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]] as [number,number][]) {
          addMove(sq(from.file + df, from.rank + dr));
        }
        break;
      case "B": slide([[-1,-1],[-1,1],[1,-1],[1,1]]); break;
      case "R": slide([[0,-1],[0,1],[-1,0],[1,0]]); break;
      case "Q": slide([[-1,-1],[-1,1],[1,-1],[1,1],[0,-1],[0,1],[-1,0],[1,0]]); break;
      case "K":
        for (const [df, dr] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]] as [number,number][]) {
          addMove(sq(from.file + df, from.rank + dr));
        }
        break;
    }
  }

  isAttacked(target: Square, byColor: Color): boolean {
    const moves = this.generateMoves(byColor);
    return moves.some(m => m.to.file === target.file && m.to.rank === target.rank);
  }

  findKing(color: Color): Square | null {
    const king = color === "white" ? "K" : "k";
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        if (this.board[r][f] === king) return sq(f, r);
      }
    }
    return null;
  }

  isInCheck(color: Color): boolean {
    const king = this.findKing(color);
    if (!king) return false;
    const opponent = color === "white" ? "black" : "white";
    return this.isAttacked(king, opponent);
  }

  pieceCount(): { white: number; black: number } {
    let white = 0, black = 0;
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const p = this.board[r][f];
        if (p) { isWhite(p) ? white++ : black++; }
      }
    }
    return { white, black };
  }

  toFEN(): string {
    const rows: string[] = [];
    for (let r = 7; r >= 0; r--) {
      let row = "";
      let empty = 0;
      for (let f = 0; f < 8; f++) {
        const p = this.board[r][f];
        if (p) {
          if (empty > 0) { row += empty; empty = 0; }
          row += p;
        } else {
          empty++;
        }
      }
      if (empty > 0) row += empty;
      rows.push(row);
    }
    return rows.join("/") + ` ${this.turn === "white" ? "w" : "b"}`;
  }
}

export function squareToAlgebraic(s: Square): string {
  return String.fromCharCode(97 + s.file) + (s.rank + 1);
}

export function algebraicToSquare(s: string): Square {
  return sq(s.charCodeAt(0) - 97, parseInt(s[1], 10) - 1);
}
