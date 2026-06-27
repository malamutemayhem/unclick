export type DerivativeFunc = (t: number, y: number) => number;
export type SystemDerivativeFunc = (t: number, y: number[]) => number[];

export class RungeKutta {
  static rk4(f: DerivativeFunc, t0: number, y0: number, h: number, steps: number): { t: number[]; y: number[] } {
    const ts: number[] = [t0];
    const ys: number[] = [y0];
    let t = t0;
    let y = y0;

    for (let i = 0; i < steps; i++) {
      const k1 = h * f(t, y);
      const k2 = h * f(t + h / 2, y + k1 / 2);
      const k3 = h * f(t + h / 2, y + k2 / 2);
      const k4 = h * f(t + h, y + k3);
      y += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      t += h;
      ts.push(t);
      ys.push(y);
    }

    return { t: ts, y: ys };
  }

  static rk4System(
    f: SystemDerivativeFunc,
    t0: number,
    y0: number[],
    h: number,
    steps: number
  ): { t: number[]; y: number[][] } {
    const n = y0.length;
    const ts: number[] = [t0];
    const ys: number[][] = [[...y0]];
    let t = t0;
    let y = [...y0];

    for (let step = 0; step < steps; step++) {
      const k1 = f(t, y).map((v) => h * v);
      const y2 = y.map((v, i) => v + k1[i] / 2);
      const k2 = f(t + h / 2, y2).map((v) => h * v);
      const y3 = y.map((v, i) => v + k2[i] / 2);
      const k3 = f(t + h / 2, y3).map((v) => h * v);
      const y4 = y.map((v, i) => v + k3[i]);
      const k4 = f(t + h, y4).map((v) => h * v);

      y = y.map((v, i) => v + (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6);
      t += h;
      ts.push(t);
      ys.push([...y]);
    }

    return { t: ts, y: ys };
  }

  static euler(f: DerivativeFunc, t0: number, y0: number, h: number, steps: number): { t: number[]; y: number[] } {
    const ts: number[] = [t0];
    const ys: number[] = [y0];
    let t = t0;
    let y = y0;

    for (let i = 0; i < steps; i++) {
      y += h * f(t, y);
      t += h;
      ts.push(t);
      ys.push(y);
    }

    return { t: ts, y: ys };
  }

  static midpoint(f: DerivativeFunc, t0: number, y0: number, h: number, steps: number): { t: number[]; y: number[] } {
    const ts: number[] = [t0];
    const ys: number[] = [y0];
    let t = t0;
    let y = y0;

    for (let i = 0; i < steps; i++) {
      const k1 = h * f(t, y);
      y += h * f(t + h / 2, y + k1 / 2);
      t += h;
      ts.push(t);
      ys.push(y);
    }

    return { t: ts, y: ys };
  }
}
