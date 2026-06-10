export type TanningMethod = "vegetable" | "chrome" | "brain" | "alum" | "smoke";

export function processingDays(method: TanningMethod): number {
  const p: Record<TanningMethod, number> = {
    vegetable: 60, chrome: 1, brain: 7, alum: 14, smoke: 5,
  };
  return p[method];
}

export function colorRange(method: TanningMethod): number {
  const c: Record<TanningMethod, number> = {
    vegetable: 5, chrome: 10, brain: 2, alum: 4, smoke: 3,
  };
  return c[method];
}

export function waterResistance(method: TanningMethod): number {
  const w: Record<TanningMethod, number> = {
    vegetable: 6, chrome: 8, brain: 9, alum: 3, smoke: 7,
  };
  return w[method];
}

export function flexibility(method: TanningMethod): number {
  const f: Record<TanningMethod, number> = {
    vegetable: 5, chrome: 8, brain: 10, alum: 6, smoke: 9,
  };
  return f[method];
}

export function environmentalImpact(method: TanningMethod): number {
  const e: Record<TanningMethod, number> = {
    vegetable: 3, chrome: 9, brain: 1, alum: 4, smoke: 2,
  };
  return e[method];
}

export function historicalOrigin(method: TanningMethod): boolean {
  const h: Record<TanningMethod, boolean> = {
    vegetable: true, chrome: false, brain: true, alum: true, smoke: true,
  };
  return h[method];
}

export function bestApplication(method: TanningMethod): string {
  const b: Record<TanningMethod, string> = {
    vegetable: "belts", chrome: "garments", brain: "buckskin",
    alum: "bookbinding", smoke: "moccasins",
  };
  return b[method];
}

export function durabilityYears(method: TanningMethod): number {
  const d: Record<TanningMethod, number> = {
    vegetable: 50, chrome: 30, brain: 20, alum: 15, smoke: 25,
  };
  return d[method];
}

export function costPerHide(method: TanningMethod): number {
  const c: Record<TanningMethod, number> = {
    vegetable: 80, chrome: 30, brain: 10, alum: 20, smoke: 15,
  };
  return c[method];
}

export function tanningMethods(): TanningMethod[] {
  return ["vegetable", "chrome", "brain", "alum", "smoke"];
}
