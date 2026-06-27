export type LockupMethod = "quoin" | "furniture" | "reglet" | "magnetic" | "photopolymer";

export function setupTimeMinutes(method: LockupMethod): number {
  const t: Record<LockupMethod, number> = {
    quoin: 15, furniture: 20, reglet: 10, magnetic: 5, photopolymer: 8,
  };
  return t[method];
}

export function pressureDistribution(method: LockupMethod): number {
  const p: Record<LockupMethod, number> = {
    quoin: 7, furniture: 8, reglet: 6, magnetic: 9, photopolymer: 5,
  };
  return p[method];
}

export function maxFormSizeCm(method: LockupMethod): number {
  const s: Record<LockupMethod, number> = {
    quoin: 50, furniture: 70, reglet: 40, magnetic: 60, photopolymer: 45,
  };
  return s[method];
}

export function reusable(method: LockupMethod): boolean {
  return method !== "photopolymer";
}

export function adjustability(method: LockupMethod): number {
  const a: Record<LockupMethod, number> = {
    quoin: 9, furniture: 6, reglet: 7, magnetic: 3, photopolymer: 2,
  };
  return a[method];
}

export function typeHighTolerance(method: LockupMethod): number {
  const t: Record<LockupMethod, number> = {
    quoin: 0.05, furniture: 0.08, reglet: 0.04, magnetic: 0.02, photopolymer: 0.01,
  };
  return t[method];
}

export function weightKg(method: LockupMethod): number {
  const w: Record<LockupMethod, number> = {
    quoin: 2, furniture: 5, reglet: 1, magnetic: 8, photopolymer: 0.5,
  };
  return w[method];
}

export function skillLevelRequired(method: LockupMethod): number {
  const s: Record<LockupMethod, number> = {
    quoin: 7, furniture: 8, reglet: 6, magnetic: 3, photopolymer: 4,
  };
  return s[method];
}

export function costEstimate(method: LockupMethod): number {
  const c: Record<LockupMethod, number> = {
    quoin: 50, furniture: 30, reglet: 40, magnetic: 200, photopolymer: 25,
  };
  return c[method];
}

export function lockupMethods(): LockupMethod[] {
  return ["quoin", "furniture", "reglet", "magnetic", "photopolymer"];
}
