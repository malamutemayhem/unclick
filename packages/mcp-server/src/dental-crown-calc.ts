export type DentalCrown = "porcelain" | "metal" | "porcelain_fused" | "zirconia" | "resin";

export function strengthRating(c: DentalCrown): number {
  const m: Record<DentalCrown, number> = {
    porcelain: 7, metal: 10, porcelain_fused: 8, zirconia: 9, resin: 4,
  };
  return m[c];
}

export function aestheticRating(c: DentalCrown): number {
  const m: Record<DentalCrown, number> = {
    porcelain: 10, metal: 2, porcelain_fused: 7, zirconia: 9, resin: 6,
  };
  return m[c];
}

export function longevityYears(c: DentalCrown): number {
  const m: Record<DentalCrown, number> = {
    porcelain: 7, metal: 10, porcelain_fused: 8, zirconia: 9, resin: 4,
  };
  return m[c];
}

export function costFactor(c: DentalCrown): number {
  const m: Record<DentalCrown, number> = {
    porcelain: 7, metal: 8, porcelain_fused: 6, zirconia: 9, resin: 3,
  };
  return m[c];
}

export function toothPreservation(c: DentalCrown): number {
  const m: Record<DentalCrown, number> = {
    porcelain: 5, metal: 4, porcelain_fused: 3, zirconia: 7, resin: 8,
  };
  return m[c];
}

export function metalFree(c: DentalCrown): boolean {
  const m: Record<DentalCrown, boolean> = {
    porcelain: true, metal: false, porcelain_fused: false, zirconia: true, resin: true,
  };
  return m[c];
}

export function sameDay(c: DentalCrown): boolean {
  const m: Record<DentalCrown, boolean> = {
    porcelain: false, metal: false, porcelain_fused: false, zirconia: true, resin: true,
  };
  return m[c];
}

export function idealPlacement(c: DentalCrown): string {
  const m: Record<DentalCrown, string> = {
    porcelain: "front_teeth", metal: "back_molars",
    porcelain_fused: "any_position", zirconia: "any_position",
    resin: "temporary_provisional",
  };
  return m[c];
}

export function fabricationMethod(c: DentalCrown): string {
  const m: Record<DentalCrown, string> = {
    porcelain: "layered_fired", metal: "cast_alloy",
    porcelain_fused: "metal_core_porcelain_veneer", zirconia: "cad_cam_milled",
    resin: "direct_buildup",
  };
  return m[c];
}

export function dentalCrowns(): DentalCrown[] {
  return ["porcelain", "metal", "porcelain_fused", "zirconia", "resin"];
}
