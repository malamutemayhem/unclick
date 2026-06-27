export type LifeboatDavitType =
  | "gravity_pivot"
  | "freefall_skid"
  | "davit_launched_raft"
  | "single_arm_slewing"
  | "telescopic";

interface LifeboatDavitData {
  launchSpeed: number;
  capacity: number;
  reliability: number;
  seaStateRating: number;
  ldCost: number;
  freefall: boolean;
  forLargeVessel: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<LifeboatDavitType, LifeboatDavitData> = {
  gravity_pivot: {
    launchSpeed: 7, capacity: 9, reliability: 9, seaStateRating: 7, ldCost: 7,
    freefall: false, forLargeVessel: true,
    mechanism: "gravity_pivot_arm_wire_fall_winch_hook_release_cradle",
    bestUse: "passenger_vessel_cruise_ship_solas_conventional_lifeboat",
  },
  freefall_skid: {
    launchSpeed: 10, capacity: 6, reliability: 8, seaStateRating: 10, ldCost: 9,
    freefall: true, forLargeVessel: true,
    mechanism: "stern_ramp_skid_hydrostatic_release_gravity_slide_launch",
    bestUse: "tanker_bulk_carrier_offshore_platform_heavy_weather_evac",
  },
  davit_launched_raft: {
    launchSpeed: 6, capacity: 7, reliability: 7, seaStateRating: 5, ldCost: 4,
    freefall: false, forLargeVessel: false,
    mechanism: "single_arm_davit_inflatable_raft_canister_hydrostatic",
    bestUse: "small_vessel_workboat_supplement_liferaft_solas_requirement",
  },
  single_arm_slewing: {
    launchSpeed: 5, capacity: 5, reliability: 8, seaStateRating: 6, ldCost: 5,
    freefall: false, forLargeVessel: false,
    mechanism: "single_arm_slewing_crane_rescue_boat_fast_recovery_winch",
    bestUse: "rescue_boat_davit_man_overboard_recovery_patrol_vessel",
  },
  telescopic: {
    launchSpeed: 8, capacity: 8, reliability: 7, seaStateRating: 8, ldCost: 8,
    freefall: false, forLargeVessel: true,
    mechanism: "telescopic_arm_hydraulic_extend_retract_compact_stow",
    bestUse: "modern_cruise_ferry_space_saving_deck_tender_launch_system",
  },
};

function get(t: LifeboatDavitType): LifeboatDavitData {
  return DATA[t];
}

export const launchSpeed = (t: LifeboatDavitType) => get(t).launchSpeed;
export const capacity = (t: LifeboatDavitType) => get(t).capacity;
export const reliability = (t: LifeboatDavitType) => get(t).reliability;
export const seaStateRating = (t: LifeboatDavitType) => get(t).seaStateRating;
export const ldCost = (t: LifeboatDavitType) => get(t).ldCost;
export const freefall = (t: LifeboatDavitType) => get(t).freefall;
export const forLargeVessel = (t: LifeboatDavitType) => get(t).forLargeVessel;
export const mechanism = (t: LifeboatDavitType) => get(t).mechanism;
export const bestUse = (t: LifeboatDavitType) => get(t).bestUse;
export const lifeboatDavitTypes = (): LifeboatDavitType[] =>
  Object.keys(DATA) as LifeboatDavitType[];
