export type FireExtinguisherType = "abc_dry_chemical" | "co2_gas" | "water_mist" | "kitchen_wet_chemical" | "halon_clean_agent";

export function fireClassRange(t: FireExtinguisherType): number {
  const m: Record<FireExtinguisherType, number> = {
    abc_dry_chemical: 10, co2_gas: 5, water_mist: 6, kitchen_wet_chemical: 4, halon_clean_agent: 7,
  };
  return m[t];
}

export function dischargeTime(t: FireExtinguisherType): number {
  const m: Record<FireExtinguisherType, number> = {
    abc_dry_chemical: 6, co2_gas: 7, water_mist: 8, kitchen_wet_chemical: 7, halon_clean_agent: 9,
  };
  return m[t];
}

export function cleanupEase(t: FireExtinguisherType): number {
  const m: Record<FireExtinguisherType, number> = {
    abc_dry_chemical: 2, co2_gas: 10, water_mist: 7, kitchen_wet_chemical: 4, halon_clean_agent: 10,
  };
  return m[t];
}

export function portability(t: FireExtinguisherType): number {
  const m: Record<FireExtinguisherType, number> = {
    abc_dry_chemical: 7, co2_gas: 4, water_mist: 8, kitchen_wet_chemical: 6, halon_clean_agent: 5,
  };
  return m[t];
}

export function extinguisherCost(t: FireExtinguisherType): number {
  const m: Record<FireExtinguisherType, number> = {
    abc_dry_chemical: 2, co2_gas: 5, water_mist: 4, kitchen_wet_chemical: 4, halon_clean_agent: 9,
  };
  return m[t];
}

export function rechargeable(t: FireExtinguisherType): boolean {
  const m: Record<FireExtinguisherType, boolean> = {
    abc_dry_chemical: true, co2_gas: true, water_mist: true, kitchen_wet_chemical: true, halon_clean_agent: true,
  };
  return m[t];
}

export function safeForElectronics(t: FireExtinguisherType): boolean {
  const m: Record<FireExtinguisherType, boolean> = {
    abc_dry_chemical: false, co2_gas: true, water_mist: false, kitchen_wet_chemical: false, halon_clean_agent: true,
  };
  return m[t];
}

export function agentType(t: FireExtinguisherType): string {
  const m: Record<FireExtinguisherType, string> = {
    abc_dry_chemical: "monoammonium_phosphate",
    co2_gas: "carbon_dioxide_gas",
    water_mist: "deionized_water_fine",
    kitchen_wet_chemical: "potassium_acetate_foam",
    halon_clean_agent: "hfc_227ea_clean_gas",
  };
  return m[t];
}

export function bestLocation(t: FireExtinguisherType): string {
  const m: Record<FireExtinguisherType, string> = {
    abc_dry_chemical: "home_garage_workshop",
    co2_gas: "server_room_lab",
    water_mist: "hospital_museum",
    kitchen_wet_chemical: "commercial_kitchen_fryer",
    halon_clean_agent: "aircraft_data_center",
  };
  return m[t];
}

export function fireExtinguishers(): FireExtinguisherType[] {
  return ["abc_dry_chemical", "co2_gas", "water_mist", "kitchen_wet_chemical", "halon_clean_agent"];
}
