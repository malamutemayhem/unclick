export type SnowSafetyGear = "beacon" | "probe" | "shovel" | "airbag_pack" | "avalung";

export function survivalImpact(g: SnowSafetyGear): number {
  const m: Record<SnowSafetyGear, number> = {
    beacon: 10, probe: 7, shovel: 8, airbag_pack: 9, avalung: 6,
  };
  return m[g];
}

export function weightGrams(g: SnowSafetyGear): number {
  const m: Record<SnowSafetyGear, number> = {
    beacon: 2, probe: 3, shovel: 4, airbag_pack: 10, avalung: 3,
  };
  return m[g];
}

export function costUsd(g: SnowSafetyGear): number {
  const m: Record<SnowSafetyGear, number> = {
    beacon: 7, probe: 2, shovel: 3, airbag_pack: 10, avalung: 4,
  };
  return m[g];
}

export function trainingRequired(g: SnowSafetyGear): number {
  const m: Record<SnowSafetyGear, number> = {
    beacon: 8, probe: 5, shovel: 3, airbag_pack: 4, avalung: 6,
  };
  return m[g];
}

export function reliabilityScore(g: SnowSafetyGear): number {
  const m: Record<SnowSafetyGear, number> = {
    beacon: 9, probe: 10, shovel: 10, airbag_pack: 8, avalung: 7,
  };
  return m[g];
}

export function requiresBattery(g: SnowSafetyGear): boolean {
  const m: Record<SnowSafetyGear, boolean> = {
    beacon: true, probe: false, shovel: false, airbag_pack: false, avalung: false,
  };
  return m[g];
}

export function preventsBurial(g: SnowSafetyGear): boolean {
  const m: Record<SnowSafetyGear, boolean> = {
    beacon: false, probe: false, shovel: false, airbag_pack: true, avalung: false,
  };
  return m[g];
}

export function rescuePhase(g: SnowSafetyGear): string {
  const m: Record<SnowSafetyGear, string> = {
    beacon: "electronic_signal_search", probe: "pinpoint_burial_depth",
    shovel: "strategic_excavation", airbag_pack: "flotation_prevention",
    avalung: "breathing_air_pocket",
  };
  return m[g];
}

export function bestScenario(g: SnowSafetyGear): string {
  const m: Record<SnowSafetyGear, string> = {
    beacon: "all_backcountry_travel", probe: "companion_rescue_locate",
    shovel: "companion_rescue_dig", airbag_pack: "high_consequence_terrain",
    avalung: "solo_steep_skiing",
  };
  return m[g];
}

export function snowSafetyGears(): SnowSafetyGear[] {
  return ["beacon", "probe", "shovel", "airbag_pack", "avalung"];
}
