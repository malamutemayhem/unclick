export type CleanroomClass = "iso_1" | "iso_5" | "iso_7" | "iso_8" | "non_classified";

export function particleLimit(c: CleanroomClass): number {
  const m: Record<CleanroomClass, number> = {
    iso_1: 10, iso_5: 8, iso_7: 5, iso_8: 3, non_classified: 1,
  };
  return m[c];
}

export function airChangesPerHour(c: CleanroomClass): number {
  const m: Record<CleanroomClass, number> = {
    iso_1: 10, iso_5: 8, iso_7: 6, iso_8: 4, non_classified: 2,
  };
  return m[c];
}

export function constructionCost(c: CleanroomClass): number {
  const m: Record<CleanroomClass, number> = {
    iso_1: 10, iso_5: 8, iso_7: 5, iso_8: 3, non_classified: 1,
  };
  return m[c];
}

export function gowningRequirement(c: CleanroomClass): number {
  const m: Record<CleanroomClass, number> = {
    iso_1: 10, iso_5: 8, iso_7: 5, iso_8: 3, non_classified: 1,
  };
  return m[c];
}

export function operatingEnergy(c: CleanroomClass): number {
  const m: Record<CleanroomClass, number> = {
    iso_1: 10, iso_5: 8, iso_7: 5, iso_8: 3, non_classified: 1,
  };
  return m[c];
}

export function requiresLaminarFlow(c: CleanroomClass): boolean {
  const m: Record<CleanroomClass, boolean> = {
    iso_1: true, iso_5: true, iso_7: false, iso_8: false, non_classified: false,
  };
  return m[c];
}

export function requiresAirShower(c: CleanroomClass): boolean {
  const m: Record<CleanroomClass, boolean> = {
    iso_1: true, iso_5: true, iso_7: true, iso_8: false, non_classified: false,
  };
  return m[c];
}

export function filtrationLevel(c: CleanroomClass): string {
  const m: Record<CleanroomClass, string> = {
    iso_1: "ulpa_99_9995", iso_5: "hepa_99_99",
    iso_7: "hepa_99_97", iso_8: "hepa_standard",
    non_classified: "standard_hvac_filter",
  };
  return m[c];
}

export function typicalIndustry(c: CleanroomClass): string {
  const m: Record<CleanroomClass, string> = {
    iso_1: "semiconductor_nanofab", iso_5: "pharmaceutical_sterile",
    iso_7: "medical_device_assembly", iso_8: "general_electronics",
    non_classified: "packaging_warehouse",
  };
  return m[c];
}

export function cleanroomClasses(): CleanroomClass[] {
  return ["iso_1", "iso_5", "iso_7", "iso_8", "non_classified"];
}
