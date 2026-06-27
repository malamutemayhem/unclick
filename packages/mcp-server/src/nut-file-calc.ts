export type NutFileType = "gauged_round_set" | "diamond_coated_fine" | "needle_flat_slim" | "double_edge_slot" | "welded_bead_abrasive";

export function slotPrecision(t: NutFileType): number {
  const m: Record<NutFileType, number> = {
    gauged_round_set: 10, diamond_coated_fine: 9, needle_flat_slim: 7, double_edge_slot: 8, welded_bead_abrasive: 5,
  };
  return m[t];
}

export function cutSpeed(t: NutFileType): number {
  const m: Record<NutFileType, number> = {
    gauged_round_set: 6, diamond_coated_fine: 8, needle_flat_slim: 7, double_edge_slot: 9, welded_bead_abrasive: 10,
  };
  return m[t];
}

export function sizeRange(t: NutFileType): number {
  const m: Record<NutFileType, number> = {
    gauged_round_set: 10, diamond_coated_fine: 7, needle_flat_slim: 5, double_edge_slot: 6, welded_bead_abrasive: 8,
  };
  return m[t];
}

export function finishQuality(t: NutFileType): number {
  const m: Record<NutFileType, number> = {
    gauged_round_set: 9, diamond_coated_fine: 10, needle_flat_slim: 7, double_edge_slot: 6, welded_bead_abrasive: 4,
  };
  return m[t];
}

export function fileCost(t: NutFileType): number {
  const m: Record<NutFileType, number> = {
    gauged_round_set: 3, diamond_coated_fine: 2, needle_flat_slim: 1, double_edge_slot: 2, welded_bead_abrasive: 1,
  };
  return m[t];
}

export function sizedToGauge(t: NutFileType): boolean {
  const m: Record<NutFileType, boolean> = {
    gauged_round_set: true, diamond_coated_fine: false, needle_flat_slim: false, double_edge_slot: false, welded_bead_abrasive: false,
  };
  return m[t];
}

export function roundProfile(t: NutFileType): boolean {
  const m: Record<NutFileType, boolean> = {
    gauged_round_set: true, diamond_coated_fine: false, needle_flat_slim: false, double_edge_slot: false, welded_bead_abrasive: true,
  };
  return m[t];
}

export function abrasiveType(t: NutFileType): string {
  const m: Record<NutFileType, string> = {
    gauged_round_set: "hardened_steel_round",
    diamond_coated_fine: "diamond_grit_coat",
    needle_flat_slim: "carbon_steel_flat",
    double_edge_slot: "double_cut_steel",
    welded_bead_abrasive: "welded_bead_wire",
  };
  return m[t];
}

export function bestUse(t: NutFileType): string {
  const m: Record<NutFileType, string> = {
    gauged_round_set: "exact_gauge_slot",
    diamond_coated_fine: "bone_slot_polish",
    needle_flat_slim: "flat_bottom_slot",
    double_edge_slot: "fast_slot_widen",
    welded_bead_abrasive: "rough_slot_start",
  };
  return m[t];
}

export function nutFiles(): NutFileType[] {
  return ["gauged_round_set", "diamond_coated_fine", "needle_flat_slim", "double_edge_slot", "welded_bead_abrasive"];
}
