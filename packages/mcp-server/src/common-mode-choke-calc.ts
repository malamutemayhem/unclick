export type CommonModeChokeType =
  | "toroid_wound_pair"
  | "smd_chip_common"
  | "nanocrystal_core"
  | "line_filter_three"
  | "planar_pcb_embed";

const DATA: Record<CommonModeChokeType, {
  impedance: number; currentRating: number; freqRange: number;
  insertionLoss: number; chokeCost: number; surfaceMount: boolean;
  forHighFreq: boolean; coreType: string; bestUse: string;
}> = {
  toroid_wound_pair: { impedance: 8, currentRating: 9, freqRange: 6, insertionLoss: 7, chokeCost: 4, surfaceMount: false, forHighFreq: false, coreType: "manganese_zinc_ferrite", bestUse: "power_line_emi_suppress" },
  smd_chip_common: { impedance: 6, currentRating: 4, freqRange: 8, insertionLoss: 6, chokeCost: 3, surfaceMount: true, forHighFreq: true, coreType: "multilayer_ceramic", bestUse: "usb_hdmi_data_filter" },
  nanocrystal_core: { impedance: 10, currentRating: 7, freqRange: 10, insertionLoss: 9, chokeCost: 8, surfaceMount: false, forHighFreq: true, coreType: "amorphous_nanocrystal", bestUse: "wideband_emc_compliance" },
  line_filter_three: { impedance: 7, currentRating: 10, freqRange: 5, insertionLoss: 7, chokeCost: 6, surfaceMount: false, forHighFreq: false, coreType: "iron_powder_three_phase", bestUse: "three_phase_motor_drive" },
  planar_pcb_embed: { impedance: 5, currentRating: 5, freqRange: 9, insertionLoss: 5, chokeCost: 5, surfaceMount: true, forHighFreq: true, coreType: "pcb_trace_integrated", bestUse: "high_speed_diff_pair_cmr" },
};

const get = (t: CommonModeChokeType) => DATA[t];

export const impedance = (t: CommonModeChokeType) => get(t).impedance;
export const currentRating = (t: CommonModeChokeType) => get(t).currentRating;
export const freqRange = (t: CommonModeChokeType) => get(t).freqRange;
export const insertionLoss = (t: CommonModeChokeType) => get(t).insertionLoss;
export const chokeCost = (t: CommonModeChokeType) => get(t).chokeCost;
export const surfaceMount = (t: CommonModeChokeType) => get(t).surfaceMount;
export const forHighFreq = (t: CommonModeChokeType) => get(t).forHighFreq;
export const coreType = (t: CommonModeChokeType) => get(t).coreType;
export const bestUse = (t: CommonModeChokeType) => get(t).bestUse;
export const commonModeChokes = (): CommonModeChokeType[] => Object.keys(DATA) as CommonModeChokeType[];
