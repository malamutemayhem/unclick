export type Kernel = number[][];
export type Grid = number[][];

export const IDENTITY: Kernel = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
export const SHARPEN: Kernel = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]];
export const BLUR_BOX: Kernel = [[1/9, 1/9, 1/9], [1/9, 1/9, 1/9], [1/9, 1/9, 1/9]];
export const EDGE_DETECT: Kernel = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
export const EMBOSS: Kernel = [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]];

export const SOBEL_X: Kernel = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
export const SOBEL_Y: Kernel = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

export const GAUSSIAN_3: Kernel = [
  [1/16, 2/16, 1/16],
  [2/16, 4/16, 2/16],
  [1/16, 2/16, 1/16],
];

export function convolve(grid: Grid, kernel: Kernel): Grid {
  const rows = grid.length;
  const cols = grid[0].length;
  const kRows = kernel.length;
  const kCols = kernel[0].length;
  const kCenterR = Math.floor(kRows / 2);
  const kCenterC = Math.floor(kCols / 2);

  const result: Grid = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let sum = 0;
      for (let kr = 0; kr < kRows; kr++) {
        for (let kc = 0; kc < kCols; kc++) {
          const gr = r + kr - kCenterR;
          const gc = c + kc - kCenterC;
          if (gr >= 0 && gr < rows && gc >= 0 && gc < cols) {
            sum += grid[gr][gc] * kernel[kr][kc];
          }
        }
      }
      result[r][c] = sum;
    }
  }
  return result;
}

export function clampGrid(grid: Grid, min = 0, max = 255): Grid {
  return grid.map((row) =>
    row.map((v) => Math.min(max, Math.max(min, Math.round(v)))),
  );
}

export function sobelMagnitude(grid: Grid): Grid {
  const gx = convolve(grid, SOBEL_X);
  const gy = convolve(grid, SOBEL_Y);
  const rows = grid.length;
  const cols = grid[0].length;
  const result: Grid = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[r][c] = Math.sqrt(gx[r][c] ** 2 + gy[r][c] ** 2);
    }
  }
  return result;
}

export function gaussianKernel(size: number, sigma: number): Kernel {
  const kernel: Kernel = [];
  const center = Math.floor(size / 2);
  let sum = 0;
  for (let r = 0; r < size; r++) {
    kernel[r] = [];
    for (let c = 0; c < size; c++) {
      const x = c - center;
      const y = r - center;
      const val = Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
      kernel[r][c] = val;
      sum += val;
    }
  }
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      kernel[r][c] /= sum;
    }
  }
  return kernel;
}

export function threshold(grid: Grid, t: number): Grid {
  return grid.map((row) => row.map((v) => (v >= t ? 255 : 0)));
}
