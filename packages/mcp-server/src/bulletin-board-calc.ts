export type BulletinBoardType = "cork_natural_frame" | "fabric_covered_padded" | "magnetic_whiteboard_combo" | "glass_dry_erase_modern" | "foam_display_lightweight";

export function pinAbility(t: BulletinBoardType): number {
  const m: Record<BulletinBoardType, number> = {
    cork_natural_frame: 10, fabric_covered_padded: 8, magnetic_whiteboard_combo: 3, glass_dry_erase_modern: 1, foam_display_lightweight: 9,
  };
  return m[t];
}

export function writeAbility(t: BulletinBoardType): number {
  const m: Record<BulletinBoardType, number> = {
    cork_natural_frame: 1, fabric_covered_padded: 1, magnetic_whiteboard_combo: 10, glass_dry_erase_modern: 10, foam_display_lightweight: 2,
  };
  return m[t];
}

export function durability(t: BulletinBoardType): number {
  const m: Record<BulletinBoardType, number> = {
    cork_natural_frame: 6, fabric_covered_padded: 5, magnetic_whiteboard_combo: 9, glass_dry_erase_modern: 10, foam_display_lightweight: 3,
  };
  return m[t];
}

export function aesthetics(t: BulletinBoardType): number {
  const m: Record<BulletinBoardType, number> = {
    cork_natural_frame: 7, fabric_covered_padded: 8, magnetic_whiteboard_combo: 6, glass_dry_erase_modern: 10, foam_display_lightweight: 5,
  };
  return m[t];
}

export function boardCost(t: BulletinBoardType): number {
  const m: Record<BulletinBoardType, number> = {
    cork_natural_frame: 2, fabric_covered_padded: 4, magnetic_whiteboard_combo: 5, glass_dry_erase_modern: 8, foam_display_lightweight: 1,
  };
  return m[t];
}

export function magnetic(t: BulletinBoardType): boolean {
  const m: Record<BulletinBoardType, boolean> = {
    cork_natural_frame: false, fabric_covered_padded: false, magnetic_whiteboard_combo: true, glass_dry_erase_modern: true, foam_display_lightweight: false,
  };
  return m[t];
}

export function selfHealing(t: BulletinBoardType): boolean {
  const m: Record<BulletinBoardType, boolean> = {
    cork_natural_frame: true, fabric_covered_padded: true, magnetic_whiteboard_combo: false, glass_dry_erase_modern: false, foam_display_lightweight: false,
  };
  return m[t];
}

export function surfaceMaterial(t: BulletinBoardType): string {
  const m: Record<BulletinBoardType, string> = {
    cork_natural_frame: "natural_cork_tile",
    fabric_covered_padded: "linen_polyester_padded",
    magnetic_whiteboard_combo: "steel_backed_melamine",
    glass_dry_erase_modern: "tempered_glass_magnetic",
    foam_display_lightweight: "expanded_polystyrene_board",
  };
  return m[t];
}

export function bestSpace(t: BulletinBoardType): string {
  const m: Record<BulletinBoardType, string> = {
    cork_natural_frame: "home_office_school_classic",
    fabric_covered_padded: "professional_office_lobby",
    magnetic_whiteboard_combo: "meeting_room_brainstorm",
    glass_dry_erase_modern: "modern_office_exec_suite",
    foam_display_lightweight: "trade_show_temp_display",
  };
  return m[t];
}

export function bulletinBoards(): BulletinBoardType[] {
  return ["cork_natural_frame", "fabric_covered_padded", "magnetic_whiteboard_combo", "glass_dry_erase_modern", "foam_display_lightweight"];
}
