export class PCA {
  static fit(data: number[][], numComponents?: number): {
    components: number[][];
    eigenvalues: number[];
    explainedVariance: number[];
    mean: number[];
  } {
    const n = data.length;
    const dims = data[0].length;
    const k = numComponents ?? dims;

    const mean = new Array(dims).fill(0);
    for (const row of data) {
      for (let j = 0; j < dims; j++) mean[j] += row[j];
    }
    for (let j = 0; j < dims; j++) mean[j] /= n;

    const centered = data.map(row => row.map((v, j) => v - mean[j]));

    const cov: number[][] = Array.from({ length: dims }, () => new Array(dims).fill(0));
    for (let i = 0; i < dims; i++) {
      for (let j = i; j < dims; j++) {
        let sum = 0;
        for (let r = 0; r < n; r++) sum += centered[r][i] * centered[r][j];
        cov[i][j] = sum / (n - 1);
        cov[j][i] = cov[i][j];
      }
    }

    const { eigenvalues, eigenvectors } = PCA.powerIteration(cov, k);
    const totalVar = eigenvalues.reduce((s, v) => s + v, 0);
    const explainedVariance = eigenvalues.map(v =>
      totalVar === 0 ? 0 : Math.round((v / totalVar) * 10000) / 10000,
    );

    return {
      components: eigenvectors,
      eigenvalues: eigenvalues.map(v => Math.round(v * 10000) / 10000),
      explainedVariance,
      mean: mean.map(v => Math.round(v * 10000) / 10000),
    };
  }

  static transform(data: number[][], components: number[][], mean: number[]): number[][] {
    return data.map(row => {
      const centered = row.map((v, j) => v - mean[j]);
      return components.map(comp => {
        let sum = 0;
        for (let j = 0; j < centered.length; j++) sum += centered[j] * comp[j];
        return Math.round(sum * 10000) / 10000;
      });
    });
  }

  static inverse(projected: number[][], components: number[][], mean: number[]): number[][] {
    const dims = mean.length;
    return projected.map(row => {
      const result = new Array(dims).fill(0);
      for (let k = 0; k < row.length; k++) {
        for (let j = 0; j < dims; j++) {
          result[j] += row[k] * components[k][j];
        }
      }
      return result.map((v, j) => Math.round((v + mean[j]) * 10000) / 10000);
    });
  }

  private static powerIteration(
    matrix: number[][],
    k: number,
    maxIter = 200,
  ): { eigenvalues: number[]; eigenvectors: number[][] } {
    const n = matrix.length;
    const eigenvalues: number[] = [];
    const eigenvectors: number[][] = [];
    const A = matrix.map(row => [...row]);

    for (let comp = 0; comp < k; comp++) {
      let v = new Array(n).fill(0).map(() => Math.random());
      let eigenvalue = 0;

      for (let iter = 0; iter < maxIter; iter++) {
        const Av = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) Av[i] += A[i][j] * v[j];
        }
        eigenvalue = Math.sqrt(Av.reduce((s, x) => s + x * x, 0));
        if (eigenvalue === 0) break;
        v = Av.map(x => x / eigenvalue);
      }

      eigenvalues.push(eigenvalue);
      eigenvectors.push(v.map(x => Math.round(x * 10000) / 10000));

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          A[i][j] -= eigenvalue * v[i] * v[j];
        }
      }
    }

    return { eigenvalues, eigenvectors };
  }
}
