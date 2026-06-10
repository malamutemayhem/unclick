export type RegistrationPinType = "ternes_burton_tabs" | "kento_wood_block" | "needle_point_poke" | "hinge_bar_clamp" | "magnetic_plate_hold";

export function alignAccuracy(t: RegistrationPinType): number {
  const m: Record<RegistrationPinType, number> = {
    ternes_burton_tabs: 10, kento_wood_block: 8, needle_point_poke: 6, hinge_bar_clamp: 9, magnetic_plate_hold: 7,
  };
  return m[t];
}

export function setupSpeed(t: RegistrationPinType): number {
  const m: Record<RegistrationPinType, number> = {
    ternes_burton_tabs: 9, kento_wood_block: 5, needle_point_poke: 7, hinge_bar_clamp: 8, magnetic_plate_hold: 10,
  };
  return m[t];
}

export function repeatability(t: RegistrationPinType): number {
  const m: Record<RegistrationPinType, number> = {
    ternes_burton_tabs: 10, kento_wood_block: 9, needle_point_poke: 5, hinge_bar_clamp: 9, magnetic_plate_hold: 7,
  };
  return m[t];
}

export function versatility(t: RegistrationPinType): number {
  const m: Record<RegistrationPinType, number> = {
    ternes_burton_tabs: 8, kento_wood_block: 5, needle_point_poke: 9, hinge_bar_clamp: 7, magnetic_plate_hold: 6,
  };
  return m[t];
}

export function pinCost(t: RegistrationPinType): number {
  const m: Record<RegistrationPinType, number> = {
    ternes_burton_tabs: 2, kento_wood_block: 1, needle_point_poke: 1, hinge_bar_clamp: 3, magnetic_plate_hold: 3,
  };
  return m[t];
}

export function reusable(t: RegistrationPinType): boolean {
  const m: Record<RegistrationPinType, boolean> = {
    ternes_burton_tabs: true, kento_wood_block: true, needle_point_poke: false, hinge_bar_clamp: true, magnetic_plate_hold: true,
  };
  return m[t];
}

export function forMultiColor(t: RegistrationPinType): boolean {
  const m: Record<RegistrationPinType, boolean> = {
    ternes_burton_tabs: true, kento_wood_block: true, needle_point_poke: false, hinge_bar_clamp: true, magnetic_plate_hold: true,
  };
  return m[t];
}

export function mountMethod(t: RegistrationPinType): string {
  const m: Record<RegistrationPinType, string> = {
    ternes_burton_tabs: "adhesive_tab_punch",
    kento_wood_block: "carved_block_corner",
    needle_point_poke: "pin_through_paper",
    hinge_bar_clamp: "metal_bar_clamp_edge",
    magnetic_plate_hold: "magnetic_base_plate",
  };
  return m[t];
}

export function bestProcess(t: RegistrationPinType): string {
  const m: Record<RegistrationPinType, string> = {
    ternes_burton_tabs: "screen_print_edition",
    kento_wood_block: "japanese_woodblock_moku",
    needle_point_poke: "quick_proof_test",
    hinge_bar_clamp: "lithograph_stone_press",
    magnetic_plate_hold: "etching_plate_align",
  };
  return m[t];
}

export function registrationPins(): RegistrationPinType[] {
  return ["ternes_burton_tabs", "kento_wood_block", "needle_point_poke", "hinge_bar_clamp", "magnetic_plate_hold"];
}
