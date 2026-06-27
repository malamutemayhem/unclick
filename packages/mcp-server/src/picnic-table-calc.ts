export type PicnicTableType = "wood_classic_attached" | "aluminum_fold_portable" | "recycled_plastic_heavy" | "convertible_bench_table" | "kids_size_colorful";

export function seatingCapacity(t: PicnicTableType): number {
  const m: Record<PicnicTableType, number> = {
    wood_classic_attached: 8, aluminum_fold_portable: 6, recycled_plastic_heavy: 8, convertible_bench_table: 4, kids_size_colorful: 4,
  };
  return m[t];
}

export function durability(t: PicnicTableType): number {
  const m: Record<PicnicTableType, number> = {
    wood_classic_attached: 6, aluminum_fold_portable: 5, recycled_plastic_heavy: 10, convertible_bench_table: 6, kids_size_colorful: 4,
  };
  return m[t];
}

export function portability(t: PicnicTableType): number {
  const m: Record<PicnicTableType, number> = {
    wood_classic_attached: 2, aluminum_fold_portable: 10, recycled_plastic_heavy: 1, convertible_bench_table: 5, kids_size_colorful: 7,
  };
  return m[t];
}

export function weatherResist(t: PicnicTableType): number {
  const m: Record<PicnicTableType, number> = {
    wood_classic_attached: 4, aluminum_fold_portable: 7, recycled_plastic_heavy: 10, convertible_bench_table: 5, kids_size_colorful: 6,
  };
  return m[t];
}

export function tableCost(t: PicnicTableType): number {
  const m: Record<PicnicTableType, number> = {
    wood_classic_attached: 5, aluminum_fold_portable: 4, recycled_plastic_heavy: 8, convertible_bench_table: 5, kids_size_colorful: 3,
  };
  return m[t];
}

export function foldable(t: PicnicTableType): boolean {
  const m: Record<PicnicTableType, boolean> = {
    wood_classic_attached: false, aluminum_fold_portable: true, recycled_plastic_heavy: false, convertible_bench_table: true, kids_size_colorful: false,
  };
  return m[t];
}

export function adaAccessible(t: PicnicTableType): boolean {
  const m: Record<PicnicTableType, boolean> = {
    wood_classic_attached: false, aluminum_fold_portable: false, recycled_plastic_heavy: true, convertible_bench_table: false, kids_size_colorful: false,
  };
  return m[t];
}

export function topMaterial(t: PicnicTableType): string {
  const m: Record<PicnicTableType, string> = {
    wood_classic_attached: "pressure_treated_pine",
    aluminum_fold_portable: "aluminum_tube_mesh_top",
    recycled_plastic_heavy: "recycled_hdpe_plank",
    convertible_bench_table: "cedar_slat_hinge",
    kids_size_colorful: "painted_pine_rounded",
  };
  return m[t];
}

export function bestSpot(t: PicnicTableType): string {
  const m: Record<PicnicTableType, string> = {
    wood_classic_attached: "park_backyard_permanent",
    aluminum_fold_portable: "camping_tailgate_beach",
    recycled_plastic_heavy: "commercial_park_school",
    convertible_bench_table: "small_patio_dual_use",
    kids_size_colorful: "backyard_playroom_deck",
  };
  return m[t];
}

export function picnicTables(): PicnicTableType[] {
  return ["wood_classic_attached", "aluminum_fold_portable", "recycled_plastic_heavy", "convertible_bench_table", "kids_size_colorful"];
}
