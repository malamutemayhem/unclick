export type MaltGrain = "barley" | "wheat" | "rye" | "oat" | "sorghum";

export function diastaPowerLintner(grain: MaltGrain): number {
  const d: Record<MaltGrain, number> = {
    barley: 140, wheat: 130, rye: 105, oat: 80, sorghum: 60,
  };
  return d[grain];
}

export function steepingHours(grain: MaltGrain): number {
  const s: Record<MaltGrain, number> = {
    barley: 48, wheat: 36, rye: 40, oat: 30, sorghum: 24,
  };
  return s[grain];
}

export function germinationDays(grain: MaltGrain): number {
  const g: Record<MaltGrain, number> = {
    barley: 5, wheat: 4, rye: 4, oat: 3, sorghum: 3,
  };
  return g[grain];
}

export function kilnTempCelsius(grain: MaltGrain): number {
  const k: Record<MaltGrain, number> = {
    barley: 85, wheat: 80, rye: 75, oat: 70, sorghum: 90,
  };
  return k[grain];
}

export function colorLovibond(grain: MaltGrain): number {
  const c: Record<MaltGrain, number> = {
    barley: 3, wheat: 2, rye: 4, oat: 2, sorghum: 5,
  };
  return c[grain];
}

export function proteinPercent(grain: MaltGrain): number {
  const p: Record<MaltGrain, number> = {
    barley: 11, wheat: 13, rye: 12, oat: 14, sorghum: 10,
  };
  return p[grain];
}

export function extractPercent(grain: MaltGrain): number {
  const e: Record<MaltGrain, number> = {
    barley: 80, wheat: 78, rye: 72, oat: 65, sorghum: 70,
  };
  return e[grain];
}

export function huskPresent(grain: MaltGrain): boolean {
  const h: Record<MaltGrain, boolean> = {
    barley: true, wheat: false, rye: false, oat: true, sorghum: false,
  };
  return h[grain];
}

export function bestBeerStyle(grain: MaltGrain): string {
  const b: Record<MaltGrain, string> = {
    barley: "pale_ale", wheat: "hefeweizen", rye: "roggenbier",
    oat: "oatmeal_stout", sorghum: "gluten_free_lager",
  };
  return b[grain];
}

export function maltGrains(): MaltGrain[] {
  return ["barley", "wheat", "rye", "oat", "sorghum"];
}
