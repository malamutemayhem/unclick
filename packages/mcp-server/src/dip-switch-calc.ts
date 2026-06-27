export type DipSwitchType =
  | "slide_4pos_standard"
  | "rotary_hex_encode"
  | "piano_8pos_inline"
  | "recessed_tamper_proof"
  | "smd_half_pitch";

const DATA: Record<DipSwitchType, {
  positionCount: number; actuationEase: number; cycleLife: number;
  sizeCompact: number; switchCost: number; surfaceMount: boolean;
  tamperResist: boolean; actuatorType: string; bestUse: string;
}> = {
  slide_4pos_standard: { positionCount: 5, actuationEase: 7, cycleLife: 7, sizeCompact: 6, switchCost: 1, surfaceMount: false, tamperResist: false, actuatorType: "slide_lever_toggle", bestUse: "address_config_board" },
  rotary_hex_encode: { positionCount: 8, actuationEase: 8, cycleLife: 8, sizeCompact: 5, switchCost: 3, surfaceMount: false, tamperResist: false, actuatorType: "rotary_dial_hex", bestUse: "id_select_16_value" },
  piano_8pos_inline: { positionCount: 7, actuationEase: 9, cycleLife: 7, sizeCompact: 4, switchCost: 2, surfaceMount: false, tamperResist: false, actuatorType: "rocker_key_piano", bestUse: "feature_flag_config" },
  recessed_tamper_proof: { positionCount: 5, actuationEase: 3, cycleLife: 9, sizeCompact: 6, switchCost: 4, surfaceMount: false, tamperResist: true, actuatorType: "flush_recessed_pin", bestUse: "security_setting_lock" },
  smd_half_pitch: { positionCount: 6, actuationEase: 4, cycleLife: 8, sizeCompact: 10, switchCost: 2, surfaceMount: true, tamperResist: false, actuatorType: "micro_slide_smd", bestUse: "compact_pcb_option" },
};

const get = (t: DipSwitchType) => DATA[t];

export const positionCount = (t: DipSwitchType) => get(t).positionCount;
export const actuationEase = (t: DipSwitchType) => get(t).actuationEase;
export const cycleLife = (t: DipSwitchType) => get(t).cycleLife;
export const sizeCompact = (t: DipSwitchType) => get(t).sizeCompact;
export const switchCost = (t: DipSwitchType) => get(t).switchCost;
export const surfaceMount = (t: DipSwitchType) => get(t).surfaceMount;
export const tamperResist = (t: DipSwitchType) => get(t).tamperResist;
export const actuatorType = (t: DipSwitchType) => get(t).actuatorType;
export const bestUse = (t: DipSwitchType) => get(t).bestUse;
export const dipSwitches = (): DipSwitchType[] => Object.keys(DATA) as DipSwitchType[];
