interface Piece {
  source: "original" | "add";
  start: number;
  length: number;
}

export class PieceTable {
  private original: string;
  private addBuffer: string;
  private pieces: Piece[];

  constructor(text: string = "") {
    this.original = text;
    this.addBuffer = "";
    this.pieces = text.length > 0
      ? [{ source: "original", start: 0, length: text.length }]
      : [];
  }

  insert(position: number, text: string): void {
    const addStart = this.addBuffer.length;
    this.addBuffer += text;
    const newPiece: Piece = { source: "add", start: addStart, length: text.length };
    const { pieceIndex, offset } = this.findPiece(position);

    if (pieceIndex === this.pieces.length) {
      this.pieces.push(newPiece);
      return;
    }

    const piece = this.pieces[pieceIndex];
    if (offset === 0) {
      this.pieces.splice(pieceIndex, 0, newPiece);
    } else if (offset === piece.length) {
      this.pieces.splice(pieceIndex + 1, 0, newPiece);
    } else {
      const left: Piece = { source: piece.source, start: piece.start, length: offset };
      const right: Piece = { source: piece.source, start: piece.start + offset, length: piece.length - offset };
      this.pieces.splice(pieceIndex, 1, left, newPiece, right);
    }
  }

  delete(position: number, count: number): string {
    let deleted = this.substring(position, position + count);
    let remaining = count;
    let pos = position;

    while (remaining > 0) {
      const { pieceIndex, offset } = this.findPiece(pos);
      if (pieceIndex >= this.pieces.length) break;
      const piece = this.pieces[pieceIndex];
      const available = piece.length - offset;
      const toDelete = Math.min(remaining, available);

      if (offset === 0 && toDelete === piece.length) {
        this.pieces.splice(pieceIndex, 1);
      } else if (offset === 0) {
        piece.start += toDelete;
        piece.length -= toDelete;
      } else if (offset + toDelete === piece.length) {
        piece.length = offset;
      } else {
        const right: Piece = {
          source: piece.source,
          start: piece.start + offset + toDelete,
          length: piece.length - offset - toDelete,
        };
        piece.length = offset;
        this.pieces.splice(pieceIndex + 1, 0, right);
      }
      remaining -= toDelete;
    }
    return deleted;
  }

  private findPiece(position: number): { pieceIndex: number; offset: number } {
    let pos = 0;
    for (let i = 0; i < this.pieces.length; i++) {
      if (position <= pos + this.pieces[i].length) {
        return { pieceIndex: i, offset: position - pos };
      }
      pos += this.pieces[i].length;
    }
    return { pieceIndex: this.pieces.length, offset: 0 };
  }

  charAt(index: number): string {
    let pos = 0;
    for (const piece of this.pieces) {
      if (index < pos + piece.length) {
        const buf = piece.source === "original" ? this.original : this.addBuffer;
        return buf[piece.start + (index - pos)];
      }
      pos += piece.length;
    }
    return "";
  }

  length(): number {
    return this.pieces.reduce((sum, p) => sum + p.length, 0);
  }

  toString(): string {
    return this.substring(0, this.length());
  }

  substring(start: number, end: number): string {
    let result = "";
    for (let i = start; i < end; i++) {
      result += this.charAt(i);
    }
    return result;
  }

  lineCount(): number {
    const text = this.toString();
    if (text.length === 0) return 0;
    let count = 1;
    for (const ch of text) {
      if (ch === "\n") count++;
    }
    return count;
  }
}
