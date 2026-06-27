export type AvionicsSystem = "efis" | "fms" | "tcas" | "weather_radar" | "autopilot";

export function safetyContribution(a: AvionicsSystem): number {
  const m: Record<AvionicsSystem, number> = {
    efis: 7, fms: 6, tcas: 10, weather_radar: 8, autopilot: 9,
  };
  return m[a];
}

export function complexity(a: AvionicsSystem): number {
  const m: Record<AvionicsSystem, number> = {
    efis: 6, fms: 9, tcas: 8, weather_radar: 7, autopilot: 10,
  };
  return m[a];
}

export function maintenanceCost(a: AvionicsSystem): number {
  const m: Record<AvionicsSystem, number> = {
    efis: 5, fms: 7, tcas: 6, weather_radar: 8, autopilot: 9,
  };
  return m[a];
}

export function weightKg(a: AvionicsSystem): number {
  const m: Record<AvionicsSystem, number> = {
    efis: 15, fms: 10, tcas: 12, weather_radar: 25, autopilot: 20,
  };
  return m[a];
}

export function pilotReliance(a: AvionicsSystem): number {
  const m: Record<AvionicsSystem, number> = {
    efis: 9, fms: 8, tcas: 7, weather_radar: 6, autopilot: 10,
  };
  return m[a];
}

export function mandatoryForAirline(a: AvionicsSystem): boolean {
  const m: Record<AvionicsSystem, boolean> = {
    efis: false, fms: false, tcas: true, weather_radar: true, autopilot: false,
  };
  return m[a];
}

export function displaysToPilot(a: AvionicsSystem): boolean {
  const m: Record<AvionicsSystem, boolean> = {
    efis: true, fms: true, tcas: true, weather_radar: true, autopilot: false,
  };
  return m[a];
}

export function primaryFunction(a: AvionicsSystem): string {
  const m: Record<AvionicsSystem, string> = {
    efis: "flight_instrument_display", fms: "route_management",
    tcas: "collision_avoidance", weather_radar: "storm_detection",
    autopilot: "automated_flight_control",
  };
  return m[a];
}

export function integrationLevel(a: AvionicsSystem): string {
  const m: Record<AvionicsSystem, string> = {
    efis: "display_hub", fms: "navigation_core",
    tcas: "standalone_warning", weather_radar: "sensor_feed",
    autopilot: "flight_control_bus",
  };
  return m[a];
}

export function avionicsSystems(): AvionicsSystem[] {
  return ["efis", "fms", "tcas", "weather_radar", "autopilot"];
}
