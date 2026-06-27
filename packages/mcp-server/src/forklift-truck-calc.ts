export type ForkliftTruckType =
  | "counterbalance_electric"
  | "reach_truck_narrow"
  | "order_picker_high"
  | "side_loader_long"
  | "telehandler_rough";

interface ForkliftTruckData {
  liftCapacity: number;
  liftHeight: number;
  maneuverability: number;
  throughput: number;
  ftCost: number;
  electric: boolean;
  forOutdoor: boolean;
  chassis: string;
  bestUse: string;
}

const DATA: Record<ForkliftTruckType, ForkliftTruckData> = {
  counterbalance_electric: {
    liftCapacity: 7, liftHeight: 6, maneuverability: 7, throughput: 8, ftCost: 6,
    electric: true, forOutdoor: false,
    chassis: "counterweight_rear_electric_motor_cushion_tire",
    bestUse: "warehouse_general_purpose_pallet_handling_dock",
  },
  reach_truck_narrow: {
    liftCapacity: 5, liftHeight: 10, maneuverability: 10, throughput: 7, ftCost: 7,
    electric: true, forOutdoor: false,
    chassis: "pantograph_reach_mast_narrow_aisle_outrigger_leg",
    bestUse: "narrow_aisle_high_rack_warehouse_racking_storage",
  },
  order_picker_high: {
    liftCapacity: 3, liftHeight: 9, maneuverability: 8, throughput: 6, ftCost: 7,
    electric: true, forOutdoor: false,
    chassis: "operator_elevating_platform_wire_guided_aisle",
    bestUse: "each_pick_fulfillment_high_bay_case_selection",
  },
  side_loader_long: {
    liftCapacity: 8, liftHeight: 6, maneuverability: 6, throughput: 6, ftCost: 8,
    electric: false, forOutdoor: true,
    chassis: "side_facing_forks_long_load_platform_multi_dir",
    bestUse: "timber_yard_steel_bar_pipe_long_load_handling",
  },
  telehandler_rough: {
    liftCapacity: 9, liftHeight: 8, maneuverability: 5, throughput: 5, ftCost: 9,
    electric: false, forOutdoor: true,
    chassis: "telescopic_boom_four_wheel_steer_rough_terrain",
    bestUse: "construction_site_agriculture_versatile_lift_place",
  },
};

function get(t: ForkliftTruckType): ForkliftTruckData {
  return DATA[t];
}

export const liftCapacity = (t: ForkliftTruckType) => get(t).liftCapacity;
export const liftHeight = (t: ForkliftTruckType) => get(t).liftHeight;
export const maneuverability = (t: ForkliftTruckType) => get(t).maneuverability;
export const throughput = (t: ForkliftTruckType) => get(t).throughput;
export const ftCost = (t: ForkliftTruckType) => get(t).ftCost;
export const electric = (t: ForkliftTruckType) => get(t).electric;
export const forOutdoor = (t: ForkliftTruckType) => get(t).forOutdoor;
export const chassis = (t: ForkliftTruckType) => get(t).chassis;
export const bestUse = (t: ForkliftTruckType) => get(t).bestUse;
export const forkliftTruckTypes = (): ForkliftTruckType[] =>
  Object.keys(DATA) as ForkliftTruckType[];
