export type GasketSealType =
  | "spiral_wound_metal"
  | "ring_joint_rtj"
  | "sheet_compressed_fiber"
  | "ptfe_envelope_lined"
  | "kammprofile_serrated";

interface GasketSealData {
  sealability: number;
  pressureRating: number;
  temperatureRange: number;
  blowoutResist: number;
  gsCost: number;
  metallic: boolean;
  forHighPressure: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<GasketSealType, GasketSealData> = {
  spiral_wound_metal: {
    sealability: 9, pressureRating: 9, temperatureRange: 9, blowoutResist: 8, gsCost: 6,
    metallic: true, forHighPressure: true,
    construction: "alternating_metal_filler_spiral_windings_ring",
    bestUse: "refinery_flange_high_temp_pressure_cycling",
  },
  ring_joint_rtj: {
    sealability: 10, pressureRating: 10, temperatureRange: 10, blowoutResist: 10, gsCost: 8,
    metallic: true, forHighPressure: true,
    construction: "solid_metal_ring_octagonal_oval_rtj_groove",
    bestUse: "wellhead_subsea_extreme_pressure_metal_seal",
  },
  sheet_compressed_fiber: {
    sealability: 5, pressureRating: 4, temperatureRange: 5, blowoutResist: 3, gsCost: 2,
    metallic: false, forHighPressure: false,
    construction: "compressed_fiber_elastomer_bound_sheet_cut",
    bestUse: "utility_water_low_pressure_steam_general",
  },
  ptfe_envelope_lined: {
    sealability: 7, pressureRating: 5, temperatureRange: 6, blowoutResist: 5, gsCost: 4,
    metallic: false, forHighPressure: false,
    construction: "ptfe_envelope_filler_insert_chemical_resist",
    bestUse: "chemical_corrosive_service_acid_alkali_flange",
  },
  kammprofile_serrated: {
    sealability: 9, pressureRating: 8, temperatureRange: 9, blowoutResist: 9, gsCost: 7,
    metallic: true, forHighPressure: true,
    construction: "serrated_metal_core_soft_facing_layer_gasket",
    bestUse: "heat_exchanger_large_diameter_flange_reusable",
  },
};

function get(t: GasketSealType): GasketSealData {
  return DATA[t];
}

export const sealability = (t: GasketSealType) => get(t).sealability;
export const pressureRating = (t: GasketSealType) => get(t).pressureRating;
export const temperatureRange = (t: GasketSealType) => get(t).temperatureRange;
export const blowoutResist = (t: GasketSealType) => get(t).blowoutResist;
export const gsCost = (t: GasketSealType) => get(t).gsCost;
export const metallic = (t: GasketSealType) => get(t).metallic;
export const forHighPressure = (t: GasketSealType) => get(t).forHighPressure;
export const construction = (t: GasketSealType) => get(t).construction;
export const bestUse = (t: GasketSealType) => get(t).bestUse;
export const gasketSealTypes = (): GasketSealType[] =>
  Object.keys(DATA) as GasketSealType[];
