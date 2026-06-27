export type SpinMopType = "pedal_press_bucket" | "self_wringing_twist" | "electric_spin_spray" | "flat_mop_microfiber" | "industrial_wringer";

export function wringing(t: SpinMopType): number {
  const m: Record<SpinMopType, number> = {
    pedal_press_bucket: 9, self_wringing_twist: 7, electric_spin_spray: 8, flat_mop_microfiber: 4, industrial_wringer: 10,
  };
  return m[t];
}

export function cleanAbility(t: SpinMopType): number {
  const m: Record<SpinMopType, number> = {
    pedal_press_bucket: 8, self_wringing_twist: 6, electric_spin_spray: 9, flat_mop_microfiber: 7, industrial_wringer: 8,
  };
  return m[t];
}

export function effortRequired(t: SpinMopType): number {
  const m: Record<SpinMopType, number> = {
    pedal_press_bucket: 4, self_wringing_twist: 6, electric_spin_spray: 2, flat_mop_microfiber: 5, industrial_wringer: 7,
  };
  return m[t];
}

export function storageSize(t: SpinMopType): number {
  const m: Record<SpinMopType, number> = {
    pedal_press_bucket: 4, self_wringing_twist: 7, electric_spin_spray: 8, flat_mop_microfiber: 9, industrial_wringer: 2,
  };
  return m[t];
}

export function mopCost(t: SpinMopType): number {
  const m: Record<SpinMopType, number> = {
    pedal_press_bucket: 5, self_wringing_twist: 3, electric_spin_spray: 8, flat_mop_microfiber: 4, industrial_wringer: 7,
  };
  return m[t];
}

export function handsFree(t: SpinMopType): boolean {
  const m: Record<SpinMopType, boolean> = {
    pedal_press_bucket: true, self_wringing_twist: false, electric_spin_spray: true, flat_mop_microfiber: false, industrial_wringer: true,
  };
  return m[t];
}

export function reusablePad(t: SpinMopType): boolean {
  const m: Record<SpinMopType, boolean> = {
    pedal_press_bucket: true, self_wringing_twist: true, electric_spin_spray: true, flat_mop_microfiber: true, industrial_wringer: true,
  };
  return m[t];
}

export function headType(t: SpinMopType): string {
  const m: Record<SpinMopType, string> = {
    pedal_press_bucket: "round_microfiber_spin",
    self_wringing_twist: "pva_sponge_squeeze",
    electric_spin_spray: "dual_pad_motor_spin",
    flat_mop_microfiber: "flat_velcro_rectangle",
    industrial_wringer: "cotton_loop_end",
  };
  return m[t];
}

export function bestFloor(t: SpinMopType): string {
  const m: Record<SpinMopType, string> = {
    pedal_press_bucket: "home_tile_hardwood",
    self_wringing_twist: "quick_small_kitchen",
    electric_spin_spray: "large_open_floor_plan",
    flat_mop_microfiber: "laminate_dust_daily",
    industrial_wringer: "commercial_warehouse",
  };
  return m[t];
}

export function spinMops(): SpinMopType[] {
  return ["pedal_press_bucket", "self_wringing_twist", "electric_spin_spray", "flat_mop_microfiber", "industrial_wringer"];
}
