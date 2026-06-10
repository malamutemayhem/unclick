export type SmartSprinkler = "zone_controller" | "drip_smart" | "pop_up_rotor" | "micro_spray" | "weather_adaptive";

export function waterEfficiency(s: SmartSprinkler): number {
  const m: Record<SmartSprinkler, number> = {
    zone_controller: 7, drip_smart: 10, pop_up_rotor: 5, micro_spray: 8, weather_adaptive: 9,
  };
  return m[s];
}

export function coverageArea(s: SmartSprinkler): number {
  const m: Record<SmartSprinkler, number> = {
    zone_controller: 9, drip_smart: 3, pop_up_rotor: 10, micro_spray: 5, weather_adaptive: 8,
  };
  return m[s];
}

export function installComplexity(s: SmartSprinkler): number {
  const m: Record<SmartSprinkler, number> = {
    zone_controller: 7, drip_smart: 4, pop_up_rotor: 8, micro_spray: 5, weather_adaptive: 6,
  };
  return m[s];
}

export function maintenanceNeed(s: SmartSprinkler): number {
  const m: Record<SmartSprinkler, number> = {
    zone_controller: 5, drip_smart: 7, pop_up_rotor: 6, micro_spray: 8, weather_adaptive: 4,
  };
  return m[s];
}

export function systemCost(s: SmartSprinkler): number {
  const m: Record<SmartSprinkler, number> = {
    zone_controller: 6, drip_smart: 4, pop_up_rotor: 7, micro_spray: 5, weather_adaptive: 9,
  };
  return m[s];
}

export function hasWeatherSensor(s: SmartSprinkler): boolean {
  const m: Record<SmartSprinkler, boolean> = {
    zone_controller: false, drip_smart: false, pop_up_rotor: false, micro_spray: false, weather_adaptive: true,
  };
  return m[s];
}

export function undergroundPiping(s: SmartSprinkler): boolean {
  const m: Record<SmartSprinkler, boolean> = {
    zone_controller: true, drip_smart: false, pop_up_rotor: true, micro_spray: false, weather_adaptive: true,
  };
  return m[s];
}

export function waterDelivery(s: SmartSprinkler): string {
  const m: Record<SmartSprinkler, string> = {
    zone_controller: "multi_valve_timed_schedule", drip_smart: "slow_emitter_root_zone",
    pop_up_rotor: "rotating_stream_broadcast", micro_spray: "fine_mist_targeted_bed",
    weather_adaptive: "et_adjusted_soil_moisture",
  };
  return m[s];
}

export function bestApplication(s: SmartSprinkler): string {
  const m: Record<SmartSprinkler, string> = {
    zone_controller: "large_lawn_multi_zone", drip_smart: "garden_bed_individual_plant",
    pop_up_rotor: "sports_field_open_turf", micro_spray: "greenhouse_raised_bed",
    weather_adaptive: "drought_region_conservation",
  };
  return m[s];
}

export function smartSprinklers(): SmartSprinkler[] {
  return ["zone_controller", "drip_smart", "pop_up_rotor", "micro_spray", "weather_adaptive"];
}
