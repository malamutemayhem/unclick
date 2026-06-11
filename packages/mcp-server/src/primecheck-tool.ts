import { stampMeta } from "./connector-meta.js";

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function primeFactors(n: number): number[] {
  if (n < 2) return [];
  const factors: number[] = [];
  let num = n;
  for (let d = 2; d * d <= num; d++) {
    while (num % d === 0) {
      factors.push(d);
      num /= d;
    }
  }
  if (num > 1) factors.push(num);
  return factors;
}

function nextPrime(n: number): number {
  let candidate = n + 1;
  while (!isPrime(candidate)) candidate++;
  return candidate;
}

function prevPrime(n: number): number | null {
  let candidate = n - 1;
  while (candidate >= 2) {
    if (isPrime(candidate)) return candidate;
    candidate--;
  }
  return null;
}

export async function primeCheck(args: Record<string, unknown>) {
  const n = Number(args.number);
  if (isNaN(n) || !Number.isInteger(n) || n < 0 || n > 1e12) {
    return { error: "number is required (non-negative integer, max 1 trillion)" };
  }
  const prime = isPrime(n);
  const factors = prime ? [n] : primeFactors(n);
  return stampMeta({
    number: n,
    is_prime: prime,
    factors,
    next_prime: nextPrime(n),
    previous_prime: prevPrime(n),
    is_even: n % 2 === 0,
  }, {
    source: "local primality checker",
    fetched_at: new Date().toISOString(),
    next_steps: ["factors shows prime factorization", "next_prime and previous_prime for adjacent primes"],
  });
}
