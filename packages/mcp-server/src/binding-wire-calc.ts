export type BindingWireType = "iron_soft_anneal" | "steel_spring_hold" | "nichrome_heat_resist" | "copper_tack_solder" | "stainless_pickle_safe";

export function holdStrength(t: BindingWireType): number {
  const m: Record<BindingWireType, number> = {
    iron_soft_anneal: 7, steel_spring_hold: 10, nichrome_heat_resist: 6, copper_tack_solder: 5, stainless_pickle_safe: 8,
  };
  return m[t];
}

export function flexibility(t: BindingWireType): number {
  const m: Record<BindingWireType, number> = {
    iron_soft_anneal: 10, steel_spring_hold: 4, nichrome_heat_resist: 7, copper_tack_solder: 9, stainless_pickle_safe: 6,
  };
  return m[t];
}

export function heatTolerance(t: BindingWireType): number {
  const m: Record<BindingWireType, number> = {
    iron_soft_anneal: 7, steel_spring_hold: 6, nichrome_heat_resist: 10, copper_tack_solder: 5, stainless_pickle_safe: 8,
  };
  return m[t];
}

export function reusability(t: BindingWireType): number {
  const m: Record<BindingWireType, number> = {
    iron_soft_anneal: 5, steel_spring_hold: 8, nichrome_heat_resist: 9, copper_tack_solder: 3, stainless_pickle_safe: 7,
  };
  return m[t];
}

export function wireCost(t: BindingWireType): number {
  const m: Record<BindingWireType, number> = {
    iron_soft_anneal: 1, steel_spring_hold: 1, nichrome_heat_resist: 2, copper_tack_solder: 2, stainless_pickle_safe: 2,
  };
  return m[t];
}

export function pickleSafe(t: BindingWireType): boolean {
  const m: Record<BindingWireType, boolean> = {
    iron_soft_anneal: false, steel_spring_hold: false, nichrome_heat_resist: true, copper_tack_solder: false, stainless_pickle_safe: true,
  };
  return m[t];
}

export function selfAnnealing(t: BindingWireType): boolean {
  const m: Record<BindingWireType, boolean> = {
    iron_soft_anneal: true, steel_spring_hold: false, nichrome_heat_resist: false, copper_tack_solder: true, stainless_pickle_safe: false,
  };
  return m[t];
}

export function wireAlloy(t: BindingWireType): string {
  const m: Record<BindingWireType, string> = {
    iron_soft_anneal: "dead_soft_iron",
    steel_spring_hold: "high_carbon_spring",
    nichrome_heat_resist: "nickel_chrome_alloy",
    copper_tack_solder: "pure_copper_soft",
    stainless_pickle_safe: "304_stainless_wire",
  };
  return m[t];
}

export function bestUse(t: BindingWireType): string {
  const m: Record<BindingWireType, string> = {
    iron_soft_anneal: "general_solder_bind",
    steel_spring_hold: "tension_assembly_hold",
    nichrome_heat_resist: "kiln_fire_support",
    copper_tack_solder: "tack_solder_join",
    stainless_pickle_safe: "acid_bath_hold",
  };
  return m[t];
}

export function bindingWires(): BindingWireType[] {
  return ["iron_soft_anneal", "steel_spring_hold", "nichrome_heat_resist", "copper_tack_solder", "stainless_pickle_safe"];
}
