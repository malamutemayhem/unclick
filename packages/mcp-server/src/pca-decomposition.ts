export class PCADecomposition {
  static fit(data: number[][], components: number): {
    eigenvalues: number[];
    eigenvectors: number[][];
    transformed: number[][];
    explainedVariance: number[];
  } {
    const n = data.length;
    const d = data[0].length;
    const k = Math.min(components, d);

    const means = new Array(d).fill(0);
    for (const row of data) {
      for (let j = 0; j < d; j++) means[j] += row[j];
    }
    for (let j = 0; j < d; j++) means[j] /= n;

    const centered = data.map((row) => row.map((v, j) => v - means[j]));

    const cov = Array.from({ length: d }, () => new Array(d).fill(0));
    for (let i = 0; i < d; i++) {
      for (let j = i; j < d; j++) {
        let sum = 0;
        for (const row of centered) sum += row[i] * row[j];
        cov[i][j] = sum / (n - 1);
        cov[j][i] = cov[i][j];
      }
    }

    const { eigenvalues, eigenvectors } = this.powerIteration(cov, k);
    const totalVariance = eigenvalues.reduce((s, v) => s + v, 0);
    const explainedVariance = eigenvalues.map((v) => totalVariance > 0 ? v / totalVariance : 0);

    const transformed = centered.map((row) => {
      const result: number[] = [];
      for (let c = 0; c < k; c++) {
        let dot = 0;
        for (let j = 0; j < d; j++) dot += row[j] * eigenvectors[c][j];
        result.push(dot);
      }
      return result;
    });

    return { eigenvalues, eigenvectors, transformed, explainedVariance };
  }

  private static powerIteration(
    matrix: number[][],
    k: number,
    iterations: number = 100
  ): { eigenvalues: number[]; eigenvectors: number[][] } {
    const d = matrix.length;
    const eigenvalues: number[] = [];
    const eigenvectors: number[][] = [];
    const mat = matrix.map((r) => [...r]);

    for (let comp = 0; comp < k; comp++) {
      let v = new Array(d).fill(0);
      v[comp % d] = 1;

      for (let iter = 0; iter < iterations; iter++) {
        const mv = this.matVec(mat, v);
        const norm = Math.sqrt(mv.reduce((s, x) => s + x * x, 0));
        if (norm < 1e-15) break;
        v = mv.map((x) => x / norm);
      }

      const mv = this.matVec(mat, v);
      const eigenvalue = v.reduce((s, x, i) => s + x * mv[i], 0);
      eigenvalues.push(eigenvalue);
      eigenvectors.push(v);

      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          mat[i][j] -= eigenvalue * v[i] * v[j];
        }
      }
    }

    return { eigenvalues, eigenvectors };
  }

  private static matVec(m: number[][], v: number[]): number[] {
    return m.map((row) => row.reduce((s, x, j) => s + x * v[j], 0));
  }

  static center(data: number[][]): number[][] {
    const d = data[0].length;
    const means = new Array(d).fill(0);
    for (const row of data) {
      for (let j = 0; j < d; j++) means[j] += row[j];
    }
    for (let j = 0; j < d; j++) means[j] /= data.length;
    return data.map((row) => row.map((v, j) => v - means[j]));
  }
}
