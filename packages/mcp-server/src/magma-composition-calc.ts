export type MagmaComposition = "basaltic" | "andesitic" | "dacitic" | "rhyolitic" | "komatiitic";

export function silicaPercent(c: MagmaComposition): number {
  const m: Record<MagmaComposition, number> = {
    basaltic: 3, andesitic: 5, dacitic: 7, rhyolitic: 10, komatiitic: 1,
  };
  return m[c];
}

export function viscosityLevel(c: MagmaComposition): number {
  const m: Record<MagmaComposition, number> = {
    basaltic: 2, andesitic: 5, dacitic: 7, rhyolitic: 10, komatiitic: 1,
  };
  return m[c];
}

export function eruptionTemperature(c: MagmaComposition): number {
  const m: Record<MagmaComposition, number> = {
    basaltic: 8, andesitic: 6, dacitic: 5, rhyolitic: 3, komatiitic: 10,
  };
  return m[c];
}

export function gasTrapping(c: MagmaComposition): number {
  const m: Record<MagmaComposition, number> = {
    basaltic: 2, andesitic: 5, dacitic: 7, rhyolitic: 10, komatiitic: 1,
  };
  return m[c];
}

export function crystalContent(c: MagmaComposition): number {
  const m: Record<MagmaComposition, number> = {
    basaltic: 4, andesitic: 6, dacitic: 7, rhyolitic: 9, komatiitic: 3,
  };
  return m[c];
}

export function commonOnEarth(c: MagmaComposition): boolean {
  const m: Record<MagmaComposition, boolean> = {
    basaltic: true, andesitic: true, dacitic: true, rhyolitic: true, komatiitic: false,
  };
  return m[c];
}

export function explosiveEruption(c: MagmaComposition): boolean {
  const m: Record<MagmaComposition, boolean> = {
    basaltic: false, andesitic: true, dacitic: true, rhyolitic: true, komatiitic: false,
  };
  return m[c];
}

export function tectonicSetting(c: MagmaComposition): string {
  const m: Record<MagmaComposition, string> = {
    basaltic: "mid_ocean_ridge_hotspot", andesitic: "subduction_zone_arc",
    dacitic: "continental_arc", rhyolitic: "continental_caldera",
    komatiitic: "archean_mantle_plume",
  };
  return m[c];
}

export function rockFormed(c: MagmaComposition): string {
  const m: Record<MagmaComposition, string> = {
    basaltic: "basalt_gabbro", andesitic: "andesite_diorite",
    dacitic: "dacite_granodiorite", rhyolitic: "rhyolite_granite",
    komatiitic: "komatiite_peridotite",
  };
  return m[c];
}

export function magmaCompositions(): MagmaComposition[] {
  return ["basaltic", "andesitic", "dacitic", "rhyolitic", "komatiitic"];
}
