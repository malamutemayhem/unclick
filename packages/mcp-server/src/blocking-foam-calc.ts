export type BlockingFoamType = "thick_dense_firm" | "thin_portable_light" | "contoured_shaped_edge" | "waterproof_closed_cell" | "extra_large_blanket";

export function pinSupport(t: BlockingFoamType): number {
  const m: Record<BlockingFoamType, number> = {
    thick_dense_firm: 10, thin_portable_light: 6, contoured_shaped_edge: 8, waterproof_closed_cell: 7, extra_large_blanket: 9,
  };
  return m[t];
}

export function portability(t: BlockingFoamType): number {
  const m: Record<BlockingFoamType, number> = {
    thick_dense_firm: 4, thin_portable_light: 10, contoured_shaped_edge: 6, waterproof_closed_cell: 7, extra_large_blanket: 3,
  };
  return m[t];
}

export function surfaceSmoothness(t: BlockingFoamType): number {
  const m: Record<BlockingFoamType, number> = {
    thick_dense_firm: 8, thin_portable_light: 7, contoured_shaped_edge: 9, waterproof_closed_cell: 10, extra_large_blanket: 7,
  };
  return m[t];
}

export function coverage(t: BlockingFoamType): number {
  const m: Record<BlockingFoamType, number> = {
    thick_dense_firm: 7, thin_portable_light: 6, contoured_shaped_edge: 5, waterproof_closed_cell: 7, extra_large_blanket: 10,
  };
  return m[t];
}

export function foamCost(t: BlockingFoamType): number {
  const m: Record<BlockingFoamType, number> = {
    thick_dense_firm: 4, thin_portable_light: 2, contoured_shaped_edge: 3, waterproof_closed_cell: 4, extra_large_blanket: 5,
  };
  return m[t];
}

export function waterproof(t: BlockingFoamType): boolean {
  const m: Record<BlockingFoamType, boolean> = {
    thick_dense_firm: false, thin_portable_light: false, contoured_shaped_edge: false, waterproof_closed_cell: true, extra_large_blanket: false,
  };
  return m[t];
}

export function stackable(t: BlockingFoamType): boolean {
  const m: Record<BlockingFoamType, boolean> = {
    thick_dense_firm: true, thin_portable_light: true, contoured_shaped_edge: false, waterproof_closed_cell: true, extra_large_blanket: false,
  };
  return m[t];
}

export function foamMaterial(t: BlockingFoamType): string {
  const m: Record<BlockingFoamType, string> = {
    thick_dense_firm: "high_density_polyethylene",
    thin_portable_light: "eva_foam_thin",
    contoured_shaped_edge: "memory_foam_contour",
    waterproof_closed_cell: "closed_cell_neoprene",
    extra_large_blanket: "open_cell_polyurethane",
  };
  return m[t];
}

export function bestUse(t: BlockingFoamType): string {
  const m: Record<BlockingFoamType, string> = {
    thick_dense_firm: "heavy_pin_secure",
    thin_portable_light: "travel_block_quick",
    contoured_shaped_edge: "shaped_garment_block",
    waterproof_closed_cell: "wet_block_soak",
    extra_large_blanket: "blanket_afghan_large",
  };
  return m[t];
}

export function blockingFoams(): BlockingFoamType[] {
  return ["thick_dense_firm", "thin_portable_light", "contoured_shaped_edge", "waterproof_closed_cell", "extra_large_blanket"];
}
