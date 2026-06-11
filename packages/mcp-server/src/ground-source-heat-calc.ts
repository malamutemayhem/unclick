export type GroundSourceHeatType =
  | "horizontal_closed_loop"
  | "vertical_closed_loop"
  | "open_loop_well"
  | "pond_lake_loop"
  | "standing_column_well";

interface GroundSourceHeatData {
  efficiency: number;
  installCost: number;
  landRequired: number;
  reliability: number;
  gsCost: number;
  heatingAndCooling: boolean;
  forResidential: boolean;
  loop: string;
  bestUse: string;
}

const DATA: Record<GroundSourceHeatType, GroundSourceHeatData> = {
  horizontal_closed_loop: {
    efficiency: 8, installCost: 5, landRequired: 3, reliability: 9, gsCost: 5,
    heatingAndCooling: true, forResidential: true,
    loop: "hdpe_pipe_horizontal_trench_4_6ft_deep_antifreeze_circulate",
    bestUse: "residential_new_build_large_yard_suburban_moderate_climate",
  },
  vertical_closed_loop: {
    efficiency: 9, installCost: 8, landRequired: 9, reliability: 10, gsCost: 8,
    heatingAndCooling: true, forResidential: true,
    loop: "hdpe_pipe_vertical_borehole_150_400ft_deep_grout_sealed",
    bestUse: "commercial_school_limited_land_urban_multi_story_building",
  },
  open_loop_well: {
    efficiency: 10, installCost: 6, landRequired: 7, reliability: 7, gsCost: 6,
    heatingAndCooling: true, forResidential: true,
    loop: "groundwater_pumped_from_supply_well_to_return_well_direct",
    bestUse: "high_efficiency_site_with_adequate_clean_groundwater_supply",
  },
  pond_lake_loop: {
    efficiency: 8, installCost: 4, landRequired: 5, reliability: 8, gsCost: 4,
    heatingAndCooling: true, forResidential: true,
    loop: "coiled_pipe_submerged_in_pond_or_lake_bottom_closed_loop",
    bestUse: "lakeside_property_farm_pond_available_low_cost_install",
  },
  standing_column_well: {
    efficiency: 9, installCost: 7, landRequired: 10, reliability: 8, gsCost: 7,
    heatingAndCooling: true, forResidential: false,
    loop: "deep_well_water_drawn_up_heat_exchanged_returned_to_bottom",
    bestUse: "rocky_terrain_commercial_deep_bedrock_recirculating_well",
  },
};

function get(t: GroundSourceHeatType): GroundSourceHeatData {
  return DATA[t];
}

export const efficiency = (t: GroundSourceHeatType) => get(t).efficiency;
export const installCost = (t: GroundSourceHeatType) => get(t).installCost;
export const landRequired = (t: GroundSourceHeatType) => get(t).landRequired;
export const reliability = (t: GroundSourceHeatType) => get(t).reliability;
export const gsCost = (t: GroundSourceHeatType) => get(t).gsCost;
export const heatingAndCooling = (t: GroundSourceHeatType) => get(t).heatingAndCooling;
export const forResidential = (t: GroundSourceHeatType) => get(t).forResidential;
export const loop = (t: GroundSourceHeatType) => get(t).loop;
export const bestUse = (t: GroundSourceHeatType) => get(t).bestUse;
export const groundSourceHeatTypes = (): GroundSourceHeatType[] =>
  Object.keys(DATA) as GroundSourceHeatType[];
