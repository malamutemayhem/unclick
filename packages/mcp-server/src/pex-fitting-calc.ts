export type PexFittingType = "crimp_ring_copper" | "clamp_cinch_steel" | "push_fit_sharkbite" | "expansion_propex" | "press_viega_jaw";

export function connectionStrength(t: PexFittingType): number {
  const m: Record<PexFittingType, number> = {
    crimp_ring_copper: 8, clamp_cinch_steel: 7, push_fit_sharkbite: 5, expansion_propex: 10, press_viega_jaw: 9,
  };
  return m[t];
}

export function installSpeed(t: PexFittingType): number {
  const m: Record<PexFittingType, number> = {
    crimp_ring_copper: 6, clamp_cinch_steel: 7, push_fit_sharkbite: 10, expansion_propex: 5, press_viega_jaw: 8,
  };
  return m[t];
}

export function flowRate(t: PexFittingType): number {
  const m: Record<PexFittingType, number> = {
    crimp_ring_copper: 6, clamp_cinch_steel: 6, push_fit_sharkbite: 5, expansion_propex: 10, press_viega_jaw: 7,
  };
  return m[t];
}

export function reliability(t: PexFittingType): number {
  const m: Record<PexFittingType, number> = {
    crimp_ring_copper: 8, clamp_cinch_steel: 7, push_fit_sharkbite: 6, expansion_propex: 10, press_viega_jaw: 9,
  };
  return m[t];
}

export function fittingCost(t: PexFittingType): number {
  const m: Record<PexFittingType, number> = {
    crimp_ring_copper: 4, clamp_cinch_steel: 5, push_fit_sharkbite: 8, expansion_propex: 7, press_viega_jaw: 9,
  };
  return m[t];
}

export function noSpecialTool(t: PexFittingType): boolean {
  const m: Record<PexFittingType, boolean> = {
    crimp_ring_copper: false, clamp_cinch_steel: false, push_fit_sharkbite: true, expansion_propex: false, press_viega_jaw: false,
  };
  return m[t];
}

export function deMountable(t: PexFittingType): boolean {
  const m: Record<PexFittingType, boolean> = {
    crimp_ring_copper: false, clamp_cinch_steel: false, push_fit_sharkbite: true, expansion_propex: false, press_viega_jaw: false,
  };
  return m[t];
}

export function ringMaterial(t: PexFittingType): string {
  const m: Record<PexFittingType, string> = {
    crimp_ring_copper: "copper_crimp_ring",
    clamp_cinch_steel: "stainless_steel_clamp",
    push_fit_sharkbite: "collet_o_ring_brass",
    expansion_propex: "pex_expansion_ring",
    press_viega_jaw: "stainless_press_sleeve",
  };
  return m[t];
}

export function bestScenario(t: PexFittingType): string {
  const m: Record<PexFittingType, string> = {
    crimp_ring_copper: "residential_repipe_budget",
    clamp_cinch_steel: "tight_space_access",
    push_fit_sharkbite: "diy_quick_repair",
    expansion_propex: "new_construction_full",
    press_viega_jaw: "commercial_high_volume",
  };
  return m[t];
}

export function pexFittings(): PexFittingType[] {
  return ["crimp_ring_copper", "clamp_cinch_steel", "push_fit_sharkbite", "expansion_propex", "press_viega_jaw"];
}
