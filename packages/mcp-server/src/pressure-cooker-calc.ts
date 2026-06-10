export type PressureCookerType = "stovetop_stainless_classic" | "electric_digital_multi" | "canning_large_gauge" | "micro_rice_pressure" | "commercial_tilting_kettle";

export function cookSpeed(t: PressureCookerType): number {
  const m: Record<PressureCookerType, number> = {
    stovetop_stainless_classic: 10, electric_digital_multi: 8, canning_large_gauge: 7, micro_rice_pressure: 6, commercial_tilting_kettle: 9,
  };
  return m[t];
}

export function capacity(t: PressureCookerType): number {
  const m: Record<PressureCookerType, number> = {
    stovetop_stainless_classic: 6, electric_digital_multi: 7, canning_large_gauge: 10, micro_rice_pressure: 3, commercial_tilting_kettle: 10,
  };
  return m[t];
}

export function easeOfUse(t: PressureCookerType): number {
  const m: Record<PressureCookerType, number> = {
    stovetop_stainless_classic: 5, electric_digital_multi: 10, canning_large_gauge: 4, micro_rice_pressure: 8, commercial_tilting_kettle: 6,
  };
  return m[t];
}

export function safetyFeatures(t: PressureCookerType): number {
  const m: Record<PressureCookerType, number> = {
    stovetop_stainless_classic: 6, electric_digital_multi: 10, canning_large_gauge: 7, micro_rice_pressure: 8, commercial_tilting_kettle: 9,
  };
  return m[t];
}

export function cookerCost(t: PressureCookerType): number {
  const m: Record<PressureCookerType, number> = {
    stovetop_stainless_classic: 4, electric_digital_multi: 5, canning_large_gauge: 6, micro_rice_pressure: 3, commercial_tilting_kettle: 10,
  };
  return m[t];
}

export function needsStove(t: PressureCookerType): boolean {
  const m: Record<PressureCookerType, boolean> = {
    stovetop_stainless_classic: true, electric_digital_multi: false, canning_large_gauge: true, micro_rice_pressure: false, commercial_tilting_kettle: false,
  };
  return m[t];
}

export function multiFunction(t: PressureCookerType): boolean {
  const m: Record<PressureCookerType, boolean> = {
    stovetop_stainless_classic: false, electric_digital_multi: true, canning_large_gauge: false, micro_rice_pressure: true, commercial_tilting_kettle: false,
  };
  return m[t];
}

export function sealType(t: PressureCookerType): string {
  const m: Record<PressureCookerType, string> = {
    stovetop_stainless_classic: "metal_to_metal_lock",
    electric_digital_multi: "silicone_gasket_lid_lock",
    canning_large_gauge: "weighted_gauge_jiggler",
    micro_rice_pressure: "push_button_seal_valve",
    commercial_tilting_kettle: "bolted_clamp_gasket",
  };
  return m[t];
}

export function bestMeal(t: PressureCookerType): string {
  const m: Record<PressureCookerType, string> = {
    stovetop_stainless_classic: "fast_stock_braise_bean",
    electric_digital_multi: "weeknight_set_and_forget",
    canning_large_gauge: "preserve_can_large_batch",
    micro_rice_pressure: "rice_grain_quick_side",
    commercial_tilting_kettle: "institutional_soup_stew",
  };
  return m[t];
}

export function pressureCookers(): PressureCookerType[] {
  return ["stovetop_stainless_classic", "electric_digital_multi", "canning_large_gauge", "micro_rice_pressure", "commercial_tilting_kettle"];
}
