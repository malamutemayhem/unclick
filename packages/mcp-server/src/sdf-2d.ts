export type SDF2D = (x: number, y: number) => number;

export function circle(cx: number, cy: number, r: number): SDF2D {
  return (x, y) => Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) - r;
}

export function box(cx: number, cy: number, hw: number, hh: number): SDF2D {
  return (x, y) => {
    const dx = Math.abs(x - cx) - hw;
    const dy = Math.abs(y - cy) - hh;
    return Math.sqrt(Math.max(dx, 0) ** 2 + Math.max(dy, 0) ** 2) + Math.min(Math.max(dx, dy), 0);
  };
}

export function line(x1: number, y1: number, x2: number, y2: number): SDF2D {
  return (x, y) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
    const px = x1 + t * dx - x;
    const py = y1 + t * dy - y;
    return Math.sqrt(px * px + py * py);
  };
}

export function sdfUnion(a: SDF2D, b: SDF2D): SDF2D {
  return (x, y) => Math.min(a(x, y), b(x, y));
}

export function sdfIntersection(a: SDF2D, b: SDF2D): SDF2D {
  return (x, y) => Math.max(a(x, y), b(x, y));
}

export function sdfDifference(a: SDF2D, b: SDF2D): SDF2D {
  return (x, y) => Math.max(a(x, y), -b(x, y));
}

export function sdfSmoothUnion(a: SDF2D, b: SDF2D, k: number): SDF2D {
  return (x, y) => {
    const da = a(x, y);
    const db = b(x, y);
    const h = Math.max(k - Math.abs(da - db), 0) / k;
    return Math.min(da, db) - h * h * k * 0.25;
  };
}

export function translate(sdf: SDF2D, tx: number, ty: number): SDF2D {
  return (x, y) => sdf(x - tx, y - ty);
}

export function rotate(sdf: SDF2D, angle: number): SDF2D {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return (x, y) => sdf(x * c + y * s, -x * s + y * c);
}

export function scale(sdf: SDF2D, factor: number): SDF2D {
  return (x, y) => sdf(x / factor, y / factor) * factor;
}

export function round(sdf: SDF2D, r: number): SDF2D {
  return (x, y) => sdf(x, y) - r;
}

export function annular(sdf: SDF2D, r: number): SDF2D {
  return (x, y) => Math.abs(sdf(x, y)) - r;
}

export function repeat(sdf: SDF2D, spacingX: number, spacingY: number): SDF2D {
  return (x, y) => {
    const rx = ((x % spacingX) + spacingX) % spacingX - spacingX / 2;
    const ry = ((y % spacingY) + spacingY) % spacingY - spacingY / 2;
    return sdf(rx, ry);
  };
}

export function renderGrid(
  sdf: SDF2D,
  width: number, height: number,
  xMin: number, xMax: number, yMin: number, yMax: number
): number[][] {
  const grid: number[][] = [];
  for (let py = 0; py < height; py++) {
    const row: number[] = [];
    const y = yMin + (py / height) * (yMax - yMin);
    for (let px = 0; px < width; px++) {
      const x = xMin + (px / width) * (xMax - xMin);
      row.push(sdf(x, y));
    }
    grid.push(row);
  }
  return grid;
}

export function gridToAscii(grid: number[][], threshold = 0): string {
  return grid.map(row =>
    row.map(v => v <= threshold ? "#" : ".").join("")
  ).join("\n");
}

export function estimateArea(
  sdf: SDF2D,
  xMin: number, xMax: number, yMin: number, yMax: number,
  resolution = 100
): number {
  let count = 0;
  const dx = (xMax - xMin) / resolution;
  const dy = (yMax - yMin) / resolution;
  for (let py = 0; py < resolution; py++) {
    const y = yMin + (py + 0.5) * dy;
    for (let px = 0; px < resolution; px++) {
      const x = xMin + (px + 0.5) * dx;
      if (sdf(x, y) <= 0) count++;
    }
  }
  return count * dx * dy;
}
