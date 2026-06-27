export type BeadBoardType = "flocked_channel_basic" | "multi_strand_wide" | "u_shaped_necklace" | "bead_mat_flat" | "design_tray_compartment";

export function layoutSpace(t: BeadBoardType): number {
  const m: Record<BeadBoardType, number> = {
    flocked_channel_basic: 7, multi_strand_wide: 10, u_shaped_necklace: 8, bead_mat_flat: 6, design_tray_compartment: 9,
  };
  return m[t];
}

export function beadGrip(t: BeadBoardType): number {
  const m: Record<BeadBoardType, number> = {
    flocked_channel_basic: 9, multi_strand_wide: 8, u_shaped_necklace: 9, bead_mat_flat: 10, design_tray_compartment: 7,
  };
  return m[t];
}

export function portability(t: BeadBoardType): number {
  const m: Record<BeadBoardType, number> = {
    flocked_channel_basic: 7, multi_strand_wide: 4, u_shaped_necklace: 6, bead_mat_flat: 10, design_tray_compartment: 5,
  };
  return m[t];
}

export function measureMarks(t: BeadBoardType): number {
  const m: Record<BeadBoardType, number> = {
    flocked_channel_basic: 8, multi_strand_wide: 9, u_shaped_necklace: 10, bead_mat_flat: 3, design_tray_compartment: 7,
  };
  return m[t];
}

export function boardCost(t: BeadBoardType): number {
  const m: Record<BeadBoardType, number> = {
    flocked_channel_basic: 2, multi_strand_wide: 4, u_shaped_necklace: 3, bead_mat_flat: 1, design_tray_compartment: 3,
  };
  return m[t];
}

export function hasChannel(t: BeadBoardType): boolean {
  const m: Record<BeadBoardType, boolean> = {
    flocked_channel_basic: true, multi_strand_wide: true, u_shaped_necklace: true, bead_mat_flat: false, design_tray_compartment: true,
  };
  return m[t];
}

export function multiStrand(t: BeadBoardType): boolean {
  const m: Record<BeadBoardType, boolean> = {
    flocked_channel_basic: false, multi_strand_wide: true, u_shaped_necklace: false, bead_mat_flat: false, design_tray_compartment: true,
  };
  return m[t];
}

export function boardMaterial(t: BeadBoardType): string {
  const m: Record<BeadBoardType, string> = {
    flocked_channel_basic: "plastic_flocked_grey",
    multi_strand_wide: "foam_flocked_multi",
    u_shaped_necklace: "plastic_curved_ruler",
    bead_mat_flat: "velour_fabric_mat",
    design_tray_compartment: "wood_compartment_tray",
  };
  return m[t];
}

export function bestUse(t: BeadBoardType): string {
  const m: Record<BeadBoardType, string> = {
    flocked_channel_basic: "single_strand_layout",
    multi_strand_wide: "multi_row_design",
    u_shaped_necklace: "necklace_length_plan",
    bead_mat_flat: "bead_sort_prevent_roll",
    design_tray_compartment: "complex_design_organize",
  };
  return m[t];
}

export function beadBoards(): BeadBoardType[] {
  return ["flocked_channel_basic", "multi_strand_wide", "u_shaped_necklace", "bead_mat_flat", "design_tray_compartment"];
}
