export type ReliefInkType = "oil_based_slow" | "water_based_wash" | "rubber_based_rich" | "soy_based_eco" | "metallic_shimmer_foil";

export function colorRich(t: ReliefInkType): number {
  const m: Record<ReliefInkType, number> = {
    oil_based_slow: 10, water_based_wash: 6, rubber_based_rich: 9, soy_based_eco: 7, metallic_shimmer_foil: 8,
  };
  return m[t];
}

export function drySpeed(t: ReliefInkType): number {
  const m: Record<ReliefInkType, number> = {
    oil_based_slow: 2, water_based_wash: 10, rubber_based_rich: 5, soy_based_eco: 7, metallic_shimmer_foil: 4,
  };
  return m[t];
}

export function cleanupEase(t: ReliefInkType): number {
  const m: Record<ReliefInkType, number> = {
    oil_based_slow: 2, water_based_wash: 10, rubber_based_rich: 4, soy_based_eco: 8, metallic_shimmer_foil: 3,
  };
  return m[t];
}

export function printSharp(t: ReliefInkType): number {
  const m: Record<ReliefInkType, number> = {
    oil_based_slow: 10, water_based_wash: 6, rubber_based_rich: 9, soy_based_eco: 7, metallic_shimmer_foil: 7,
  };
  return m[t];
}

export function inkCost(t: ReliefInkType): number {
  const m: Record<ReliefInkType, number> = {
    oil_based_slow: 4, water_based_wash: 2, rubber_based_rich: 4, soy_based_eco: 3, metallic_shimmer_foil: 5,
  };
  return m[t];
}

export function ecoFriendly(t: ReliefInkType): boolean {
  const m: Record<ReliefInkType, boolean> = {
    oil_based_slow: false, water_based_wash: true, rubber_based_rich: false, soy_based_eco: true, metallic_shimmer_foil: false,
  };
  return m[t];
}

export function needsSolvent(t: ReliefInkType): boolean {
  const m: Record<ReliefInkType, boolean> = {
    oil_based_slow: true, water_based_wash: false, rubber_based_rich: true, soy_based_eco: false, metallic_shimmer_foil: true,
  };
  return m[t];
}

export function inkBase(t: ReliefInkType): string {
  const m: Record<ReliefInkType, string> = {
    oil_based_slow: "linseed_oil_pigment",
    water_based_wash: "acrylic_polymer_water",
    rubber_based_rich: "rubber_vehicle_dense",
    soy_based_eco: "soybean_oil_natural",
    metallic_shimmer_foil: "mica_metallic_binder",
  };
  return m[t];
}

export function bestUse(t: ReliefInkType): string {
  const m: Record<ReliefInkType, string> = {
    oil_based_slow: "fine_art_edition",
    water_based_wash: "class_quick_cleanup",
    rubber_based_rich: "letterpress_dense",
    soy_based_eco: "eco_studio_print",
    metallic_shimmer_foil: "accent_special_effect",
  };
  return m[t];
}

export function reliefInks(): ReliefInkType[] {
  return ["oil_based_slow", "water_based_wash", "rubber_based_rich", "soy_based_eco", "metallic_shimmer_foil"];
}
