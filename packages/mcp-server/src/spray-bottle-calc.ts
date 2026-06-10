export type SprayBottleType = "trigger_standard_plastic" | "continuous_mist_fine" | "foam_pump_thick" | "glass_amber_essential" | "industrial_pressure_steel";

export function sprayPattern(t: SprayBottleType): number {
  const m: Record<SprayBottleType, number> = {
    trigger_standard_plastic: 7, continuous_mist_fine: 10, foam_pump_thick: 5, glass_amber_essential: 8, industrial_pressure_steel: 6,
  };
  return m[t];
}

export function durability(t: SprayBottleType): number {
  const m: Record<SprayBottleType, number> = {
    trigger_standard_plastic: 5, continuous_mist_fine: 6, foam_pump_thick: 7, glass_amber_essential: 4, industrial_pressure_steel: 10,
  };
  return m[t];
}

export function ergonomics(t: SprayBottleType): number {
  const m: Record<SprayBottleType, number> = {
    trigger_standard_plastic: 7, continuous_mist_fine: 9, foam_pump_thick: 6, glass_amber_essential: 5, industrial_pressure_steel: 4,
  };
  return m[t];
}

export function chemicalResist(t: SprayBottleType): number {
  const m: Record<SprayBottleType, number> = {
    trigger_standard_plastic: 6, continuous_mist_fine: 5, foam_pump_thick: 7, glass_amber_essential: 10, industrial_pressure_steel: 9,
  };
  return m[t];
}

export function bottleCost(t: SprayBottleType): number {
  const m: Record<SprayBottleType, number> = {
    trigger_standard_plastic: 2, continuous_mist_fine: 5, foam_pump_thick: 4, glass_amber_essential: 6, industrial_pressure_steel: 9,
  };
  return m[t];
}

export function adjustableNozzle(t: SprayBottleType): boolean {
  const m: Record<SprayBottleType, boolean> = {
    trigger_standard_plastic: true, continuous_mist_fine: false, foam_pump_thick: false, glass_amber_essential: true, industrial_pressure_steel: true,
  };
  return m[t];
}

export function refillable(t: SprayBottleType): boolean {
  const m: Record<SprayBottleType, boolean> = {
    trigger_standard_plastic: true, continuous_mist_fine: true, foam_pump_thick: true, glass_amber_essential: true, industrial_pressure_steel: true,
  };
  return m[t];
}

export function bottleMaterial(t: SprayBottleType): string {
  const m: Record<SprayBottleType, string> = {
    trigger_standard_plastic: "hdpe_recyclable_plastic",
    continuous_mist_fine: "pet_pressurized_can",
    foam_pump_thick: "polypropylene_foamer",
    glass_amber_essential: "uv_block_amber_glass",
    industrial_pressure_steel: "stainless_pump_tank",
  };
  return m[t];
}

export function bestUse(t: SprayBottleType): string {
  const m: Record<SprayBottleType, string> = {
    trigger_standard_plastic: "general_cleaning_kitchen",
    continuous_mist_fine: "plant_misting_hair_care",
    foam_pump_thick: "soap_shampoo_dispense",
    glass_amber_essential: "essential_oil_diy_blend",
    industrial_pressure_steel: "garage_shop_degreaser",
  };
  return m[t];
}

export function sprayBottles(): SprayBottleType[] {
  return ["trigger_standard_plastic", "continuous_mist_fine", "foam_pump_thick", "glass_amber_essential", "industrial_pressure_steel"];
}
