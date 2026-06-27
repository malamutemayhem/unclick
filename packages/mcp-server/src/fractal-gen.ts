export interface FractalPoint {
  x: number;
  y: number;
  iterations: number;
}

export function mandelbrot(
  cx: number, cy: number, maxIter: number
): number {
  let zx = 0, zy = 0;
  for (let i = 0; i < maxIter; i++) {
    const zx2 = zx * zx;
    const zy2 = zy * zy;
    if (zx2 + zy2 > 4) return i;
    zy = 2 * zx * zy + cy;
    zx = zx2 - zy2 + cx;
  }
  return maxIter;
}

export function julia(
  zx: number, zy: number, cx: number, cy: number, maxIter: number
): number {
  for (let i = 0; i < maxIter; i++) {
    const zx2 = zx * zx;
    const zy2 = zy * zy;
    if (zx2 + zy2 > 4) return i;
    const newZx = zx2 - zy2 + cx;
    zy = 2 * zx * zy + cy;
    zx = newZx;
  }
  return maxIter;
}

export function mandelbrotGrid(
  width: number, height: number,
  xMin: number, xMax: number, yMin: number, yMax: number,
  maxIter: number
): number[][] {
  const grid: number[][] = [];
  for (let py = 0; py < height; py++) {
    const row: number[] = [];
    const cy = yMin + (py / height) * (yMax - yMin);
    for (let px = 0; px < width; px++) {
      const cx = xMin + (px / width) * (xMax - xMin);
      row.push(mandelbrot(cx, cy, maxIter));
    }
    grid.push(row);
  }
  return grid;
}

export function juliaGrid(
  width: number, height: number,
  xMin: number, xMax: number, yMin: number, yMax: number,
  cx: number, cy: number, maxIter: number
): number[][] {
  const grid: number[][] = [];
  for (let py = 0; py < height; py++) {
    const row: number[] = [];
    const zy = yMin + (py / height) * (yMax - yMin);
    for (let px = 0; px < width; px++) {
      const zx = xMin + (px / width) * (xMax - xMin);
      row.push(julia(zx, zy, cx, cy, maxIter));
    }
    grid.push(row);
  }
  return grid;
}

export function sierpinskiTriangle(depth: number): string[] {
  if (depth === 0) return ["*"];

  const smaller = sierpinskiTriangle(depth - 1);
  const h = smaller.length;
  const w = smaller[0].length;
  const result: string[] = [];

  for (const line of smaller) {
    result.push(" ".repeat(w) + line + " ".repeat(w));
  }
  for (const line of smaller) {
    result.push(line + " " + line);
  }

  return result;
}

export function kochSnowflakePoints(
  x1: number, y1: number, x2: number, y2: number, depth: number
): [number, number][] {
  if (depth === 0) {
    return [[x1, y1], [x2, y2]];
  }

  const dx = x2 - x1;
  const dy = y2 - y1;

  const ax = x1 + dx / 3;
  const ay = y1 + dy / 3;
  const bx = x1 + 2 * dx / 3;
  const by = y1 + 2 * dy / 3;

  const cos60 = Math.cos(Math.PI / 3);
  const sin60 = Math.sin(Math.PI / 3);
  const cx = ax + (bx - ax) * cos60 - (by - ay) * sin60;
  const cy = ay + (bx - ax) * sin60 + (by - ay) * cos60;

  const p1 = kochSnowflakePoints(x1, y1, ax, ay, depth - 1);
  const p2 = kochSnowflakePoints(ax, ay, cx, cy, depth - 1);
  const p3 = kochSnowflakePoints(cx, cy, bx, by, depth - 1);
  const p4 = kochSnowflakePoints(bx, by, x2, y2, depth - 1);

  return [...p1.slice(0, -1), ...p2.slice(0, -1), ...p3.slice(0, -1), ...p4];
}

export function cantorSet(depth: number): string[] {
  if (depth === 0) return ["#"];
  const prev = cantorSet(depth - 1);
  const result: string[] = [];
  for (const line of prev) {
    result.push(line.repeat(3));
  }
  for (const line of prev) {
    const blank = " ".repeat(line.length);
    result.push(line + blank + line);
  }
  return result;
}

export function gridToAscii(grid: number[][], maxIter: number, chars = " .:-=+*#%@"): string {
  return grid.map(row =>
    row.map(v => {
      if (v === maxIter) return chars[chars.length - 1];
      const idx = Math.floor((v / maxIter) * (chars.length - 1));
      return chars[idx];
    }).join("")
  ).join("\n");
}

export function burningShip(cx: number, cy: number, maxIter: number): number {
  let zx = 0, zy = 0;
  for (let i = 0; i < maxIter; i++) {
    const zx2 = zx * zx;
    const zy2 = zy * zy;
    if (zx2 + zy2 > 4) return i;
    zy = Math.abs(2 * zx * zy) + cy;
    zx = zx2 - zy2 + cx;
  }
  return maxIter;
}
