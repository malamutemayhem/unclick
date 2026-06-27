export type ResistanceSeamType =
  | "continuous_seam"
  | "roll_spot_seam"
  | "mash_seam"
  | "foil_butt_seam"
  | "high_freq_seam";

interface ResistanceSeamData {
  sealQuality: number;
  throughput: number;
  overlap: number;
  speedRange: number;
  rsCost: number;
  leakProof: boolean;
  forTankFab: boolean;
  seamConfig: string;
  bestUse: string;
}

const DATA: Record<ResistanceSeamType, ResistanceSeamData> = {
  continuous_seam: {
    sealQuality: 9, throughput: 9, overlap: 7, speedRange: 8, rsCost: 6,
    leakProof: true, forTankFab: true,
    seamConfig: "continuous_seam_welder_rolling_electrode_constant_current_gas_tight",
    bestUse: "fuel_tank_continuous_seam_welder_gas_tight_leak_proof_roll_weld",
  },
  roll_spot_seam: {
    sealQuality: 6, throughput: 8, overlap: 5, speedRange: 9, rsCost: 4,
    leakProof: false, forTankFab: false,
    seamConfig: "roll_spot_seam_welder_intermittent_current_stitch_pattern_overlap",
    bestUse: "duct_work_roll_spot_seam_welder_stitch_weld_light_gauge_overlap",
  },
  mash_seam: {
    sealQuality: 8, throughput: 8, overlap: 10, speedRange: 7, rsCost: 7,
    leakProof: true, forTankFab: true,
    seamConfig: "mash_seam_welder_forge_overlap_flush_finish_reduce_thickness_step",
    bestUse: "tin_can_mash_seam_welder_flush_overlap_food_safe_no_step_joint",
  },
  foil_butt_seam: {
    sealQuality: 7, throughput: 7, overlap: 8, speedRange: 6, rsCost: 8,
    leakProof: true, forTankFab: false,
    seamConfig: "foil_butt_seam_welder_thin_gauge_butt_joint_precise_alignment",
    bestUse: "foil_packaging_foil_butt_seam_welder_thin_gauge_precise_butt_join",
  },
  high_freq_seam: {
    sealQuality: 10, throughput: 10, overlap: 9, speedRange: 10, rsCost: 10,
    leakProof: true, forTankFab: true,
    seamConfig: "high_freq_seam_welder_induction_coil_tube_mill_longitudinal_weld",
    bestUse: "tube_mill_high_freq_seam_welder_induction_continuous_pipe_produce",
  },
};

function get(t: ResistanceSeamType): ResistanceSeamData {
  return DATA[t];
}

export const sealQuality = (t: ResistanceSeamType) => get(t).sealQuality;
export const throughput = (t: ResistanceSeamType) => get(t).throughput;
export const overlap = (t: ResistanceSeamType) => get(t).overlap;
export const speedRange = (t: ResistanceSeamType) => get(t).speedRange;
export const rsCost = (t: ResistanceSeamType) => get(t).rsCost;
export const leakProof = (t: ResistanceSeamType) => get(t).leakProof;
export const forTankFab = (t: ResistanceSeamType) => get(t).forTankFab;
export const seamConfig = (t: ResistanceSeamType) => get(t).seamConfig;
export const bestUse = (t: ResistanceSeamType) => get(t).bestUse;
export const resistanceSeamTypes = (): ResistanceSeamType[] =>
  Object.keys(DATA) as ResistanceSeamType[];
