export type GranulateType =
  | "high_shear_wet"
  | "fluid_bed_top_spray"
  | "roller_compaction_dry"
  | "pan_granulator_disc"
  | "twin_screw_continuous";

interface GranulateData {
  uniformity: number;
  throughput: number;
  density: number;
  flowability: number;
  grCost: number;
  dryProcess: boolean;
  forPharma: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<GranulateType, GranulateData> = {
  high_shear_wet: {
    uniformity: 9, throughput: 7, density: 9, flowability: 9, grCost: 7,
    dryProcess: false, forPharma: true,
    mechanism: "impeller_chopper_binder_spray",
    bestUse: "pharma_tablet_dense_granule_batch",
  },
  fluid_bed_top_spray: {
    uniformity: 8, throughput: 6, density: 6, flowability: 10, grCost: 8,
    dryProcess: false, forPharma: true,
    mechanism: "top_spray_fluidized_binder_coat",
    bestUse: "pharma_instant_food_porous_granule",
  },
  roller_compaction_dry: {
    uniformity: 7, throughput: 8, density: 10, flowability: 8, grCost: 6,
    dryProcess: true, forPharma: true,
    mechanism: "roll_press_compact_screen_granulate",
    bestUse: "moisture_sensitive_api_dry_granule",
  },
  pan_granulator_disc: {
    uniformity: 7, throughput: 9, density: 7, flowability: 7, grCost: 4,
    dryProcess: false, forPharma: false,
    mechanism: "rotating_disc_spray_tumble_ball",
    bestUse: "fertilizer_ore_pellet_low_cost",
  },
  twin_screw_continuous: {
    uniformity: 9, throughput: 9, density: 8, flowability: 9, grCost: 9,
    dryProcess: false, forPharma: true,
    mechanism: "intermeshing_screw_continuous_wet",
    bestUse: "continuous_pharma_mfg_process_analytic",
  },
};

function get(t: GranulateType): GranulateData {
  return DATA[t];
}

export const uniformity = (t: GranulateType) => get(t).uniformity;
export const throughput = (t: GranulateType) => get(t).throughput;
export const density = (t: GranulateType) => get(t).density;
export const flowability = (t: GranulateType) => get(t).flowability;
export const grCost = (t: GranulateType) => get(t).grCost;
export const dryProcess = (t: GranulateType) => get(t).dryProcess;
export const forPharma = (t: GranulateType) => get(t).forPharma;
export const mechanism = (t: GranulateType) => get(t).mechanism;
export const bestUse = (t: GranulateType) => get(t).bestUse;
export const granulateTypes = (): GranulateType[] =>
  Object.keys(DATA) as GranulateType[];
