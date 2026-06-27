export type ChainsawType = "gas_professional" | "electric_corded" | "battery_cordless" | "pole_saw" | "top_handle_arborist";

export function cuttingPower(t: ChainsawType): number {
  const m: Record<ChainsawType, number> = {
    gas_professional: 10, electric_corded: 5, battery_cordless: 7, pole_saw: 4, top_handle_arborist: 8,
  };
  return m[t];
}

export function barLengthInches(t: ChainsawType): number {
  const m: Record<ChainsawType, number> = {
    gas_professional: 20, electric_corded: 16, battery_cordless: 14, pole_saw: 10, top_handle_arborist: 12,
  };
  return m[t];
}

export function weightScore(t: ChainsawType): number {
  const m: Record<ChainsawType, number> = {
    gas_professional: 10, electric_corded: 6, battery_cordless: 5, pole_saw: 7, top_handle_arborist: 4,
  };
  return m[t];
}

export function safetyRating(t: ChainsawType): number {
  const m: Record<ChainsawType, number> = {
    gas_professional: 6, electric_corded: 8, battery_cordless: 8, pole_saw: 7, top_handle_arborist: 5,
  };
  return m[t];
}

export function sawCost(t: ChainsawType): number {
  const m: Record<ChainsawType, number> = {
    gas_professional: 10, electric_corded: 3, battery_cordless: 7, pole_saw: 6, top_handle_arborist: 9,
  };
  return m[t];
}

export function kickbackBrake(t: ChainsawType): boolean {
  const m: Record<ChainsawType, boolean> = {
    gas_professional: true, electric_corded: true, battery_cordless: true, pole_saw: true, top_handle_arborist: true,
  };
  return m[t];
}

export function toolFree(t: ChainsawType): boolean {
  const m: Record<ChainsawType, boolean> = {
    gas_professional: false, electric_corded: true, battery_cordless: true, pole_saw: false, top_handle_arborist: false,
  };
  return m[t];
}

export function chainDesign(t: ChainsawType): string {
  const m: Record<ChainsawType, string> = {
    gas_professional: "full_chisel_aggressive", electric_corded: "low_kickback_semi_chisel",
    battery_cordless: "semi_chisel_standard", pole_saw: "narrow_kerf_pruning",
    top_handle_arborist: "full_chisel_carving",
  };
  return m[t];
}

export function bestTask(t: ChainsawType): string {
  const m: Record<ChainsawType, string> = {
    gas_professional: "felling_large_hardwood", electric_corded: "firewood_backyard_cleanup",
    battery_cordless: "light_pruning_storm_damage", pole_saw: "high_branch_limbing",
    top_handle_arborist: "tree_climbing_removal",
  };
  return m[t];
}

export function chainsaws(): ChainsawType[] {
  return ["gas_professional", "electric_corded", "battery_cordless", "pole_saw", "top_handle_arborist"];
}
