export type PaddleMixType =
  | "ploughshare_batch"
  | "twin_shaft_continuous"
  | "gravity_tumble_drum"
  | "fluidized_zone_rapid"
  | "pugmill_clay_paste";

interface PaddleMixData {
  uniformity: number;
  intensity: number;
  throughput: number;
  gentleness: number;
  pmCost: number;
  continuous: boolean;
  forWet: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<PaddleMixType, PaddleMixData> = {
  ploughshare_batch: {
    uniformity: 10, intensity: 9, throughput: 7, gentleness: 5, pmCost: 7,
    continuous: false, forWet: true,
    element: "plough_blade_chopper_fluidize_bed",
    bestUse: "chemical_pharma_precise_batch_blend",
  },
  twin_shaft_continuous: {
    uniformity: 9, intensity: 8, throughput: 10, gentleness: 6, pmCost: 8,
    continuous: true, forWet: true,
    element: "twin_counter_rotate_paddle_shaft",
    bestUse: "concrete_mortar_sludge_continuous",
  },
  gravity_tumble_drum: {
    uniformity: 7, intensity: 3, throughput: 8, gentleness: 10, pmCost: 4,
    continuous: false, forWet: false,
    element: "rotating_drum_baffle_tumble_lift",
    bestUse: "fragile_granule_tablet_coat_gentle",
  },
  fluidized_zone_rapid: {
    uniformity: 10, intensity: 10, throughput: 8, gentleness: 4, pmCost: 9,
    continuous: false, forWet: true,
    element: "high_speed_rotor_tool_fluidize",
    bestUse: "fine_powder_pigment_micro_batch",
  },
  pugmill_clay_paste: {
    uniformity: 8, intensity: 7, throughput: 9, gentleness: 3, pmCost: 5,
    continuous: true, forWet: true,
    element: "single_twin_screw_paddle_extrude",
    bestUse: "clay_soil_cement_paste_condition",
  },
};

function get(t: PaddleMixType): PaddleMixData {
  return DATA[t];
}

export const uniformity = (t: PaddleMixType) => get(t).uniformity;
export const intensity = (t: PaddleMixType) => get(t).intensity;
export const throughput = (t: PaddleMixType) => get(t).throughput;
export const gentleness = (t: PaddleMixType) => get(t).gentleness;
export const pmCost = (t: PaddleMixType) => get(t).pmCost;
export const continuous = (t: PaddleMixType) => get(t).continuous;
export const forWet = (t: PaddleMixType) => get(t).forWet;
export const element = (t: PaddleMixType) => get(t).element;
export const bestUse = (t: PaddleMixType) => get(t).bestUse;
export const paddleMixTypes = (): PaddleMixType[] =>
  Object.keys(DATA) as PaddleMixType[];
