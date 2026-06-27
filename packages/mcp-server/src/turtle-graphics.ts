export interface Point {
  x: number;
  y: number;
}

export interface TurtleState {
  x: number;
  y: number;
  angle: number;
  penDown: boolean;
  color: string;
  width: number;
}

export interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
}

export class Turtle {
  private state: TurtleState;
  private lines: LineSegment[] = [];
  private stateStack: TurtleState[] = [];

  constructor(x = 0, y = 0) {
    this.state = { x, y, angle: 0, penDown: true, color: "black", width: 1 };
  }

  forward(distance: number): this {
    const rad = (this.state.angle * Math.PI) / 180;
    const nx = this.state.x + distance * Math.cos(rad);
    const ny = this.state.y + distance * Math.sin(rad);

    if (this.state.penDown) {
      this.lines.push({
        x1: this.state.x, y1: this.state.y,
        x2: nx, y2: ny,
        color: this.state.color, width: this.state.width,
      });
    }

    this.state.x = nx;
    this.state.y = ny;
    return this;
  }

  backward(distance: number): this {
    return this.forward(-distance);
  }

  right(degrees: number): this {
    this.state.angle += degrees;
    return this;
  }

  left(degrees: number): this {
    this.state.angle -= degrees;
    return this;
  }

  penUp(): this {
    this.state.penDown = false;
    return this;
  }

  penDown2(): this {
    this.state.penDown = true;
    return this;
  }

  setColor(color: string): this {
    this.state.color = color;
    return this;
  }

  setWidth(width: number): this {
    this.state.width = width;
    return this;
  }

  goto(x: number, y: number): this {
    if (this.state.penDown) {
      this.lines.push({
        x1: this.state.x, y1: this.state.y,
        x2: x, y2: y,
        color: this.state.color, width: this.state.width,
      });
    }
    this.state.x = x;
    this.state.y = y;
    return this;
  }

  setAngle(angle: number): this {
    this.state.angle = angle;
    return this;
  }

  pushState(): this {
    this.stateStack.push({ ...this.state });
    return this;
  }

  popState(): this {
    const s = this.stateStack.pop();
    if (s) this.state = s;
    return this;
  }

  getPosition(): Point {
    return { x: this.state.x, y: this.state.y };
  }

  getAngle(): number {
    return this.state.angle;
  }

  getLines(): LineSegment[] {
    return [...this.lines];
  }

  getBounds(): { minX: number; minY: number; maxX: number; maxY: number } {
    if (this.lines.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const l of this.lines) {
      minX = Math.min(minX, l.x1, l.x2);
      minY = Math.min(minY, l.y1, l.y2);
      maxX = Math.max(maxX, l.x1, l.x2);
      maxY = Math.max(maxY, l.y1, l.y2);
    }
    return { minX, minY, maxX, maxY };
  }

  toSVG(): string {
    const bounds = this.getBounds();
    const pad = 10;
    const w = Math.ceil(bounds.maxX - bounds.minX) + pad * 2;
    const h = Math.ceil(bounds.maxY - bounds.minY) + pad * 2;
    const ox = -bounds.minX + pad;
    const oy = -bounds.minY + pad;

    const paths = this.lines.map(l =>
      `<line x1="${(l.x1 + ox).toFixed(2)}" y1="${(l.y1 + oy).toFixed(2)}" x2="${(l.x2 + ox).toFixed(2)}" y2="${(l.y2 + oy).toFixed(2)}" stroke="${l.color}" stroke-width="${l.width}"/>`
    ).join("\n  ");

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n  ${paths}\n</svg>`;
  }

  clear(): this {
    this.lines = [];
    return this;
  }
}

export function drawPolygon(t: Turtle, sides: number, length: number): void {
  const angle = 360 / sides;
  for (let i = 0; i < sides; i++) {
    t.forward(length);
    t.right(angle);
  }
}

export function drawStar(t: Turtle, points: number, length: number): void {
  const angle = 180 - (180 / points);
  for (let i = 0; i < points; i++) {
    t.forward(length);
    t.right(angle);
  }
}

export function drawSpiral(t: Turtle, steps: number, startLen: number, growth: number, angle: number): void {
  let len = startLen;
  for (let i = 0; i < steps; i++) {
    t.forward(len);
    t.right(angle);
    len += growth;
  }
}
