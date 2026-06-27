export type CentrifugalCasterType =
  | "true_centrifugal"
  | "semi_centrifugal"
  | "centrifuge_cast"
  | "spin_cast"
  | "vertical_centrifugal";

interface CentrifugalCasterData {
  densityControl: number;
  throughput: number;
  wallUniformity: number;
  surfaceFinish: number;
  ccCost_: number;
  hollow: boolean;
  forPipe: boolean;
  casterConfig: string;
  bestUse: string;
}

const DATA: Record<CentrifugalCasterType, CentrifugalCasterData> = {
  true_centrifugal: {
    densityControl: 9, throughput: 7, wallUniformity: 9, surfaceFinish: 8, ccCost_: 7,
    hollow: true, forPipe: true,
    casterConfig: "true_centrifugal_caster_horizontal_spin_mold_hollow_cylinder",
    bestUse: "iron_pipe_true_centrifugal_caster_horizontal_spin_hollow_tube",
  },
  semi_centrifugal: {
    densityControl: 8, throughput: 6, wallUniformity: 7, surfaceFinish: 7, ccCost_: 6,
    hollow: false, forPipe: false,
    casterConfig: "semi_centrifugal_caster_central_sprue_spin_wheel_pulley_gear",
    bestUse: "gear_pulley_semi_centrifugal_caster_central_sprue_spin_dense",
  },
  centrifuge_cast: {
    densityControl: 7, throughput: 8, wallUniformity: 6, surfaceFinish: 7, ccCost_: 5,
    hollow: false, forPipe: false,
    casterConfig: "centrifuge_caster_multi_cavity_arm_spin_small_part_jewelry",
    bestUse: "jewelry_dental_centrifuge_caster_multi_cavity_arm_spin_small",
  },
  spin_cast: {
    densityControl: 6, throughput: 9, wallUniformity: 6, surfaceFinish: 6, ccCost_: 4,
    hollow: false, forPipe: false,
    casterConfig: "spin_caster_rubber_mold_rotate_zinc_pewter_low_melt_alloy",
    bestUse: "novelty_token_spin_caster_rubber_mold_zinc_pewter_low_melt",
  },
  vertical_centrifugal: {
    densityControl: 9, throughput: 5, wallUniformity: 8, surfaceFinish: 8, ccCost_: 8,
    hollow: true, forPipe: true,
    casterConfig: "vertical_centrifugal_caster_upright_spin_short_ring_bushing",
    bestUse: "bearing_ring_vertical_centrifugal_caster_upright_spin_bushing",
  },
};

function get(t: CentrifugalCasterType): CentrifugalCasterData {
  return DATA[t];
}

export const densityControl = (t: CentrifugalCasterType) => get(t).densityControl;
export const throughput = (t: CentrifugalCasterType) => get(t).throughput;
export const wallUniformity = (t: CentrifugalCasterType) => get(t).wallUniformity;
export const surfaceFinish = (t: CentrifugalCasterType) => get(t).surfaceFinish;
export const ccCost_ = (t: CentrifugalCasterType) => get(t).ccCost_;
export const hollow = (t: CentrifugalCasterType) => get(t).hollow;
export const forPipe = (t: CentrifugalCasterType) => get(t).forPipe;
export const casterConfig = (t: CentrifugalCasterType) => get(t).casterConfig;
export const bestUse = (t: CentrifugalCasterType) => get(t).bestUse;
export const centrifugalCasterTypes = (): CentrifugalCasterType[] =>
  Object.keys(DATA) as CentrifugalCasterType[];
