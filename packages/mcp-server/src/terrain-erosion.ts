export class TerrainErosion {
  heightmap: number[][];
  width: number;
  height: number;

  constructor(width: number, height: number, initialHeight = 0) {
    this.width = width;
    this.height = height;
    this.heightmap = [];
    for (let y = 0; y < height; y++) {
      this.heightmap.push(new Array(width).fill(initialHeight));
    }
  }

  set(x: number, y: number, h: number): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.heightmap[y][x] = h;
    }
  }

  get(x: number, y: number): number {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      return this.heightmap[y][x];
    }
    return 0;
  }

  hydraulicErosion(drops: number, inertia = 0.05, capacity = 4, deposition = 0.3, erosion = 0.3, evaporation = 0.01, gravity = 4): void {
    for (let d = 0; d < drops; d++) {
      let x = Math.random() * (this.width - 2) + 1;
      let y = Math.random() * (this.height - 2) + 1;
      let dx = 0, dy = 0;
      let speed = 1;
      let water = 1;
      let sediment = 0;

      for (let step = 0; step < 64; step++) {
        const ix = Math.floor(x), iy = Math.floor(y);
        if (ix < 1 || ix >= this.width - 1 || iy < 1 || iy >= this.height - 1) break;

        const gx = this.get(ix + 1, iy) - this.get(ix - 1, iy);
        const gy = this.get(ix, iy + 1) - this.get(ix, iy - 1);

        dx = dx * inertia - gx * (1 - inertia);
        dy = dy * inertia - gy * (1 - inertia);

        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 0.0001) break;
        dx /= len; dy /= len;

        x += dx; y += dy;
        const nx = Math.floor(x), ny = Math.floor(y);
        if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) break;

        const heightDiff = this.get(nx, ny) - this.get(ix, iy);
        const cap = Math.max(-heightDiff, 0.01) * speed * water * capacity;

        if (sediment > cap || heightDiff > 0) {
          const deposit = heightDiff > 0
            ? Math.min(heightDiff, sediment)
            : (sediment - cap) * deposition;
          sediment -= deposit;
          this.heightmap[iy][ix] += deposit;
        } else {
          const erode = Math.min((cap - sediment) * erosion, -heightDiff);
          sediment += erode;
          this.heightmap[iy][ix] -= erode;
        }

        speed = Math.sqrt(Math.max(0, speed * speed + heightDiff * gravity));
        water *= (1 - evaporation);
      }
    }
  }

  thermalErosion(iterations: number, talusAngle = 0.05): void {
    for (let iter = 0; iter < iterations; iter++) {
      for (let y = 1; y < this.height - 1; y++) {
        for (let x = 1; x < this.width - 1; x++) {
          const h = this.heightmap[y][x];
          const neighbors = [
            [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1],
          ];
          for (const [nx, ny] of neighbors) {
            const diff = h - this.heightmap[ny][nx];
            if (diff > talusAngle) {
              const transfer = diff * 0.25;
              this.heightmap[y][x] -= transfer;
              this.heightmap[ny][nx] += transfer;
            }
          }
        }
      }
    }
  }

  minHeight(): number {
    let min = Infinity;
    for (const row of this.heightmap) {
      for (const v of row) min = Math.min(min, v);
    }
    return Math.round(min * 10000) / 10000;
  }

  maxHeight(): number {
    let max = -Infinity;
    for (const row of this.heightmap) {
      for (const v of row) max = Math.max(max, v);
    }
    return Math.round(max * 10000) / 10000;
  }

  averageHeight(): number {
    let sum = 0, count = 0;
    for (const row of this.heightmap) {
      for (const v of row) { sum += v; count++; }
    }
    return Math.round((sum / count) * 10000) / 10000;
  }

  snapshot(): number[][] {
    return this.heightmap.map(row => row.map(v => Math.round(v * 10000) / 10000));
  }
}
