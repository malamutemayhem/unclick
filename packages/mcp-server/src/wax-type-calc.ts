export type WaxTypeType = "soy_wax_natural" | "paraffin_wax_classic" | "beeswax_pure_golden" | "coconut_wax_cream" | "palm_wax_crystal";

export function burnTime(t: WaxTypeType): number {
  const m: Record<WaxTypeType, number> = {
    soy_wax_natural: 9, paraffin_wax_classic: 6, beeswax_pure_golden: 10, coconut_wax_cream: 8, palm_wax_crystal: 7,
  };
  return m[t];
}

export function scentThrow(t: WaxTypeType): number {
  const m: Record<WaxTypeType, number> = {
    soy_wax_natural: 7, paraffin_wax_classic: 10, beeswax_pure_golden: 5, coconut_wax_cream: 9, palm_wax_crystal: 6,
  };
  return m[t];
}

export function ecoFriendly(t: WaxTypeType): number {
  const m: Record<WaxTypeType, number> = {
    soy_wax_natural: 9, paraffin_wax_classic: 3, beeswax_pure_golden: 10, coconut_wax_cream: 8, palm_wax_crystal: 5,
  };
  return m[t];
}

export function pourEase(t: WaxTypeType): number {
  const m: Record<WaxTypeType, number> = {
    soy_wax_natural: 9, paraffin_wax_classic: 8, beeswax_pure_golden: 5, coconut_wax_cream: 10, palm_wax_crystal: 7,
  };
  return m[t];
}

export function waxCost(t: WaxTypeType): number {
  const m: Record<WaxTypeType, number> = {
    soy_wax_natural: 2, paraffin_wax_classic: 1, beeswax_pure_golden: 5, coconut_wax_cream: 4, palm_wax_crystal: 3,
  };
  return m[t];
}

export function renewable(t: WaxTypeType): boolean {
  const m: Record<WaxTypeType, boolean> = {
    soy_wax_natural: true, paraffin_wax_classic: false, beeswax_pure_golden: true, coconut_wax_cream: true, palm_wax_crystal: true,
  };
  return m[t];
}

export function naturalScent(t: WaxTypeType): boolean {
  const m: Record<WaxTypeType, boolean> = {
    soy_wax_natural: false, paraffin_wax_classic: false, beeswax_pure_golden: true, coconut_wax_cream: false, palm_wax_crystal: false,
  };
  return m[t];
}

export function meltPoint(t: WaxTypeType): string {
  const m: Record<WaxTypeType, string> = {
    soy_wax_natural: "low_120f_49c",
    paraffin_wax_classic: "medium_140f_60c",
    beeswax_pure_golden: "high_145f_63c",
    coconut_wax_cream: "low_100f_38c",
    palm_wax_crystal: "high_140f_60c",
  };
  return m[t];
}

export function bestCandle(t: WaxTypeType): string {
  const m: Record<WaxTypeType, string> = {
    soy_wax_natural: "container_jar_clean",
    paraffin_wax_classic: "pillar_taper_mold",
    beeswax_pure_golden: "rolled_taper_natural",
    coconut_wax_cream: "luxury_container_smooth",
    palm_wax_crystal: "pillar_crystal_pattern",
  };
  return m[t];
}

export function waxTypes(): WaxTypeType[] {
  return ["soy_wax_natural", "paraffin_wax_classic", "beeswax_pure_golden", "coconut_wax_cream", "palm_wax_crystal"];
}
