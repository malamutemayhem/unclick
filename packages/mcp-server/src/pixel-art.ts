export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function color(r: number, g: number, b: number, a = 255): Color {
  return { r, g, b, a };
}

export class PixelCanvas {
  readonly width: number;
  readonly height: number;
  private data: Uint8Array;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.data = new Uint8Array(width * height * 4);
  }

  setPixel(x: number, y: number, c: Color): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const idx = (y * this.width + x) * 4;
    this.data[idx] = c.r;
    this.data[idx + 1] = c.g;
    this.data[idx + 2] = c.b;
    this.data[idx + 3] = c.a;
  }

  getPixel(x: number, y: number): Color {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return color(0, 0, 0, 0);
    const idx = (y * this.width + x) * 4;
    return { r: this.data[idx], g: this.data[idx + 1], b: this.data[idx + 2], a: this.data[idx + 3] };
  }

  fill(c: Color): void {
    for (let i = 0; i < this.data.length; i += 4) {
      this.data[i] = c.r;
      this.data[i + 1] = c.g;
      this.data[i + 2] = c.b;
      this.data[i + 3] = c.a;
    }
  }

  drawRect(x: number, y: number, w: number, h: number, c: Color): void {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        this.setPixel(x + dx, y + dy, c);
      }
    }
  }

  drawLine(x0: number, y0: number, x1: number, y1: number, c: Color): void {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let cx = x0, cy = y0;

    while (true) {
      this.setPixel(cx, cy, c);
      if (cx === x1 && cy === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; cx += sx; }
      if (e2 < dx) { err += dx; cy += sy; }
    }
  }

  drawCircle(cx: number, cy: number, radius: number, c: Color): void {
    let x = radius;
    let y = 0;
    let err = 1 - radius;

    while (x >= y) {
      this.setPixel(cx + x, cy + y, c);
      this.setPixel(cx + y, cy + x, c);
      this.setPixel(cx - y, cy + x, c);
      this.setPixel(cx - x, cy + y, c);
      this.setPixel(cx - x, cy - y, c);
      this.setPixel(cx - y, cy - x, c);
      this.setPixel(cx + y, cy - x, c);
      this.setPixel(cx + x, cy - y, c);
      y++;
      if (err < 0) {
        err += 2 * y + 1;
      } else {
        x--;
        err += 2 * (y - x) + 1;
      }
    }
  }

  floodFill(x: number, y: number, fillColor: Color): void {
    const target = this.getPixel(x, y);
    if (colorsEqual(target, fillColor)) return;

    const stack: [number, number][] = [[x, y]];
    while (stack.length > 0) {
      const [px, py] = stack.pop()!;
      if (px < 0 || px >= this.width || py < 0 || py >= this.height) continue;
      if (!colorsEqual(this.getPixel(px, py), target)) continue;
      this.setPixel(px, py, fillColor);
      stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
    }
  }

  scale(factor: number): PixelCanvas {
    const newCanvas = new PixelCanvas(this.width * factor, this.height * factor);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const c = this.getPixel(x, y);
        newCanvas.drawRect(x * factor, y * factor, factor, factor, c);
      }
    }
    return newCanvas;
  }

  toAscii(chars = " .:-=+*#%@"): string {
    const lines: string[] = [];
    for (let y = 0; y < this.height; y++) {
      let line = "";
      for (let x = 0; x < this.width; x++) {
        const c = this.getPixel(x, y);
        const brightness = (c.r + c.g + c.b) / (3 * 255);
        const idx = Math.min(chars.length - 1, Math.floor(brightness * chars.length));
        line += chars[idx];
      }
      lines.push(line);
    }
    return lines.join("\n");
  }

  countNonEmpty(): number {
    let count = 0;
    for (let i = 3; i < this.data.length; i += 4) {
      if (this.data[i] > 0) count++;
    }
    return count;
  }
}

function colorsEqual(a: Color, b: Color): boolean {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}
