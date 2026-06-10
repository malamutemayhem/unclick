export type Mordant = "alum" | "iron" | "copper" | "tin" | "chrome";

export function colorShift(mordant: Mordant): string {
  const c: Record<Mordant, string> = {
    alum: "brightens", iron: "saddens", copper: "greens",
    tin: "brightens", chrome: "deepens",
  };
  return c[mordant];
}

export function lightfastnessBoost(mordant: Mordant): number {
  const l: Record<Mordant, number> = {
    alum: 6, iron: 8, copper: 7, tin: 5, chrome: 9,
  };
  return l[mordant];
}

export function washfastnessBoost(mordant: Mordant): number {
  const w: Record<Mordant, number> = {
    alum: 7, iron: 8, copper: 6, tin: 4, chrome: 9,
  };
  return w[mordant];
}

export function toxicity(mordant: Mordant): number {
  const t: Record<Mordant, number> = {
    alum: 1, iron: 2, copper: 5, tin: 4, chrome: 9,
  };
  return t[mordant];
}

export function fiberSafe(mordant: Mordant): boolean {
  const f: Record<Mordant, boolean> = {
    alum: true, iron: true, copper: true, tin: false, chrome: false,
  };
  return f[mordant];
}

export function concentrationPercent(mordant: Mordant): number {
  const c: Record<Mordant, number> = {
    alum: 15, iron: 2, copper: 3, tin: 5, chrome: 3,
  };
  return c[mordant];
}

export function soakTimeHours(mordant: Mordant): number {
  const s: Record<Mordant, number> = {
    alum: 12, iron: 1, copper: 2, tin: 1, chrome: 1,
  };
  return s[mordant];
}

export function historicalAvailability(mordant: Mordant): boolean {
  const h: Record<Mordant, boolean> = {
    alum: true, iron: true, copper: true, tin: true, chrome: false,
  };
  return h[mordant];
}

export function costPerKg(mordant: Mordant): number {
  const c: Record<Mordant, number> = {
    alum: 8, iron: 5, copper: 20, tin: 30, chrome: 40,
  };
  return c[mordant];
}

export function mordantTypes(): Mordant[] {
  return ["alum", "iron", "copper", "tin", "chrome"];
}
