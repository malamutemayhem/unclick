export type OverheadCraneType =
  | "single_girder_top"
  | "double_girder_top"
  | "underslung"
  | "gantry_outdoor"
  | "semi_gantry";

interface OverheadCraneData {
  liftCapacity: number;
  span: number;
  liftHeight: number;
  speed: number;
  ocCost: number;
  topRunning: boolean;
  forHeavy: boolean;
  hoist: string;
  bestUse: string;
}

const DATA: Record<OverheadCraneType, OverheadCraneData> = {
  single_girder_top: {
    liftCapacity: 5, span: 7, liftHeight: 7, speed: 7, ocCost: 4,
    topRunning: true, forHeavy: false,
    hoist: "electric_wire_rope_hoist_single_girder_trolley_top_rail",
    bestUse: "light_manufacturing_warehouse_assembly_general_material",
  },
  double_girder_top: {
    liftCapacity: 10, span: 10, liftHeight: 10, speed: 8, ocCost: 8,
    topRunning: true, forHeavy: true,
    hoist: "double_girder_crab_trolley_wire_rope_drum_high_capacity",
    bestUse: "heavy_engineering_steel_mill_foundry_power_plant_turbine",
  },
  underslung: {
    liftCapacity: 4, span: 5, liftHeight: 5, speed: 6, ocCost: 3,
    topRunning: false, forHeavy: false,
    hoist: "underslung_bottom_flange_running_chain_hoist_low_headroom",
    bestUse: "low_headroom_building_retrofit_existing_structure_light",
  },
  gantry_outdoor: {
    liftCapacity: 10, span: 10, liftHeight: 9, speed: 7, ocCost: 9,
    topRunning: true, forHeavy: true,
    hoist: "freestanding_leg_rail_outdoor_wind_load_storm_anchor_hook",
    bestUse: "shipyard_container_yard_precast_yard_outdoor_heavy_lift",
  },
  semi_gantry: {
    liftCapacity: 7, span: 8, liftHeight: 8, speed: 7, ocCost: 6,
    topRunning: true, forHeavy: false,
    hoist: "one_leg_one_wall_rail_asymmetric_span_mixed_support_hook",
    bestUse: "building_edge_open_side_workshop_one_wall_one_leg_layout",
  },
};

function get(t: OverheadCraneType): OverheadCraneData {
  return DATA[t];
}

export const liftCapacity = (t: OverheadCraneType) => get(t).liftCapacity;
export const span = (t: OverheadCraneType) => get(t).span;
export const liftHeight = (t: OverheadCraneType) => get(t).liftHeight;
export const speed = (t: OverheadCraneType) => get(t).speed;
export const ocCost = (t: OverheadCraneType) => get(t).ocCost;
export const topRunning = (t: OverheadCraneType) => get(t).topRunning;
export const forHeavy = (t: OverheadCraneType) => get(t).forHeavy;
export const hoist = (t: OverheadCraneType) => get(t).hoist;
export const bestUse = (t: OverheadCraneType) => get(t).bestUse;
export const overheadCraneTypes = (): OverheadCraneType[] =>
  Object.keys(DATA) as OverheadCraneType[];
