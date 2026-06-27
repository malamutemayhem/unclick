export type MisoType = "white_shiro" | "yellow_shinshu" | "red_aka" | "barley_mugi" | "hatcho";

export function fermentationMonths(type: MisoType): number {
  const m: Record<MisoType, number> = {
    white_shiro: 1, yellow_shinshu: 3, red_aka: 12,
    barley_mugi: 12, hatcho: 24,
  };
  return m[type];
}

export function saltPercent(type: MisoType): number {
  const s: Record<MisoType, number> = {
    white_shiro: 5, yellow_shinshu: 8, red_aka: 13,
    barley_mugi: 10, hatcho: 11,
  };
  return s[type];
}

export function kojiRatio(type: MisoType): number {
  const k: Record<MisoType, number> = {
    white_shiro: 2, yellow_shinshu: 1.5, red_aka: 1,
    barley_mugi: 1.2, hatcho: 0,
  };
  return k[type];
}

export function sweetness(type: MisoType): number {
  const s: Record<MisoType, number> = {
    white_shiro: 9, yellow_shinshu: 6, red_aka: 3,
    barley_mugi: 5, hatcho: 1,
  };
  return s[type];
}

export function umami(type: MisoType): number {
  const u: Record<MisoType, number> = {
    white_shiro: 4, yellow_shinshu: 6, red_aka: 8,
    barley_mugi: 7, hatcho: 10,
  };
  return u[type];
}

export function colorDarkness(type: MisoType): number {
  const c: Record<MisoType, number> = {
    white_shiro: 1, yellow_shinshu: 3, red_aka: 7,
    barley_mugi: 5, hatcho: 10,
  };
  return c[type];
}

export function grainBase(type: MisoType): string {
  const g: Record<MisoType, string> = {
    white_shiro: "rice", yellow_shinshu: "rice", red_aka: "rice",
    barley_mugi: "barley", hatcho: "soybean_only",
  };
  return g[type];
}

export function bestForDish(type: MisoType): string {
  const d: Record<MisoType, string> = {
    white_shiro: "dressing", yellow_shinshu: "soup",
    red_aka: "stew", barley_mugi: "grilled_glaze",
    hatcho: "rich_broth",
  };
  return d[type];
}

export function costPerKg(type: MisoType): number {
  const c: Record<MisoType, number> = {
    white_shiro: 10, yellow_shinshu: 12, red_aka: 18,
    barley_mugi: 15, hatcho: 25,
  };
  return c[type];
}

export function misoTypes(): MisoType[] {
  return ["white_shiro", "yellow_shinshu", "red_aka", "barley_mugi", "hatcho"];
}
