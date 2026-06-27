export type BlockingMatType = "interlocking_foam_grid" | "rubber_grid_roll" | "cork_board_natural" | "self_healing_craft" | "wool_pressing_thick";

export function surfaceArea(t: BlockingMatType): number {
  const m: Record<BlockingMatType, number> = {
    interlocking_foam_grid: 10, rubber_grid_roll: 8, cork_board_natural: 6, self_healing_craft: 7, wool_pressing_thick: 5,
  };
  return m[t];
}

export function pinHold(t: BlockingMatType): number {
  const m: Record<BlockingMatType, number> = {
    interlocking_foam_grid: 9, rubber_grid_roll: 7, cork_board_natural: 10, self_healing_craft: 8, wool_pressing_thick: 6,
  };
  return m[t];
}

export function portability(t: BlockingMatType): number {
  const m: Record<BlockingMatType, number> = {
    interlocking_foam_grid: 9, rubber_grid_roll: 10, cork_board_natural: 4, self_healing_craft: 6, wool_pressing_thick: 3,
  };
  return m[t];
}

export function waterResist(t: BlockingMatType): number {
  const m: Record<BlockingMatType, number> = {
    interlocking_foam_grid: 9, rubber_grid_roll: 10, cork_board_natural: 4, self_healing_craft: 8, wool_pressing_thick: 3,
  };
  return m[t];
}

export function matCost(t: BlockingMatType): number {
  const m: Record<BlockingMatType, number> = {
    interlocking_foam_grid: 3, rubber_grid_roll: 4, cork_board_natural: 3, self_healing_craft: 4, wool_pressing_thick: 5,
  };
  return m[t];
}

export function hasGrid(t: BlockingMatType): boolean {
  const m: Record<BlockingMatType, boolean> = {
    interlocking_foam_grid: true, rubber_grid_roll: true, cork_board_natural: false, self_healing_craft: true, wool_pressing_thick: false,
  };
  return m[t];
}

export function expandable(t: BlockingMatType): boolean {
  const m: Record<BlockingMatType, boolean> = {
    interlocking_foam_grid: true, rubber_grid_roll: false, cork_board_natural: false, self_healing_craft: false, wool_pressing_thick: false,
  };
  return m[t];
}

export function matMaterial(t: BlockingMatType): string {
  const m: Record<BlockingMatType, string> = {
    interlocking_foam_grid: "eva_foam_tiles",
    rubber_grid_roll: "natural_rubber_sheet",
    cork_board_natural: "compressed_cork_slab",
    self_healing_craft: "pvc_layered_board",
    wool_pressing_thick: "felted_wool_pad",
  };
  return m[t];
}

export function bestUse(t: BlockingMatType): string {
  const m: Record<BlockingMatType, string> = {
    interlocking_foam_grid: "large_shawl_blanket",
    rubber_grid_roll: "travel_block_portable",
    cork_board_natural: "pin_heavy_lace",
    self_healing_craft: "mixed_craft_cutting",
    wool_pressing_thick: "steam_press_finish",
  };
  return m[t];
}

export function blockingMats(): BlockingMatType[] {
  return ["interlocking_foam_grid", "rubber_grid_roll", "cork_board_natural", "self_healing_craft", "wool_pressing_thick"];
}
