export type MagneticSepType =
  | "drum_low_intensity"
  | "drum_high_intensity"
  | "wet_high_gradient"
  | "overhead_belt_crossbelt"
  | "eddy_current_nonferrous";

interface MagneticSepData {
  fieldStrength: number;
  throughput: number;
  selectivity: number;
  recovery: number;
  msCost: number;
  wetProcess: boolean;
  forFine: boolean;
  magnet: string;
  bestUse: string;
}

const DATA: Record<MagneticSepType, MagneticSepData> = {
  drum_low_intensity: {
    fieldStrength: 4, throughput: 9, selectivity: 7, recovery: 8, msCost: 4,
    wetProcess: false, forFine: false,
    magnet: "permanent_ferrite_drum_rotation",
    bestUse: "iron_ore_tramp_metal_removal_bulk",
  },
  drum_high_intensity: {
    fieldStrength: 8, throughput: 7, selectivity: 8, recovery: 9, msCost: 7,
    wetProcess: false, forFine: false,
    magnet: "rare_earth_neodymium_drum_shell",
    bestUse: "paramagnetic_mineral_ilmenite_garnet",
  },
  wet_high_gradient: {
    fieldStrength: 10, throughput: 6, selectivity: 10, recovery: 10, msCost: 9,
    wetProcess: true, forFine: true,
    magnet: "superconducting_coil_matrix_canister",
    bestUse: "kaolin_purify_fine_weakly_magnetic",
  },
  overhead_belt_crossbelt: {
    fieldStrength: 5, throughput: 10, selectivity: 5, recovery: 7, msCost: 5,
    wetProcess: false, forFine: false,
    magnet: "electromagnetic_coil_belt_suspend",
    bestUse: "conveyor_tramp_iron_protect_crusher",
  },
  eddy_current_nonferrous: {
    fieldStrength: 6, throughput: 8, selectivity: 7, recovery: 8, msCost: 8,
    wetProcess: false, forFine: false,
    magnet: "rotating_rare_earth_rotor_repulsion",
    bestUse: "recycling_aluminum_copper_sort",
  },
};

function get(t: MagneticSepType): MagneticSepData {
  return DATA[t];
}

export const fieldStrength = (t: MagneticSepType) => get(t).fieldStrength;
export const throughput = (t: MagneticSepType) => get(t).throughput;
export const selectivity = (t: MagneticSepType) => get(t).selectivity;
export const recovery = (t: MagneticSepType) => get(t).recovery;
export const msCost = (t: MagneticSepType) => get(t).msCost;
export const wetProcess = (t: MagneticSepType) => get(t).wetProcess;
export const forFine = (t: MagneticSepType) => get(t).forFine;
export const magnet = (t: MagneticSepType) => get(t).magnet;
export const bestUse = (t: MagneticSepType) => get(t).bestUse;
export const magneticSepTypes = (): MagneticSepType[] =>
  Object.keys(DATA) as MagneticSepType[];
