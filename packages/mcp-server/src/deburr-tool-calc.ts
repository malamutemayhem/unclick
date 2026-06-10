export type DeburToolType = "swivel_blade_universal" | "countersink_bit_chamfer" | "hand_scraper_flat" | "rotary_burr_carbide" | "abrasive_wheel_flex";

export function burrRemoval(t: DeburToolType): number {
  const m: Record<DeburToolType, number> = {
    swivel_blade_universal: 9, countersink_bit_chamfer: 7, hand_scraper_flat: 6, rotary_burr_carbide: 10, abrasive_wheel_flex: 8,
  };
  return m[t];
}

export function edgeFinish(t: DeburToolType): number {
  const m: Record<DeburToolType, number> = {
    swivel_blade_universal: 8, countersink_bit_chamfer: 9, hand_scraper_flat: 7, rotary_burr_carbide: 6, abrasive_wheel_flex: 10,
  };
  return m[t];
}

export function speedOutput(t: DeburToolType): number {
  const m: Record<DeburToolType, number> = {
    swivel_blade_universal: 8, countersink_bit_chamfer: 7, hand_scraper_flat: 4, rotary_burr_carbide: 10, abrasive_wheel_flex: 9,
  };
  return m[t];
}

export function materialRange(t: DeburToolType): number {
  const m: Record<DeburToolType, number> = {
    swivel_blade_universal: 9, countersink_bit_chamfer: 7, hand_scraper_flat: 6, rotary_burr_carbide: 10, abrasive_wheel_flex: 8,
  };
  return m[t];
}

export function toolCost(t: DeburToolType): number {
  const m: Record<DeburToolType, number> = {
    swivel_blade_universal: 1, countersink_bit_chamfer: 1, hand_scraper_flat: 1, rotary_burr_carbide: 3, abrasive_wheel_flex: 2,
  };
  return m[t];
}

export function handPowered(t: DeburToolType): boolean {
  const m: Record<DeburToolType, boolean> = {
    swivel_blade_universal: true, countersink_bit_chamfer: false, hand_scraper_flat: true, rotary_burr_carbide: false, abrasive_wheel_flex: false,
  };
  return m[t];
}

export function replaceBlade(t: DeburToolType): boolean {
  const m: Record<DeburToolType, boolean> = {
    swivel_blade_universal: true, countersink_bit_chamfer: false, hand_scraper_flat: false, rotary_burr_carbide: false, abrasive_wheel_flex: true,
  };
  return m[t];
}

export function cuttingEdge(t: DeburToolType): string {
  const m: Record<DeburToolType, string> = {
    swivel_blade_universal: "swivel_hook_blade",
    countersink_bit_chamfer: "fluted_cone_bit",
    hand_scraper_flat: "hardened_steel_flat",
    rotary_burr_carbide: "tungsten_carbide_burr",
    abrasive_wheel_flex: "bonded_abrasive_disc",
  };
  return m[t];
}

export function bestMetal(t: DeburToolType): string {
  const m: Record<DeburToolType, string> = {
    swivel_blade_universal: "sheet_metal_edge",
    countersink_bit_chamfer: "drilled_hole_chamfer",
    hand_scraper_flat: "flat_plate_edge",
    rotary_burr_carbide: "cast_iron_weld_bead",
    abrasive_wheel_flex: "stainless_steel_polish",
  };
  return m[t];
}

export function deburTools(): DeburToolType[] {
  return ["swivel_blade_universal", "countersink_bit_chamfer", "hand_scraper_flat", "rotary_burr_carbide", "abrasive_wheel_flex"];
}
