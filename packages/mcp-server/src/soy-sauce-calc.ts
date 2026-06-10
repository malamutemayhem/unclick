export type SoySauceType = "koikuchi" | "usukuchi" | "tamari" | "shiro" | "saishikomi";

export function fermentationMonths(stype: SoySauceType): number {
  const m: Record<SoySauceType, number> = {
    koikuchi: 12, usukuchi: 6, tamari: 18, shiro: 3, saishikomi: 24,
  };
  return m[stype];
}

export function saltPercent(stype: SoySauceType): number {
  const s: Record<SoySauceType, number> = {
    koikuchi: 16, usukuchi: 18, tamari: 17, shiro: 14, saishikomi: 16,
  };
  return s[stype];
}

export function colorDarkness(stype: SoySauceType): number {
  const d: Record<SoySauceType, number> = {
    koikuchi: 7, usukuchi: 4, tamari: 9, shiro: 1, saishikomi: 10,
  };
  return d[stype];
}

export function umamiIntensity(stype: SoySauceType): number {
  const u: Record<SoySauceType, number> = {
    koikuchi: 7, usukuchi: 5, tamari: 9, shiro: 4, saishikomi: 10,
  };
  return u[stype];
}

export function wheatPercent(stype: SoySauceType): number {
  const w: Record<SoySauceType, number> = {
    koikuchi: 50, usukuchi: 50, tamari: 5, shiro: 80, saishikomi: 50,
  };
  return w[stype];
}

export function glutenFree(stype: SoySauceType): boolean {
  return stype === "tamari";
}

export function bestUse(stype: SoySauceType): string {
  const u: Record<SoySauceType, string> = {
    koikuchi: "general_purpose", usukuchi: "light_dishes", tamari: "dipping",
    shiro: "clear_soups", saishikomi: "finishing",
  };
  return u[stype];
}

export function viscosity(stype: SoySauceType): number {
  const v: Record<SoySauceType, number> = {
    koikuchi: 5, usukuchi: 4, tamari: 8, shiro: 3, saishikomi: 7,
  };
  return v[stype];
}

export function costPerLiter(stype: SoySauceType): number {
  const c: Record<SoySauceType, number> = {
    koikuchi: 8, usukuchi: 10, tamari: 15, shiro: 18, saishikomi: 25,
  };
  return c[stype];
}

export function soySauceTypes(): SoySauceType[] {
  return ["koikuchi", "usukuchi", "tamari", "shiro", "saishikomi"];
}
