export type DogCollarType = "flat_nylon_buckle" | "martingale_slip" | "leather_rolled" | "gps_smart_track" | "breakaway_safety";

export function durability(t: DogCollarType): number {
  const m: Record<DogCollarType, number> = {
    flat_nylon_buckle: 7, martingale_slip: 6, leather_rolled: 9, gps_smart_track: 5, breakaway_safety: 4,
  };
  return m[t];
}

export function comfort(t: DogCollarType): number {
  const m: Record<DogCollarType, number> = {
    flat_nylon_buckle: 7, martingale_slip: 6, leather_rolled: 9, gps_smart_track: 5, breakaway_safety: 8,
  };
  return m[t];
}

export function pullControl(t: DogCollarType): number {
  const m: Record<DogCollarType, number> = {
    flat_nylon_buckle: 5, martingale_slip: 9, leather_rolled: 6, gps_smart_track: 4, breakaway_safety: 2,
  };
  return m[t];
}

export function visibility(t: DogCollarType): number {
  const m: Record<DogCollarType, number> = {
    flat_nylon_buckle: 7, martingale_slip: 5, leather_rolled: 4, gps_smart_track: 10, breakaway_safety: 6,
  };
  return m[t];
}

export function collarCost(t: DogCollarType): number {
  const m: Record<DogCollarType, number> = {
    flat_nylon_buckle: 2, martingale_slip: 3, leather_rolled: 6, gps_smart_track: 9, breakaway_safety: 4,
  };
  return m[t];
}

export function waterproof(t: DogCollarType): boolean {
  const m: Record<DogCollarType, boolean> = {
    flat_nylon_buckle: true, martingale_slip: false, leather_rolled: false, gps_smart_track: true, breakaway_safety: true,
  };
  return m[t];
}

export function hasTracking(t: DogCollarType): boolean {
  const m: Record<DogCollarType, boolean> = {
    flat_nylon_buckle: false, martingale_slip: false, leather_rolled: false, gps_smart_track: true, breakaway_safety: false,
  };
  return m[t];
}

export function closureType(t: DogCollarType): string {
  const m: Record<DogCollarType, string> = {
    flat_nylon_buckle: "side_release_clip",
    martingale_slip: "limited_slip_loop",
    leather_rolled: "tongue_buckle_brass",
    gps_smart_track: "magnetic_snap_charge",
    breakaway_safety: "quick_release_snap",
  };
  return m[t];
}

export function bestDog(t: DogCollarType): string {
  const m: Record<DogCollarType, string> = {
    flat_nylon_buckle: "everyday_id_tag_wear",
    martingale_slip: "sighthound_training",
    leather_rolled: "long_coat_prevent_matting",
    gps_smart_track: "escape_artist_roamer",
    breakaway_safety: "small_cat_or_puppy",
  };
  return m[t];
}

export function dogCollars(): DogCollarType[] {
  return ["flat_nylon_buckle", "martingale_slip", "leather_rolled", "gps_smart_track", "breakaway_safety"];
}
