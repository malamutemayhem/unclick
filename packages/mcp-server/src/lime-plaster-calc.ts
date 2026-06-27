export type LimePlasterType = "lime_putty" | "hydraulic" | "hot_mixed" | "pozzolanic" | "tadelakt";

export function setCureDays(plaster: LimePlasterType): number {
  const d: Record<LimePlasterType, number> = {
    lime_putty: 90, hydraulic: 28, hot_mixed: 60, pozzolanic: 45, tadelakt: 21,
  };
  return d[plaster];
}

export function compressiveStrengthMpa(plaster: LimePlasterType): number {
  const s: Record<LimePlasterType, number> = {
    lime_putty: 2, hydraulic: 5, hot_mixed: 3, pozzolanic: 6, tadelakt: 4,
  };
  return s[plaster];
}

export function breathability(plaster: LimePlasterType): number {
  const b: Record<LimePlasterType, number> = {
    lime_putty: 10, hydraulic: 6, hot_mixed: 9, pozzolanic: 5, tadelakt: 3,
  };
  return b[plaster];
}

export function waterResistance(plaster: LimePlasterType): number {
  const w: Record<LimePlasterType, number> = {
    lime_putty: 4, hydraulic: 7, hot_mixed: 5, pozzolanic: 8, tadelakt: 10,
  };
  return w[plaster];
}

export function coatsRequired(plaster: LimePlasterType): number {
  const c: Record<LimePlasterType, number> = {
    lime_putty: 3, hydraulic: 2, hot_mixed: 3, pozzolanic: 2, tadelakt: 5,
  };
  return c[plaster];
}

export function polishable(plaster: LimePlasterType): boolean {
  return plaster === "tadelakt" || plaster === "lime_putty";
}

export function frostResistance(plaster: LimePlasterType): number {
  const f: Record<LimePlasterType, number> = {
    lime_putty: 5, hydraulic: 8, hot_mixed: 6, pozzolanic: 9, tadelakt: 4,
  };
  return f[plaster];
}

export function skillLevel(plaster: LimePlasterType): number {
  const s: Record<LimePlasterType, number> = {
    lime_putty: 6, hydraulic: 4, hot_mixed: 8, pozzolanic: 5, tadelakt: 9,
  };
  return s[plaster];
}

export function costPerM2(plaster: LimePlasterType): number {
  const c: Record<LimePlasterType, number> = {
    lime_putty: 15, hydraulic: 12, hot_mixed: 10, pozzolanic: 18, tadelakt: 35,
  };
  return c[plaster];
}

export function limePlasterTypes(): LimePlasterType[] {
  return ["lime_putty", "hydraulic", "hot_mixed", "pozzolanic", "tadelakt"];
}
