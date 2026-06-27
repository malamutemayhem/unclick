export interface OptimizeResult {
  x: number[];
  value: number;
  iterations: number;
  converged: boolean;
  history: number[];
}

export class GradientDescent {
  static minimize(
    gradient: (x: number[]) => number[],
    objective: (x: number[]) => number,
    x0: number[],
    learningRate = 0.01,
    maxIter = 1000,
    tolerance = 1e-8,
  ): OptimizeResult {
    let x = [...x0];
    const history: number[] = [];
    let converged = false;

    for (let i = 0; i < maxIter; i++) {
      const val = objective(x);
      history.push(val);
      const grad = gradient(x);
      const gradNorm = Math.sqrt(grad.reduce((s, g) => s + g * g, 0));
      if (gradNorm < tolerance) {
        converged = true;
        break;
      }
      x = x.map((xi, j) => xi - learningRate * grad[j]);
    }

    return {
      x: x.map(v => Math.round(v * 10000) / 10000),
      value: Math.round(objective(x) * 10000) / 10000,
      iterations: history.length,
      converged,
      history,
    };
  }

  static momentum(
    gradient: (x: number[]) => number[],
    objective: (x: number[]) => number,
    x0: number[],
    learningRate = 0.01,
    beta = 0.9,
    maxIter = 1000,
    tolerance = 1e-8,
  ): OptimizeResult {
    let x = [...x0];
    let v = new Array(x0.length).fill(0);
    const history: number[] = [];
    let converged = false;

    for (let i = 0; i < maxIter; i++) {
      history.push(objective(x));
      const grad = gradient(x);
      const gradNorm = Math.sqrt(grad.reduce((s, g) => s + g * g, 0));
      if (gradNorm < tolerance) { converged = true; break; }
      v = v.map((vi, j) => beta * vi + (1 - beta) * grad[j]);
      x = x.map((xi, j) => xi - learningRate * v[j]);
    }

    return {
      x: x.map(v => Math.round(v * 10000) / 10000),
      value: Math.round(objective(x) * 10000) / 10000,
      iterations: history.length,
      converged,
      history,
    };
  }

  static adam(
    gradient: (x: number[]) => number[],
    objective: (x: number[]) => number,
    x0: number[],
    learningRate = 0.001,
    beta1 = 0.9,
    beta2 = 0.999,
    maxIter = 1000,
    tolerance = 1e-8,
  ): OptimizeResult {
    let x = [...x0];
    let m = new Array(x0.length).fill(0);
    let vt = new Array(x0.length).fill(0);
    const history: number[] = [];
    let converged = false;
    const eps = 1e-8;

    for (let t = 1; t <= maxIter; t++) {
      history.push(objective(x));
      const grad = gradient(x);
      const gradNorm = Math.sqrt(grad.reduce((s, g) => s + g * g, 0));
      if (gradNorm < tolerance) { converged = true; break; }
      m = m.map((mi, j) => beta1 * mi + (1 - beta1) * grad[j]);
      vt = vt.map((vi, j) => beta2 * vi + (1 - beta2) * grad[j] * grad[j]);
      const mHat = m.map(mi => mi / (1 - Math.pow(beta1, t)));
      const vHat = vt.map(vi => vi / (1 - Math.pow(beta2, t)));
      x = x.map((xi, j) => xi - learningRate * mHat[j] / (Math.sqrt(vHat[j]) + eps));
    }

    return {
      x: x.map(v => Math.round(v * 10000) / 10000),
      value: Math.round(objective(x) * 10000) / 10000,
      iterations: history.length,
      converged,
      history,
    };
  }

  static numericalGradient(f: (x: number[]) => number, x: number[], h = 1e-5): number[] {
    return x.map((_, i) => {
      const xPlus = [...x];
      const xMinus = [...x];
      xPlus[i] += h;
      xMinus[i] -= h;
      return Math.round(((f(xPlus) - f(xMinus)) / (2 * h)) * 10000) / 10000;
    });
  }
}
