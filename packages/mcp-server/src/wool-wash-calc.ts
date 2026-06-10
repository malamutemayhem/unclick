export type WoolWashType = "soak_no_rinse_gentle" | "detergent_fiber_wash" | "vinegar_rinse_set" | "lanolin_restore_soft" | "enzyme_scour_raw";

export function cleaningPower(t: WoolWashType): number {
  const m: Record<WoolWashType, number> = {
    soak_no_rinse_gentle: 6, detergent_fiber_wash: 8, vinegar_rinse_set: 4, lanolin_restore_soft: 3, enzyme_scour_raw: 10,
  };
  return m[t];
}

export function fiberSafe(t: WoolWashType): number {
  const m: Record<WoolWashType, number> = {
    soak_no_rinse_gentle: 10, detergent_fiber_wash: 7, vinegar_rinse_set: 9, lanolin_restore_soft: 10, enzyme_scour_raw: 5,
  };
  return m[t];
}

export function colorPreserve(t: WoolWashType): number {
  const m: Record<WoolWashType, number> = {
    soak_no_rinse_gentle: 9, detergent_fiber_wash: 6, vinegar_rinse_set: 10, lanolin_restore_soft: 8, enzyme_scour_raw: 4,
  };
  return m[t];
}

export function easeOfUse(t: WoolWashType): number {
  const m: Record<WoolWashType, number> = {
    soak_no_rinse_gentle: 10, detergent_fiber_wash: 8, vinegar_rinse_set: 7, lanolin_restore_soft: 6, enzyme_scour_raw: 4,
  };
  return m[t];
}

export function washCost(t: WoolWashType): number {
  const m: Record<WoolWashType, number> = {
    soak_no_rinse_gentle: 3, detergent_fiber_wash: 2, vinegar_rinse_set: 1, lanolin_restore_soft: 3, enzyme_scour_raw: 2,
  };
  return m[t];
}

export function noRinse(t: WoolWashType): boolean {
  const m: Record<WoolWashType, boolean> = {
    soak_no_rinse_gentle: true, detergent_fiber_wash: false, vinegar_rinse_set: false, lanolin_restore_soft: false, enzyme_scour_raw: false,
  };
  return m[t];
}

export function forRawFleece(t: WoolWashType): boolean {
  const m: Record<WoolWashType, boolean> = {
    soak_no_rinse_gentle: false, detergent_fiber_wash: false, vinegar_rinse_set: false, lanolin_restore_soft: false, enzyme_scour_raw: true,
  };
  return m[t];
}

export function activeAgent(t: WoolWashType): string {
  const m: Record<WoolWashType, string> = {
    soak_no_rinse_gentle: "surfactant_conditioning",
    detergent_fiber_wash: "mild_detergent_blend",
    vinegar_rinse_set: "acetic_acid_dilute",
    lanolin_restore_soft: "lanolin_emulsion_oil",
    enzyme_scour_raw: "protease_enzyme_bath",
  };
  return m[t];
}

export function bestUse(t: WoolWashType): string {
  const m: Record<WoolWashType, string> = {
    soak_no_rinse_gentle: "finished_garment_wash",
    detergent_fiber_wash: "general_yarn_clean",
    vinegar_rinse_set: "dye_set_color_lock",
    lanolin_restore_soft: "restore_wool_softness",
    enzyme_scour_raw: "raw_fleece_scour",
  };
  return m[t];
}

export function woolWashes(): WoolWashType[] {
  return ["soak_no_rinse_gentle", "detergent_fiber_wash", "vinegar_rinse_set", "lanolin_restore_soft", "enzyme_scour_raw"];
}
