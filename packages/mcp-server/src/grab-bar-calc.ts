export type GrabBarType = "wall_mount_steel" | "suction_cup_portable" | "flip_up_fold" | "clamp_on_tub" | "floor_to_ceiling_pole";

export function gripSecurity(t: GrabBarType): number {
  const m: Record<GrabBarType, number> = {
    wall_mount_steel: 10, suction_cup_portable: 5, flip_up_fold: 8, clamp_on_tub: 7, floor_to_ceiling_pole: 9,
  };
  return m[t];
}

export function installEase(t: GrabBarType): number {
  const m: Record<GrabBarType, number> = {
    wall_mount_steel: 3, suction_cup_portable: 10, flip_up_fold: 4, clamp_on_tub: 8, floor_to_ceiling_pole: 6,
  };
  return m[t];
}

export function weightCapacity(t: GrabBarType): number {
  const m: Record<GrabBarType, number> = {
    wall_mount_steel: 10, suction_cup_portable: 4, flip_up_fold: 7, clamp_on_tub: 6, floor_to_ceiling_pole: 9,
  };
  return m[t];
}

export function portability(t: GrabBarType): number {
  const m: Record<GrabBarType, number> = {
    wall_mount_steel: 1, suction_cup_portable: 10, flip_up_fold: 2, clamp_on_tub: 7, floor_to_ceiling_pole: 3,
  };
  return m[t];
}

export function barCost(t: GrabBarType): number {
  const m: Record<GrabBarType, number> = {
    wall_mount_steel: 4, suction_cup_portable: 2, flip_up_fold: 6, clamp_on_tub: 3, floor_to_ceiling_pole: 7,
  };
  return m[t];
}

export function noDrilling(t: GrabBarType): boolean {
  const m: Record<GrabBarType, boolean> = {
    wall_mount_steel: false, suction_cup_portable: true, flip_up_fold: false, clamp_on_tub: true, floor_to_ceiling_pole: true,
  };
  return m[t];
}

export function adaCompliant(t: GrabBarType): boolean {
  const m: Record<GrabBarType, boolean> = {
    wall_mount_steel: true, suction_cup_portable: false, flip_up_fold: true, clamp_on_tub: false, floor_to_ceiling_pole: false,
  };
  return m[t];
}

export function barFinish(t: GrabBarType): string {
  const m: Record<GrabBarType, string> = {
    wall_mount_steel: "brushed_stainless_304",
    suction_cup_portable: "white_abs_rubber_pad",
    flip_up_fold: "chrome_plated_hinged",
    clamp_on_tub: "powder_coated_steel",
    floor_to_ceiling_pole: "anodized_aluminum_tension",
  };
  return m[t];
}

export function bestLocation(t: GrabBarType): string {
  const m: Record<GrabBarType, string> = {
    wall_mount_steel: "shower_stall_permanent",
    suction_cup_portable: "hotel_travel_temporary",
    flip_up_fold: "toilet_side_assist",
    clamp_on_tub: "bathtub_edge_entry",
    floor_to_ceiling_pole: "bedside_standing_assist",
  };
  return m[t];
}

export function grabBars(): GrabBarType[] {
  return ["wall_mount_steel", "suction_cup_portable", "flip_up_fold", "clamp_on_tub", "floor_to_ceiling_pole"];
}
