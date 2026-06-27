export type ShortPathType =
  | "wiped_film_evaporator"
  | "falling_film_molecular"
  | "centrifugal_molecular"
  | "thin_film_degasser"
  | "hybrid_multi_stage";

interface ShortPathData {
  separation: number;
  gentleness: number;
  throughput: number;
  vacuumDepth: number;
  spCost: number;
  continuous: boolean;
  forThermLab: boolean;
  condenser: string;
  bestUse: string;
}

const DATA: Record<ShortPathType, ShortPathData> = {
  wiped_film_evaporator: {
    separation: 8, gentleness: 9, throughput: 7, vacuumDepth: 9, spCost: 8,
    continuous: true, forThermLab: true,
    condenser: "internal_coil_short_path_wiper_blade",
    bestUse: "cbd_oil_vitamin_e_heat_sensitive_purify",
  },
  falling_film_molecular: {
    separation: 7, gentleness: 7, throughput: 9, vacuumDepth: 7, spCost: 6,
    continuous: true, forThermLab: false,
    condenser: "external_vertical_tube_gravity_film",
    bestUse: "fatty_acid_tall_oil_bulk_evaporate",
  },
  centrifugal_molecular: {
    separation: 10, gentleness: 10, throughput: 5, vacuumDepth: 10, spCost: 10,
    continuous: true, forThermLab: true,
    condenser: "spinning_cone_rotor_ultra_thin_film",
    bestUse: "monomer_dimmer_ultra_pure_high_mw",
  },
  thin_film_degasser: {
    separation: 6, gentleness: 8, throughput: 8, vacuumDepth: 6, spCost: 5,
    continuous: true, forThermLab: false,
    condenser: "jacketed_cylinder_wiper_degas_strip",
    bestUse: "polymer_melt_degas_solvent_strip",
  },
  hybrid_multi_stage: {
    separation: 9, gentleness: 8, throughput: 6, vacuumDepth: 9, spCost: 9,
    continuous: true, forThermLab: true,
    condenser: "cascade_stage_internal_external_trap",
    bestUse: "omega3_tocopherol_multi_cut_fraction",
  },
};

function get(t: ShortPathType): ShortPathData {
  return DATA[t];
}

export const separation = (t: ShortPathType) => get(t).separation;
export const gentleness = (t: ShortPathType) => get(t).gentleness;
export const throughput = (t: ShortPathType) => get(t).throughput;
export const vacuumDepth = (t: ShortPathType) => get(t).vacuumDepth;
export const spCost = (t: ShortPathType) => get(t).spCost;
export const continuous = (t: ShortPathType) => get(t).continuous;
export const forThermLab = (t: ShortPathType) => get(t).forThermLab;
export const condenser = (t: ShortPathType) => get(t).condenser;
export const bestUse = (t: ShortPathType) => get(t).bestUse;
export const shortPathTypes = (): ShortPathType[] =>
  Object.keys(DATA) as ShortPathType[];
