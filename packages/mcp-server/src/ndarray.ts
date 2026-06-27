export class NdArray {
  readonly data: Float64Array;
  readonly shape: number[];
  readonly strides: number[];

  constructor(data: number[] | Float64Array, shape: number[]) {
    const size = shape.reduce((a, b) => a * b, 1);
    this.data = data instanceof Float64Array ? data : new Float64Array(data);
    if (this.data.length !== size) throw new Error(`Data length ${this.data.length} does not match shape ${shape}`);
    this.shape = [...shape];
    this.strides = computeStrides(shape);
  }

  static zeros(shape: number[]): NdArray {
    const size = shape.reduce((a, b) => a * b, 1);
    return new NdArray(new Float64Array(size), shape);
  }

  static ones(shape: number[]): NdArray {
    const size = shape.reduce((a, b) => a * b, 1);
    const data = new Float64Array(size).fill(1);
    return new NdArray(data, shape);
  }

  static arange(start: number, stop?: number, step = 1): NdArray {
    if (stop === undefined) { stop = start; start = 0; }
    const data: number[] = [];
    for (let i = start; i < stop; i += step) data.push(i);
    return new NdArray(data, [data.length]);
  }

  static linspace(start: number, stop: number, num: number): NdArray {
    const data: number[] = [];
    const step = num > 1 ? (stop - start) / (num - 1) : 0;
    for (let i = 0; i < num; i++) data.push(start + step * i);
    return new NdArray(data, [num]);
  }

  get ndim(): number {
    return this.shape.length;
  }

  get size(): number {
    return this.data.length;
  }

  get(indices: number[]): number {
    return this.data[this.offset(indices)];
  }

  set(indices: number[], value: number): void {
    this.data[this.offset(indices)] = value;
  }

  private offset(indices: number[]): number {
    let off = 0;
    for (let i = 0; i < indices.length; i++) off += indices[i] * this.strides[i];
    return off;
  }

  reshape(newShape: number[]): NdArray {
    const size = newShape.reduce((a, b) => a * b, 1);
    if (size !== this.size) throw new Error("Cannot reshape: size mismatch");
    return new NdArray(new Float64Array(this.data), newShape);
  }

  transpose(): NdArray {
    if (this.ndim !== 2) throw new Error("transpose only supports 2D arrays");
    const [rows, cols] = this.shape;
    const result = NdArray.zeros([cols, rows]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        result.set([j, i], this.get([i, j]));
      }
    }
    return result;
  }

  add(other: NdArray | number): NdArray {
    if (typeof other === "number") {
      const data = new Float64Array(this.size);
      for (let i = 0; i < this.size; i++) data[i] = this.data[i] + other;
      return new NdArray(data, this.shape);
    }
    this.checkShape(other);
    const data = new Float64Array(this.size);
    for (let i = 0; i < this.size; i++) data[i] = this.data[i] + other.data[i];
    return new NdArray(data, this.shape);
  }

  sub(other: NdArray | number): NdArray {
    if (typeof other === "number") {
      const data = new Float64Array(this.size);
      for (let i = 0; i < this.size; i++) data[i] = this.data[i] - other;
      return new NdArray(data, this.shape);
    }
    this.checkShape(other);
    const data = new Float64Array(this.size);
    for (let i = 0; i < this.size; i++) data[i] = this.data[i] - other.data[i];
    return new NdArray(data, this.shape);
  }

  mul(other: NdArray | number): NdArray {
    if (typeof other === "number") {
      const data = new Float64Array(this.size);
      for (let i = 0; i < this.size; i++) data[i] = this.data[i] * other;
      return new NdArray(data, this.shape);
    }
    this.checkShape(other);
    const data = new Float64Array(this.size);
    for (let i = 0; i < this.size; i++) data[i] = this.data[i] * other.data[i];
    return new NdArray(data, this.shape);
  }

  dot(other: NdArray): NdArray {
    if (this.ndim !== 2 || other.ndim !== 2) throw new Error("dot requires 2D arrays");
    if (this.shape[1] !== other.shape[0]) throw new Error("Incompatible shapes for dot product");
    const [m, k] = this.shape;
    const n = other.shape[1];
    const result = NdArray.zeros([m, n]);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        let sum = 0;
        for (let p = 0; p < k; p++) {
          sum += this.get([i, p]) * other.get([p, j]);
        }
        result.set([i, j], sum);
      }
    }
    return result;
  }

  sum(): number {
    let s = 0;
    for (let i = 0; i < this.size; i++) s += this.data[i];
    return s;
  }

  mean(): number {
    return this.sum() / this.size;
  }

  max(): number {
    let m = -Infinity;
    for (let i = 0; i < this.size; i++) if (this.data[i] > m) m = this.data[i];
    return m;
  }

  min(): number {
    let m = Infinity;
    for (let i = 0; i < this.size; i++) if (this.data[i] < m) m = this.data[i];
    return m;
  }

  map(fn: (v: number, i: number) => number): NdArray {
    const data = new Float64Array(this.size);
    for (let i = 0; i < this.size; i++) data[i] = fn(this.data[i], i);
    return new NdArray(data, this.shape);
  }

  toArray(): number[] {
    return Array.from(this.data);
  }

  slice(dim: number, start: number, end?: number): NdArray {
    if (this.ndim !== 2) throw new Error("slice only supports 2D for now");
    const e = end ?? this.shape[dim];
    if (dim === 0) {
      const rows = e - start;
      const cols = this.shape[1];
      const data = new Float64Array(rows * cols);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          data[i * cols + j] = this.get([start + i, j]);
        }
      }
      return new NdArray(data, [rows, cols]);
    }
    const rows = this.shape[0];
    const cols = e - start;
    const data = new Float64Array(rows * cols);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        data[i * cols + j] = this.get([i, start + j]);
      }
    }
    return new NdArray(data, [rows, cols]);
  }

  private checkShape(other: NdArray): void {
    if (this.shape.length !== other.shape.length || !this.shape.every((v, i) => v === other.shape[i])) {
      throw new Error(`Shape mismatch: ${this.shape} vs ${other.shape}`);
    }
  }
}

function computeStrides(shape: number[]): number[] {
  const strides: number[] = new Array(shape.length);
  let stride = 1;
  for (let i = shape.length - 1; i >= 0; i--) {
    strides[i] = stride;
    stride *= shape[i];
  }
  return strides;
}
