export type AquariumFilterType = "hang_on_back" | "canister_external" | "sponge_internal" | "undergravel_plate" | "fluidized_bed";

export function filtrationPower(t: AquariumFilterType): number {
  const m: Record<AquariumFilterType, number> = {
    hang_on_back: 6, canister_external: 10, sponge_internal: 4, undergravel_plate: 5, fluidized_bed: 9,
  };
  return m[t];
}

export function tankCapacity(t: AquariumFilterType): number {
  const m: Record<AquariumFilterType, number> = {
    hang_on_back: 6, canister_external: 10, sponge_internal: 3, undergravel_plate: 7, fluidized_bed: 8,
  };
  return m[t];
}

export function maintenanceEase(t: AquariumFilterType): number {
  const m: Record<AquariumFilterType, number> = {
    hang_on_back: 9, canister_external: 4, sponge_internal: 10, undergravel_plate: 3, fluidized_bed: 5,
  };
  return m[t];
}

export function noiseOutput(t: AquariumFilterType): number {
  const m: Record<AquariumFilterType, number> = {
    hang_on_back: 5, canister_external: 3, sponge_internal: 1, undergravel_plate: 2, fluidized_bed: 4,
  };
  return m[t];
}

export function filterCost(t: AquariumFilterType): number {
  const m: Record<AquariumFilterType, number> = {
    hang_on_back: 3, canister_external: 8, sponge_internal: 1, undergravel_plate: 2, fluidized_bed: 9,
  };
  return m[t];
}

export function biologicalFilter(t: AquariumFilterType): boolean {
  const m: Record<AquariumFilterType, boolean> = {
    hang_on_back: true, canister_external: true, sponge_internal: true, undergravel_plate: true, fluidized_bed: true,
  };
  return m[t];
}

export function hiddenFromView(t: AquariumFilterType): boolean {
  const m: Record<AquariumFilterType, boolean> = {
    hang_on_back: false, canister_external: true, sponge_internal: false, undergravel_plate: true, fluidized_bed: true,
  };
  return m[t];
}

export function mediaType(t: AquariumFilterType): string {
  const m: Record<AquariumFilterType, string> = {
    hang_on_back: "cartridge_carbon_pad",
    canister_external: "multi_tray_bio_media",
    sponge_internal: "open_cell_foam_block",
    undergravel_plate: "gravel_substrate_bed",
    fluidized_bed: "sand_bead_suspension",
  };
  return m[t];
}

export function bestTank(t: AquariumFilterType): string {
  const m: Record<AquariumFilterType, string> = {
    hang_on_back: "beginner_community_tank",
    canister_external: "large_planted_display",
    sponge_internal: "shrimp_fry_breeding",
    undergravel_plate: "low_tech_simple_setup",
    fluidized_bed: "heavy_bioload_cichlid",
  };
  return m[t];
}

export function aquariumFilters(): AquariumFilterType[] {
  return ["hang_on_back", "canister_external", "sponge_internal", "undergravel_plate", "fluidized_bed"];
}
