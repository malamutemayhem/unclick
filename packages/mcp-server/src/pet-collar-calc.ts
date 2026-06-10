export type PetCollarType = "nylon_buckle_basic" | "leather_rolled_classic" | "martingale_limited_slip" | "breakaway_safety_cat" | "smart_gps_tracker";

export function durability(t: PetCollarType): number {
  const m: Record<PetCollarType, number> = {
    nylon_buckle_basic: 6, leather_rolled_classic: 9, martingale_limited_slip: 7, breakaway_safety_cat: 4, smart_gps_tracker: 7,
  };
  return m[t];
}

export function comfort(t: PetCollarType): number {
  const m: Record<PetCollarType, number> = {
    nylon_buckle_basic: 7, leather_rolled_classic: 9, martingale_limited_slip: 6, breakaway_safety_cat: 8, smart_gps_tracker: 5,
  };
  return m[t];
}

export function adjustability(t: PetCollarType): number {
  const m: Record<PetCollarType, number> = {
    nylon_buckle_basic: 8, leather_rolled_classic: 5, martingale_limited_slip: 10, breakaway_safety_cat: 6, smart_gps_tracker: 7,
  };
  return m[t];
}

export function safety(t: PetCollarType): number {
  const m: Record<PetCollarType, number> = {
    nylon_buckle_basic: 6, leather_rolled_classic: 7, martingale_limited_slip: 9, breakaway_safety_cat: 10, smart_gps_tracker: 8,
  };
  return m[t];
}

export function collarCost(t: PetCollarType): number {
  const m: Record<PetCollarType, number> = {
    nylon_buckle_basic: 1, leather_rolled_classic: 5, martingale_limited_slip: 3, breakaway_safety_cat: 2, smart_gps_tracker: 8,
  };
  return m[t];
}

export function reflective(t: PetCollarType): boolean {
  const m: Record<PetCollarType, boolean> = {
    nylon_buckle_basic: true, leather_rolled_classic: false, martingale_limited_slip: true, breakaway_safety_cat: false, smart_gps_tracker: true,
  };
  return m[t];
}

export function hasGps(t: PetCollarType): boolean {
  const m: Record<PetCollarType, boolean> = {
    nylon_buckle_basic: false, leather_rolled_classic: false, martingale_limited_slip: false, breakaway_safety_cat: false, smart_gps_tracker: true,
  };
  return m[t];
}

export function collarMaterial(t: PetCollarType): string {
  const m: Record<PetCollarType, string> = {
    nylon_buckle_basic: "woven_nylon_webbing",
    leather_rolled_classic: "full_grain_rolled_leather",
    martingale_limited_slip: "nylon_chain_loop_combo",
    breakaway_safety_cat: "lightweight_snap_release",
    smart_gps_tracker: "tpu_housing_nylon_band",
  };
  return m[t];
}

export function bestPet(t: PetCollarType): string {
  const m: Record<PetCollarType, string> = {
    nylon_buckle_basic: "everyday_dog_walking",
    leather_rolled_classic: "long_coat_show_dog",
    martingale_limited_slip: "sighthound_escape_artist",
    breakaway_safety_cat: "indoor_outdoor_cat",
    smart_gps_tracker: "roamer_off_leash_area",
  };
  return m[t];
}

export function petCollars(): PetCollarType[] {
  return ["nylon_buckle_basic", "leather_rolled_classic", "martingale_limited_slip", "breakaway_safety_cat", "smart_gps_tracker"];
}
