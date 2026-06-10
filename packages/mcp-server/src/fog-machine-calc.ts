export type FogMachine = "heated_fog" | "hazer" | "cracker" | "low_fog" | "ultrasonic";

export function fogDensity(f: FogMachine): number {
  const m: Record<FogMachine, number> = {
    heated_fog: 10, hazer: 3, cracker: 7, low_fog: 8, ultrasonic: 4,
  };
  return m[f];
}

export function hangTime(f: FogMachine): number {
  const m: Record<FogMachine, number> = {
    heated_fog: 6, hazer: 10, cracker: 5, low_fog: 3, ultrasonic: 8,
  };
  return m[f];
}

export function fluidConsumption(f: FogMachine): number {
  const m: Record<FogMachine, number> = {
    heated_fog: 8, hazer: 3, cracker: 6, low_fog: 7, ultrasonic: 2,
  };
  return m[f];
}

export function noiseLevel(f: FogMachine): number {
  const m: Record<FogMachine, number> = {
    heated_fog: 5, hazer: 2, cracker: 7, low_fog: 6, ultrasonic: 1,
  };
  return m[f];
}

export function machineCost(f: FogMachine): number {
  const m: Record<FogMachine, number> = {
    heated_fog: 4, hazer: 7, cracker: 8, low_fog: 9, ultrasonic: 6,
  };
  return m[f];
}

export function requiresCO2(f: FogMachine): boolean {
  const m: Record<FogMachine, boolean> = {
    heated_fog: false, hazer: false, cracker: true, low_fog: true, ultrasonic: false,
  };
  return m[f];
}

export function staysLow(f: FogMachine): boolean {
  const m: Record<FogMachine, boolean> = {
    heated_fog: false, hazer: false, cracker: false, low_fog: true, ultrasonic: false,
  };
  return m[f];
}

export function generationMethod(f: FogMachine): string {
  const m: Record<FogMachine, string> = {
    heated_fog: "glycol_heat_exchanger_burst", hazer: "oil_glycol_fan_dispersal",
    cracker: "co2_liquid_to_gas_expansion", low_fog: "co2_or_dry_ice_chilling",
    ultrasonic: "piezoelectric_water_mist",
  };
  return m[f];
}

export function bestVenue(f: FogMachine): string {
  const m: Record<FogMachine, string> = {
    heated_fog: "concert_club_dramatic", hazer: "theater_broadcast_subtle",
    cracker: "outdoor_festival_burst", low_fog: "wedding_dance_floor",
    ultrasonic: "small_venue_quiet_mist",
  };
  return m[f];
}

export function fogMachines(): FogMachine[] {
  return ["heated_fog", "hazer", "cracker", "low_fog", "ultrasonic"];
}
