export type PicklingMethod = "salt_brine" | "vinegar" | "lacto_ferment" | "quick_pickle" | "canning";

export function processingTimeHours(method: PicklingMethod): number {
  const h: Record<PicklingMethod, number> = {
    salt_brine: 168, vinegar: 1, lacto_ferment: 120, quick_pickle: 0.5, canning: 2,
  };
  return h[method];
}

export function acidityPh(method: PicklingMethod): number {
  const p: Record<PicklingMethod, number> = {
    salt_brine: 3.8, vinegar: 2.8, lacto_ferment: 3.5, quick_pickle: 3.0, canning: 3.2,
  };
  return p[method];
}

export function saltPercentRequired(method: PicklingMethod): number {
  const s: Record<PicklingMethod, number> = {
    salt_brine: 5, vinegar: 2, lacto_ferment: 3, quick_pickle: 1, canning: 2,
  };
  return s[method];
}

export function shelfLifeMonths(method: PicklingMethod): number {
  const m: Record<PicklingMethod, number> = {
    salt_brine: 12, vinegar: 18, lacto_ferment: 6, quick_pickle: 1, canning: 24,
  };
  return m[method];
}

export function crunchRetention(method: PicklingMethod): number {
  const c: Record<PicklingMethod, number> = {
    salt_brine: 6, vinegar: 7, lacto_ferment: 8, quick_pickle: 9, canning: 3,
  };
  return c[method];
}

export function probioticBenefit(method: PicklingMethod): boolean {
  return method === "lacto_ferment" || method === "salt_brine";
}

export function heatRequired(method: PicklingMethod): boolean {
  return method === "vinegar" || method === "canning" || method === "quick_pickle";
}

export function flavorComplexity(method: PicklingMethod): number {
  const f: Record<PicklingMethod, number> = {
    salt_brine: 7, vinegar: 5, lacto_ferment: 9, quick_pickle: 3, canning: 5,
  };
  return f[method];
}

export function costPerBatch(method: PicklingMethod): number {
  const c: Record<PicklingMethod, number> = {
    salt_brine: 3, vinegar: 5, lacto_ferment: 2, quick_pickle: 4, canning: 8,
  };
  return c[method];
}

export function picklingMethods(): PicklingMethod[] {
  return ["salt_brine", "vinegar", "lacto_ferment", "quick_pickle", "canning"];
}
