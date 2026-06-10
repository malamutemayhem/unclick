export type WaterHeaterType = "tank_gas" | "tank_electric" | "tankless_gas" | "heat_pump" | "solar_thermal";

export function heatingSpeed(t: WaterHeaterType): number {
  const m: Record<WaterHeaterType, number> = {
    tank_gas: 8, tank_electric: 5, tankless_gas: 10, heat_pump: 4, solar_thermal: 3,
  };
  return m[t];
}

export function energyEfficiency(t: WaterHeaterType): number {
  const m: Record<WaterHeaterType, number> = {
    tank_gas: 5, tank_electric: 6, tankless_gas: 8, heat_pump: 10, solar_thermal: 9,
  };
  return m[t];
}

export function hotWaterCapacity(t: WaterHeaterType): number {
  const m: Record<WaterHeaterType, number> = {
    tank_gas: 8, tank_electric: 7, tankless_gas: 10, heat_pump: 7, solar_thermal: 6,
  };
  return m[t];
}

export function spaceRequired(t: WaterHeaterType): number {
  const m: Record<WaterHeaterType, number> = {
    tank_gas: 8, tank_electric: 8, tankless_gas: 2, heat_pump: 9, solar_thermal: 10,
  };
  return m[t];
}

export function heaterCost(t: WaterHeaterType): number {
  const m: Record<WaterHeaterType, number> = {
    tank_gas: 4, tank_electric: 3, tankless_gas: 7, heat_pump: 8, solar_thermal: 10,
  };
  return m[t];
}

export function endlessHotWater(t: WaterHeaterType): boolean {
  const m: Record<WaterHeaterType, boolean> = {
    tank_gas: false, tank_electric: false, tankless_gas: true, heat_pump: false, solar_thermal: false,
  };
  return m[t];
}

export function renewableEnergy(t: WaterHeaterType): boolean {
  const m: Record<WaterHeaterType, boolean> = {
    tank_gas: false, tank_electric: false, tankless_gas: false, heat_pump: true, solar_thermal: true,
  };
  return m[t];
}

export function heatingMethod(t: WaterHeaterType): string {
  const m: Record<WaterHeaterType, string> = {
    tank_gas: "gas_burner_flue_vent", tank_electric: "immersion_element_resistance",
    tankless_gas: "modulating_gas_heat_exchanger", heat_pump: "refrigerant_compressor_coil",
    solar_thermal: "evacuated_tube_collector",
  };
  return m[t];
}

export function bestHome(t: WaterHeaterType): string {
  const m: Record<WaterHeaterType, string> = {
    tank_gas: "standard_family_gas_line", tank_electric: "apartment_no_gas_access",
    tankless_gas: "large_family_high_demand", heat_pump: "mild_climate_garage_space",
    solar_thermal: "sunny_region_eco_home",
  };
  return m[t];
}

export function waterHeaters(): WaterHeaterType[] {
  return ["tank_gas", "tank_electric", "tankless_gas", "heat_pump", "solar_thermal"];
}
