export type Anemometer = "cup" | "vane" | "ultrasonic" | "hot_wire" | "pitot_tube";

export function windSpeedAccuracy(a: Anemometer): number {
  const m: Record<Anemometer, number> = {
    cup: 7, vane: 6, ultrasonic: 10, hot_wire: 9, pitot_tube: 5,
  };
  return m[a];
}

export function responseTime(a: Anemometer): number {
  const m: Record<Anemometer, number> = {
    cup: 4, vane: 5, ultrasonic: 10, hot_wire: 10, pitot_tube: 3,
  };
  return m[a];
}

export function durability(a: Anemometer): number {
  const m: Record<Anemometer, number> = {
    cup: 8, vane: 7, ultrasonic: 9, hot_wire: 3, pitot_tube: 6,
  };
  return m[a];
}

export function maintenanceNeed(a: Anemometer): number {
  const m: Record<Anemometer, number> = {
    cup: 5, vane: 6, ultrasonic: 2, hot_wire: 8, pitot_tube: 4,
  };
  return m[a];
}

export function instrumentCost(a: Anemometer): number {
  const m: Record<Anemometer, number> = {
    cup: 3, vane: 4, ultrasonic: 9, hot_wire: 7, pitot_tube: 5,
  };
  return m[a];
}

export function hasMovingParts(a: Anemometer): boolean {
  const m: Record<Anemometer, boolean> = {
    cup: true, vane: true, ultrasonic: false, hot_wire: false, pitot_tube: false,
  };
  return m[a];
}

export function measuresDirection(a: Anemometer): boolean {
  const m: Record<Anemometer, boolean> = {
    cup: false, vane: true, ultrasonic: true, hot_wire: false, pitot_tube: false,
  };
  return m[a];
}

export function sensingMethod(a: Anemometer): string {
  const m: Record<Anemometer, string> = {
    cup: "rotating_cup_pulse_count", vane: "wind_vane_propeller_rotation",
    ultrasonic: "transit_time_sound_pulse", hot_wire: "cooling_rate_heated_element",
    pitot_tube: "dynamic_pressure_differential",
  };
  return m[a];
}

export function bestApplication(a: Anemometer): string {
  const m: Record<Anemometer, string> = {
    cup: "weather_station_general", vane: "airport_wind_direction",
    ultrasonic: "research_turbulence_3d", hot_wire: "hvac_lab_low_velocity",
    pitot_tube: "aircraft_airspeed_duct",
  };
  return m[a];
}

export function anemometers(): Anemometer[] {
  return ["cup", "vane", "ultrasonic", "hot_wire", "pitot_tube"];
}
