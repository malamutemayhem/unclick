export function toContinuedFraction(value: number, maxTerms = 20, epsilon = 1e-10): number[] {
  const terms: number[] = [];
  let x = value;

  for (let i = 0; i < maxTerms; i++) {
    const a = Math.floor(x);
    terms.push(a);
    const remainder = x - a;
    if (Math.abs(remainder) < epsilon) break;
    x = 1 / remainder;
  }

  return terms;
}

export function fromContinuedFraction(terms: number[]): { num: number; den: number } {
  if (terms.length === 0) return { num: 0, den: 1 };

  let num = terms[terms.length - 1];
  let den = 1;

  for (let i = terms.length - 2; i >= 0; i--) {
    [num, den] = [terms[i] * num + den, num];
  }

  return { num, den };
}

export function convergents(terms: number[]): { num: number; den: number }[] {
  const result: { num: number; den: number }[] = [];

  let pPrev = 1, pCurr = terms[0];
  let qPrev = 0, qCurr = 1;

  result.push({ num: pCurr, den: qCurr });

  for (let i = 1; i < terms.length; i++) {
    const pNext = terms[i] * pCurr + pPrev;
    const qNext = terms[i] * qCurr + qPrev;
    result.push({ num: pNext, den: qNext });
    pPrev = pCurr;
    pCurr = pNext;
    qPrev = qCurr;
    qCurr = qNext;
  }

  return result;
}

export function bestRationalApproximation(
  value: number, maxDenominator: number
): { num: number; den: number } {
  const terms = toContinuedFraction(value, 50);
  const convs = convergents(terms);

  let best = convs[0];
  for (const c of convs) {
    if (c.den > maxDenominator) break;
    best = c;
  }

  return best;
}

export function evaluate(terms: number[]): number {
  const { num, den } = fromContinuedFraction(terms);
  return num / den;
}

export function isPeriodicCF(terms: number[]): { prefix: number[]; period: number[] } | null {
  if (terms.length < 4) return null;

  for (let periodLen = 1; periodLen <= Math.floor((terms.length - 1) / 2); periodLen++) {
    let isPeriodic = true;
    const period = terms.slice(1, 1 + periodLen);

    for (let i = 1 + periodLen; i < terms.length; i++) {
      if (terms[i] !== period[(i - 1) % periodLen]) {
        isPeriodic = false;
        break;
      }
    }

    if (isPeriodic && terms.length > 1 + periodLen * 2) {
      return { prefix: [terms[0]], period };
    }
  }

  return null;
}

export function sqrtCF(n: number, maxTerms = 30): number[] {
  const a0 = Math.floor(Math.sqrt(n));
  if (a0 * a0 === n) return [a0];

  const terms = [a0];
  let m = 0, d = 1, a = a0;

  for (let i = 0; i < maxTerms - 1; i++) {
    m = d * a - m;
    d = (n - m * m) / d;
    a = Math.floor((a0 + m) / d);
    terms.push(a);
    if (a === 2 * a0) break;
  }

  return terms;
}

export function goldenRatio(terms: number): number[] {
  return new Array(terms).fill(1);
}

export function eCF(terms: number): number[] {
  const result: number[] = [2];
  for (let i = 1; i < terms; i++) {
    if (i % 3 === 2) {
      result.push(2 * Math.floor((i + 1) / 3));
    } else {
      result.push(1);
    }
  }
  return result;
}

export function cfToString(terms: number[]): string {
  if (terms.length === 0) return "[]";
  return `[${terms[0]}; ${terms.slice(1).join(", ")}]`;
}
