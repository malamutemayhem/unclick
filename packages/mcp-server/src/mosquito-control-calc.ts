export type MosquitoControl = "larvicide" | "adulticide_spray" | "misting_system" | "mosquito_trap" | "biological_fish";

export function populationReduction(mc: MosquitoControl): number {
  const m: Record<MosquitoControl, number> = {
    larvicide: 8, adulticide_spray: 9, misting_system: 7, mosquito_trap: 5, biological_fish: 6,
  };
  return m[mc];
}

export function durationOfEffect(mc: MosquitoControl): number {
  const m: Record<MosquitoControl, number> = {
    larvicide: 7, adulticide_spray: 2, misting_system: 6, mosquito_trap: 8, biological_fish: 10,
  };
  return m[mc];
}

export function areaOfCoverage(mc: MosquitoControl): number {
  const m: Record<MosquitoControl, number> = {
    larvicide: 7, adulticide_spray: 10, misting_system: 5, mosquito_trap: 3, biological_fish: 4,
  };
  return m[mc];
}

export function environmentalSafety(mc: MosquitoControl): number {
  const m: Record<MosquitoControl, number> = {
    larvicide: 6, adulticide_spray: 3, misting_system: 4, mosquito_trap: 9, biological_fish: 10,
  };
  return m[mc];
}

export function operatingCost(mc: MosquitoControl): number {
  const m: Record<MosquitoControl, number> = {
    larvicide: 4, adulticide_spray: 7, misting_system: 8, mosquito_trap: 5, biological_fish: 2,
  };
  return m[mc];
}

export function requiresLicense(mc: MosquitoControl): boolean {
  const m: Record<MosquitoControl, boolean> = {
    larvicide: true, adulticide_spray: true, misting_system: true, mosquito_trap: false, biological_fish: false,
  };
  return m[mc];
}

export function chemicalFree(mc: MosquitoControl): boolean {
  const m: Record<MosquitoControl, boolean> = {
    larvicide: false, adulticide_spray: false, misting_system: false, mosquito_trap: true, biological_fish: true,
  };
  return m[mc];
}

export function deliveryMethod(mc: MosquitoControl): string {
  const m: Record<MosquitoControl, string> = {
    larvicide: "granule_briquette_water_source", adulticide_spray: "truck_mounted_ulv_fogger",
    misting_system: "automated_nozzle_perimeter", mosquito_trap: "co2_uv_attractant_fan",
    biological_fish: "gambusia_pond_stocking",
  };
  return m[mc];
}

export function bestScenario(mc: MosquitoControl): string {
  const m: Record<MosquitoControl, string> = {
    larvicide: "standing_water_breeding_site", adulticide_spray: "emergency_outbreak_wide_area",
    misting_system: "residential_yard_patio", mosquito_trap: "backyard_chemical_sensitive",
    biological_fish: "ornamental_pond_wetland",
  };
  return m[mc];
}

export function mosquitoControls(): MosquitoControl[] {
  return ["larvicide", "adulticide_spray", "misting_system", "mosquito_trap", "biological_fish"];
}
