export type BallValveControlType =
  | "v_port_characterized"
  | "full_bore_on_off"
  | "segmented_ball_high_cv"
  | "trunnion_mounted_large"
  | "cryogenic_extended_bon";

interface BallValveControlData {
  controlRange: number;
  flowCapacity: number;
  tightShutoff: number;
  cavitationResist: number;
  bvCost: number;
  characterized: boolean;
  forSlurry: boolean;
  trim: string;
  bestUse: string;
}

const DATA: Record<BallValveControlType, BallValveControlData> = {
  v_port_characterized: {
    controlRange: 9, flowCapacity: 7, tightShutoff: 8, cavitationResist: 7, bvCost: 6,
    characterized: true, forSlurry: false,
    trim: "v_notch_ball_equal_percentage_characterized",
    bestUse: "chemical_process_modulating_flow_control",
  },
  full_bore_on_off: {
    controlRange: 3, flowCapacity: 10, tightShutoff: 10, cavitationResist: 5, bvCost: 4,
    characterized: false, forSlurry: true,
    trim: "full_bore_ball_unrestricted_passage_piggable",
    bestUse: "pipeline_isolation_batch_on_off_pigging",
  },
  segmented_ball_high_cv: {
    controlRange: 10, flowCapacity: 9, tightShutoff: 7, cavitationResist: 8, bvCost: 7,
    characterized: true, forSlurry: true,
    trim: "segmented_v_ball_shearing_action_high_cv",
    bestUse: "pulp_paper_slurry_fibrous_media_high_capacity",
  },
  trunnion_mounted_large: {
    controlRange: 6, flowCapacity: 10, tightShutoff: 9, cavitationResist: 7, bvCost: 8,
    characterized: false, forSlurry: false,
    trim: "trunnion_support_double_block_bleed_large",
    bestUse: "oil_gas_pipeline_large_bore_high_pressure",
  },
  cryogenic_extended_bon: {
    controlRange: 7, flowCapacity: 8, tightShutoff: 9, cavitationResist: 6, bvCost: 9,
    characterized: false, forSlurry: false,
    trim: "extended_bonnet_cryogenic_stem_packing_cold",
    bestUse: "lng_cryogenic_liquid_nitrogen_oxygen_service",
  },
};

function get(t: BallValveControlType): BallValveControlData {
  return DATA[t];
}

export const controlRange = (t: BallValveControlType) => get(t).controlRange;
export const flowCapacity = (t: BallValveControlType) => get(t).flowCapacity;
export const tightShutoff = (t: BallValveControlType) => get(t).tightShutoff;
export const cavitationResist = (t: BallValveControlType) => get(t).cavitationResist;
export const bvCost = (t: BallValveControlType) => get(t).bvCost;
export const characterized = (t: BallValveControlType) => get(t).characterized;
export const forSlurry = (t: BallValveControlType) => get(t).forSlurry;
export const trim = (t: BallValveControlType) => get(t).trim;
export const bestUse = (t: BallValveControlType) => get(t).bestUse;
export const ballValveControlTypes = (): BallValveControlType[] =>
  Object.keys(DATA) as BallValveControlType[];
