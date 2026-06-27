export type PaniniPressType = "compact_two_slice" | "full_size_four_slice" | "floating_hinge_adjust" | "open_flat_grill_mode" | "commercial_ribbed_cast";

export function grillMarkQuality(t: PaniniPressType): number {
  const m: Record<PaniniPressType, number> = {
    compact_two_slice: 7, full_size_four_slice: 8, floating_hinge_adjust: 8, open_flat_grill_mode: 6, commercial_ribbed_cast: 10,
  };
  return m[t];
}

export function sandwichCapacity(t: PaniniPressType): number {
  const m: Record<PaniniPressType, number> = {
    compact_two_slice: 4, full_size_four_slice: 8, floating_hinge_adjust: 6, open_flat_grill_mode: 7, commercial_ribbed_cast: 10,
  };
  return m[t];
}

export function pressureControl(t: PaniniPressType): number {
  const m: Record<PaniniPressType, number> = {
    compact_two_slice: 5, full_size_four_slice: 6, floating_hinge_adjust: 10, open_flat_grill_mode: 3, commercial_ribbed_cast: 8,
  };
  return m[t];
}

export function compactStorage(t: PaniniPressType): number {
  const m: Record<PaniniPressType, number> = {
    compact_two_slice: 10, full_size_four_slice: 4, floating_hinge_adjust: 5, open_flat_grill_mode: 3, commercial_ribbed_cast: 2,
  };
  return m[t];
}

export function pressCost(t: PaniniPressType): number {
  const m: Record<PaniniPressType, number> = {
    compact_two_slice: 2, full_size_four_slice: 4, floating_hinge_adjust: 5, open_flat_grill_mode: 6, commercial_ribbed_cast: 8,
  };
  return m[t];
}

export function opensFlat(t: PaniniPressType): boolean {
  const m: Record<PaniniPressType, boolean> = {
    compact_two_slice: false, full_size_four_slice: false, floating_hinge_adjust: false, open_flat_grill_mode: true, commercial_ribbed_cast: false,
  };
  return m[t];
}

export function removablePlates(t: PaniniPressType): boolean {
  const m: Record<PaniniPressType, boolean> = {
    compact_two_slice: false, full_size_four_slice: true, floating_hinge_adjust: true, open_flat_grill_mode: false, commercial_ribbed_cast: false,
  };
  return m[t];
}

export function plateType(t: PaniniPressType): string {
  const m: Record<PaniniPressType, string> = {
    compact_two_slice: "nonstick_ribbed_fixed",
    full_size_four_slice: "nonstick_ribbed_removable",
    floating_hinge_adjust: "nonstick_ribbed_floating",
    open_flat_grill_mode: "nonstick_flat_reversible",
    commercial_ribbed_cast: "cast_iron_deep_ribbed",
  };
  return m[t];
}

export function bestUse(t: PaniniPressType): string {
  const m: Record<PaniniPressType, string> = {
    compact_two_slice: "quick_lunch_single_serve",
    full_size_four_slice: "family_meal_batch",
    floating_hinge_adjust: "thick_artisan_sandwich",
    open_flat_grill_mode: "open_grill_meat_veggie",
    commercial_ribbed_cast: "cafe_deli_high_volume",
  };
  return m[t];
}

export function paniniPresses(): PaniniPressType[] {
  return ["compact_two_slice", "full_size_four_slice", "floating_hinge_adjust", "open_flat_grill_mode", "commercial_ribbed_cast"];
}
