export class GapBuffer {
  private buffer: string[];
  private gapStart: number;
  private gapEnd: number;

  constructor(initialCapacity: number = 64) {
    this.buffer = new Array(initialCapacity).fill("");
    this.gapStart = 0;
    this.gapEnd = initialCapacity;
  }

  private gapSize(): number {
    return this.gapEnd - this.gapStart;
  }

  private moveGap(position: number): void {
    if (position === this.gapStart) return;
    if (position < this.gapStart) {
      const count = this.gapStart - position;
      for (let i = count - 1; i >= 0; i--) {
        this.buffer[this.gapEnd - count + i] = this.buffer[position + i];
      }
      this.gapEnd -= count;
      this.gapStart = position;
    } else {
      const count = position - this.gapStart;
      for (let i = 0; i < count; i++) {
        this.buffer[this.gapStart + i] = this.buffer[this.gapEnd + i];
      }
      this.gapStart += count;
      this.gapEnd += count;
    }
  }

  private grow(): void {
    const newSize = this.buffer.length * 2;
    const content = this.toString();
    this.buffer = new Array(newSize).fill("");
    for (let i = 0; i < content.length; i++) {
      this.buffer[i] = content[i];
    }
    this.gapStart = content.length;
    this.gapEnd = newSize;
  }

  insert(position: number, text: string): void {
    for (const ch of text) {
      if (this.gapSize() === 0) this.grow();
      this.moveGap(position);
      this.buffer[this.gapStart] = ch;
      this.gapStart++;
      position++;
    }
  }

  delete(position: number, count: number = 1): string {
    this.moveGap(position);
    const deleted: string[] = [];
    for (let i = 0; i < count && this.gapEnd < this.buffer.length; i++) {
      deleted.push(this.buffer[this.gapEnd]);
      this.gapEnd++;
    }
    return deleted.join("");
  }

  charAt(index: number): string {
    if (index < this.gapStart) return this.buffer[index];
    return this.buffer[index + this.gapSize()];
  }

  length(): number {
    return this.buffer.length - this.gapSize();
  }

  toString(): string {
    const parts: string[] = [];
    for (let i = 0; i < this.gapStart; i++) parts.push(this.buffer[i]);
    for (let i = this.gapEnd; i < this.buffer.length; i++) parts.push(this.buffer[i]);
    return parts.join("");
  }

  substring(start: number, end?: number): string {
    const len = this.length();
    const e = end ?? len;
    let result = "";
    for (let i = start; i < e; i++) {
      result += this.charAt(i);
    }
    return result;
  }

  clear(): void {
    this.gapStart = 0;
    this.gapEnd = this.buffer.length;
  }
}
