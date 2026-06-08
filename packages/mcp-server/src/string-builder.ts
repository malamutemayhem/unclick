export class StringBuilder {
  private parts: string[] = [];

  append(str: string): this {
    this.parts.push(str);
    return this;
  }

  appendLine(str = ""): this {
    this.parts.push(str + "\n");
    return this;
  }

  prepend(str: string): this {
    this.parts.unshift(str);
    return this;
  }

  insert(index: number, str: string): this {
    const current = this.toString();
    this.parts = [current.slice(0, index) + str + current.slice(index)];
    return this;
  }

  replace(search: string, replacement: string): this {
    const current = this.toString();
    this.parts = [current.replace(search, replacement)];
    return this;
  }

  replaceAll(search: string, replacement: string): this {
    const current = this.toString();
    this.parts = [current.split(search).join(replacement)];
    return this;
  }

  get length(): number {
    return this.parts.reduce((sum, p) => sum + p.length, 0);
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  clear(): this {
    this.parts = [];
    return this;
  }

  toString(): string {
    return this.parts.join("");
  }

  toLines(): string[] {
    return this.toString().split("\n");
  }

  indent(spaces: number): this {
    const prefix = " ".repeat(spaces);
    const current = this.toString();
    this.parts = [current.split("\n").map((line) => prefix + line).join("\n")];
    return this;
  }

  wrap(maxWidth: number): this {
    const words = this.toString().split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      if (currentLine.length + word.length + 1 > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = currentLine ? currentLine + " " + word : word;
      }
    }
    if (currentLine) lines.push(currentLine);
    this.parts = [lines.join("\n")];
    return this;
  }
}

export function sb(): StringBuilder {
  return new StringBuilder();
}
