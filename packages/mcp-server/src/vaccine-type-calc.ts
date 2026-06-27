export type VaccineType = "mrna" | "viral_vector" | "inactivated" | "live_attenuated" | "subunit";

export function developmentSpeedMonths(v: VaccineType): number {
  const m: Record<VaccineType, number> = {
    mrna: 6, viral_vector: 12, inactivated: 24, live_attenuated: 36, subunit: 18,
  };
  return m[v];
}

export function storageTemperatureC(v: VaccineType): number {
  const m: Record<VaccineType, number> = {
    mrna: -70, viral_vector: 4, inactivated: 4, live_attenuated: -20, subunit: 4,
  };
  return m[v];
}

export function immuneResponseStrength(v: VaccineType): number {
  const m: Record<VaccineType, number> = {
    mrna: 9, viral_vector: 8, inactivated: 5, live_attenuated: 10, subunit: 6,
  };
  return m[v];
}

export function safetyProfile(v: VaccineType): number {
  const m: Record<VaccineType, number> = {
    mrna: 8, viral_vector: 7, inactivated: 9, live_attenuated: 5, subunit: 10,
  };
  return m[v];
}

export function productionCost(v: VaccineType): number {
  const m: Record<VaccineType, number> = {
    mrna: 8, viral_vector: 7, inactivated: 4, live_attenuated: 5, subunit: 6,
  };
  return m[v];
}

export function requiresColdChain(v: VaccineType): boolean {
  const m: Record<VaccineType, boolean> = {
    mrna: true, viral_vector: true, inactivated: true, live_attenuated: true, subunit: true,
  };
  return m[v];
}

export function containsLivePathogen(v: VaccineType): boolean {
  const m: Record<VaccineType, boolean> = {
    mrna: false, viral_vector: false, inactivated: false, live_attenuated: true, subunit: false,
  };
  return m[v];
}

export function mechanismOfAction(v: VaccineType): string {
  const m: Record<VaccineType, string> = {
    mrna: "protein_blueprint", viral_vector: "harmless_virus_carrier",
    inactivated: "killed_pathogen", live_attenuated: "weakened_pathogen",
    subunit: "protein_fragment",
  };
  return m[v];
}

export function exampleDisease(v: VaccineType): string {
  const m: Record<VaccineType, string> = {
    mrna: "covid_19", viral_vector: "ebola", inactivated: "influenza",
    live_attenuated: "measles", subunit: "hepatitis_b",
  };
  return m[v];
}

export function vaccineTypes(): VaccineType[] {
  return ["mrna", "viral_vector", "inactivated", "live_attenuated", "subunit"];
}
