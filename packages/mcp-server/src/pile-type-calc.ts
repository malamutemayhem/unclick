export type PileType = "driven_steel" | "driven_concrete" | "bored_cast" | "micropile" | "helical";

export function loadCapacity(p: PileType): number {
  const m: Record<PileType, number> = {
    driven_steel: 9, driven_concrete: 10, bored_cast: 10, micropile: 4, helical: 5,
  };
  return m[p];
}

export function installationSpeed(p: PileType): number {
  const m: Record<PileType, number> = {
    driven_steel: 8, driven_concrete: 7, bored_cast: 4, micropile: 6, helical: 9,
  };
  return m[p];
}

export function vibrationLevel(p: PileType): number {
  const m: Record<PileType, number> = {
    driven_steel: 9, driven_concrete: 10, bored_cast: 3, micropile: 2, helical: 1,
  };
  return m[p];
}

export function depthRange(p: PileType): number {
  const m: Record<PileType, number> = {
    driven_steel: 8, driven_concrete: 7, bored_cast: 10, micropile: 6, helical: 5,
  };
  return m[p];
}

export function materialCost(p: PileType): number {
  const m: Record<PileType, number> = {
    driven_steel: 7, driven_concrete: 5, bored_cast: 8, micropile: 9, helical: 6,
  };
  return m[p];
}

export function requiresCuring(p: PileType): boolean {
  const m: Record<PileType, boolean> = {
    driven_steel: false, driven_concrete: false, bored_cast: true, micropile: true, helical: false,
  };
  return m[p];
}

export function removable(p: PileType): boolean {
  const m: Record<PileType, boolean> = {
    driven_steel: false, driven_concrete: false, bored_cast: false, micropile: false, helical: true,
  };
  return m[p];
}

export function installMethod(p: PileType): string {
  const m: Record<PileType, string> = {
    driven_steel: "impact_vibratory_hammer", driven_concrete: "drop_diesel_hammer",
    bored_cast: "auger_drill_concrete_pour", micropile: "rotary_drill_grout_inject",
    helical: "torque_motor_screw_in",
  };
  return m[p];
}

export function bestApplication(p: PileType): string {
  const m: Record<PileType, string> = {
    driven_steel: "marine_bridge_heavy_load", driven_concrete: "building_foundation_standard",
    bored_cast: "high_rise_deep_bedrock", micropile: "underpinning_limited_access",
    helical: "light_structure_temporary",
  };
  return m[p];
}

export function pileTypes(): PileType[] {
  return ["driven_steel", "driven_concrete", "bored_cast", "micropile", "helical"];
}
