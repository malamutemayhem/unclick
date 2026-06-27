export type CordageFiber = "manila" | "sisal" | "hemp" | "cotton" | "jute";

export function breakingStrengthKg(fiber: CordageFiber): number {
  const s: Record<CordageFiber, number> = {
    manila: 80, sisal: 60, hemp: 75, cotton: 40, jute: 35,
  };
  return s[fiber];
}

export function stretchPercent(fiber: CordageFiber): number {
  const s: Record<CordageFiber, number> = {
    manila: 12, sisal: 10, hemp: 8, cotton: 5, jute: 3,
  };
  return s[fiber];
}

export function uvResistance(fiber: CordageFiber): number {
  const u: Record<CordageFiber, number> = {
    manila: 8, sisal: 7, hemp: 9, cotton: 4, jute: 3,
  };
  return u[fiber];
}

export function waterResistance(fiber: CordageFiber): number {
  const w: Record<CordageFiber, number> = {
    manila: 9, sisal: 6, hemp: 7, cotton: 3, jute: 2,
  };
  return w[fiber];
}

export function abrasionResistance(fiber: CordageFiber): number {
  const a: Record<CordageFiber, number> = {
    manila: 8, sisal: 7, hemp: 6, cotton: 5, jute: 4,
  };
  return a[fiber];
}

export function gripRating(fiber: CordageFiber): number {
  const g: Record<CordageFiber, number> = {
    manila: 7, sisal: 9, hemp: 6, cotton: 8, jute: 5,
  };
  return g[fiber];
}

export function biodegradable(fiber: CordageFiber): boolean {
  return true;
}

export function spliceability(fiber: CordageFiber): number {
  const s: Record<CordageFiber, number> = {
    manila: 8, sisal: 5, hemp: 7, cotton: 9, jute: 4,
  };
  return s[fiber];
}

export function costPerMeter(fiber: CordageFiber): number {
  const c: Record<CordageFiber, number> = {
    manila: 3, sisal: 2, hemp: 4, cotton: 2, jute: 1,
  };
  return c[fiber];
}

export function cordageFibers(): CordageFiber[] {
  return ["manila", "sisal", "hemp", "cotton", "jute"];
}
