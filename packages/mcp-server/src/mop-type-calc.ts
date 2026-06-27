export type MopType = "string_traditional" | "flat_microfiber" | "spin_bucket" | "steam_electric" | "spray_trigger";

export function cleanPower(t: MopType): number {
  const m: Record<MopType, number> = {
    string_traditional: 6, flat_microfiber: 7, spin_bucket: 7, steam_electric: 10, spray_trigger: 6,
  };
  return m[t];
}

export function easeOfUse(t: MopType): number {
  const m: Record<MopType, number> = {
    string_traditional: 4, flat_microfiber: 8, spin_bucket: 7, steam_electric: 6, spray_trigger: 10,
  };
  return m[t];
}

export function dryingSpeed(t: MopType): number {
  const m: Record<MopType, number> = {
    string_traditional: 3, flat_microfiber: 7, spin_bucket: 8, steam_electric: 10, spray_trigger: 8,
  };
  return m[t];
}

export function wringEffort(t: MopType): number {
  const m: Record<MopType, number> = {
    string_traditional: 2, flat_microfiber: 7, spin_bucket: 10, steam_electric: 10, spray_trigger: 10,
  };
  return m[t];
}

export function mopCost(t: MopType): number {
  const m: Record<MopType, number> = {
    string_traditional: 1, flat_microfiber: 3, spin_bucket: 4, steam_electric: 8, spray_trigger: 3,
  };
  return m[t];
}

export function chemicalFree(t: MopType): boolean {
  const m: Record<MopType, boolean> = {
    string_traditional: false, flat_microfiber: false, spin_bucket: false, steam_electric: true, spray_trigger: false,
  };
  return m[t];
}

export function machineWashPad(t: MopType): boolean {
  const m: Record<MopType, boolean> = {
    string_traditional: false, flat_microfiber: true, spin_bucket: false, steam_electric: true, spray_trigger: true,
  };
  return m[t];
}

export function headDesign(t: MopType): string {
  const m: Record<MopType, string> = {
    string_traditional: "cotton_loop_strand_bundle", flat_microfiber: "rectangular_velcro_pad",
    spin_bucket: "round_microfiber_spin_wring", steam_electric: "triangular_steam_pad",
    spray_trigger: "flat_pad_built_in_tank",
  };
  return m[t];
}

export function bestSurface(t: MopType): string {
  const m: Record<MopType, string> = {
    string_traditional: "commercial_rough_tile", flat_microfiber: "hardwood_laminate_gentle",
    spin_bucket: "tile_vinyl_heavy_soil", steam_electric: "sealed_hard_floor_sanitize",
    spray_trigger: "quick_spill_daily_touch_up",
  };
  return m[t];
}

export function mopTypes(): MopType[] {
  return ["string_traditional", "flat_microfiber", "spin_bucket", "steam_electric", "spray_trigger"];
}
