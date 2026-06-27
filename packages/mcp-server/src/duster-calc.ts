export type DusterType = "microfiber_bendable" | "lambswool_static" | "feather_ostrich" | "electrostatic_disposable" | "compressed_air_can";

export function dustCapture(t: DusterType): number {
  const m: Record<DusterType, number> = {
    microfiber_bendable: 9, lambswool_static: 8, feather_ostrich: 6, electrostatic_disposable: 7, compressed_air_can: 5,
  };
  return m[t];
}

export function reachability(t: DusterType): number {
  const m: Record<DusterType, number> = {
    microfiber_bendable: 10, lambswool_static: 7, feather_ostrich: 6, electrostatic_disposable: 8, compressed_air_can: 9,
  };
  return m[t];
}

export function gentleness(t: DusterType): number {
  const m: Record<DusterType, number> = {
    microfiber_bendable: 8, lambswool_static: 9, feather_ostrich: 10, electrostatic_disposable: 7, compressed_air_can: 6,
  };
  return m[t];
}

export function ecoFriendly(t: DusterType): number {
  const m: Record<DusterType, number> = {
    microfiber_bendable: 8, lambswool_static: 9, feather_ostrich: 7, electrostatic_disposable: 2, compressed_air_can: 1,
  };
  return m[t];
}

export function dusterCost(t: DusterType): number {
  const m: Record<DusterType, number> = {
    microfiber_bendable: 3, lambswool_static: 5, feather_ostrich: 6, electrostatic_disposable: 2, compressed_air_can: 4,
  };
  return m[t];
}

export function washable(t: DusterType): boolean {
  const m: Record<DusterType, boolean> = {
    microfiber_bendable: true, lambswool_static: false, feather_ostrich: false, electrostatic_disposable: false, compressed_air_can: false,
  };
  return m[t];
}

export function reusable(t: DusterType): boolean {
  const m: Record<DusterType, boolean> = {
    microfiber_bendable: true, lambswool_static: true, feather_ostrich: true, electrostatic_disposable: false, compressed_air_can: false,
  };
  return m[t];
}

export function dusterMaterial(t: DusterType): string {
  const m: Record<DusterType, string> = {
    microfiber_bendable: "split_fiber_polyester",
    lambswool_static: "natural_lanolin_wool",
    feather_ostrich: "genuine_ostrich_plume",
    electrostatic_disposable: "charged_poly_fiber_sheet",
    compressed_air_can: "hfc_propellant_gas",
  };
  return m[t];
}

export function bestTask(t: DusterType): string {
  const m: Record<DusterType, string> = {
    microfiber_bendable: "ceiling_fan_high_shelf",
    lambswool_static: "antique_furniture_delicate",
    feather_ostrich: "display_case_collectible",
    electrostatic_disposable: "quick_wipe_office_desk",
    compressed_air_can: "keyboard_electronics_vent",
  };
  return m[t];
}

export function dusters(): DusterType[] {
  return ["microfiber_bendable", "lambswool_static", "feather_ostrich", "electrostatic_disposable", "compressed_air_can"];
}
