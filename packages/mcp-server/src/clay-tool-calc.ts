export type ClayToolType = "wire_loop_trim" | "wooden_rib_shape" | "metal_kidney_smooth" | "needle_detail_score" | "sponge_compress_water";

export function shapeControl(t: ClayToolType): number {
  const m: Record<ClayToolType, number> = {
    wire_loop_trim: 7, wooden_rib_shape: 10, metal_kidney_smooth: 9, needle_detail_score: 6, sponge_compress_water: 4,
  };
  return m[t];
}

export function detailWork(t: ClayToolType): number {
  const m: Record<ClayToolType, number> = {
    wire_loop_trim: 8, wooden_rib_shape: 6, metal_kidney_smooth: 7, needle_detail_score: 10, sponge_compress_water: 3,
  };
  return m[t];
}

export function clayRemoval(t: ClayToolType): number {
  const m: Record<ClayToolType, number> = {
    wire_loop_trim: 10, wooden_rib_shape: 4, metal_kidney_smooth: 5, needle_detail_score: 3, sponge_compress_water: 2,
  };
  return m[t];
}

export function surfaceFinish(t: ClayToolType): number {
  const m: Record<ClayToolType, number> = {
    wire_loop_trim: 5, wooden_rib_shape: 8, metal_kidney_smooth: 10, needle_detail_score: 4, sponge_compress_water: 9,
  };
  return m[t];
}

export function toolCost(t: ClayToolType): number {
  const m: Record<ClayToolType, number> = {
    wire_loop_trim: 1, wooden_rib_shape: 1, metal_kidney_smooth: 2, needle_detail_score: 1, sponge_compress_water: 1,
  };
  return m[t];
}

export function forThrowing(t: ClayToolType): boolean {
  const m: Record<ClayToolType, boolean> = {
    wire_loop_trim: false, wooden_rib_shape: true, metal_kidney_smooth: true, needle_detail_score: false, sponge_compress_water: true,
  };
  return m[t];
}

export function removesDay(t: ClayToolType): boolean {
  const m: Record<ClayToolType, boolean> = {
    wire_loop_trim: true, wooden_rib_shape: false, metal_kidney_smooth: false, needle_detail_score: false, sponge_compress_water: false,
  };
  return m[t];
}

export function toolMaterial(t: ClayToolType): string {
  const m: Record<ClayToolType, string> = {
    wire_loop_trim: "steel_wire_loop",
    wooden_rib_shape: "hardwood_carved_form",
    metal_kidney_smooth: "stainless_kidney_plate",
    needle_detail_score: "steel_point_needle",
    sponge_compress_water: "natural_sea_sponge",
  };
  return m[t];
}

export function bestStage(t: ClayToolType): string {
  const m: Record<ClayToolType, string> = {
    wire_loop_trim: "leather_hard_trim",
    wooden_rib_shape: "wet_throwing_form",
    metal_kidney_smooth: "soft_surface_smooth",
    needle_detail_score: "greenware_detail_carve",
    sponge_compress_water: "wet_throwing_absorb",
  };
  return m[t];
}

export function clayTools(): ClayToolType[] {
  return ["wire_loop_trim", "wooden_rib_shape", "metal_kidney_smooth", "needle_detail_score", "sponge_compress_water"];
}
