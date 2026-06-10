export type TorchHeadType = "minor_bench_burner" | "hothead_mapp_basic" | "nortel_mega_dual" | "carlisle_cc_mini" | "bethlehem_bravo_pro";

export function flameTemp(t: TorchHeadType): number {
  const m: Record<TorchHeadType, number> = {
    minor_bench_burner: 8, hothead_mapp_basic: 5, nortel_mega_dual: 10, carlisle_cc_mini: 7, bethlehem_bravo_pro: 9,
  };
  return m[t];
}

export function flameControl(t: TorchHeadType): number {
  const m: Record<TorchHeadType, number> = {
    minor_bench_burner: 8, hothead_mapp_basic: 4, nortel_mega_dual: 10, carlisle_cc_mini: 7, bethlehem_bravo_pro: 9,
  };
  return m[t];
}

export function easeOfUse(t: TorchHeadType): number {
  const m: Record<TorchHeadType, number> = {
    minor_bench_burner: 7, hothead_mapp_basic: 10, nortel_mega_dual: 5, carlisle_cc_mini: 8, bethlehem_bravo_pro: 6,
  };
  return m[t];
}

export function glassRange(t: TorchHeadType): number {
  const m: Record<TorchHeadType, number> = {
    minor_bench_burner: 7, hothead_mapp_basic: 4, nortel_mega_dual: 10, carlisle_cc_mini: 6, bethlehem_bravo_pro: 9,
  };
  return m[t];
}

export function torchCost(t: TorchHeadType): number {
  const m: Record<TorchHeadType, number> = {
    minor_bench_burner: 3, hothead_mapp_basic: 1, nortel_mega_dual: 5, carlisle_cc_mini: 3, bethlehem_bravo_pro: 5,
  };
  return m[t];
}

export function dualFuel(t: TorchHeadType): boolean {
  const m: Record<TorchHeadType, boolean> = {
    minor_bench_burner: true, hothead_mapp_basic: false, nortel_mega_dual: true, carlisle_cc_mini: true, bethlehem_bravo_pro: true,
  };
  return m[t];
}

export function forBeginner(t: TorchHeadType): boolean {
  const m: Record<TorchHeadType, boolean> = {
    minor_bench_burner: false, hothead_mapp_basic: true, nortel_mega_dual: false, carlisle_cc_mini: false, bethlehem_bravo_pro: false,
  };
  return m[t];
}

export function fuelType(t: TorchHeadType): string {
  const m: Record<TorchHeadType, string> = {
    minor_bench_burner: "propane_oxygen_mix",
    hothead_mapp_basic: "mapp_gas_canister",
    nortel_mega_dual: "propane_oxygen_dual",
    carlisle_cc_mini: "propane_oxygen_small",
    bethlehem_bravo_pro: "natural_gas_oxygen",
  };
  return m[t];
}

export function bestUse(t: TorchHeadType): string {
  const m: Record<TorchHeadType, string> = {
    minor_bench_burner: "soft_glass_bead",
    hothead_mapp_basic: "beginner_small_bead",
    nortel_mega_dual: "boro_sculpture_large",
    carlisle_cc_mini: "small_detail_work",
    bethlehem_bravo_pro: "production_glass_art",
  };
  return m[t];
}

export function torchHeads(): TorchHeadType[] {
  return ["minor_bench_burner", "hothead_mapp_basic", "nortel_mega_dual", "carlisle_cc_mini", "bethlehem_bravo_pro"];
}
