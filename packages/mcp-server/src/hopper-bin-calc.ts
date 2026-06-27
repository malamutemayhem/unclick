export type HopperBinType =
  | "mass_flow_cone"
  | "funnel_flow_flat"
  | "expanded_flow_insert"
  | "wedge_hopper_slot"
  | "live_bottom_discharge";

interface HopperBinData {
  flowReliability: number;
  capacity: number;
  segregation: number;
  cleanout: number;
  hbCost: number;
  massFlow: boolean;
  forCohesive: boolean;
  outlet: string;
  bestUse: string;
}

const DATA: Record<HopperBinType, HopperBinData> = {
  mass_flow_cone: {
    flowReliability: 10, capacity: 7, segregation: 10, cleanout: 9, hbCost: 7,
    massFlow: true, forCohesive: true,
    outlet: "steep_cone_smooth_wall_first_in_out",
    bestUse: "pharma_food_fifo_no_dead_zone",
  },
  funnel_flow_flat: {
    flowReliability: 5, capacity: 10, segregation: 4, cleanout: 4, hbCost: 4,
    massFlow: false, forCohesive: false,
    outlet: "flat_bottom_center_discharge_rat_hole",
    bestUse: "coarse_grain_free_flow_bulk_store",
  },
  expanded_flow_insert: {
    flowReliability: 8, capacity: 9, segregation: 7, cleanout: 7, hbCost: 6,
    massFlow: false, forCohesive: true,
    outlet: "flat_upper_steep_lower_insert_cone",
    bestUse: "retrofit_existing_bin_flow_improve",
  },
  wedge_hopper_slot: {
    flowReliability: 9, capacity: 8, segregation: 9, cleanout: 8, hbCost: 8,
    massFlow: true, forCohesive: true,
    outlet: "elongated_slot_wedge_plane_flow",
    bestUse: "fine_powder_cement_uniform_draw",
  },
  live_bottom_discharge: {
    flowReliability: 9, capacity: 9, segregation: 8, cleanout: 7, hbCost: 9,
    massFlow: false, forCohesive: true,
    outlet: "screw_belt_vibrate_active_floor",
    bestUse: "wet_sticky_biomass_difficult_flow",
  },
};

function get(t: HopperBinType): HopperBinData {
  return DATA[t];
}

export const flowReliability = (t: HopperBinType) => get(t).flowReliability;
export const capacity = (t: HopperBinType) => get(t).capacity;
export const segregation = (t: HopperBinType) => get(t).segregation;
export const cleanout = (t: HopperBinType) => get(t).cleanout;
export const hbCost = (t: HopperBinType) => get(t).hbCost;
export const massFlow = (t: HopperBinType) => get(t).massFlow;
export const forCohesive = (t: HopperBinType) => get(t).forCohesive;
export const outlet = (t: HopperBinType) => get(t).outlet;
export const bestUse = (t: HopperBinType) => get(t).bestUse;
export const hopperBinTypes = (): HopperBinType[] =>
  Object.keys(DATA) as HopperBinType[];
