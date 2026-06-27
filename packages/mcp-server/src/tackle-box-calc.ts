export type TackleBoxType = "hard_tray_classic" | "soft_bag_tackle" | "backpack_system" | "boat_mounted" | "hip_wader_pack";

export function compartmentCount(t: TackleBoxType): number {
  const m: Record<TackleBoxType, number> = {
    hard_tray_classic: 8, soft_bag_tackle: 7, backpack_system: 9, boat_mounted: 10, hip_wader_pack: 4,
  };
  return m[t];
}

export function waterResistance(t: TackleBoxType): number {
  const m: Record<TackleBoxType, number> = {
    hard_tray_classic: 9, soft_bag_tackle: 5, backpack_system: 6, boat_mounted: 10, hip_wader_pack: 7,
  };
  return m[t];
}

export function carryComfort(t: TackleBoxType): number {
  const m: Record<TackleBoxType, number> = {
    hard_tray_classic: 4, soft_bag_tackle: 7, backpack_system: 10, boat_mounted: 2, hip_wader_pack: 9,
  };
  return m[t];
}

export function organizationScore(t: TackleBoxType): number {
  const m: Record<TackleBoxType, number> = {
    hard_tray_classic: 8, soft_bag_tackle: 6, backpack_system: 9, boat_mounted: 10, hip_wader_pack: 5,
  };
  return m[t];
}

export function boxCost(t: TackleBoxType): number {
  const m: Record<TackleBoxType, number> = {
    hard_tray_classic: 3, soft_bag_tackle: 4, backpack_system: 7, boat_mounted: 9, hip_wader_pack: 5,
  };
  return m[t];
}

export function stackable(t: TackleBoxType): boolean {
  const m: Record<TackleBoxType, boolean> = {
    hard_tray_classic: true, soft_bag_tackle: false, backpack_system: false, boat_mounted: true, hip_wader_pack: false,
  };
  return m[t];
}

export function handsFree(t: TackleBoxType): boolean {
  const m: Record<TackleBoxType, boolean> = {
    hard_tray_classic: false, soft_bag_tackle: true, backpack_system: true, boat_mounted: true, hip_wader_pack: true,
  };
  return m[t];
}

export function closureType(t: TackleBoxType): string {
  const m: Record<TackleBoxType, string> = {
    hard_tray_classic: "latch_snap_hinge_lid", soft_bag_tackle: "zipper_padded_flap",
    backpack_system: "roll_top_buckle_strap", boat_mounted: "sliding_drawer_rail",
    hip_wader_pack: "magnetic_flap_quick_access",
  };
  return m[t];
}

export function bestTrip(t: TackleBoxType): string {
  const m: Record<TackleBoxType, string> = {
    hard_tray_classic: "bank_fishing_car_trunk", soft_bag_tackle: "light_travel_shore_cast",
    backpack_system: "hike_in_remote_stream", boat_mounted: "charter_boat_organized",
    hip_wader_pack: "wade_fishing_river_fly",
  };
  return m[t];
}

export function tackleBoxes(): TackleBoxType[] {
  return ["hard_tray_classic", "soft_bag_tackle", "backpack_system", "boat_mounted", "hip_wader_pack"];
}
