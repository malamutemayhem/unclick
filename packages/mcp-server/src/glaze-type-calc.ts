export type GlazeType = "celadon" | "tenmoku" | "ash" | "salt" | "raku";

export function firingTempC(g: GlazeType): number {
  const m: Record<GlazeType, number> = {
    celadon: 1280, tenmoku: 1260, ash: 1300, salt: 1250, raku: 950,
  };
  return m[g];
}

export function surfaceSmoothness(g: GlazeType): number {
  const m: Record<GlazeType, number> = {
    celadon: 9, tenmoku: 7, ash: 5, salt: 4, raku: 6,
  };
  return m[g];
}

export function colorVariation(g: GlazeType): number {
  const m: Record<GlazeType, number> = {
    celadon: 4, tenmoku: 8, ash: 9, salt: 7, raku: 10,
  };
  return m[g];
}

export function durability(g: GlazeType): number {
  const m: Record<GlazeType, number> = {
    celadon: 9, tenmoku: 8, ash: 7, salt: 8, raku: 3,
  };
  return m[g];
}

export function historicalSignificance(g: GlazeType): number {
  const m: Record<GlazeType, number> = {
    celadon: 10, tenmoku: 9, ash: 7, salt: 6, raku: 8,
  };
  return m[g];
}

export function foodSafe(g: GlazeType): boolean {
  const m: Record<GlazeType, boolean> = {
    celadon: true, tenmoku: true, ash: true, salt: true, raku: false,
  };
  return m[g];
}

export function requiresReduction(g: GlazeType): boolean {
  const m: Record<GlazeType, boolean> = {
    celadon: true, tenmoku: true, ash: false, salt: false, raku: true,
  };
  return m[g];
}

export function originRegion(g: GlazeType): string {
  const m: Record<GlazeType, string> = {
    celadon: "china_korea", tenmoku: "china_japan",
    ash: "universal", salt: "germany_europe",
    raku: "japan",
  };
  return m[g];
}

export function characteristicLook(g: GlazeType): string {
  const m: Record<GlazeType, string> = {
    celadon: "jade_green_translucent", tenmoku: "dark_oil_spot",
    ash: "earth_tones_textured", salt: "orange_peel_surface",
    raku: "metallic_crackle",
  };
  return m[g];
}

export function glazeTypes(): GlazeType[] {
  return ["celadon", "tenmoku", "ash", "salt", "raku"];
}
