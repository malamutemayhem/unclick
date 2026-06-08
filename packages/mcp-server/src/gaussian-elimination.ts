export class GaussianElimination {
  static solve(matrix: number[][], rhs: number[]): number[] | null {
    const n = matrix.length;
    const aug = matrix.map((row, i) => [...row, rhs[i]]);

    for (let col = 0; col < n; col++) {
      let maxRow = col;
      for (let row = col + 1; row < n; row++) {
        if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) {
          maxRow = row;
        }
      }
      [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];

      if (Math.abs(aug[col][col]) < 1e-12) return null;

      for (let row = col + 1; row < n; row++) {
        const factor = aug[row][col] / aug[col][col];
        for (let j = col; j <= n; j++) {
          aug[row][j] -= factor * aug[col][j];
        }
      }
    }

    const solution = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      solution[i] = aug[i][n];
      for (let j = i + 1; j < n; j++) {
        solution[i] -= aug[i][j] * solution[j];
      }
      solution[i] /= aug[i][i];
    }

    return solution;
  }

  static determinant(matrix: number[][]): number {
    const n = matrix.length;
    const m = matrix.map((row) => [...row]);
    let det = 1;
    let swaps = 0;

    for (let col = 0; col < n; col++) {
      let maxRow = col;
      for (let row = col + 1; row < n; row++) {
        if (Math.abs(m[row][col]) > Math.abs(m[maxRow][col])) maxRow = row;
      }
      if (maxRow !== col) {
        [m[col], m[maxRow]] = [m[maxRow], m[col]];
        swaps++;
      }
      if (Math.abs(m[col][col]) < 1e-12) return 0;

      for (let row = col + 1; row < n; row++) {
        const factor = m[row][col] / m[col][col];
        for (let j = col; j < n; j++) {
          m[row][j] -= factor * m[col][j];
        }
      }
      det *= m[col][col];
    }

    return swaps % 2 === 0 ? det : -det;
  }

  static inverse(matrix: number[][]): number[][] | null {
    const n = matrix.length;
    const aug = matrix.map((row, i) => {
      const ext = new Array(n).fill(0);
      ext[i] = 1;
      return [...row, ...ext];
    });

    for (let col = 0; col < n; col++) {
      let maxRow = col;
      for (let row = col + 1; row < n; row++) {
        if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row;
      }
      [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
      if (Math.abs(aug[col][col]) < 1e-12) return null;

      const pivot = aug[col][col];
      for (let j = 0; j < 2 * n; j++) aug[col][j] /= pivot;

      for (let row = 0; row < n; row++) {
        if (row === col) continue;
        const factor = aug[row][col];
        for (let j = 0; j < 2 * n; j++) {
          aug[row][j] -= factor * aug[col][j];
        }
      }
    }

    return aug.map((row) => row.slice(n));
  }

  static rank(matrix: number[][]): number {
    const n = matrix.length;
    const m = matrix[0]?.length || 0;
    const mat = matrix.map((row) => [...row]);
    let r = 0;

    for (let col = 0; col < m && r < n; col++) {
      let maxRow = r;
      for (let row = r + 1; row < n; row++) {
        if (Math.abs(mat[row][col]) > Math.abs(mat[maxRow][col])) maxRow = row;
      }
      if (Math.abs(mat[maxRow][col]) < 1e-12) continue;
      [mat[r], mat[maxRow]] = [mat[maxRow], mat[r]];

      for (let row = r + 1; row < n; row++) {
        const factor = mat[row][col] / mat[r][col];
        for (let j = col; j < m; j++) mat[row][j] -= factor * mat[r][j];
      }
      r++;
    }

    return r;
  }
}
