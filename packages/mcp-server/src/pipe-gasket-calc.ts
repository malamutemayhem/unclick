export type PipeGasketType =
  | "spiral_wound_ss"
  | "ring_joint_metal"
  | "compressed_fiber_sheet"
  | "ptfe_envelope"
  | "kammprofile_grooved";

interface PipeGasketData {
  pressureRating: number;
  tempRange: number;
  sealReliability: number;
  reusability: number;
  pgCost: number;
  metallic: boolean;
  forHighPress: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<PipeGasketType, PipeGasketData> = {
  spiral_wound_ss: {
    pressureRating: 9, tempRange: 9, sealReliability: 9, reusability: 5, pgCost: 7,
    metallic: true, forHighPress: true,
    material: "stainless_steel_spiral_with_filler_graphite",
    bestUse: "refinery_chemical_plant_high_temp_press_general",
  },
  ring_joint_metal: {
    pressureRating: 10, tempRange: 10, sealReliability: 10, reusability: 3, pgCost: 9,
    metallic: true, forHighPress: true,
    material: "solid_metal_ring_octagonal_or_oval_groove",
    bestUse: "wellhead_christmas_tree_extreme_pressure",
  },
  compressed_fiber_sheet: {
    pressureRating: 4, tempRange: 5, sealReliability: 6, reusability: 4, pgCost: 2,
    metallic: false, forHighPress: false,
    material: "aramid_fiber_nitrile_binder_compressed_sheet",
    bestUse: "low_pressure_water_steam_utility_general",
  },
  ptfe_envelope: {
    pressureRating: 5, tempRange: 6, sealReliability: 8, reusability: 4, pgCost: 5,
    metallic: false, forHighPress: false,
    material: "ptfe_envelope_over_filler_chemical_inert",
    bestUse: "corrosive_chemical_acid_alkali_food_pharma",
  },
  kammprofile_grooved: {
    pressureRating: 9, tempRange: 9, sealReliability: 10, reusability: 8, pgCost: 8,
    metallic: true, forHighPress: true,
    material: "grooved_metal_core_graphite_facing_layer",
    bestUse: "heat_exchanger_high_bolt_load_reliable_seal",
  },
};

function get(t: PipeGasketType): PipeGasketData {
  return DATA[t];
}

export const pressureRating = (t: PipeGasketType) => get(t).pressureRating;
export const tempRange = (t: PipeGasketType) => get(t).tempRange;
export const sealReliability = (t: PipeGasketType) => get(t).sealReliability;
export const reusability = (t: PipeGasketType) => get(t).reusability;
export const pgCost = (t: PipeGasketType) => get(t).pgCost;
export const metallic = (t: PipeGasketType) => get(t).metallic;
export const forHighPress = (t: PipeGasketType) => get(t).forHighPress;
export const material = (t: PipeGasketType) => get(t).material;
export const bestUse = (t: PipeGasketType) => get(t).bestUse;
export const pipeGasketTypes = (): PipeGasketType[] =>
  Object.keys(DATA) as PipeGasketType[];
