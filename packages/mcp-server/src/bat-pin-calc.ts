export type BatPinType = "metal_pin_standard" | "plastic_tab_snap" | "rubber_grip_stick" | "magnetic_disc_hold" | "wood_dowel_press";

export function holdStrength(t: BatPinType): number {
  const m: Record<BatPinType, number> = {
    metal_pin_standard: 8, plastic_tab_snap: 6, rubber_grip_stick: 7, magnetic_disc_hold: 9, wood_dowel_press: 5,
  };
  return m[t];
}

export function easeOfRemove(t: BatPinType): number {
  const m: Record<BatPinType, number> = {
    metal_pin_standard: 7, plastic_tab_snap: 9, rubber_grip_stick: 6, magnetic_disc_hold: 10, wood_dowel_press: 5,
  };
  return m[t];
}

export function centering(t: BatPinType): number {
  const m: Record<BatPinType, number> = {
    metal_pin_standard: 9, plastic_tab_snap: 7, rubber_grip_stick: 5, magnetic_disc_hold: 8, wood_dowel_press: 6,
  };
  return m[t];
}

export function durability(t: BatPinType): number {
  const m: Record<BatPinType, number> = {
    metal_pin_standard: 10, plastic_tab_snap: 6, rubber_grip_stick: 5, magnetic_disc_hold: 9, wood_dowel_press: 7,
  };
  return m[t];
}

export function pinCost(t: BatPinType): number {
  const m: Record<BatPinType, number> = {
    metal_pin_standard: 1, plastic_tab_snap: 1, rubber_grip_stick: 1, magnetic_disc_hold: 3, wood_dowel_press: 1,
  };
  return m[t];
}

export function toolFree(t: BatPinType): boolean {
  const m: Record<BatPinType, boolean> = {
    metal_pin_standard: false, plastic_tab_snap: true, rubber_grip_stick: true, magnetic_disc_hold: true, wood_dowel_press: false,
  };
  return m[t];
}

export function universal(t: BatPinType): boolean {
  const m: Record<BatPinType, boolean> = {
    metal_pin_standard: true, plastic_tab_snap: false, rubber_grip_stick: false, magnetic_disc_hold: true, wood_dowel_press: false,
  };
  return m[t];
}

export function pinMaterial(t: BatPinType): string {
  const m: Record<BatPinType, string> = {
    metal_pin_standard: "stainless_steel_rod",
    plastic_tab_snap: "nylon_molded_tab",
    rubber_grip_stick: "silicone_friction_pad",
    magnetic_disc_hold: "neodymium_rare_earth",
    wood_dowel_press: "hardwood_turned_dowel",
  };
  return m[t];
}

export function bestUse(t: BatPinType): string {
  const m: Record<BatPinType, string> = {
    metal_pin_standard: "standard_wheel_mount",
    plastic_tab_snap: "quick_change_bat",
    rubber_grip_stick: "vibration_damp_hold",
    magnetic_disc_hold: "instant_attach_release",
    wood_dowel_press: "custom_bat_fit",
  };
  return m[t];
}

export function batPins(): BatPinType[] {
  return ["metal_pin_standard", "plastic_tab_snap", "rubber_grip_stick", "magnetic_disc_hold", "wood_dowel_press"];
}
