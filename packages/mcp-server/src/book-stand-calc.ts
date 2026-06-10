export type BookStandType = "wire_frame_desktop" | "bamboo_adjustable_tray" | "acrylic_page_holder" | "cookbook_splash_guard" | "tablet_book_combo";

export function holdingAngle(t: BookStandType): number {
  const m: Record<BookStandType, number> = {
    wire_frame_desktop: 7, bamboo_adjustable_tray: 10, acrylic_page_holder: 6, cookbook_splash_guard: 8, tablet_book_combo: 9,
  };
  return m[t];
}

export function pageHolding(t: BookStandType): number {
  const m: Record<BookStandType, number> = {
    wire_frame_desktop: 6, bamboo_adjustable_tray: 7, acrylic_page_holder: 10, cookbook_splash_guard: 8, tablet_book_combo: 5,
  };
  return m[t];
}

export function portability(t: BookStandType): number {
  const m: Record<BookStandType, number> = {
    wire_frame_desktop: 7, bamboo_adjustable_tray: 5, acrylic_page_holder: 8, cookbook_splash_guard: 4, tablet_book_combo: 9,
  };
  return m[t];
}

export function weightCapacity(t: BookStandType): number {
  const m: Record<BookStandType, number> = {
    wire_frame_desktop: 6, bamboo_adjustable_tray: 9, acrylic_page_holder: 5, cookbook_splash_guard: 7, tablet_book_combo: 4,
  };
  return m[t];
}

export function standCost(t: BookStandType): number {
  const m: Record<BookStandType, number> = {
    wire_frame_desktop: 3, bamboo_adjustable_tray: 6, acrylic_page_holder: 5, cookbook_splash_guard: 4, tablet_book_combo: 7,
  };
  return m[t];
}

export function foldable(t: BookStandType): boolean {
  const m: Record<BookStandType, boolean> = {
    wire_frame_desktop: true, bamboo_adjustable_tray: true, acrylic_page_holder: false, cookbook_splash_guard: true, tablet_book_combo: true,
  };
  return m[t];
}

export function holdsTablet(t: BookStandType): boolean {
  const m: Record<BookStandType, boolean> = {
    wire_frame_desktop: false, bamboo_adjustable_tray: true, acrylic_page_holder: false, cookbook_splash_guard: false, tablet_book_combo: true,
  };
  return m[t];
}

export function standMaterial(t: BookStandType): string {
  const m: Record<BookStandType, string> = {
    wire_frame_desktop: "powder_coated_steel_wire",
    bamboo_adjustable_tray: "moso_bamboo_lacquered",
    acrylic_page_holder: "clear_acrylic_molded",
    cookbook_splash_guard: "acrylic_silicone_seal",
    tablet_book_combo: "aluminum_silicone_grip",
  };
  return m[t];
}

export function bestUse(t: BookStandType): string {
  const m: Record<BookStandType, string> = {
    wire_frame_desktop: "study_reference_desk",
    bamboo_adjustable_tray: "music_score_reading",
    acrylic_page_holder: "library_textbook_study",
    cookbook_splash_guard: "kitchen_recipe_cooking",
    tablet_book_combo: "travel_digital_reading",
  };
  return m[t];
}

export function bookStands(): BookStandType[] {
  return ["wire_frame_desktop", "bamboo_adjustable_tray", "acrylic_page_holder", "cookbook_splash_guard", "tablet_book_combo"];
}
