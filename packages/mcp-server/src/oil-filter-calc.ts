export type OilFilterType = "spin_on_standard" | "cartridge_eco_element" | "magnetic_trap_reusable" | "bypass_secondary" | "high_performance_synthetic";

export function filtrationQuality(t: OilFilterType): number {
  const m: Record<OilFilterType, number> = {
    spin_on_standard: 6, cartridge_eco_element: 7, magnetic_trap_reusable: 5, bypass_secondary: 9, high_performance_synthetic: 10,
  };
  return m[t];
}

export function flowRate(t: OilFilterType): number {
  const m: Record<OilFilterType, number> = {
    spin_on_standard: 8, cartridge_eco_element: 7, magnetic_trap_reusable: 10, bypass_secondary: 4, high_performance_synthetic: 9,
  };
  return m[t];
}

export function changeEase(t: OilFilterType): number {
  const m: Record<OilFilterType, number> = {
    spin_on_standard: 9, cartridge_eco_element: 7, magnetic_trap_reusable: 6, bypass_secondary: 4, high_performance_synthetic: 8,
  };
  return m[t];
}

export function longevity(t: OilFilterType): number {
  const m: Record<OilFilterType, number> = {
    spin_on_standard: 5, cartridge_eco_element: 6, magnetic_trap_reusable: 10, bypass_secondary: 8, high_performance_synthetic: 9,
  };
  return m[t];
}

export function filterCost(t: OilFilterType): number {
  const m: Record<OilFilterType, number> = {
    spin_on_standard: 3, cartridge_eco_element: 5, magnetic_trap_reusable: 8, bypass_secondary: 7, high_performance_synthetic: 9,
  };
  return m[t];
}

export function reusable(t: OilFilterType): boolean {
  const m: Record<OilFilterType, boolean> = {
    spin_on_standard: false, cartridge_eco_element: false, magnetic_trap_reusable: true, bypass_secondary: false, high_performance_synthetic: false,
  };
  return m[t];
}

export function syntheticRated(t: OilFilterType): boolean {
  const m: Record<OilFilterType, boolean> = {
    spin_on_standard: false, cartridge_eco_element: true, magnetic_trap_reusable: true, bypass_secondary: true, high_performance_synthetic: true,
  };
  return m[t];
}

export function mediaType(t: OilFilterType): string {
  const m: Record<OilFilterType, string> = {
    spin_on_standard: "cellulose_paper_pleated",
    cartridge_eco_element: "synthetic_blend_element",
    magnetic_trap_reusable: "neodymium_magnet_screen",
    bypass_secondary: "cotton_gauze_micro_pore",
    high_performance_synthetic: "nanofiber_synthetic_media",
  };
  return m[t];
}

export function bestEngine(t: OilFilterType): string {
  const m: Record<OilFilterType, string> = {
    spin_on_standard: "daily_commuter_sedan",
    cartridge_eco_element: "european_cartridge_design",
    magnetic_trap_reusable: "off_road_heavy_use",
    bypass_secondary: "diesel_fleet_extended",
    high_performance_synthetic: "turbo_sport_track",
  };
  return m[t];
}

export function oilFilters(): OilFilterType[] {
  return ["spin_on_standard", "cartridge_eco_element", "magnetic_trap_reusable", "bypass_secondary", "high_performance_synthetic"];
}
