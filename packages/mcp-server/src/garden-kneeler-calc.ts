export type GardenKneelerType = "foam_pad_basic" | "seat_stool_combo" | "rolling_cart_seat" | "memory_foam_thick" | "waterproof_neoprene";

export function kneeComfort(t: GardenKneelerType): number {
  const m: Record<GardenKneelerType, number> = {
    foam_pad_basic: 6, seat_stool_combo: 8, rolling_cart_seat: 9, memory_foam_thick: 10, waterproof_neoprene: 7,
  };
  return m[t];
}

export function backSupport(t: GardenKneelerType): number {
  const m: Record<GardenKneelerType, number> = {
    foam_pad_basic: 1, seat_stool_combo: 9, rolling_cart_seat: 10, memory_foam_thick: 3, waterproof_neoprene: 2,
  };
  return m[t];
}

export function portability(t: GardenKneelerType): number {
  const m: Record<GardenKneelerType, number> = {
    foam_pad_basic: 10, seat_stool_combo: 5, rolling_cart_seat: 3, memory_foam_thick: 8, waterproof_neoprene: 9,
  };
  return m[t];
}

export function durability(t: GardenKneelerType): number {
  const m: Record<GardenKneelerType, number> = {
    foam_pad_basic: 4, seat_stool_combo: 8, rolling_cart_seat: 9, memory_foam_thick: 6, waterproof_neoprene: 8,
  };
  return m[t];
}

export function kneelerCost(t: GardenKneelerType): number {
  const m: Record<GardenKneelerType, number> = {
    foam_pad_basic: 1, seat_stool_combo: 4, rolling_cart_seat: 7, memory_foam_thick: 3, waterproof_neoprene: 3,
  };
  return m[t];
}

export function dualPurpose(t: GardenKneelerType): boolean {
  const m: Record<GardenKneelerType, boolean> = {
    foam_pad_basic: false, seat_stool_combo: true, rolling_cart_seat: true, memory_foam_thick: false, waterproof_neoprene: false,
  };
  return m[t];
}

export function waterproof(t: GardenKneelerType): boolean {
  const m: Record<GardenKneelerType, boolean> = {
    foam_pad_basic: false, seat_stool_combo: false, rolling_cart_seat: false, memory_foam_thick: false, waterproof_neoprene: true,
  };
  return m[t];
}

export function cushionType(t: GardenKneelerType): string {
  const m: Record<GardenKneelerType, string> = {
    foam_pad_basic: "closed_cell_eva_foam",
    seat_stool_combo: "steel_frame_foam_seat",
    rolling_cart_seat: "wheeled_cart_padded",
    memory_foam_thick: "viscoelastic_contour",
    waterproof_neoprene: "neoprene_sealed_cell",
  };
  return m[t];
}

export function bestGardener(t: GardenKneelerType): string {
  const m: Record<GardenKneelerType, string> = {
    foam_pad_basic: "casual_weekend_weeder",
    seat_stool_combo: "senior_mobility_ease",
    rolling_cart_seat: "large_plot_long_session",
    memory_foam_thick: "knee_pain_extra_cushion",
    waterproof_neoprene: "wet_ground_rain_garden",
  };
  return m[t];
}

export function gardenKneelers(): GardenKneelerType[] {
  return ["foam_pad_basic", "seat_stool_combo", "rolling_cart_seat", "memory_foam_thick", "waterproof_neoprene"];
}
