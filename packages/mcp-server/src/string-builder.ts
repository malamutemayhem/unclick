export class StringBuilder {
  private parts: string[] = [];
  private totalLength = 0;

  append(str: string): this {
    this.parts.push(str);
    this.totalLength += str.length;
    return this;
  }

  appendLine(str = ""): this {
    this.parts.push(str + "\n");
    this.totalLength += str.length + 1;
    return this;
  }

  appendIf(condition: boolean, str: string): this {
    if (condition) this.append(str);
    return this;
  }

  prepend(str: string): this {
    this.parts.unshift(str);
    this.totalLength += str.length;
    return this;
  }

  clear(): this {
    this.parts = [];
    this.totalLength = 0;
    return this;
  }

  toString(): string {
    return this.parts.join("");
  }

  join(separator: string): string {
    return this.parts.join(separator);
  }

  get length(): number {
    return this.totalLength;
  }

  get partCount(): number {
    return this.parts.length;
  }

  isEmpty(): boolean {
    return this.totalLength === 0;
  }
}
