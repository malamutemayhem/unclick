export type WoodScrewType = "flat_head_countersink" | "round_head_pan" | "deck_screw_coated" | "pocket_hole_washer" | "lag_screw_hex";

export function holdingPower(t: WoodScrewType): number {
  const m: Record<WoodScrewType, number> = {
    flat_head_countersink: 7, round_head_pan: 6, deck_screw_coated: 8, pocket_hole_washer: 9, lag_screw_hex: 10,
  };
  return m[t];
}

export function driveEase(t: WoodScrewType): number {
  const m: Record<WoodScrewType, number> = {
    flat_head_countersink: 7, round_head_pan: 8, deck_screw_coated: 9, pocket_hole_washer: 7, lag_screw_hex: 4,
  };
  return m[t];
}

export function corrosionResist(t: WoodScrewType): number {
  const m: Record<WoodScrewType, number> = {
    flat_head_countersink: 4, round_head_pan: 5, deck_screw_coated: 10, pocket_hole_washer: 6, lag_screw_hex: 7,
  };
  return m[t];
}

export function flushFinish(t: WoodScrewType): number {
  const m: Record<WoodScrewType, number> = {
    flat_head_countersink: 10, round_head_pan: 3, deck_screw_coated: 8, pocket_hole_washer: 9, lag_screw_hex: 2,
  };
  return m[t];
}

export function screwCost(t: WoodScrewType): number {
  const m: Record<WoodScrewType, number> = {
    flat_head_countersink: 3, round_head_pan: 3, deck_screw_coated: 6, pocket_hole_washer: 7, lag_screw_hex: 8,
  };
  return m[t];
}

export function preDrillRequired(t: WoodScrewType): boolean {
  const m: Record<WoodScrewType, boolean> = {
    flat_head_countersink: true, round_head_pan: false, deck_screw_coated: false, pocket_hole_washer: true, lag_screw_hex: true,
  };
  return m[t];
}

export function selfTapping(t: WoodScrewType): boolean {
  const m: Record<WoodScrewType, boolean> = {
    flat_head_countersink: false, round_head_pan: false, deck_screw_coated: true, pocket_hole_washer: false, lag_screw_hex: false,
  };
  return m[t];
}

export function driveStyle(t: WoodScrewType): string {
  const m: Record<WoodScrewType, string> = {
    flat_head_countersink: "phillips_cross_recess",
    round_head_pan: "slotted_single_slot",
    deck_screw_coated: "star_torx_drive",
    pocket_hole_washer: "square_robertson_drive",
    lag_screw_hex: "hex_head_wrench",
  };
  return m[t];
}

export function bestProject(t: WoodScrewType): string {
  const m: Record<WoodScrewType, string> = {
    flat_head_countersink: "furniture_cabinet_flush",
    round_head_pan: "hardware_bracket_mount",
    deck_screw_coated: "outdoor_deck_fence",
    pocket_hole_washer: "hidden_joint_frame",
    lag_screw_hex: "structural_beam_ledger",
  };
  return m[t];
}

export function woodScrews(): WoodScrewType[] {
  return ["flat_head_countersink", "round_head_pan", "deck_screw_coated", "pocket_hole_washer", "lag_screw_hex"];
}
