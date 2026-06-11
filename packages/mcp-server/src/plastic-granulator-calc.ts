export type PlasticGranulatorType =
  | "strand_pelletizer"
  | "underwater_pelletizer"
  | "hot_face_cutter"
  | "water_ring_pelletizer"
  | "grinder_granulator";

interface PlasticGranulatorData {
  pelletUniformity: number;
  throughput: number;
  dustLevel: number;
  coolingEfficiency: number;
  pgCost: number;
  underwater: boolean;
  forRecycle: boolean;
  granulatorConfig: string;
  bestUse: string;
}

const DATA: Record<PlasticGranulatorType, PlasticGranulatorData> = {
  strand_pelletizer: {
    pelletUniformity: 8, throughput: 8, dustLevel: 7, coolingEfficiency: 7, pgCost: 5,
    underwater: false, forRecycle: true,
    granulatorConfig: "strand_pelletizer_plastic_extrude_strand_cool_cut_standard",
    bestUse: "general_plastics_strand_pelletizer_standard_resin_compound_pellet",
  },
  underwater_pelletizer: {
    pelletUniformity: 10, throughput: 10, dustLevel: 10, coolingEfficiency: 10, pgCost: 10,
    underwater: true, forRecycle: false,
    granulatorConfig: "underwater_pelletizer_plastic_die_face_cut_water_cool_instant",
    bestUse: "polymer_plant_underwater_pelletizer_pristine_spherical_pellet",
  },
  hot_face_cutter: {
    pelletUniformity: 8, throughput: 9, dustLevel: 8, coolingEfficiency: 8, pgCost: 7,
    underwater: false, forRecycle: true,
    granulatorConfig: "hot_face_cutter_plastic_die_face_knife_cut_air_cool_pellet",
    bestUse: "compound_plant_hot_face_cutter_filled_material_mineral_glass",
  },
  water_ring_pelletizer: {
    pelletUniformity: 9, throughput: 9, dustLevel: 9, coolingEfficiency: 9, pgCost: 8,
    underwater: false, forRecycle: false,
    granulatorConfig: "water_ring_pelletizer_plastic_die_cut_centrifugal_water_cool",
    bestUse: "polyolefin_plant_water_ring_pelletizer_pe_pp_spherical_pellet",
  },
  grinder_granulator: {
    pelletUniformity: 5, throughput: 7, dustLevel: 4, coolingEfficiency: 5, pgCost: 3,
    underwater: false, forRecycle: true,
    granulatorConfig: "grinder_granulator_plastic_rotor_knife_screen_regrind_flake",
    bestUse: "plastics_recycling_grinder_granulator_regrind_scrap_runner_sprue",
  },
};

function get(t: PlasticGranulatorType): PlasticGranulatorData {
  return DATA[t];
}

export const pelletUniformity = (t: PlasticGranulatorType) => get(t).pelletUniformity;
export const throughput = (t: PlasticGranulatorType) => get(t).throughput;
export const dustLevel = (t: PlasticGranulatorType) => get(t).dustLevel;
export const coolingEfficiency = (t: PlasticGranulatorType) => get(t).coolingEfficiency;
export const pgCost = (t: PlasticGranulatorType) => get(t).pgCost;
export const underwater = (t: PlasticGranulatorType) => get(t).underwater;
export const forRecycle = (t: PlasticGranulatorType) => get(t).forRecycle;
export const granulatorConfig = (t: PlasticGranulatorType) => get(t).granulatorConfig;
export const bestUse = (t: PlasticGranulatorType) => get(t).bestUse;
export const plasticGranulatorTypes = (): PlasticGranulatorType[] =>
  Object.keys(DATA) as PlasticGranulatorType[];
