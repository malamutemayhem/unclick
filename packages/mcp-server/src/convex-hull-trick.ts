interface Line {
  m: number;
  b: number;
}

export class ConvexHullTrick {
  private lines: Line[] = [];

  private bad(l1: Line, l2: Line, l3: Line): boolean {
    return (l3.b - l1.b) * (l1.m - l2.m) <= (l2.b - l1.b) * (l1.m - l3.m);
  }

  addLine(m: number, b: number): void {
    const newLine: Line = { m, b };
    while (this.lines.length >= 2) {
      if (this.bad(this.lines[this.lines.length - 2], this.lines[this.lines.length - 1], newLine)) {
        this.lines.pop();
      } else {
        break;
      }
    }
    this.lines.push(newLine);
  }

  queryMin(x: number): number {
    if (this.lines.length === 0) return Infinity;
    let lo = 0;
    let hi = this.lines.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.eval(this.lines[mid], x) > this.eval(this.lines[mid + 1], x)) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return this.eval(this.lines[lo], x);
  }

  queryAll(x: number): { m: number; b: number; value: number }[] {
    return this.lines.map((l) => ({ m: l.m, b: l.b, value: this.eval(l, x) }));
  }

  lineCount(): number {
    return this.lines.length;
  }

  getLines(): { m: number; b: number }[] {
    return this.lines.map((l) => ({ m: l.m, b: l.b }));
  }

  private eval(line: Line, x: number): number {
    return line.m * x + line.b;
  }
}

export class MaxConvexHullTrick {
  private inner = new ConvexHullTrick();

  addLine(m: number, b: number): void {
    this.inner.addLine(-m, -b);
  }

  queryMax(x: number): number {
    return -this.inner.queryMin(x);
  }

  lineCount(): number {
    return this.inner.lineCount();
  }
}
