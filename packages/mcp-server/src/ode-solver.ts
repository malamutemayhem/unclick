export type ODEFunc = (t: number, y: number) => number;
export type ODEFuncSystem = (t: number, y: number[]) => number[];

export interface ODEResult {
  t: number[];
  y: number[];
}

export interface ODESystemResult {
  t: number[];
  y: number[][];
}

export function euler(f: ODEFunc, y0: number, t0: number, tEnd: number, steps: number): ODEResult {
  const dt = (tEnd - t0) / steps;
  const ts: number[] = [t0];
  const ys: number[] = [y0];
  let t = t0;
  let y = y0;

  for (let i = 0; i < steps; i++) {
    y = y + dt * f(t, y);
    t = t + dt;
    ts.push(t);
    ys.push(y);
  }

  return { t: ts, y: ys };
}

export function rk4(f: ODEFunc, y0: number, t0: number, tEnd: number, steps: number): ODEResult {
  const dt = (tEnd - t0) / steps;
  const ts: number[] = [t0];
  const ys: number[] = [y0];
  let t = t0;
  let y = y0;

  for (let i = 0; i < steps; i++) {
    const k1 = dt * f(t, y);
    const k2 = dt * f(t + dt / 2, y + k1 / 2);
    const k3 = dt * f(t + dt / 2, y + k2 / 2);
    const k4 = dt * f(t + dt, y + k3);
    y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    t = t + dt;
    ts.push(t);
    ys.push(y);
  }

  return { t: ts, y: ys };
}

export function midpoint(f: ODEFunc, y0: number, t0: number, tEnd: number, steps: number): ODEResult {
  const dt = (tEnd - t0) / steps;
  const ts: number[] = [t0];
  const ys: number[] = [y0];
  let t = t0;
  let y = y0;

  for (let i = 0; i < steps; i++) {
    const k1 = dt * f(t, y);
    const k2 = dt * f(t + dt / 2, y + k1 / 2);
    y = y + k2;
    t = t + dt;
    ts.push(t);
    ys.push(y);
  }

  return { t: ts, y: ys };
}

export function eulerSystem(f: ODEFuncSystem, y0: number[], t0: number, tEnd: number, steps: number): ODESystemResult {
  const n = y0.length;
  const dt = (tEnd - t0) / steps;
  const ts: number[] = [t0];
  const ys: number[][] = [y0.slice()];
  let t = t0;
  let y = y0.slice();

  for (let i = 0; i < steps; i++) {
    const dy = f(t, y);
    const yNew = new Array(n);
    for (let j = 0; j < n; j++) {
      yNew[j] = y[j] + dt * dy[j];
    }
    y = yNew;
    t = t + dt;
    ts.push(t);
    ys.push(y.slice());
  }

  return { t: ts, y: ys };
}

export function rk4System(f: ODEFuncSystem, y0: number[], t0: number, tEnd: number, steps: number): ODESystemResult {
  const n = y0.length;
  const dt = (tEnd - t0) / steps;
  const ts: number[] = [t0];
  const ys: number[][] = [y0.slice()];
  let t = t0;
  let y = y0.slice();

  for (let i = 0; i < steps; i++) {
    const k1 = f(t, y).map(v => dt * v);
    const k2 = f(t + dt / 2, y.map((v, j) => v + k1[j] / 2)).map(v => dt * v);
    const k3 = f(t + dt / 2, y.map((v, j) => v + k2[j] / 2)).map(v => dt * v);
    const k4 = f(t + dt, y.map((v, j) => v + k3[j])).map(v => dt * v);

    const yNew = new Array(n);
    for (let j = 0; j < n; j++) {
      yNew[j] = y[j] + (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]) / 6;
    }
    y = yNew;
    t = t + dt;
    ts.push(t);
    ys.push(y.slice());
  }

  return { t: ts, y: ys };
}
