export interface PIDConfig {
  kp: number;
  ki: number;
  kd: number;
  outputMin?: number;
  outputMax?: number;
  integralMax?: number;
}

export class PIDController {
  private kp: number;
  private ki: number;
  private kd: number;
  private outputMin: number;
  private outputMax: number;
  private integralMax: number;
  private integral: number = 0;
  private prevError: number = 0;
  private setpoint: number = 0;
  private lastOutput: number = 0;

  constructor(config: PIDConfig) {
    this.kp = config.kp;
    this.ki = config.ki;
    this.kd = config.kd;
    this.outputMin = config.outputMin ?? -Infinity;
    this.outputMax = config.outputMax ?? Infinity;
    this.integralMax = config.integralMax ?? Infinity;
  }

  setSetpoint(sp: number): void {
    this.setpoint = sp;
  }

  update(measurement: number, dt: number): number {
    const error = this.setpoint - measurement;
    this.integral += error * dt;
    this.integral = Math.max(-this.integralMax, Math.min(this.integralMax, this.integral));
    const derivative = dt > 0 ? (error - this.prevError) / dt : 0;
    let output = this.kp * error + this.ki * this.integral + this.kd * derivative;
    output = Math.max(this.outputMin, Math.min(this.outputMax, output));
    this.prevError = error;
    this.lastOutput = output;
    return output;
  }

  reset(): void {
    this.integral = 0;
    this.prevError = 0;
    this.lastOutput = 0;
  }

  getError(): number {
    return this.prevError;
  }

  getIntegral(): number {
    return this.integral;
  }

  getOutput(): number {
    return this.lastOutput;
  }

  tune(kp: number, ki: number, kd: number): void {
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
  }

  getGains(): { kp: number; ki: number; kd: number } {
    return { kp: this.kp, ki: this.ki, kd: this.kd };
  }

  simulate(measurements: number[], dt: number): number[] {
    this.reset();
    return measurements.map((m) => this.update(m, dt));
  }
}
