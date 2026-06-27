export type SolarPanelType = "monocrystalline" | "polycrystalline" | "thin_film" | "bifacial" | "concentrated";

export function efficiencyPercent(panel: SolarPanelType): number {
  const m: Record<SolarPanelType, number> = {
    monocrystalline: 22, polycrystalline: 17, thin_film: 12, bifacial: 25, concentrated: 30,
  };
  return m[panel];
}

export function costPerWatt(panel: SolarPanelType): number {
  const m: Record<SolarPanelType, number> = {
    monocrystalline: 3, polycrystalline: 2, thin_film: 1, bifacial: 4, concentrated: 5,
  };
  return m[panel];
}

export function lifespanYears(panel: SolarPanelType): number {
  const m: Record<SolarPanelType, number> = {
    monocrystalline: 30, polycrystalline: 25, thin_film: 20, bifacial: 30, concentrated: 25,
  };
  return m[panel];
}

export function weightPerM2(panel: SolarPanelType): number {
  const m: Record<SolarPanelType, number> = {
    monocrystalline: 12, polycrystalline: 12, thin_film: 5, bifacial: 14, concentrated: 20,
  };
  return m[panel];
}

export function temperatureTolerance(panel: SolarPanelType): number {
  const m: Record<SolarPanelType, number> = {
    monocrystalline: 6, polycrystalline: 5, thin_film: 9, bifacial: 7, concentrated: 4,
  };
  return m[panel];
}

export function flexible(panel: SolarPanelType): boolean {
  const m: Record<SolarPanelType, boolean> = {
    monocrystalline: false, polycrystalline: false, thin_film: true, bifacial: false, concentrated: false,
  };
  return m[panel];
}

export function trackingRequired(panel: SolarPanelType): boolean {
  const m: Record<SolarPanelType, boolean> = {
    monocrystalline: false, polycrystalline: false, thin_film: false, bifacial: false, concentrated: true,
  };
  return m[panel];
}

export function bestApplication(panel: SolarPanelType): string {
  const m: Record<SolarPanelType, string> = {
    monocrystalline: "residential", polycrystalline: "commercial", thin_film: "portable",
    bifacial: "solar_farm", concentrated: "utility_scale",
  };
  return m[panel];
}

export function degradationRatePerYear(panel: SolarPanelType): number {
  const m: Record<SolarPanelType, number> = {
    monocrystalline: 0.5, polycrystalline: 0.7, thin_film: 1.0, bifacial: 0.4, concentrated: 0.6,
  };
  return m[panel];
}

export function solarPanelTypes(): SolarPanelType[] {
  return ["monocrystalline", "polycrystalline", "thin_film", "bifacial", "concentrated"];
}
