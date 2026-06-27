export type DisplayCase = "freestanding" | "wall_mounted" | "table_vitrine" | "climate_controlled" | "open_pedestal";

export function objectProtection(d: DisplayCase): number {
  const m: Record<DisplayCase, number> = {
    freestanding: 7, wall_mounted: 6, table_vitrine: 8, climate_controlled: 10, open_pedestal: 2,
  };
  return m[d];
}

export function viewingAngle(d: DisplayCase): number {
  const m: Record<DisplayCase, number> = {
    freestanding: 10, wall_mounted: 5, table_vitrine: 7, climate_controlled: 6, open_pedestal: 9,
  };
  return m[d];
}

export function fabricationCost(d: DisplayCase): number {
  const m: Record<DisplayCase, number> = {
    freestanding: 6, wall_mounted: 4, table_vitrine: 5, climate_controlled: 10, open_pedestal: 2,
  };
  return m[d];
}

export function spaceRequired(d: DisplayCase): number {
  const m: Record<DisplayCase, number> = {
    freestanding: 8, wall_mounted: 3, table_vitrine: 5, climate_controlled: 7, open_pedestal: 4,
  };
  return m[d];
}

export function accessForCurator(d: DisplayCase): number {
  const m: Record<DisplayCase, number> = {
    freestanding: 5, wall_mounted: 4, table_vitrine: 7, climate_controlled: 3, open_pedestal: 10,
  };
  return m[d];
}

export function dustSealed(d: DisplayCase): boolean {
  const m: Record<DisplayCase, boolean> = {
    freestanding: true, wall_mounted: true, table_vitrine: true, climate_controlled: true, open_pedestal: false,
  };
  return m[d];
}

export function humidityControl(d: DisplayCase): boolean {
  const m: Record<DisplayCase, boolean> = {
    freestanding: false, wall_mounted: false, table_vitrine: false, climate_controlled: true, open_pedestal: false,
  };
  return m[d];
}

export function glazingMaterial(d: DisplayCase): string {
  const m: Record<DisplayCase, string> = {
    freestanding: "low_iron_tempered_glass", wall_mounted: "acrylic_uv_filter",
    table_vitrine: "anti_reflective_glass", climate_controlled: "laminated_uv_glass",
    open_pedestal: "no_glazing_open_air",
  };
  return m[d];
}

export function bestContent(d: DisplayCase): string {
  const m: Record<DisplayCase, string> = {
    freestanding: "sculpture_3d_artifact", wall_mounted: "framed_document_medal",
    table_vitrine: "small_jewelry_coins", climate_controlled: "rare_textile_manuscript",
    open_pedestal: "durable_stone_metal",
  };
  return m[d];
}

export function displayCases(): DisplayCase[] {
  return ["freestanding", "wall_mounted", "table_vitrine", "climate_controlled", "open_pedestal"];
}
