export type JetMillType =
  | "spiral_jet"
  | "fluidized_bed_jet"
  | "opposed_jet"
  | "loop_jet"
  | "target_jet";

interface JetMillData {
  fineness: number;
  throughput: number;
  contaminationFree: number;
  energyUse: number;
  jmCost: number;
  classifierBuiltIn: boolean;
  forPharma: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<JetMillType, JetMillData> = {
  spiral_jet: {
    fineness: 8, throughput: 5, contaminationFree: 9, energyUse: 7, jmCost: 6,
    classifierBuiltIn: false, forPharma: true,
    millConfig: "spiral_jet_mill_tangential_nozzle_vortex_grind_centrifugal_classify",
    bestUse: "api_micronize_spiral_jet_mill_vortex_grind_narrow_particle_size",
  },
  fluidized_bed_jet: {
    fineness: 9, throughput: 7, contaminationFree: 10, energyUse: 8, jmCost: 9,
    classifierBuiltIn: true, forPharma: true,
    millConfig: "fluidized_bed_jet_mill_air_classifier_wheel_particle_on_particle",
    bestUse: "pharma_fine_fluidized_bed_jet_mill_classifier_precise_cut_point",
  },
  opposed_jet: {
    fineness: 10, throughput: 6, contaminationFree: 9, energyUse: 9, jmCost: 8,
    classifierBuiltIn: false, forPharma: true,
    millConfig: "opposed_jet_mill_two_nozzle_head_on_collision_ultra_fine_shatter",
    bestUse: "ceramic_powder_opposed_jet_mill_head_on_collision_sub_micron",
  },
  loop_jet: {
    fineness: 7, throughput: 8, contaminationFree: 8, energyUse: 6, jmCost: 5,
    classifierBuiltIn: false, forPharma: false,
    millConfig: "loop_jet_mill_oval_tube_recirculate_air_sweep_grind_classify",
    bestUse: "mineral_grind_loop_jet_mill_recirculate_sweep_medium_fine_output",
  },
  target_jet: {
    fineness: 7, throughput: 6, contaminationFree: 7, energyUse: 5, jmCost: 4,
    classifierBuiltIn: false, forPharma: false,
    millConfig: "target_jet_mill_nozzle_accelerate_impact_plate_shatter_coarse",
    bestUse: "chemical_grind_target_jet_mill_impact_plate_coarse_to_medium",
  },
};

function get(t: JetMillType): JetMillData {
  return DATA[t];
}

export const fineness = (t: JetMillType) => get(t).fineness;
export const throughput = (t: JetMillType) => get(t).throughput;
export const contaminationFree = (t: JetMillType) => get(t).contaminationFree;
export const energyUse = (t: JetMillType) => get(t).energyUse;
export const jmCost = (t: JetMillType) => get(t).jmCost;
export const classifierBuiltIn = (t: JetMillType) => get(t).classifierBuiltIn;
export const forPharma = (t: JetMillType) => get(t).forPharma;
export const millConfig = (t: JetMillType) => get(t).millConfig;
export const bestUse = (t: JetMillType) => get(t).bestUse;
export const jetMillTypes = (): JetMillType[] =>
  Object.keys(DATA) as JetMillType[];
