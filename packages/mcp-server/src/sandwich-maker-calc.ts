export type SandwichMakerType = "triangle_seal_cut" | "flat_square_grill" | "deep_fill_pocket" | "waffle_plate_combo" | "commercial_conveyor_toast";

export function sealQuality(t: SandwichMakerType): number {
  const m: Record<SandwichMakerType, number> = {
    triangle_seal_cut: 10, flat_square_grill: 4, deep_fill_pocket: 9, waffle_plate_combo: 3, commercial_conveyor_toast: 5,
  };
  return m[t];
}

export function fillingCapacity(t: SandwichMakerType): number {
  const m: Record<SandwichMakerType, number> = {
    triangle_seal_cut: 5, flat_square_grill: 7, deep_fill_pocket: 10, waffle_plate_combo: 6, commercial_conveyor_toast: 8,
  };
  return m[t];
}

export function versatility(t: SandwichMakerType): number {
  const m: Record<SandwichMakerType, number> = {
    triangle_seal_cut: 4, flat_square_grill: 6, deep_fill_pocket: 5, waffle_plate_combo: 10, commercial_conveyor_toast: 7,
  };
  return m[t];
}

export function compactSize(t: SandwichMakerType): number {
  const m: Record<SandwichMakerType, number> = {
    triangle_seal_cut: 9, flat_square_grill: 7, deep_fill_pocket: 6, waffle_plate_combo: 5, commercial_conveyor_toast: 2,
  };
  return m[t];
}

export function makerCost(t: SandwichMakerType): number {
  const m: Record<SandwichMakerType, number> = {
    triangle_seal_cut: 1, flat_square_grill: 2, deep_fill_pocket: 3, waffle_plate_combo: 4, commercial_conveyor_toast: 8,
  };
  return m[t];
}

export function swapPlates(t: SandwichMakerType): boolean {
  const m: Record<SandwichMakerType, boolean> = {
    triangle_seal_cut: false, flat_square_grill: false, deep_fill_pocket: false, waffle_plate_combo: true, commercial_conveyor_toast: false,
  };
  return m[t];
}

export function autoShutoff(t: SandwichMakerType): boolean {
  const m: Record<SandwichMakerType, boolean> = {
    triangle_seal_cut: false, flat_square_grill: false, deep_fill_pocket: true, waffle_plate_combo: true, commercial_conveyor_toast: true,
  };
  return m[t];
}

export function plateShape(t: SandwichMakerType): string {
  const m: Record<SandwichMakerType, string> = {
    triangle_seal_cut: "diagonal_triangle_sealed",
    flat_square_grill: "flat_square_nonstick",
    deep_fill_pocket: "deep_pocket_sealed_edge",
    waffle_plate_combo: "interchangeable_multi_plate",
    commercial_conveyor_toast: "conveyor_belt_flat_heat",
  };
  return m[t];
}

export function bestUse(t: SandwichMakerType): string {
  const m: Record<SandwichMakerType, string> = {
    triangle_seal_cut: "classic_toastie_quick_lunch",
    flat_square_grill: "grilled_cheese_open_face",
    deep_fill_pocket: "loaded_filling_no_leak",
    waffle_plate_combo: "multi_purpose_breakfast",
    commercial_conveyor_toast: "cafe_canteen_high_volume",
  };
  return m[t];
}

export function sandwichMakers(): SandwichMakerType[] {
  return ["triangle_seal_cut", "flat_square_grill", "deep_fill_pocket", "waffle_plate_combo", "commercial_conveyor_toast"];
}
