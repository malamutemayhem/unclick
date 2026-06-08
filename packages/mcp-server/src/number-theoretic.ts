export class NumberTheoretic {
  static isPrime(n: number): boolean {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  static primeFactors(n: number): number[] {
    const factors: number[] = [];
    let d = 2;
    while (d * d <= n) {
      while (n % d === 0) {
        factors.push(d);
        n /= d;
      }
      d++;
    }
    if (n > 1) factors.push(n);
    return factors;
  }

  static sieveOfEratosthenes(limit: number): number[] {
    const sieve = new Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;
    for (let i = 2; i * i <= limit; i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= limit; j += i) sieve[j] = false;
      }
    }
    return sieve.reduce<number[]>((acc, v, i) => { if (v) acc.push(i); return acc; }, []);
  }

  static divisors(n: number): number[] {
    const divs: number[] = [];
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        divs.push(i);
        if (i !== n / i) divs.push(n / i);
      }
    }
    return divs.sort((a, b) => a - b);
  }

  static sigma(n: number, k = 1): number {
    const divs = NumberTheoretic.divisors(n);
    return divs.reduce((sum, d) => sum + Math.pow(d, k), 0);
  }

  static isPerfect(n: number): boolean {
    return NumberTheoretic.sigma(n, 1) - n === n;
  }

  static isAbundant(n: number): boolean {
    return NumberTheoretic.sigma(n, 1) - n > n;
  }

  static mobius(n: number): number {
    const factors = NumberTheoretic.primeFactors(n);
    const unique = new Set(factors);
    if (unique.size !== factors.length) return 0;
    return factors.length % 2 === 0 ? 1 : -1;
  }

  static legendreSymbol(a: number, p: number): number {
    const val = NumberTheoretic.modPow(a, (p - 1) / 2, p);
    if (val === 0) return 0;
    return val === 1 ? 1 : -1;
  }

  static modPow(base: number, exp: number, mod: number): number {
    base = ((base % mod) + mod) % mod;
    let result = 1;
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return result;
  }

  static fibonacci(n: number): number {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }

  static goldbachPairs(n: number): [number, number][] {
    if (n % 2 !== 0 || n < 4) return [];
    const primes = NumberTheoretic.sieveOfEratosthenes(n);
    const primeSet = new Set(primes);
    const pairs: [number, number][] = [];
    for (const p of primes) {
      if (p > n / 2) break;
      if (primeSet.has(n - p)) pairs.push([p, n - p]);
    }
    return pairs;
  }
}
