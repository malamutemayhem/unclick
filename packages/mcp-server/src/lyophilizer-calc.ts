export type LyophilizerType =
  | "shelf_batch"
  | "manifold_flask"
  | "rotary_freeze"
  | "spray_freeze"
  | "continuous_belt";

interface LyophilizerData {
  dryingUniformity: number;
  throughput: number;
  productQuality: number;
  energyEfficiency: number;
  lyCost: number;
  continuous: boolean;
  forInjectable: boolean;
  lyophConfig: string;
  bestUse: string;
}

const DATA: Record<LyophilizerType, LyophilizerData> = {
  shelf_batch: {
    dryingUniformity: 10, throughput: 7, productQuality: 10, energyEfficiency: 6, lyCost: 8,
    continuous: false, forInjectable: true,
    lyophConfig: "shelf_batch_lyophilizer_heated_shelf_vacuum_chamber_sublimate",
    bestUse: "pharma_injectable_shelf_batch_lyophilizer_vial_stopper_gmp",
  },
  manifold_flask: {
    dryingUniformity: 6, throughput: 3, productQuality: 7, energyEfficiency: 5, lyCost: 3,
    continuous: false, forInjectable: false,
    lyophConfig: "manifold_flask_lyophilizer_round_flask_port_vacuum_condenser",
    bestUse: "lab_research_manifold_flask_lyophilizer_small_sample_prototype",
  },
  rotary_freeze: {
    dryingUniformity: 8, throughput: 5, productQuality: 9, energyEfficiency: 7, lyCost: 6,
    continuous: false, forInjectable: false,
    lyophConfig: "rotary_freeze_lyophilizer_rotating_flask_shell_freeze_sublime",
    bestUse: "food_pharma_rotary_freeze_dryer_uniform_shell_freeze_quality",
  },
  spray_freeze: {
    dryingUniformity: 9, throughput: 8, productQuality: 9, energyEfficiency: 6, lyCost: 9,
    continuous: true, forInjectable: true,
    lyophConfig: "spray_freeze_lyophilizer_atomize_cryogen_freeze_vacuum_dry",
    bestUse: "biotech_spray_freeze_lyophilizer_particle_engineering_inhalation",
  },
  continuous_belt: {
    dryingUniformity: 8, throughput: 10, productQuality: 8, energyEfficiency: 8, lyCost: 10,
    continuous: true, forInjectable: false,
    lyophConfig: "continuous_belt_lyophilizer_conveyor_multi_zone_vacuum_sublime",
    bestUse: "food_industry_continuous_belt_lyophilizer_high_volume_fruit_meal",
  },
};

function get(t: LyophilizerType): LyophilizerData {
  return DATA[t];
}

export const dryingUniformity = (t: LyophilizerType) => get(t).dryingUniformity;
export const throughput = (t: LyophilizerType) => get(t).throughput;
export const productQuality = (t: LyophilizerType) => get(t).productQuality;
export const energyEfficiency = (t: LyophilizerType) => get(t).energyEfficiency;
export const lyCost = (t: LyophilizerType) => get(t).lyCost;
export const continuous = (t: LyophilizerType) => get(t).continuous;
export const forInjectable = (t: LyophilizerType) => get(t).forInjectable;
export const lyophConfig = (t: LyophilizerType) => get(t).lyophConfig;
export const bestUse = (t: LyophilizerType) => get(t).bestUse;
export const lyophilizerTypes = (): LyophilizerType[] =>
  Object.keys(DATA) as LyophilizerType[];
