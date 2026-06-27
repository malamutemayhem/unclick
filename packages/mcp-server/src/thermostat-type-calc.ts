export type ThermostatType = "manual" | "programmable" | "smart" | "line_voltage" | "communicating";

export function energySavings(t: ThermostatType): number {
  const m: Record<ThermostatType, number> = {
    manual: 2, programmable: 6, smart: 10, line_voltage: 3, communicating: 8,
  };
  return m[t];
}

export function installComplexity(t: ThermostatType): number {
  const m: Record<ThermostatType, number> = {
    manual: 2, programmable: 4, smart: 6, line_voltage: 7, communicating: 9,
  };
  return m[t];
}

export function userConvenience(t: ThermostatType): number {
  const m: Record<ThermostatType, number> = {
    manual: 3, programmable: 6, smart: 10, line_voltage: 2, communicating: 8,
  };
  return m[t];
}

export function purchaseCost(t: ThermostatType): number {
  const m: Record<ThermostatType, number> = {
    manual: 2, programmable: 4, smart: 8, line_voltage: 3, communicating: 9,
  };
  return m[t];
}

export function diagnosticCapability(t: ThermostatType): number {
  const m: Record<ThermostatType, number> = {
    manual: 1, programmable: 2, smart: 7, line_voltage: 1, communicating: 10,
  };
  return m[t];
}

export function wifiConnected(t: ThermostatType): boolean {
  const m: Record<ThermostatType, boolean> = {
    manual: false, programmable: false, smart: true, line_voltage: false, communicating: true,
  };
  return m[t];
}

export function learningCapable(t: ThermostatType): boolean {
  const m: Record<ThermostatType, boolean> = {
    manual: false, programmable: false, smart: true, line_voltage: false, communicating: false,
  };
  return m[t];
}

export function compatibleSystem(t: ThermostatType): string {
  const m: Record<ThermostatType, string> = {
    manual: "any_24v_system", programmable: "forced_air_heat_pump",
    smart: "most_24v_systems", line_voltage: "baseboard_electric",
    communicating: "matched_brand_equipment",
  };
  return m[t];
}

export function controlMethod(t: ThermostatType): string {
  const m: Record<ThermostatType, string> = {
    manual: "mechanical_dial", programmable: "time_schedule",
    smart: "ai_occupancy_sensor", line_voltage: "direct_relay",
    communicating: "digital_serial_bus",
  };
  return m[t];
}

export function thermostatTypes(): ThermostatType[] {
  return ["manual", "programmable", "smart", "line_voltage", "communicating"];
}
