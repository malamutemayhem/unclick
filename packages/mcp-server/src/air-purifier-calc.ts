export type AirPurifier = "hepa_filter" | "activated_carbon" | "uv_germicidal" | "ionizer" | "photocatalytic";

export function particleRemoval(p: AirPurifier): number {
  const m: Record<AirPurifier, number> = {
    hepa_filter: 10, activated_carbon: 3, uv_germicidal: 2, ionizer: 6, photocatalytic: 5,
  };
  return m[p];
}

export function gasRemoval(p: AirPurifier): number {
  const m: Record<AirPurifier, number> = {
    hepa_filter: 2, activated_carbon: 10, uv_germicidal: 3, ionizer: 2, photocatalytic: 7,
  };
  return m[p];
}

export function germKilling(p: AirPurifier): number {
  const m: Record<AirPurifier, number> = {
    hepa_filter: 4, activated_carbon: 1, uv_germicidal: 10, ionizer: 5, photocatalytic: 8,
  };
  return m[p];
}

export function operatingCost(p: AirPurifier): number {
  const m: Record<AirPurifier, number> = {
    hepa_filter: 7, activated_carbon: 6, uv_germicidal: 4, ionizer: 3, photocatalytic: 5,
  };
  return m[p];
}

export function noiseLevelScore(p: AirPurifier): number {
  const m: Record<AirPurifier, number> = {
    hepa_filter: 7, activated_carbon: 6, uv_germicidal: 2, ionizer: 1, photocatalytic: 3,
  };
  return m[p];
}

export function filterReplacement(p: AirPurifier): boolean {
  const m: Record<AirPurifier, boolean> = {
    hepa_filter: true, activated_carbon: true, uv_germicidal: false, ionizer: false, photocatalytic: false,
  };
  return m[p];
}

export function producesOzone(p: AirPurifier): boolean {
  const m: Record<AirPurifier, boolean> = {
    hepa_filter: false, activated_carbon: false, uv_germicidal: true, ionizer: true, photocatalytic: false,
  };
  return m[p];
}

export function primaryTarget(p: AirPurifier): string {
  const m: Record<AirPurifier, string> = {
    hepa_filter: "dust_pollen_dander", activated_carbon: "voc_odor_smoke",
    uv_germicidal: "bacteria_virus_mold", ionizer: "airborne_particle_static",
    photocatalytic: "voc_pathogen_combined",
  };
  return m[p];
}

export function bestEnvironment(p: AirPurifier): string {
  const m: Record<AirPurifier, string> = {
    hepa_filter: "allergy_asthma_home", activated_carbon: "smoke_chemical_exposure",
    uv_germicidal: "medical_facility_lab", ionizer: "small_room_personal",
    photocatalytic: "commercial_industrial",
  };
  return m[p];
}

export function airPurifiers(): AirPurifier[] {
  return ["hepa_filter", "activated_carbon", "uv_germicidal", "ionizer", "photocatalytic"];
}
