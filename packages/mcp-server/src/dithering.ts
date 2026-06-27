export interface GrayImage {
  width: number;
  height: number;
  data: number[];
}

export function createImage(width: number, height: number, fill = 0): GrayImage {
  return { width, height, data: new Array(width * height).fill(fill) };
}

export function getPixel(img: GrayImage, x: number, y: number): number {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return 0;
  return img.data[y * img.width + x];
}

export function setPixel(img: GrayImage, x: number, y: number, v: number): void {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  img.data[y * img.width + x] = v;
}

export function cloneImage(img: GrayImage): GrayImage {
  return { width: img.width, height: img.height, data: [...img.data] };
}

export function threshold(img: GrayImage, t = 128): GrayImage {
  const out = createImage(img.width, img.height);
  for (let i = 0; i < img.data.length; i++) {
    out.data[i] = img.data[i] >= t ? 255 : 0;
  }
  return out;
}

export function randomDither(img: GrayImage): GrayImage {
  const out = createImage(img.width, img.height);
  let seed = 12345;
  for (let i = 0; i < img.data.length; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const rand = (seed % 256);
    out.data[i] = img.data[i] > rand ? 255 : 0;
  }
  return out;
}

export function floydSteinberg(img: GrayImage): GrayImage {
  const out = cloneImage(img);
  const w = img.width;
  const h = img.height;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const old = getPixel(out, x, y);
      const nv = old >= 128 ? 255 : 0;
      setPixel(out, x, y, nv);
      const err = old - nv;
      setPixel(out, x + 1, y, getPixel(out, x + 1, y) + err * 7 / 16);
      setPixel(out, x - 1, y + 1, getPixel(out, x - 1, y + 1) + err * 3 / 16);
      setPixel(out, x, y + 1, getPixel(out, x, y + 1) + err * 5 / 16);
      setPixel(out, x + 1, y + 1, getPixel(out, x + 1, y + 1) + err * 1 / 16);
    }
  }

  return out;
}

export function orderedDither(img: GrayImage, matrixSize = 4): GrayImage {
  const bayer = generateBayerMatrix(matrixSize);
  const n = bayer.length;
  const out = createImage(img.width, img.height);

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const t = (bayer[y % n][x % n] + 0.5) / (n * n) * 255;
      out.data[y * img.width + x] = img.data[y * img.width + x] > t ? 255 : 0;
    }
  }

  return out;
}

function generateBayerMatrix(size: number): number[][] {
  if (size === 2) {
    return [[0, 2], [3, 1]];
  }
  const half = size / 2;
  const smaller = generateBayerMatrix(half);
  const matrix: number[][] = Array.from({ length: size }, () => new Array(size).fill(0));

  for (let y = 0; y < half; y++) {
    for (let x = 0; x < half; x++) {
      const base = smaller[y][x] * 4;
      matrix[y][x] = base;
      matrix[y][x + half] = base + 2;
      matrix[y + half][x] = base + 3;
      matrix[y + half][x + half] = base + 1;
    }
  }

  return matrix;
}

export function atkinsonDither(img: GrayImage): GrayImage {
  const out = cloneImage(img);
  const w = img.width;
  const h = img.height;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const old = getPixel(out, x, y);
      const nv = old >= 128 ? 255 : 0;
      setPixel(out, x, y, nv);
      const err = Math.floor((old - nv) / 8);
      setPixel(out, x + 1, y, getPixel(out, x + 1, y) + err);
      setPixel(out, x + 2, y, getPixel(out, x + 2, y) + err);
      setPixel(out, x - 1, y + 1, getPixel(out, x - 1, y + 1) + err);
      setPixel(out, x, y + 1, getPixel(out, x, y + 1) + err);
      setPixel(out, x + 1, y + 1, getPixel(out, x + 1, y + 1) + err);
      setPixel(out, x, y + 2, getPixel(out, x, y + 2) + err);
    }
  }

  return out;
}

export function imageToAscii(img: GrayImage, chars = " .:-=+*#%@"): string {
  const lines: string[] = [];
  for (let y = 0; y < img.height; y++) {
    let line = "";
    for (let x = 0; x < img.width; x++) {
      const v = getPixel(img, x, y) / 255;
      const idx = Math.min(chars.length - 1, Math.floor(v * chars.length));
      line += chars[idx];
    }
    lines.push(line);
  }
  return lines.join("\n");
}

export function countBlack(img: GrayImage): number {
  let count = 0;
  for (const v of img.data) {
    if (v === 0) count++;
  }
  return count;
}

export function countWhite(img: GrayImage): number {
  let count = 0;
  for (const v of img.data) {
    if (v === 255) count++;
  }
  return count;
}
