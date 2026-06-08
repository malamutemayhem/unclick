export class ModularArithmetic {
  static mod(a: number, m: number): number {
    return ((a % m) + m) % m;
  }

  static add(a: number, b: number, m: number): number {
    return ModularArithmetic.mod(a + b, m);
  }

  static subtract(a: number, b: number, m: number): number {
    return ModularArithmetic.mod(a - b, m);
  }

  static multiply(a: number, b: number, m: number): number {
    return ModularArithmetic.mod(a * b, m);
  }

  static power(base: number, exp: number, m: number): number {
    base = ModularArithmetic.mod(base, m);
    let result = 1;
    while (exp > 0) {
      if (exp % 2 === 1) result = ModularArithmetic.mod(result * base, m);
      base = ModularArithmetic.mod(base * base, m);
      exp = Math.floor(exp / 2);
    }
    return result;
  }

  static gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b > 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  static lcm(a: number, b: number): number {
    return Math.abs(a * b) / ModularArithmetic.gcd(a, b);
  }

  static extendedGcd(a: number, b: number): { gcd: number; x: number; y: number } {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const result = ModularArithmetic.extendedGcd(b, a % b);
    return {
      gcd: result.gcd,
      x: result.y,
      y: result.x - Math.floor(a / b) * result.y,
    };
  }

  static inverse(a: number, m: number): number | null {
    const { gcd, x } = ModularArithmetic.extendedGcd(a, m);
    if (gcd !== 1) return null;
    return ModularArithmetic.mod(x, m);
  }

  static chineseRemainder(remainders: number[], moduli: number[]): number | null {
    if (remainders.length !== moduli.length || remainders.length === 0) return null;
    let M = moduli[0];
    let result = remainders[0];

    for (let i = 1; i < moduli.length; i++) {
      const inv = ModularArithmetic.inverse(M, moduli[i]);
      if (inv === null) return null;
      result = result + M * ModularArithmetic.mod((remainders[i] - result) * inv, moduli[i]);
      M *= moduli[i];
      result = ModularArithmetic.mod(result, M);
    }
    return result;
  }

  static eulerTotient(n: number): number {
    let result = n;
    let temp = n;
    for (let p = 2; p * p <= temp; p++) {
      if (temp % p === 0) {
        while (temp % p === 0) temp /= p;
        result -= result / p;
      }
    }
    if (temp > 1) result -= result / temp;
    return Math.round(result);
  }

  static discreteLog(base: number, target: number, m: number, maxSteps = 10000): number | null {
    let val = 1;
    for (let i = 0; i < maxSteps; i++) {
      if (val === ModularArithmetic.mod(target, m)) return i;
      val = ModularArithmetic.mod(val * base, m);
    }
    return null;
  }

  static isPrimitiveRoot(g: number, p: number): boolean {
    const phi = p - 1;
    let temp = phi;
    const factors: number[] = [];
    for (let f = 2; f * f <= temp; f++) {
      if (temp % f === 0) {
        factors.push(f);
        while (temp % f === 0) temp /= f;
      }
    }
    if (temp > 1) factors.push(temp);

    for (const f of factors) {
      if (ModularArithmetic.power(g, phi / f, p) === 1) return false;
    }
    return true;
  }
}
