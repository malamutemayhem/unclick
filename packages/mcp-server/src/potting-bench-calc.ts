export type PottingBenchType = "cedar_freestanding_shelf" | "steel_frame_galvanized" | "folding_portable_resin" | "potting_sink_basin" | "wall_mount_drop_leaf";

export function workSpace(t: PottingBenchType): number {
  const m: Record<PottingBenchType, number> = {
    cedar_freestanding_shelf: 8, steel_frame_galvanized: 7, folding_portable_resin: 5, potting_sink_basin: 9, wall_mount_drop_leaf: 4,
  };
  return m[t];
}

export function storageCapacity(t: PottingBenchType): number {
  const m: Record<PottingBenchType, number> = {
    cedar_freestanding_shelf: 9, steel_frame_galvanized: 7, folding_portable_resin: 4, potting_sink_basin: 8, wall_mount_drop_leaf: 3,
  };
  return m[t];
}

export function weatherResist(t: PottingBenchType): number {
  const m: Record<PottingBenchType, number> = {
    cedar_freestanding_shelf: 7, steel_frame_galvanized: 9, folding_portable_resin: 8, potting_sink_basin: 6, wall_mount_drop_leaf: 5,
  };
  return m[t];
}

export function portability(t: PottingBenchType): number {
  const m: Record<PottingBenchType, number> = {
    cedar_freestanding_shelf: 3, steel_frame_galvanized: 2, folding_portable_resin: 9, potting_sink_basin: 1, wall_mount_drop_leaf: 7,
  };
  return m[t];
}

export function benchCost(t: PottingBenchType): number {
  const m: Record<PottingBenchType, number> = {
    cedar_freestanding_shelf: 3, steel_frame_galvanized: 3, folding_portable_resin: 2, potting_sink_basin: 5, wall_mount_drop_leaf: 2,
  };
  return m[t];
}

export function hasSink(t: PottingBenchType): boolean {
  const m: Record<PottingBenchType, boolean> = {
    cedar_freestanding_shelf: false, steel_frame_galvanized: false, folding_portable_resin: false, potting_sink_basin: true, wall_mount_drop_leaf: false,
  };
  return m[t];
}

export function foldable(t: PottingBenchType): boolean {
  const m: Record<PottingBenchType, boolean> = {
    cedar_freestanding_shelf: false, steel_frame_galvanized: false, folding_portable_resin: true, potting_sink_basin: false, wall_mount_drop_leaf: true,
  };
  return m[t];
}

export function topMaterial(t: PottingBenchType): string {
  const m: Record<PottingBenchType, string> = {
    cedar_freestanding_shelf: "natural_cedar_plank",
    steel_frame_galvanized: "galvanized_steel_sheet",
    folding_portable_resin: "molded_resin_plastic",
    potting_sink_basin: "stainless_steel_basin",
    wall_mount_drop_leaf: "treated_pine_panel",
  };
  return m[t];
}

export function bestSpot(t: PottingBenchType): string {
  const m: Record<PottingBenchType, string> = {
    cedar_freestanding_shelf: "garden_shed_permanent",
    steel_frame_galvanized: "outdoor_greenhouse_open",
    folding_portable_resin: "patio_seasonal_setup",
    potting_sink_basin: "utility_room_indoor",
    wall_mount_drop_leaf: "balcony_small_space",
  };
  return m[t];
}

export function pottingBenches(): PottingBenchType[] {
  return ["cedar_freestanding_shelf", "steel_frame_galvanized", "folding_portable_resin", "potting_sink_basin", "wall_mount_drop_leaf"];
}
