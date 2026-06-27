export type StratigraphicMethod = "biostratigraphy" | "lithostratigraphy" | "magnetostratigraphy" | "chemostratigraphy" | "sequence_stratigraphy";

export function temporalResolution(s: StratigraphicMethod): number {
  const m: Record<StratigraphicMethod, number> = {
    biostratigraphy: 7, lithostratigraphy: 4, magnetostratigraphy: 8,
    chemostratigraphy: 9, sequence_stratigraphy: 5,
  };
  return m[s];
}

export function globalCorrelation(s: StratigraphicMethod): number {
  const m: Record<StratigraphicMethod, number> = {
    biostratigraphy: 9, lithostratigraphy: 3, magnetostratigraphy: 10,
    chemostratigraphy: 8, sequence_stratigraphy: 7,
  };
  return m[s];
}

export function equipmentCost(s: StratigraphicMethod): number {
  const m: Record<StratigraphicMethod, number> = {
    biostratigraphy: 4, lithostratigraphy: 2, magnetostratigraphy: 8,
    chemostratigraphy: 9, sequence_stratigraphy: 6,
  };
  return m[s];
}

export function fieldAccessibility(s: StratigraphicMethod): number {
  const m: Record<StratigraphicMethod, number> = {
    biostratigraphy: 7, lithostratigraphy: 10, magnetostratigraphy: 4,
    chemostratigraphy: 3, sequence_stratigraphy: 8,
  };
  return m[s];
}

export function labWorkRequired(s: StratigraphicMethod): number {
  const m: Record<StratigraphicMethod, number> = {
    biostratigraphy: 6, lithostratigraphy: 2, magnetostratigraphy: 8,
    chemostratigraphy: 10, sequence_stratigraphy: 5,
  };
  return m[s];
}

export function requiresFossils(s: StratigraphicMethod): boolean {
  const m: Record<StratigraphicMethod, boolean> = {
    biostratigraphy: true, lithostratigraphy: false, magnetostratigraphy: false,
    chemostratigraphy: false, sequence_stratigraphy: false,
  };
  return m[s];
}

export function applicableToIgneous(s: StratigraphicMethod): boolean {
  const m: Record<StratigraphicMethod, boolean> = {
    biostratigraphy: false, lithostratigraphy: true, magnetostratigraphy: true,
    chemostratigraphy: true, sequence_stratigraphy: false,
  };
  return m[s];
}

export function primaryDataType(s: StratigraphicMethod): string {
  const m: Record<StratigraphicMethod, string> = {
    biostratigraphy: "index_fossil_assemblage", lithostratigraphy: "rock_unit_lithology",
    magnetostratigraphy: "paleomagnetic_polarity", chemostratigraphy: "isotope_ratio",
    sequence_stratigraphy: "seismic_depositional_pattern",
  };
  return m[s];
}

export function bestApplication(s: StratigraphicMethod): string {
  const m: Record<StratigraphicMethod, string> = {
    biostratigraphy: "marine_sediment_dating", lithostratigraphy: "field_mapping_basic",
    magnetostratigraphy: "deep_time_correlation", chemostratigraphy: "extinction_event_study",
    sequence_stratigraphy: "petroleum_exploration",
  };
  return m[s];
}

export function stratigraphicMethods(): StratigraphicMethod[] {
  return ["biostratigraphy", "lithostratigraphy", "magnetostratigraphy", "chemostratigraphy", "sequence_stratigraphy"];
}
