export class WaveEquation1D {
  private u: Float64Array;
  private uPrev: Float64Array;
  private n: number;
  private c: number;
  private dx: number;
  private time = 0;

  constructor(gridSize: number, waveSpeed: number, dx = 1) {
    this.n = gridSize;
    this.c = waveSpeed;
    this.dx = dx;
    this.u = new Float64Array(gridSize);
    this.uPrev = new Float64Array(gridSize);
  }

  setInitialCondition(fn: (x: number) => number): void {
    for (let i = 0; i < this.n; i++) {
      const val = fn(i * this.dx);
      this.u[i] = val;
      this.uPrev[i] = val;
    }
  }

  setGaussianPulse(center: number, width: number, amplitude = 1): void {
    this.setInitialCondition((x) => {
      const d = x - center;
      return amplitude * Math.exp(-(d * d) / (2 * width * width));
    });
  }

  step(dt: number): void {
    const r = (this.c * dt / this.dx) ** 2;
    const uNext = new Float64Array(this.n);

    uNext[0] = 0;
    uNext[this.n - 1] = 0;

    for (let i = 1; i < this.n - 1; i++) {
      uNext[i] =
        2 * this.u[i] -
        this.uPrev[i] +
        r * (this.u[i + 1] - 2 * this.u[i] + this.u[i - 1]);
    }

    this.uPrev.set(this.u);
    this.u.set(uNext);
    this.time += dt;
  }

  getValues(): number[] {
    return Array.from(this.u);
  }

  getValue(index: number): number {
    return this.u[index] ?? 0;
  }

  gridSize(): number {
    return this.n;
  }

  getTime(): number {
    return this.time;
  }

  energy(): number {
    let kinetic = 0;
    let potential = 0;
    const dt = 0.01;
    for (let i = 0; i < this.n; i++) {
      const vel = (this.u[i] - this.uPrev[i]) / dt;
      kinetic += 0.5 * vel * vel * this.dx;
    }
    for (let i = 0; i < this.n - 1; i++) {
      const strain = (this.u[i + 1] - this.u[i]) / this.dx;
      potential += 0.5 * this.c * this.c * strain * strain * this.dx;
    }
    return kinetic + potential;
  }

  maxAmplitude(): number {
    let max = 0;
    for (let i = 0; i < this.n; i++) {
      max = Math.max(max, Math.abs(this.u[i]));
    }
    return max;
  }
}

export class HeatEquation1D {
  private u: Float64Array;
  private n: number;
  private alpha: number;
  private dx: number;
  private time = 0;

  constructor(gridSize: number, diffusivity: number, dx = 1) {
    this.n = gridSize;
    this.alpha = diffusivity;
    this.dx = dx;
    this.u = new Float64Array(gridSize);
  }

  setInitialCondition(fn: (x: number) => number): void {
    for (let i = 0; i < this.n; i++) {
      this.u[i] = fn(i * this.dx);
    }
  }

  setHotSpot(center: number, width: number, temperature = 100): void {
    this.setInitialCondition((x) => {
      const d = x - center;
      return temperature * Math.exp(-(d * d) / (2 * width * width));
    });
  }

  step(dt: number): void {
    const r = this.alpha * dt / (this.dx * this.dx);
    const uNext = new Float64Array(this.n);

    uNext[0] = this.u[0];
    uNext[this.n - 1] = this.u[this.n - 1];

    for (let i = 1; i < this.n - 1; i++) {
      uNext[i] = this.u[i] + r * (this.u[i + 1] - 2 * this.u[i] + this.u[i - 1]);
    }

    this.u.set(uNext);
    this.time += dt;
  }

  getValues(): number[] {
    return Array.from(this.u);
  }

  maxTemperature(): number {
    let max = -Infinity;
    for (let i = 0; i < this.n; i++) {
      if (this.u[i] > max) max = this.u[i];
    }
    return max;
  }

  averageTemperature(): number {
    let sum = 0;
    for (let i = 0; i < this.n; i++) {
      sum += this.u[i];
    }
    return sum / this.n;
  }

  getTime(): number {
    return this.time;
  }

  gridSize(): number {
    return this.n;
  }
}
