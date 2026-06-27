export interface KalmanState {
  estimate: number;
  errorCovariance: number;
}

export class KalmanFilter1D {
  private state: KalmanState;
  private processNoise: number;
  private measurementNoise: number;
  private history: KalmanState[] = [];

  constructor(initialEstimate: number, initialError: number, processNoise: number, measurementNoise: number) {
    this.state = { estimate: initialEstimate, errorCovariance: initialError };
    this.processNoise = processNoise;
    this.measurementNoise = measurementNoise;
    this.history.push({ ...this.state });
  }

  predict(controlInput = 0): KalmanState {
    this.state.estimate += controlInput;
    this.state.errorCovariance += this.processNoise;
    return { ...this.state };
  }

  update(measurement: number): KalmanState {
    const kalmanGain = this.state.errorCovariance / (this.state.errorCovariance + this.measurementNoise);
    this.state.estimate += kalmanGain * (measurement - this.state.estimate);
    this.state.errorCovariance *= 1 - kalmanGain;
    this.history.push({ ...this.state });
    return { ...this.state };
  }

  step(measurement: number, controlInput = 0): KalmanState {
    this.predict(controlInput);
    return this.update(measurement);
  }

  filter(measurements: number[]): number[] {
    return measurements.map((m) => this.step(m).estimate);
  }

  getState(): KalmanState {
    return { ...this.state };
  }

  getHistory(): KalmanState[] {
    return this.history.map((s) => ({ ...s }));
  }

  getKalmanGain(): number {
    return this.state.errorCovariance / (this.state.errorCovariance + this.measurementNoise);
  }

  reset(estimate: number, errorCovariance: number): void {
    this.state = { estimate, errorCovariance };
    this.history = [{ ...this.state }];
  }
}

export class ExponentialSmoothing {
  private value: number;
  private alpha: number;
  private history: number[] = [];

  constructor(alpha: number, initialValue = 0) {
    if (alpha <= 0 || alpha > 1) throw new Error("Alpha must be in (0, 1]");
    this.alpha = alpha;
    this.value = initialValue;
    this.history.push(this.value);
  }

  update(measurement: number): number {
    this.value = this.alpha * measurement + (1 - this.alpha) * this.value;
    this.history.push(this.value);
    return this.value;
  }

  filter(measurements: number[]): number[] {
    return measurements.map((m) => this.update(m));
  }

  getValue(): number {
    return this.value;
  }

  getHistory(): number[] {
    return [...this.history];
  }

  reset(value: number): void {
    this.value = value;
    this.history = [value];
  }
}

export class MovingAverageFilter {
  private window: number[];
  private size: number;

  constructor(size: number) {
    if (size < 1) throw new Error("Window size must be at least 1");
    this.size = size;
    this.window = [];
  }

  update(value: number): number {
    this.window.push(value);
    if (this.window.length > this.size) {
      this.window.shift();
    }
    return this.average();
  }

  filter(values: number[]): number[] {
    return values.map((v) => this.update(v));
  }

  average(): number {
    if (this.window.length === 0) return 0;
    return this.window.reduce((s, v) => s + v, 0) / this.window.length;
  }

  isFull(): boolean {
    return this.window.length >= this.size;
  }

  reset(): void {
    this.window = [];
  }
}
