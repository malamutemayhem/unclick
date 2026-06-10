export type LaceBobbinType = "midland_square_cut" | "continental_round_slim" | "honiton_fine_light" | "spangled_bead_weight" | "jumbo_thick_cord";

export function threadControl(t: LaceBobbinType): number {
  const m: Record<LaceBobbinType, number> = {
    midland_square_cut: 8, continental_round_slim: 9, honiton_fine_light: 10, spangled_bead_weight: 7, jumbo_thick_cord: 5,
  };
  return m[t];
}

export function weightBalance(t: LaceBobbinType): number {
  const m: Record<LaceBobbinType, number> = {
    midland_square_cut: 7, continental_round_slim: 8, honiton_fine_light: 6, spangled_bead_weight: 10, jumbo_thick_cord: 9,
  };
  return m[t];
}

export function fineness(t: LaceBobbinType): number {
  const m: Record<LaceBobbinType, number> = {
    midland_square_cut: 7, continental_round_slim: 8, honiton_fine_light: 10, spangled_bead_weight: 6, jumbo_thick_cord: 3,
  };
  return m[t];
}

export function durability(t: LaceBobbinType): number {
  const m: Record<LaceBobbinType, number> = {
    midland_square_cut: 9, continental_round_slim: 8, honiton_fine_light: 6, spangled_bead_weight: 8, jumbo_thick_cord: 10,
  };
  return m[t];
}

export function bobbinCost(t: LaceBobbinType): number {
  const m: Record<LaceBobbinType, number> = {
    midland_square_cut: 3, continental_round_slim: 3, honiton_fine_light: 4, spangled_bead_weight: 5, jumbo_thick_cord: 2,
  };
  return m[t];
}

export function hasSpangle(t: LaceBobbinType): boolean {
  const m: Record<LaceBobbinType, boolean> = {
    midland_square_cut: false, continental_round_slim: false, honiton_fine_light: false, spangled_bead_weight: true, jumbo_thick_cord: false,
  };
  return m[t];
}

export function forFineLace(t: LaceBobbinType): boolean {
  const m: Record<LaceBobbinType, boolean> = {
    midland_square_cut: false, continental_round_slim: true, honiton_fine_light: true, spangled_bead_weight: false, jumbo_thick_cord: false,
  };
  return m[t];
}

export function bobbinMaterial(t: LaceBobbinType): string {
  const m: Record<LaceBobbinType, string> = {
    midland_square_cut: "hardwood_turned_square",
    continental_round_slim: "beech_smooth_round",
    honiton_fine_light: "boxwood_fine_turned",
    spangled_bead_weight: "wood_glass_bead",
    jumbo_thick_cord: "maple_wide_barrel",
  };
  return m[t];
}

export function bestProject(t: LaceBobbinType): string {
  const m: Record<LaceBobbinType, string> = {
    midland_square_cut: "midland_torchon_lace",
    continental_round_slim: "cluny_tape_lace",
    honiton_fine_light: "honiton_fine_point",
    spangled_bead_weight: "pillow_lace_tension",
    jumbo_thick_cord: "macrame_bobbin_cord",
  };
  return m[t];
}

export function laceBobbins(): LaceBobbinType[] {
  return ["midland_square_cut", "continental_round_slim", "honiton_fine_light", "spangled_bead_weight", "jumbo_thick_cord"];
}
