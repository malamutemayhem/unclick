export type BlendMode = "normal" | "multiply" | "screen" | "overlay" | "add";

export function checkerboard(width: number, height: number, tileSize = 8): number[][] {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const cx = Math.floor(x / tileSize);
      const cy = Math.floor(y / tileSize);
      row.push((cx + cy) % 2 === 0 ? 255 : 0);
    }
    grid.push(row);
  }
  return grid;
}

export function gradient(width: number, height: number, direction: "horizontal" | "vertical" | "radial" = "horizontal"): number[][] {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      let t: number;
      if (direction === "horizontal") {
        t = width > 1 ? x / (width - 1) : 0;
      } else if (direction === "vertical") {
        t = height > 1 ? y / (height - 1) : 0;
      } else {
        const cx = width / 2;
        const cy = height / 2;
        const maxDist = Math.sqrt(cx * cx + cy * cy);
        const dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
        t = maxDist > 0 ? Math.min(1, dist / maxDist) : 0;
      }
      row.push(Math.round(t * 255));
    }
    grid.push(row);
  }
  return grid;
}

export function stripes(width: number, height: number, stripeWidth = 4, angle = 0): number[][] {
  const rad = (angle * Math.PI) / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const proj = x * cosA + y * sinA;
      const stripe = Math.floor(proj / stripeWidth);
      row.push(stripe % 2 === 0 ? 255 : 0);
    }
    grid.push(row);
  }
  return grid;
}

export function dots(width: number, height: number, spacing = 8, radius = 2): number[][] {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const cx = Math.round(x / spacing) * spacing;
      const cy = Math.round(y / spacing) * spacing;
      const dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      row.push(dist <= radius ? 255 : 0);
    }
    grid.push(row);
  }
  return grid;
}

export function blend(a: number[][], b: number[][], mode: BlendMode = "normal", opacity = 1): number[][] {
  const h = Math.min(a.length, b.length);
  const result: number[][] = [];
  for (let y = 0; y < h; y++) {
    const w = Math.min(a[y].length, b[y].length);
    const row: number[] = [];
    for (let x = 0; x < w; x++) {
      const av = a[y][x] / 255;
      const bv = b[y][x] / 255;
      let blended: number;
      switch (mode) {
        case "multiply":
          blended = av * bv;
          break;
        case "screen":
          blended = 1 - (1 - av) * (1 - bv);
          break;
        case "overlay":
          blended = av < 0.5 ? 2 * av * bv : 1 - 2 * (1 - av) * (1 - bv);
          break;
        case "add":
          blended = Math.min(1, av + bv);
          break;
        default:
          blended = bv;
      }
      const final = av * (1 - opacity) + blended * opacity;
      row.push(Math.round(Math.min(1, Math.max(0, final)) * 255));
    }
    result.push(row);
  }
  return result;
}

export function invert(grid: number[][]): number[][] {
  return grid.map(row => row.map(v => 255 - v));
}

export function threshold(grid: number[][], level = 128): number[][] {
  return grid.map(row => row.map(v => (v >= level ? 255 : 0)));
}

export function brightness(grid: number[][], amount: number): number[][] {
  return grid.map(row => row.map(v => Math.round(Math.min(255, Math.max(0, v + amount)))));
}

export function contrast(grid: number[][], factor: number): number[][] {
  return grid.map(row =>
    row.map(v => Math.round(Math.min(255, Math.max(0, 128 + factor * (v - 128)))))
  );
}

export function gaussianBlur(grid: number[][], radius = 1): number[][] {
  const h = grid.length;
  if (h === 0) return [];
  const w = grid[0].length;
  const size = radius * 2 + 1;
  const kernel: number[] = [];
  const sigma = radius / 2 || 1;
  let sum = 0;
  for (let i = 0; i < size; i++) {
    const x = i - radius;
    const val = Math.exp(-(x * x) / (2 * sigma * sigma));
    kernel.push(val);
    sum += val;
  }
  for (let i = 0; i < size; i++) kernel[i] /= sum;

  const temp: number[][] = Array.from({ length: h }, () => new Array(w).fill(0));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let k = 0; k < size; k++) {
        const sx = Math.min(w - 1, Math.max(0, x + k - radius));
        acc += grid[y][sx] * kernel[k];
      }
      temp[y][x] = acc;
    }
  }

  const result: number[][] = Array.from({ length: h }, () => new Array(w).fill(0));
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let acc = 0;
      for (let k = 0; k < size; k++) {
        const sy = Math.min(h - 1, Math.max(0, y + k - radius));
        acc += temp[sy][x] * kernel[k];
      }
      result[y][x] = Math.round(Math.min(255, Math.max(0, acc)));
    }
  }

  return result;
}
