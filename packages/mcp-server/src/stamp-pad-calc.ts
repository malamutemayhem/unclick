export type StampPadType = "dye_ink_quick_dry" | "pigment_ink_opaque" | "embossing_clear_raised" | "archival_acid_free" | "fabric_textile_wash";

export function colorVibrancy(t: StampPadType): number {
  const m: Record<StampPadType, number> = {
    dye_ink_quick_dry: 8, pigment_ink_opaque: 9, embossing_clear_raised: 2, archival_acid_free: 7, fabric_textile_wash: 6,
  };
  return m[t];
}

export function drySpeed(t: StampPadType): number {
  const m: Record<StampPadType, number> = {
    dye_ink_quick_dry: 10, pigment_ink_opaque: 4, embossing_clear_raised: 3, archival_acid_free: 6, fabric_textile_wash: 5,
  };
  return m[t];
}

export function surfaceCompat(t: StampPadType): number {
  const m: Record<StampPadType, number> = {
    dye_ink_quick_dry: 5, pigment_ink_opaque: 8, embossing_clear_raised: 6, archival_acid_free: 7, fabric_textile_wash: 4,
  };
  return m[t];
}

export function permanence(t: StampPadType): number {
  const m: Record<StampPadType, number> = {
    dye_ink_quick_dry: 4, pigment_ink_opaque: 7, embossing_clear_raised: 9, archival_acid_free: 10, fabric_textile_wash: 8,
  };
  return m[t];
}

export function padCost(t: StampPadType): number {
  const m: Record<StampPadType, number> = {
    dye_ink_quick_dry: 2, pigment_ink_opaque: 4, embossing_clear_raised: 5, archival_acid_free: 5, fabric_textile_wash: 4,
  };
  return m[t];
}

export function waterproof(t: StampPadType): boolean {
  const m: Record<StampPadType, boolean> = {
    dye_ink_quick_dry: false, pigment_ink_opaque: false, embossing_clear_raised: true, archival_acid_free: true, fabric_textile_wash: true,
  };
  return m[t];
}

export function reInkable(t: StampPadType): boolean {
  const m: Record<StampPadType, boolean> = {
    dye_ink_quick_dry: true, pigment_ink_opaque: true, embossing_clear_raised: true, archival_acid_free: true, fabric_textile_wash: false,
  };
  return m[t];
}

export function inkFormula(t: StampPadType): string {
  const m: Record<StampPadType, string> = {
    dye_ink_quick_dry: "water_based_dye_solution",
    pigment_ink_opaque: "suspended_pigment_glycol",
    embossing_clear_raised: "clear_slow_dry_emboss",
    archival_acid_free: "acid_free_pigment_archival",
    fabric_textile_wash: "fiber_reactive_heat_set",
  };
  return m[t];
}

export function bestProject(t: StampPadType): string {
  const m: Record<StampPadType, string> = {
    dye_ink_quick_dry: "card_making_quick_stamp",
    pigment_ink_opaque: "dark_paper_glossy_surface",
    embossing_clear_raised: "heat_emboss_raised_detail",
    archival_acid_free: "scrapbook_photo_preserve",
    fabric_textile_wash: "tshirt_tote_bag_print",
  };
  return m[t];
}

export function stampPads(): StampPadType[] {
  return ["dye_ink_quick_dry", "pigment_ink_opaque", "embossing_clear_raised", "archival_acid_free", "fabric_textile_wash"];
}
