export class WavePropagation {
  current: number[][];
  previous: number[][];
  width: number;
  height: number;
  damping: number;

  constructor(width: number, height: number, damping = 0.99) {
    this.width = width;
    this.height = height;
    this.damping = damping;
    this.current = [];
    this.previous = [];
    for (let y = 0; y < height; y++) {
      this.current.push(new Array(width).fill(0));
      this.previous.push(new Array(width).fill(0));
    }
  }

  disturb(x: number, y: number, amplitude: number): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.current[y][x] += amplitude;
    }
  }

  step(speed = 0.5): void {
    const next: number[][] = [];
    const c2 = speed * speed;

    for (let y = 0; y < this.height; y++) {
      const row: number[] = [];
      for (let x = 0; x < this.width; x++) {
        const left = x > 0 ? this.current[y][x - 1] : 0;
        const right = x < this.width - 1 ? this.current[y][x + 1] : 0;
        const up = y > 0 ? this.current[y - 1][x] : 0;
        const down = y < this.height - 1 ? this.current[y + 1][x] : 0;

        const laplacian = left + right + up + down - 4 * this.current[y][x];
        const val = 2 * this.current[y][x] - this.previous[y][x] + c2 * laplacian;
        row.push(Math.round(val * this.damping * 10000) / 10000);
      }
      next.push(row);
    }

    this.previous = this.current;
    this.current = next;
  }

  getAmplitude(x: number, y: number): number {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      return this.current[y][x];
    }
    return 0;
  }

  totalEnergy(): number {
    let energy = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        energy += this.current[y][x] * this.current[y][x];
      }
    }
    return Math.round(energy * 10000) / 10000;
  }

  maxAmplitude(): number {
    let max = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        max = Math.max(max, Math.abs(this.current[y][x]));
      }
    }
    return Math.round(max * 10000) / 10000;
  }

  snapshot(): number[][] {
    return this.current.map(row => [...row]);
  }

  addCircularWave(cx: number, cy: number, radius: number, amplitude: number): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(r - radius) < 1) {
          this.current[y][x] += amplitude * Math.cos(2 * Math.PI * r / radius);
        }
      }
    }
  }
}
