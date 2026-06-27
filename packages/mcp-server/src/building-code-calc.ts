export type BuildingCode = "ibc" | "nfpa" | "eurocode" | "ncc_australia" | "nbc_canada";

export function scopeCountries(b: BuildingCode): number {
  const m: Record<BuildingCode, number> = {
    ibc: 50, nfpa: 30, eurocode: 34, ncc_australia: 1, nbc_canada: 1,
  };
  return m[b];
}

export function updateCycleYears(b: BuildingCode): number {
  const m: Record<BuildingCode, number> = {
    ibc: 3, nfpa: 3, eurocode: 5, ncc_australia: 3, nbc_canada: 5,
  };
  return m[b];
}

export function seismicProvisions(b: BuildingCode): number {
  const m: Record<BuildingCode, number> = {
    ibc: 9, nfpa: 7, eurocode: 8, ncc_australia: 5, nbc_canada: 9,
  };
  return m[b];
}

export function fireProtectionDepth(b: BuildingCode): number {
  const m: Record<BuildingCode, number> = {
    ibc: 8, nfpa: 10, eurocode: 7, ncc_australia: 8, nbc_canada: 7,
  };
  return m[b];
}

export function accessibilityRequirements(b: BuildingCode): number {
  const m: Record<BuildingCode, number> = {
    ibc: 9, nfpa: 6, eurocode: 7, ncc_australia: 8, nbc_canada: 8,
  };
  return m[b];
}

export function performanceBased(b: BuildingCode): boolean {
  const m: Record<BuildingCode, boolean> = {
    ibc: false, nfpa: false, eurocode: true, ncc_australia: true, nbc_canada: false,
  };
  return m[b];
}

export function mandatoryAdoption(b: BuildingCode): boolean {
  const m: Record<BuildingCode, boolean> = {
    ibc: false, nfpa: false, eurocode: true, ncc_australia: true, nbc_canada: true,
  };
  return m[b];
}

export function publishingBody(b: BuildingCode): string {
  const m: Record<BuildingCode, string> = {
    ibc: "icc", nfpa: "nfpa_organization", eurocode: "cen",
    ncc_australia: "abcb", nbc_canada: "nrc",
  };
  return m[b];
}

export function primaryFocus(b: BuildingCode): string {
  const m: Record<BuildingCode, string> = {
    ibc: "general_building", nfpa: "fire_safety", eurocode: "structural_design",
    ncc_australia: "performance_solutions", nbc_canada: "health_safety",
  };
  return m[b];
}

export function buildingCodes(): BuildingCode[] {
  return ["ibc", "nfpa", "eurocode", "ncc_australia", "nbc_canada"];
}
