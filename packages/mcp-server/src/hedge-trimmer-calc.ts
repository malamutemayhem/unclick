export type HedgeTrimmerType = "gas_dual_sided" | "electric_corded" | "battery_cordless" | "manual_shears" | "pole_extended";

export function cuttingSpeed(t: HedgeTrimmerType): number {
  const m: Record<HedgeTrimmerType, number> = {
    gas_dual_sided: 10, electric_corded: 7, battery_cordless: 8, manual_shears: 2, pole_extended: 6,
  };
  return m[t];
}

export function bladeLength(t: HedgeTrimmerType): number {
  const m: Record<HedgeTrimmerType, number> = {
    gas_dual_sided: 9, electric_corded: 7, battery_cordless: 7, manual_shears: 4, pole_extended: 8,
  };
  return m[t];
}

export function weightKg(t: HedgeTrimmerType): number {
  const m: Record<HedgeTrimmerType, number> = {
    gas_dual_sided: 10, electric_corded: 5, battery_cordless: 6, manual_shears: 2, pole_extended: 8,
  };
  return m[t];
}

export function vibrationLevel(t: HedgeTrimmerType): number {
  const m: Record<HedgeTrimmerType, number> = {
    gas_dual_sided: 10, electric_corded: 5, battery_cordless: 4, manual_shears: 1, pole_extended: 6,
  };
  return m[t];
}

export function trimmerCost(t: HedgeTrimmerType): number {
  const m: Record<HedgeTrimmerType, number> = {
    gas_dual_sided: 8, electric_corded: 3, battery_cordless: 6, manual_shears: 1, pole_extended: 7,
  };
  return m[t];
}

export function cordless(t: HedgeTrimmerType): boolean {
  const m: Record<HedgeTrimmerType, boolean> = {
    gas_dual_sided: true, electric_corded: false, battery_cordless: true, manual_shears: true, pole_extended: true,
  };
  return m[t];
}

export function dualAction(t: HedgeTrimmerType): boolean {
  const m: Record<HedgeTrimmerType, boolean> = {
    gas_dual_sided: true, electric_corded: true, battery_cordless: true, manual_shears: false, pole_extended: true,
  };
  return m[t];
}

export function bladeDesign(t: HedgeTrimmerType): string {
  const m: Record<HedgeTrimmerType, string> = {
    gas_dual_sided: "reciprocating_dual_blade", electric_corded: "single_sided_laser_cut",
    battery_cordless: "dual_action_diamond_ground", manual_shears: "bypass_scissor_blade",
    pole_extended: "articulating_multi_angle",
  };
  return m[t];
}

export function bestHedge(t: HedgeTrimmerType): string {
  const m: Record<HedgeTrimmerType, string> = {
    gas_dual_sided: "thick_overgrown_privet", electric_corded: "light_boxwood_border",
    battery_cordless: "medium_residential_hedge", manual_shears: "small_topiary_detail",
    pole_extended: "tall_overhead_reaching",
  };
  return m[t];
}

export function hedgeTrimmers(): HedgeTrimmerType[] {
  return ["gas_dual_sided", "electric_corded", "battery_cordless", "manual_shears", "pole_extended"];
}
