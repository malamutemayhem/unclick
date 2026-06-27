export type EarPlugType = "foam_disposable_roll" | "silicone_reusable_tree" | "wax_moldable_custom" | "flanged_musician_filter" | "electronic_active_cancel";

export function noiseReduction(t: EarPlugType): number {
  const m: Record<EarPlugType, number> = {
    foam_disposable_roll: 10, silicone_reusable_tree: 7, wax_moldable_custom: 8, flanged_musician_filter: 5, electronic_active_cancel: 9,
  };
  return m[t];
}

export function comfort(t: EarPlugType): number {
  const m: Record<EarPlugType, number> = {
    foam_disposable_roll: 6, silicone_reusable_tree: 7, wax_moldable_custom: 9, flanged_musician_filter: 8, electronic_active_cancel: 7,
  };
  return m[t];
}

export function soundClarity(t: EarPlugType): number {
  const m: Record<EarPlugType, number> = {
    foam_disposable_roll: 3, silicone_reusable_tree: 5, wax_moldable_custom: 4, flanged_musician_filter: 10, electronic_active_cancel: 8,
  };
  return m[t];
}

export function reusability(t: EarPlugType): number {
  const m: Record<EarPlugType, number> = {
    foam_disposable_roll: 2, silicone_reusable_tree: 8, wax_moldable_custom: 3, flanged_musician_filter: 9, electronic_active_cancel: 10,
  };
  return m[t];
}

export function plugCost(t: EarPlugType): number {
  const m: Record<EarPlugType, number> = {
    foam_disposable_roll: 1, silicone_reusable_tree: 4, wax_moldable_custom: 3, flanged_musician_filter: 6, electronic_active_cancel: 10,
  };
  return m[t];
}

export function waterproof(t: EarPlugType): boolean {
  const m: Record<EarPlugType, boolean> = {
    foam_disposable_roll: false, silicone_reusable_tree: true, wax_moldable_custom: true, flanged_musician_filter: false, electronic_active_cancel: false,
  };
  return m[t];
}

export function needsBattery(t: EarPlugType): boolean {
  const m: Record<EarPlugType, boolean> = {
    foam_disposable_roll: false, silicone_reusable_tree: false, wax_moldable_custom: false, flanged_musician_filter: false, electronic_active_cancel: true,
  };
  return m[t];
}

export function plugMaterial(t: EarPlugType): string {
  const m: Record<EarPlugType, string> = {
    foam_disposable_roll: "polyurethane_slow_expand",
    silicone_reusable_tree: "medical_silicone_tiered",
    wax_moldable_custom: "natural_beeswax_cotton",
    flanged_musician_filter: "thermoplastic_acoustic_filter",
    electronic_active_cancel: "silicone_tip_anc_circuit",
  };
  return m[t];
}

export function bestUse(t: EarPlugType): string {
  const m: Record<EarPlugType, string> = {
    foam_disposable_roll: "industrial_noise_max_block",
    silicone_reusable_tree: "swimming_water_seal",
    wax_moldable_custom: "sleep_custom_ear_fit",
    flanged_musician_filter: "concert_music_even_reduce",
    electronic_active_cancel: "travel_office_smart_block",
  };
  return m[t];
}

export function earPlugs(): EarPlugType[] {
  return ["foam_disposable_roll", "silicone_reusable_tree", "wax_moldable_custom", "flanged_musician_filter", "electronic_active_cancel"];
}
