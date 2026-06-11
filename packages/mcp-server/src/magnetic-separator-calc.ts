export type MagneticSeparatorType =
  | "low_intensity_drum"
  | "high_intensity_dry"
  | "high_gradient_wet"
  | "rare_earth_roll"
  | "eddy_current";

interface MagneticSeparatorData {
  fieldStrength: number;
  throughput: number;
  recovery: number;
  selectivity: number;
  msCost: number;
  wet: boolean;
  forParamagnetic: boolean;
  magnet: string;
  bestUse: string;
}

const DATA: Record<MagneticSeparatorType, MagneticSeparatorData> = {
  low_intensity_drum: {
    fieldStrength: 4, throughput: 10, recovery: 9, selectivity: 7, msCost: 4,
    wet: true, forParamagnetic: false,
    magnet: "ferrite_permanent_magnet_drum_low_gauss_magnetite_recovery",
    bestUse: "magnetite_iron_ore_recovery_dense_media_ferrosilicon_reclaim",
  },
  high_intensity_dry: {
    fieldStrength: 9, throughput: 7, recovery: 8, selectivity: 8, msCost: 7,
    wet: false, forParamagnetic: true,
    magnet: "electromagnetic_cross_belt_high_gauss_dry_mineral_separate",
    bestUse: "ilmenite_garnet_heavy_mineral_sand_dry_paramagnetic_removal",
  },
  high_gradient_wet: {
    fieldStrength: 10, throughput: 6, recovery: 10, selectivity: 9, msCost: 9,
    wet: true, forParamagnetic: true,
    magnet: "superconducting_solenoid_high_gradient_matrix_fine_particle",
    bestUse: "kaolin_purification_feldspar_cleaning_fine_iron_removal",
  },
  rare_earth_roll: {
    fieldStrength: 8, throughput: 8, recovery: 9, selectivity: 9, msCost: 8,
    wet: false, forParamagnetic: true,
    magnet: "neodymium_rare_earth_roll_high_field_dry_gravity_belt_feed",
    bestUse: "mineral_sand_zircon_rutile_monazite_dry_separation_final",
  },
  eddy_current: {
    fieldStrength: 6, throughput: 9, recovery: 8, selectivity: 7, msCost: 6,
    wet: false, forParamagnetic: false,
    magnet: "rotating_ndfeb_rotor_alternating_polarity_eddy_repulsion",
    bestUse: "aluminum_can_copper_wire_nonferrous_metal_recycling_sort",
  },
};

function get(t: MagneticSeparatorType): MagneticSeparatorData {
  return DATA[t];
}

export const fieldStrength = (t: MagneticSeparatorType) => get(t).fieldStrength;
export const throughput = (t: MagneticSeparatorType) => get(t).throughput;
export const recovery = (t: MagneticSeparatorType) => get(t).recovery;
export const selectivity = (t: MagneticSeparatorType) => get(t).selectivity;
export const msCost = (t: MagneticSeparatorType) => get(t).msCost;
export const wet = (t: MagneticSeparatorType) => get(t).wet;
export const forParamagnetic = (t: MagneticSeparatorType) => get(t).forParamagnetic;
export const magnet = (t: MagneticSeparatorType) => get(t).magnet;
export const bestUse = (t: MagneticSeparatorType) => get(t).bestUse;
export const magneticSeparatorTypes = (): MagneticSeparatorType[] =>
  Object.keys(DATA) as MagneticSeparatorType[];
