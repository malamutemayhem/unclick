export type LavaType = "pahoehoe" | "aa" | "pillow" | "blocky" | "spinifex";

export function flowSpeed(l: LavaType): number {
  const m: Record<LavaType, number> = {
    pahoehoe: 7, aa: 5, pillow: 2, blocky: 3, spinifex: 6,
  };
  return m[l];
}

export function viscosity(l: LavaType): number {
  const m: Record<LavaType, number> = {
    pahoehoe: 3, aa: 6, pillow: 4, blocky: 9, spinifex: 2,
  };
  return m[l];
}

export function surfaceRoughness(l: LavaType): number {
  const m: Record<LavaType, number> = {
    pahoehoe: 2, aa: 10, pillow: 4, blocky: 8, spinifex: 3,
  };
  return m[l];
}

export function gasContent(l: LavaType): number {
  const m: Record<LavaType, number> = {
    pahoehoe: 4, aa: 7, pillow: 3, blocky: 5, spinifex: 8,
  };
  return m[l];
}

export function silicaContent(l: LavaType): number {
  const m: Record<LavaType, number> = {
    pahoehoe: 3, aa: 5, pillow: 4, blocky: 9, spinifex: 2,
  };
  return m[l];
}

export function formsUnderwater(l: LavaType): boolean {
  const m: Record<LavaType, boolean> = {
    pahoehoe: false, aa: false, pillow: true, blocky: false, spinifex: false,
  };
  return m[l];
}

export function basaltic(l: LavaType): boolean {
  const m: Record<LavaType, boolean> = {
    pahoehoe: true, aa: true, pillow: true, blocky: false, spinifex: true,
  };
  return m[l];
}

export function typicalVolcano(l: LavaType): string {
  const m: Record<LavaType, string> = {
    pahoehoe: "shield_hawaii", aa: "shield_stratovolcano",
    pillow: "mid_ocean_ridge", blocky: "stratovolcano_dome",
    spinifex: "archean_komatiite_flow",
  };
  return m[l];
}

export function coolingTexture(l: LavaType): string {
  const m: Record<LavaType, string> = {
    pahoehoe: "smooth_ropy_glass", aa: "jagged_clinker_rubble",
    pillow: "rounded_concentric_shell", blocky: "angular_smooth_fragment",
    spinifex: "skeletal_olivine_crystal",
  };
  return m[l];
}

export function lavaTypes(): LavaType[] {
  return ["pahoehoe", "aa", "pillow", "blocky", "spinifex"];
}
