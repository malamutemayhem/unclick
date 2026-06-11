export type GranulatorType =
  | "high_shear_gran"
  | "fluid_bed_gran"
  | "roll_compactor"
  | "extrusion_spheron"
  | "spray_gran";

interface GranulatorData {
  granuleQuality: number;
  throughput: number;
  densification: number;
  uniformity: number;
  grCost: number;
  wetProcess: boolean;
  forPharma: boolean;
  granConfig: string;
  bestUse: string;
}

const DATA: Record<GranulatorType, GranulatorData> = {
  high_shear_gran: {
    granuleQuality: 8, throughput: 8, densification: 9, uniformity: 7, grCost: 6,
    wetProcess: true, forPharma: true,
    granConfig: "high_shear_granulator_impeller_chopper_binder_spray_dense_granule",
    bestUse: "tablet_granule_high_shear_granulator_dense_uniform_binder_wet",
  },
  fluid_bed_gran: {
    granuleQuality: 9, throughput: 7, densification: 5, uniformity: 9, grCost: 8,
    wetProcess: true, forPharma: true,
    granConfig: "fluid_bed_granulator_wurster_top_spray_coat_dry_one_step",
    bestUse: "pharma_granule_fluid_bed_granulator_porous_fast_dissolve_coat",
  },
  roll_compactor: {
    granuleQuality: 6, throughput: 9, densification: 10, uniformity: 6, grCost: 5,
    wetProcess: false, forPharma: true,
    granConfig: "roll_compactor_granulator_dry_ribbon_compress_mill_granule",
    bestUse: "moisture_sensitive_roll_compactor_dry_granulate_no_solvent",
  },
  extrusion_spheron: {
    granuleQuality: 10, throughput: 5, densification: 8, uniformity: 10, grCost: 7,
    wetProcess: true, forPharma: true,
    granConfig: "extrusion_spheronizer_wet_mass_extrude_round_uniform_pellet",
    bestUse: "multi_particulate_extrusion_spheronizer_uniform_pellet_coat",
  },
  spray_gran: {
    granuleQuality: 7, throughput: 8, densification: 4, uniformity: 8, grCost: 7,
    wetProcess: true, forPharma: false,
    granConfig: "spray_granulator_slurry_atomize_dry_agglomerate_instant_powder",
    bestUse: "instant_powder_spray_granulator_slurry_atomize_agglomerate",
  },
};

function get(t: GranulatorType): GranulatorData {
  return DATA[t];
}

export const granuleQuality = (t: GranulatorType) => get(t).granuleQuality;
export const throughput = (t: GranulatorType) => get(t).throughput;
export const densification = (t: GranulatorType) => get(t).densification;
export const uniformity = (t: GranulatorType) => get(t).uniformity;
export const grCost = (t: GranulatorType) => get(t).grCost;
export const wetProcess = (t: GranulatorType) => get(t).wetProcess;
export const forPharma = (t: GranulatorType) => get(t).forPharma;
export const granConfig = (t: GranulatorType) => get(t).granConfig;
export const bestUse = (t: GranulatorType) => get(t).bestUse;
export const granulatorTypes = (): GranulatorType[] =>
  Object.keys(DATA) as GranulatorType[];
