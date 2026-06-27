export type ForkliftType =
  | "counterbalance_electric"
  | "reach_truck_narrow_aisle"
  | "order_picker_elevated"
  | "pallet_jack_walkie"
  | "rough_terrain_diesel";

const DATA: Record<ForkliftType, {
  capacity: number; liftHeight: number; maneuver: number;
  speed: number; fkCost: number; electric: boolean;
  forIndoor: boolean; mast: string; bestUse: string;
}> = {
  counterbalance_electric: {
    capacity: 8, liftHeight: 6, maneuver: 6,
    speed: 7, fkCost: 3, electric: true,
    forIndoor: true, mast: "triple_stage_free_lift",
    bestUse: "general_warehouse_dock_load",
  },
  reach_truck_narrow_aisle: {
    capacity: 6, liftHeight: 10, maneuver: 9,
    speed: 5, fkCost: 4, electric: true,
    forIndoor: true, mast: "telescopic_reach_pantograph",
    bestUse: "vna_high_rack_storage_pick",
  },
  order_picker_elevated: {
    capacity: 3, liftHeight: 9, maneuver: 7,
    speed: 4, fkCost: 4, electric: true,
    forIndoor: true, mast: "operator_platform_lift_cage",
    bestUse: "piece_pick_mid_level_shelf",
  },
  pallet_jack_walkie: {
    capacity: 5, liftHeight: 1, maneuver: 10,
    speed: 3, fkCost: 1, electric: true,
    forIndoor: true, mast: "hydraulic_fork_ground_level",
    bestUse: "dock_to_staging_short_haul",
  },
  rough_terrain_diesel: {
    capacity: 10, liftHeight: 5, maneuver: 4,
    speed: 8, fkCost: 3, electric: false,
    forIndoor: false, mast: "heavy_duty_pneumatic_tire",
    bestUse: "construction_site_lumber_yard",
  },
};

const get = (t: ForkliftType) => DATA[t];

export const capacity = (t: ForkliftType) => get(t).capacity;
export const liftHeight = (t: ForkliftType) => get(t).liftHeight;
export const maneuver = (t: ForkliftType) => get(t).maneuver;
export const speed = (t: ForkliftType) => get(t).speed;
export const fkCost = (t: ForkliftType) => get(t).fkCost;
export const electric = (t: ForkliftType) => get(t).electric;
export const forIndoor = (t: ForkliftType) => get(t).forIndoor;
export const mast = (t: ForkliftType) => get(t).mast;
export const bestUse = (t: ForkliftType) => get(t).bestUse;
export const forkliftTypes = (): ForkliftType[] => Object.keys(DATA) as ForkliftType[];
