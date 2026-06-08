export class SecretSharing {
  private static readonly PRIME = 2147483647n;

  static split(secret: number, n: number, k: number): [number, number][] {
    if (k > n) throw new Error("Threshold cannot exceed total shares");
    if (k < 2) throw new Error("Threshold must be at least 2");

    const coefficients = [BigInt(secret)];
    for (let i = 1; i < k; i++) {
      coefficients.push(BigInt(Math.floor(Math.random() * (Number(this.PRIME) - 1)) + 1));
    }

    const shares: [number, number][] = [];
    for (let x = 1; x <= n; x++) {
      let y = 0n;
      const bx = BigInt(x);
      for (let j = 0; j < k; j++) {
        y = this.mod(y + this.mod(coefficients[j] * this.modPow(bx, BigInt(j), this.PRIME), this.PRIME), this.PRIME);
      }
      shares.push([x, Number(y)]);
    }

    return shares;
  }

  static reconstruct(shares: [number, number][], k: number): number {
    if (shares.length < k) throw new Error("Not enough shares");
    const selected = shares.slice(0, k);

    let secret = 0n;
    for (let i = 0; i < k; i++) {
      let num = 1n;
      let den = 1n;
      for (let j = 0; j < k; j++) {
        if (i === j) continue;
        num = this.mod(num * this.mod(-BigInt(selected[j][0]), this.PRIME), this.PRIME);
        den = this.mod(den * this.mod(BigInt(selected[i][0]) - BigInt(selected[j][0]), this.PRIME), this.PRIME);
      }
      const lagrange = this.mod(num * this.modPow(den, this.PRIME - 2n, this.PRIME), this.PRIME);
      secret = this.mod(secret + this.mod(BigInt(selected[i][1]) * lagrange, this.PRIME), this.PRIME);
    }

    return Number(secret);
  }

  private static mod(a: bigint, m: bigint): bigint {
    return ((a % m) + m) % m;
  }

  private static modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    base = this.mod(base, mod);
    while (exp > 0n) {
      if (exp % 2n === 1n) {
        result = this.mod(result * base, mod);
      }
      exp = exp / 2n;
      base = this.mod(base * base, mod);
    }
    return result;
  }

  static verify(shares: [number, number][], k: number, expected: number): boolean {
    try {
      return this.reconstruct(shares, k) === expected;
    } catch {
      return false;
    }
  }
}
