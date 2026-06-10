export type TrotlineTarget = "catfish" | "crab" | "cod" | "eel" | "sturgeon";

export function lineLengthMeters(target: TrotlineTarget): number {
  const l: Record<TrotlineTarget, number> = {
    catfish: 30, crab: 50, cod: 200, eel: 20, sturgeon: 100,
  };
  return l[target];
}

export function hookCount(target: TrotlineTarget): number {
  const h: Record<TrotlineTarget, number> = {
    catfish: 25, crab: 0, cod: 100, eel: 30, sturgeon: 50,
  };
  return h[target];
}

export function hookSpacingCm(target: TrotlineTarget): number {
  const s: Record<TrotlineTarget, number> = {
    catfish: 120, crab: 200, cod: 200, eel: 60, sturgeon: 200,
  };
  return s[target];
}

export function checkIntervalHours(target: TrotlineTarget): number {
  const c: Record<TrotlineTarget, number> = {
    catfish: 4, crab: 12, cod: 8, eel: 6, sturgeon: 8,
  };
  return c[target];
}

export function baitType(target: TrotlineTarget): string {
  const b: Record<TrotlineTarget, string> = {
    catfish: "cut_fish", crab: "chicken_neck", cod: "squid",
    eel: "worm", sturgeon: "lamprey",
  };
  return b[target];
}

export function bottomSet(target: TrotlineTarget): boolean {
  return target === "catfish" || target === "crab" || target === "eel";
}

export function snoods(target: TrotlineTarget): boolean {
  return target !== "crab";
}

export function seasonalMonths(target: TrotlineTarget): number {
  const m: Record<TrotlineTarget, number> = {
    catfish: 6, crab: 4, cod: 8, eel: 5, sturgeon: 3,
  };
  return m[target];
}

export function costEstimate(target: TrotlineTarget): number {
  const c: Record<TrotlineTarget, number> = {
    catfish: 30, crab: 50, cod: 200, eel: 25, sturgeon: 150,
  };
  return c[target];
}

export function trotlineTargets(): TrotlineTarget[] {
  return ["catfish", "crab", "cod", "eel", "sturgeon"];
}
