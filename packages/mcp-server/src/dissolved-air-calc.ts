export type DissolvedAirType =
  | "full_flow_daf"
  | "partial_flow_daf"
  | "recycle_flow_daf"
  | "induced_air_daf"
  | "nano_bubble_daf";

interface DissolvedAirData {
  removalEfficiency: number;
  throughput: number;
  bubbleSize: number;
  sludgeConcentration: number;
  dafCost: number;
  pressurized: boolean;
  forOilRemoval: boolean;
  flotationConfig: string;
  bestUse: string;
}

const DATA: Record<DissolvedAirType, DissolvedAirData> = {
  full_flow_daf: {
    removalEfficiency: 7, throughput: 8, bubbleSize: 7, sludgeConcentration: 7, dafCost: 7,
    pressurized: true, forOilRemoval: true,
    flotationConfig: "full_flow_daf_pressurize_entire_stream_saturate_release_float",
    bestUse: "small_plant_full_flow_daf_simple_pressurize_all_flow_high_bubble",
  },
  partial_flow_daf: {
    removalEfficiency: 7, throughput: 9, bubbleSize: 7, sludgeConcentration: 7, dafCost: 6,
    pressurized: true, forOilRemoval: true,
    flotationConfig: "partial_flow_daf_split_pressurize_portion_blend_reduce_energy",
    bestUse: "industrial_partial_flow_daf_energy_save_split_pressurize_portion",
  },
  recycle_flow_daf: {
    removalEfficiency: 9, throughput: 9, bubbleSize: 9, sludgeConcentration: 9, dafCost: 8,
    pressurized: true, forOilRemoval: true,
    flotationConfig: "recycle_flow_daf_pressurize_clarified_recycle_gentle_no_floc_break",
    bestUse: "drinking_water_recycle_flow_daf_gentle_no_floc_break_best_practice",
  },
  induced_air_daf: {
    removalEfficiency: 6, throughput: 10, bubbleSize: 5, sludgeConcentration: 6, dafCost: 4,
    pressurized: false, forOilRemoval: true,
    flotationConfig: "induced_air_flotation_rotor_vortex_large_bubble_oil_skim_simple",
    bestUse: "oilfield_water_induced_air_flotation_large_bubble_oil_skim_fast",
  },
  nano_bubble_daf: {
    removalEfficiency: 10, throughput: 7, bubbleSize: 10, sludgeConcentration: 10, dafCost: 10,
    pressurized: true, forOilRemoval: false,
    flotationConfig: "nano_bubble_daf_sub_micron_bubble_high_surface_area_long_residence",
    bestUse: "algae_harvest_nano_bubble_daf_sub_micron_high_surface_area_attach",
  },
};

function get(t: DissolvedAirType): DissolvedAirData {
  return DATA[t];
}

export const removalEfficiency = (t: DissolvedAirType) => get(t).removalEfficiency;
export const throughput = (t: DissolvedAirType) => get(t).throughput;
export const bubbleSize = (t: DissolvedAirType) => get(t).bubbleSize;
export const sludgeConcentration = (t: DissolvedAirType) => get(t).sludgeConcentration;
export const dafCost = (t: DissolvedAirType) => get(t).dafCost;
export const pressurized = (t: DissolvedAirType) => get(t).pressurized;
export const forOilRemoval = (t: DissolvedAirType) => get(t).forOilRemoval;
export const flotationConfig = (t: DissolvedAirType) => get(t).flotationConfig;
export const bestUse = (t: DissolvedAirType) => get(t).bestUse;
export const dissolvedAirTypes = (): DissolvedAirType[] =>
  Object.keys(DATA) as DissolvedAirType[];
