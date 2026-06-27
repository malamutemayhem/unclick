export class GaloisField {
  private size: number;
  private expTable: number[];
  private logTable: number[];

  constructor(primitive = 0x11d, size = 256) {
    this.size = size;
    this.expTable = new Array(size * 2);
    this.logTable = new Array(size);

    let x = 1;
    for (let i = 0; i < size - 1; i++) {
      this.expTable[i] = x;
      this.logTable[x] = i;
      x <<= 1;
      if (x >= size) x ^= primitive;
    }
    for (let i = size - 1; i < size * 2; i++) {
      this.expTable[i] = this.expTable[i - (size - 1)];
    }
  }

  multiply(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return this.expTable[this.logTable[a] + this.logTable[b]];
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    if (a === 0) return 0;
    return this.expTable[this.logTable[a] + this.size - 1 - this.logTable[b]];
  }

  add(a: number, b: number): number {
    return a ^ b;
  }

  power(a: number, n: number): number {
    if (a === 0) return 0;
    return this.expTable[(this.logTable[a] * n) % (this.size - 1)];
  }

  inverse(a: number): number {
    if (a === 0) throw new Error("Zero has no inverse");
    return this.expTable[this.size - 1 - this.logTable[a]];
  }

  getSize(): number {
    return this.size;
  }
}

export class ReedSolomon {
  private gf: GaloisField;
  private nsym: number;

  constructor(nsym: number) {
    this.gf = new GaloisField();
    this.nsym = nsym;
  }

  generatorPoly(): number[] {
    let g = [1];
    for (let i = 0; i < this.nsym; i++) {
      const factor = [1, this.gf.power(2, i)];
      g = this.polyMul(g, factor);
    }
    return g;
  }

  private polyMul(p: number[], q: number[]): number[] {
    const result = new Array(p.length + q.length - 1).fill(0);
    for (let i = 0; i < p.length; i++) {
      for (let j = 0; j < q.length; j++) {
        result[i + j] = this.gf.add(result[i + j], this.gf.multiply(p[i], q[j]));
      }
    }
    return result;
  }

  encode(data: number[]): number[] {
    const gen = this.generatorPoly();
    const padded = [...data, ...new Array(this.nsym).fill(0)];

    for (let i = 0; i < data.length; i++) {
      const coef = padded[i];
      if (coef !== 0) {
        for (let j = 0; j < gen.length; j++) {
          padded[i + j] = this.gf.add(padded[i + j], this.gf.multiply(gen[j], coef));
        }
      }
    }

    return [...data, ...padded.slice(data.length)];
  }

  syndromes(data: number[]): number[] {
    const synd: number[] = [];
    for (let i = 0; i < this.nsym; i++) {
      let val = 0;
      for (let j = 0; j < data.length; j++) {
        val = this.gf.add(this.gf.multiply(val, this.gf.power(2, i)), data[j]);
      }
      synd.push(val);
    }
    return synd;
  }

  hasErrors(data: number[]): boolean {
    return this.syndromes(data).some((s) => s !== 0);
  }

  getRedundancy(): number {
    return this.nsym;
  }

  maxErrors(): number {
    return Math.floor(this.nsym / 2);
  }
}
