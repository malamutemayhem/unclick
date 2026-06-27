export type CorkBoardType = "natural_cork_framed" | "fabric_wrapped_linen" | "combo_cork_whiteboard" | "self_healing_roll" | "decorative_tile_modular";

export function pinHoldStrength(t: CorkBoardType): number {
  const m: Record<CorkBoardType, number> = {
    natural_cork_framed: 9, fabric_wrapped_linen: 7, combo_cork_whiteboard: 7, self_healing_roll: 8, decorative_tile_modular: 6,
  };
  return m[t];
}

export function aesthetics(t: CorkBoardType): number {
  const m: Record<CorkBoardType, number> = {
    natural_cork_framed: 7, fabric_wrapped_linen: 9, combo_cork_whiteboard: 6, self_healing_roll: 4, decorative_tile_modular: 10,
  };
  return m[t];
}

export function surfaceArea(t: CorkBoardType): number {
  const m: Record<CorkBoardType, number> = {
    natural_cork_framed: 7, fabric_wrapped_linen: 7, combo_cork_whiteboard: 8, self_healing_roll: 10, decorative_tile_modular: 9,
  };
  return m[t];
}

export function versatility(t: CorkBoardType): number {
  const m: Record<CorkBoardType, number> = {
    natural_cork_framed: 7, fabric_wrapped_linen: 6, combo_cork_whiteboard: 10, self_healing_roll: 8, decorative_tile_modular: 8,
  };
  return m[t];
}

export function boardCost(t: CorkBoardType): number {
  const m: Record<CorkBoardType, number> = {
    natural_cork_framed: 2, fabric_wrapped_linen: 3, combo_cork_whiteboard: 3, self_healing_roll: 2, decorative_tile_modular: 4,
  };
  return m[t];
}

export function hasWhiteboard(t: CorkBoardType): boolean {
  const m: Record<CorkBoardType, boolean> = {
    natural_cork_framed: false, fabric_wrapped_linen: false, combo_cork_whiteboard: true, self_healing_roll: false, decorative_tile_modular: false,
  };
  return m[t];
}

export function expandable(t: CorkBoardType): boolean {
  const m: Record<CorkBoardType, boolean> = {
    natural_cork_framed: false, fabric_wrapped_linen: false, combo_cork_whiteboard: false, self_healing_roll: true, decorative_tile_modular: true,
  };
  return m[t];
}

export function backingType(t: CorkBoardType): string {
  const m: Record<CorkBoardType, string> = {
    natural_cork_framed: "mdf_wood_frame",
    fabric_wrapped_linen: "foam_core_padded",
    combo_cork_whiteboard: "aluminum_frame_split",
    self_healing_roll: "adhesive_back_roll",
    decorative_tile_modular: "felt_back_hex_tile",
  };
  return m[t];
}

export function bestSpot(t: CorkBoardType): string {
  const m: Record<CorkBoardType, string> = {
    natural_cork_framed: "office_wall_standard",
    fabric_wrapped_linen: "home_decor_accent",
    combo_cork_whiteboard: "classroom_planning",
    self_healing_roll: "craft_room_large_wall",
    decorative_tile_modular: "dorm_rental_removable",
  };
  return m[t];
}

export function corkBoards(): CorkBoardType[] {
  return ["natural_cork_framed", "fabric_wrapped_linen", "combo_cork_whiteboard", "self_healing_roll", "decorative_tile_modular"];
}
