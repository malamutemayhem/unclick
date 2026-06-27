export type Shape = number[];

export class Tensor {
  readonly data: Float64Array;
  readonly shape: Shape;
  readonly strides: number[];

  constructor(data: number[] | Float64Array, shape: Shape) {
    this.data = data instanceof Float64Array ? data : new Float64Array(data);
    this.shape = [...shape];
    this.strides = computeStrides(shape);
    const expected = shape.reduce((a, b) => a * b, 1);
    if (this.data.length !== expected) {
      throw new Error(`Data length ${this.data.length} does not match shape ${shape}`);
    }
  }

  get(indices: number[]): number {
    let offset = 0;
    for (let i = 0; i < indices.length; i++) {
      offset += indices[i] * this.strides[i];
    }
    return this.data[offset];
  }

  set(indices: number[], value: number): void {
    let offset = 0;
    for (let i = 0; i < indices.length; i++) {
      offset += indices[i] * this.strides[i];
    }
    this.data[offset] = value;
  }

  get rank(): number { return this.shape.length; }
  get size(): number { return this.data.length; }

  reshape(newShape: Shape): Tensor {
    return new Tensor(this.data, newShape);
  }

  toArray(): number[] {
    return Array.from(this.data);
  }
}

function computeStrides(shape: Shape): number[] {
  const strides = new Array(shape.length);
  let stride = 1;
  for (let i = shape.length - 1; i >= 0; i--) {
    strides[i] = stride;
    stride *= shape[i];
  }
  return strides;
}

export function zeros(shape: Shape): Tensor {
  const size = shape.reduce((a, b) => a * b, 1);
  return new Tensor(new Float64Array(size), shape);
}

export function ones(shape: Shape): Tensor {
  const size = shape.reduce((a, b) => a * b, 1);
  const data = new Float64Array(size).fill(1);
  return new Tensor(data, shape);
}

export function fill(shape: Shape, value: number): Tensor {
  const size = shape.reduce((a, b) => a * b, 1);
  const data = new Float64Array(size).fill(value);
  return new Tensor(data, shape);
}

export function add(a: Tensor, b: Tensor): Tensor {
  if (a.size !== b.size) throw new Error("Shape mismatch for add");
  const result = new Float64Array(a.size);
  for (let i = 0; i < a.size; i++) result[i] = a.data[i] + b.data[i];
  return new Tensor(result, a.shape);
}

export function sub(a: Tensor, b: Tensor): Tensor {
  if (a.size !== b.size) throw new Error("Shape mismatch for sub");
  const result = new Float64Array(a.size);
  for (let i = 0; i < a.size; i++) result[i] = a.data[i] - b.data[i];
  return new Tensor(result, a.shape);
}

export function mul(a: Tensor, b: Tensor): Tensor {
  if (a.size !== b.size) throw new Error("Shape mismatch for mul");
  const result = new Float64Array(a.size);
  for (let i = 0; i < a.size; i++) result[i] = a.data[i] * b.data[i];
  return new Tensor(result, a.shape);
}

export function scale(t: Tensor, scalar: number): Tensor {
  const result = new Float64Array(t.size);
  for (let i = 0; i < t.size; i++) result[i] = t.data[i] * scalar;
  return new Tensor(result, t.shape);
}

export function dot(a: Tensor, b: Tensor): number {
  if (a.size !== b.size) throw new Error("Size mismatch for dot");
  let sum = 0;
  for (let i = 0; i < a.size; i++) sum += a.data[i] * b.data[i];
  return sum;
}

export function matmul(a: Tensor, b: Tensor): Tensor {
  if (a.rank !== 2 || b.rank !== 2) throw new Error("matmul requires 2D tensors");
  if (a.shape[1] !== b.shape[0]) throw new Error("Shape mismatch for matmul");
  const [m, k] = a.shape;
  const n = b.shape[1];
  const result = new Float64Array(m * n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let p = 0; p < k; p++) {
        sum += a.data[i * k + p] * b.data[p * n + j];
      }
      result[i * n + j] = sum;
    }
  }
  return new Tensor(result, [m, n]);
}

export function transpose(t: Tensor): Tensor {
  if (t.rank !== 2) throw new Error("transpose requires 2D tensor");
  const [rows, cols] = t.shape;
  const result = new Float64Array(t.size);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j * rows + i] = t.data[i * cols + j];
    }
  }
  return new Tensor(result, [cols, rows]);
}

export function sum(t: Tensor): number {
  let s = 0;
  for (let i = 0; i < t.size; i++) s += t.data[i];
  return s;
}

export function mean(t: Tensor): number {
  return sum(t) / t.size;
}

export function max(t: Tensor): number {
  let m = -Infinity;
  for (let i = 0; i < t.size; i++) if (t.data[i] > m) m = t.data[i];
  return m;
}

export function min(t: Tensor): number {
  let m = Infinity;
  for (let i = 0; i < t.size; i++) if (t.data[i] < m) m = t.data[i];
  return m;
}

export function apply(t: Tensor, fn: (x: number) => number): Tensor {
  const result = new Float64Array(t.size);
  for (let i = 0; i < t.size; i++) result[i] = fn(t.data[i]);
  return new Tensor(result, t.shape);
}
