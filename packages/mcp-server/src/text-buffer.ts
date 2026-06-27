export class TextBuffer {
  private lines: string[];

  constructor(text = "") {
    this.lines = text.length === 0 ? [""] : text.split("\n");
  }

  get text(): string {
    return this.lines.join("\n");
  }

  get lineCount(): number {
    return this.lines.length;
  }

  get length(): number {
    return this.text.length;
  }

  getLine(line: number): string {
    this.checkLine(line);
    return this.lines[line];
  }

  getLineLength(line: number): number {
    this.checkLine(line);
    return this.lines[line].length;
  }

  getRange(startLine: number, startCol: number, endLine: number, endCol: number): string {
    if (startLine === endLine) {
      return this.lines[startLine].slice(startCol, endCol);
    }
    const result: string[] = [];
    result.push(this.lines[startLine].slice(startCol));
    for (let i = startLine + 1; i < endLine; i++) {
      result.push(this.lines[i]);
    }
    result.push(this.lines[endLine].slice(0, endCol));
    return result.join("\n");
  }

  insert(line: number, col: number, text: string): void {
    this.checkLine(line);
    const current = this.lines[line];
    const before = current.slice(0, col);
    const after = current.slice(col);
    const newLines = (before + text + after).split("\n");
    this.lines.splice(line, 1, ...newLines);
  }

  delete(startLine: number, startCol: number, endLine: number, endCol: number): string {
    const deleted = this.getRange(startLine, startCol, endLine, endCol);
    const before = this.lines[startLine].slice(0, startCol);
    const after = this.lines[endLine].slice(endCol);
    this.lines.splice(startLine, endLine - startLine + 1, before + after);
    return deleted;
  }

  replaceLine(line: number, text: string): void {
    this.checkLine(line);
    const newLines = text.split("\n");
    this.lines.splice(line, 1, ...newLines);
  }

  insertLine(line: number, text: string): void {
    this.lines.splice(line, 0, text);
  }

  deleteLine(line: number): string {
    this.checkLine(line);
    const removed = this.lines.splice(line, 1)[0];
    if (this.lines.length === 0) this.lines.push("");
    return removed;
  }

  find(pattern: string | RegExp, startLine = 0): { line: number; col: number } | null {
    for (let i = startLine; i < this.lines.length; i++) {
      const idx = typeof pattern === "string"
        ? this.lines[i].indexOf(pattern)
        : this.lines[i].search(pattern);
      if (idx !== -1) return { line: i, col: idx };
    }
    return null;
  }

  findAll(pattern: string): { line: number; col: number }[] {
    const results: { line: number; col: number }[] = [];
    for (let i = 0; i < this.lines.length; i++) {
      let start = 0;
      while (true) {
        const idx = this.lines[i].indexOf(pattern, start);
        if (idx === -1) break;
        results.push({ line: i, col: idx });
        start = idx + 1;
      }
    }
    return results;
  }

  replace(pattern: string, replacement: string, all = false): number {
    let count = 0;
    for (let i = 0; i < this.lines.length; i++) {
      if (all) {
        const original = this.lines[i];
        this.lines[i] = this.lines[i].split(pattern).join(replacement);
        if (this.lines[i] !== original) count++;
      } else {
        const idx = this.lines[i].indexOf(pattern);
        if (idx !== -1) {
          this.lines[i] = this.lines[i].slice(0, idx) + replacement + this.lines[i].slice(idx + pattern.length);
          count++;
          if (!all) return count;
        }
      }
    }
    return count;
  }

  offsetToPosition(offset: number): { line: number; col: number } {
    let remaining = offset;
    for (let i = 0; i < this.lines.length; i++) {
      if (remaining <= this.lines[i].length) {
        return { line: i, col: remaining };
      }
      remaining -= this.lines[i].length + 1;
    }
    return { line: this.lines.length - 1, col: this.lines[this.lines.length - 1].length };
  }

  positionToOffset(line: number, col: number): number {
    let offset = 0;
    for (let i = 0; i < line; i++) {
      offset += this.lines[i].length + 1;
    }
    return offset + col;
  }

  wordAt(line: number, col: number): string | null {
    const text = this.lines[line];
    if (!text || col > text.length) return null;
    const wordChars = /[a-zA-Z0-9_]/;
    let start = col;
    while (start > 0 && wordChars.test(text[start - 1])) start--;
    let end = col;
    while (end < text.length && wordChars.test(text[end])) end++;
    if (start === end) return null;
    return text.slice(start, end);
  }

  indent(line: number, spaces = 2): void {
    this.checkLine(line);
    this.lines[line] = " ".repeat(spaces) + this.lines[line];
  }

  dedent(line: number, spaces = 2): void {
    this.checkLine(line);
    const match = this.lines[line].match(new RegExp(`^ {1,${spaces}}`));
    if (match) this.lines[line] = this.lines[line].slice(match[0].length);
  }

  clone(): TextBuffer {
    return new TextBuffer(this.text);
  }

  private checkLine(line: number): void {
    if (line < 0 || line >= this.lines.length) {
      throw new RangeError(`Line ${line} out of range (0-${this.lines.length - 1})`);
    }
  }
}
