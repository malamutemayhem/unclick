export type WedgingBoardType = "plaster_slab_absorb" | "canvas_covered_wood" | "concrete_poured_heavy" | "wire_cut_wedge" | "marble_smooth_cold";

export function moistureAbsorb(t: WedgingBoardType): number {
  const m: Record<WedgingBoardType, number> = {
    plaster_slab_absorb: 10, canvas_covered_wood: 7, concrete_poured_heavy: 6, wire_cut_wedge: 4, marble_smooth_cold: 3,
  };
  return m[t];
}

export function surfaceGrip(t: WedgingBoardType): number {
  const m: Record<WedgingBoardType, number> = {
    plaster_slab_absorb: 8, canvas_covered_wood: 10, concrete_poured_heavy: 7, wire_cut_wedge: 6, marble_smooth_cold: 5,
  };
  return m[t];
}

export function durability(t: WedgingBoardType): number {
  const m: Record<WedgingBoardType, number> = {
    plaster_slab_absorb: 5, canvas_covered_wood: 6, concrete_poured_heavy: 10, wire_cut_wedge: 7, marble_smooth_cold: 9,
  };
  return m[t];
}

export function cleanability(t: WedgingBoardType): number {
  const m: Record<WedgingBoardType, number> = {
    plaster_slab_absorb: 6, canvas_covered_wood: 5, concrete_poured_heavy: 7, wire_cut_wedge: 8, marble_smooth_cold: 10,
  };
  return m[t];
}

export function boardCost(t: WedgingBoardType): number {
  const m: Record<WedgingBoardType, number> = {
    plaster_slab_absorb: 1, canvas_covered_wood: 1, concrete_poured_heavy: 2, wire_cut_wedge: 2, marble_smooth_cold: 3,
  };
  return m[t];
}

export function absorbsWater(t: WedgingBoardType): boolean {
  const m: Record<WedgingBoardType, boolean> = {
    plaster_slab_absorb: true, canvas_covered_wood: false, concrete_poured_heavy: true, wire_cut_wedge: false, marble_smooth_cold: false,
  };
  return m[t];
}

export function diyFriendly(t: WedgingBoardType): boolean {
  const m: Record<WedgingBoardType, boolean> = {
    plaster_slab_absorb: true, canvas_covered_wood: true, concrete_poured_heavy: true, wire_cut_wedge: false, marble_smooth_cold: false,
  };
  return m[t];
}

export function surfaceType(t: WedgingBoardType): string {
  const m: Record<WedgingBoardType, string> = {
    plaster_slab_absorb: "porous_plaster_flat",
    canvas_covered_wood: "stretched_canvas_rough",
    concrete_poured_heavy: "sealed_concrete_smooth",
    wire_cut_wedge: "wire_frame_cutter",
    marble_smooth_cold: "polished_stone_slab",
  };
  return m[t];
}

export function bestUse(t: WedgingBoardType): string {
  const m: Record<WedgingBoardType, string> = {
    plaster_slab_absorb: "reclaim_wet_clay_dry",
    canvas_covered_wood: "spiral_wedge_knead",
    concrete_poured_heavy: "heavy_stoneware_wedge",
    wire_cut_wedge: "check_air_bubble",
    marble_smooth_cold: "porcelain_cool_wedge",
  };
  return m[t];
}

export function wedgingBoards(): WedgingBoardType[] {
  return ["plaster_slab_absorb", "canvas_covered_wood", "concrete_poured_heavy", "wire_cut_wedge", "marble_smooth_cold"];
}
