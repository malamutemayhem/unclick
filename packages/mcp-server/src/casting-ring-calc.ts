export type CastingRingType = "lost_wax_centrifugal" | "vacuum_cast_invest" | "sand_cast_cuttlebone" | "delft_clay_press" | "pewter_gravity_pour";

export function detailCapture(t: CastingRingType): number {
  const m: Record<CastingRingType, number> = {
    lost_wax_centrifugal: 10, vacuum_cast_invest: 9, sand_cast_cuttlebone: 5, delft_clay_press: 6, pewter_gravity_pour: 4,
  };
  return m[t];
}

export function surfaceFinish(t: CastingRingType): number {
  const m: Record<CastingRingType, number> = {
    lost_wax_centrifugal: 9, vacuum_cast_invest: 8, sand_cast_cuttlebone: 4, delft_clay_press: 5, pewter_gravity_pour: 6,
  };
  return m[t];
}

export function setupCost(t: CastingRingType): number {
  const m: Record<CastingRingType, number> = {
    lost_wax_centrifugal: 5, vacuum_cast_invest: 4, sand_cast_cuttlebone: 1, delft_clay_press: 2, pewter_gravity_pour: 1,
  };
  return m[t];
}

export function repeatability(t: CastingRingType): number {
  const m: Record<CastingRingType, number> = {
    lost_wax_centrifugal: 10, vacuum_cast_invest: 9, sand_cast_cuttlebone: 3, delft_clay_press: 6, pewter_gravity_pour: 5,
  };
  return m[t];
}

export function castCost(t: CastingRingType): number {
  const m: Record<CastingRingType, number> = {
    lost_wax_centrifugal: 5, vacuum_cast_invest: 4, sand_cast_cuttlebone: 1, delft_clay_press: 2, pewter_gravity_pour: 1,
  };
  return m[t];
}

export function needsBurnout(t: CastingRingType): boolean {
  const m: Record<CastingRingType, boolean> = {
    lost_wax_centrifugal: true, vacuum_cast_invest: true, sand_cast_cuttlebone: false, delft_clay_press: false, pewter_gravity_pour: false,
  };
  return m[t];
}

export function reusableMold(t: CastingRingType): boolean {
  const m: Record<CastingRingType, boolean> = {
    lost_wax_centrifugal: false, vacuum_cast_invest: false, sand_cast_cuttlebone: false, delft_clay_press: true, pewter_gravity_pour: true,
  };
  return m[t];
}

export function moldMedium(t: CastingRingType): string {
  const m: Record<CastingRingType, string> = {
    lost_wax_centrifugal: "investment_plaster_silica",
    vacuum_cast_invest: "investment_plaster_fine",
    sand_cast_cuttlebone: "cuttlefish_bone_natural",
    delft_clay_press: "oil_bonded_clay_sand",
    pewter_gravity_pour: "silicone_rubber_mold",
  };
  return m[t];
}

export function bestMetal(t: CastingRingType): string {
  const m: Record<CastingRingType, string> = {
    lost_wax_centrifugal: "gold_platinum_fine",
    vacuum_cast_invest: "sterling_silver_detail",
    sand_cast_cuttlebone: "silver_brass_rustic",
    delft_clay_press: "bronze_copper_organic",
    pewter_gravity_pour: "pewter_tin_low_melt",
  };
  return m[t];
}

export function castingRings(): CastingRingType[] {
  return ["lost_wax_centrifugal", "vacuum_cast_invest", "sand_cast_cuttlebone", "delft_clay_press", "pewter_gravity_pour"];
}
