export type JumpStarterType = "lithium_compact" | "lead_acid_heavy" | "ultracapacitor" | "solar_trickle" | "combo_air_compressor";

export function peakAmps(t: JumpStarterType): number {
  const m: Record<JumpStarterType, number> = {
    lithium_compact: 7, lead_acid_heavy: 9, ultracapacitor: 10, solar_trickle: 2, combo_air_compressor: 6,
  };
  return m[t];
}

export function portability(t: JumpStarterType): number {
  const m: Record<JumpStarterType, number> = {
    lithium_compact: 10, lead_acid_heavy: 3, ultracapacitor: 7, solar_trickle: 8, combo_air_compressor: 5,
  };
  return m[t];
}

export function chargeRetention(t: JumpStarterType): number {
  const m: Record<JumpStarterType, number> = {
    lithium_compact: 8, lead_acid_heavy: 4, ultracapacitor: 3, solar_trickle: 9, combo_air_compressor: 7,
  };
  return m[t];
}

export function coldWeather(t: JumpStarterType): number {
  const m: Record<JumpStarterType, number> = {
    lithium_compact: 6, lead_acid_heavy: 8, ultracapacitor: 10, solar_trickle: 3, combo_air_compressor: 6,
  };
  return m[t];
}

export function starterCost(t: JumpStarterType): number {
  const m: Record<JumpStarterType, number> = {
    lithium_compact: 6, lead_acid_heavy: 5, ultracapacitor: 9, solar_trickle: 4, combo_air_compressor: 7,
  };
  return m[t];
}

export function usbCharging(t: JumpStarterType): boolean {
  const m: Record<JumpStarterType, boolean> = {
    lithium_compact: true, lead_acid_heavy: false, ultracapacitor: true, solar_trickle: true, combo_air_compressor: true,
  };
  return m[t];
}

export function noPreCharge(t: JumpStarterType): boolean {
  const m: Record<JumpStarterType, boolean> = {
    lithium_compact: false, lead_acid_heavy: false, ultracapacitor: true, solar_trickle: false, combo_air_compressor: false,
  };
  return m[t];
}

export function batteryType(t: JumpStarterType): string {
  const m: Record<JumpStarterType, string> = {
    lithium_compact: "lithium_iron_phosphate",
    lead_acid_heavy: "sealed_lead_acid_agm",
    ultracapacitor: "supercapacitor_bank",
    solar_trickle: "mono_panel_lithium",
    combo_air_compressor: "lithium_polymer_pack",
  };
  return m[t];
}

export function bestScenario(t: JumpStarterType): string {
  const m: Record<JumpStarterType, string> = {
    lithium_compact: "glove_box_emergency",
    lead_acid_heavy: "garage_truck_diesel",
    ultracapacitor: "fleet_dead_battery_cold",
    solar_trickle: "long_term_storage_maintain",
    combo_air_compressor: "roadside_tire_battery_kit",
  };
  return m[t];
}

export function jumpStarters(): JumpStarterType[] {
  return ["lithium_compact", "lead_acid_heavy", "ultracapacitor", "solar_trickle", "combo_air_compressor"];
}
