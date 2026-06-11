export type PcbStandoffType =
  | "hex_male_female_brass"
  | "round_nylon_snap"
  | "threaded_steel_stud"
  | "adhesive_rubber_bump"
  | "swage_press_fit";

const DATA: Record<PcbStandoffType, {
  loadCapacity: number; installEase: number; vibrationResist: number;
  sizeCompact: number; standoffCost: number; reusable: boolean;
  conductive: boolean; mountMethod: string; bestUse: string;
}> = {
  hex_male_female_brass: { loadCapacity: 8, installEase: 7, vibrationResist: 7, sizeCompact: 6, standoffCost: 3, reusable: true, conductive: true, mountMethod: "screw_both_ends", bestUse: "stacked_pcb_assembly" },
  round_nylon_snap: { loadCapacity: 4, installEase: 10, vibrationResist: 5, sizeCompact: 7, standoffCost: 1, reusable: true, conductive: false, mountMethod: "snap_push_fit_hole", bestUse: "quick_prototype_mount" },
  threaded_steel_stud: { loadCapacity: 10, installEase: 5, vibrationResist: 9, sizeCompact: 5, standoffCost: 4, reusable: true, conductive: true, mountMethod: "stud_locknut_thread", bestUse: "heavy_board_chassis" },
  adhesive_rubber_bump: { loadCapacity: 2, installEase: 10, vibrationResist: 8, sizeCompact: 9, standoffCost: 1, reusable: false, conductive: false, mountMethod: "peel_stick_adhesive", bestUse: "vibration_damp_foot" },
  swage_press_fit: { loadCapacity: 7, installEase: 4, vibrationResist: 9, sizeCompact: 8, standoffCost: 3, reusable: false, conductive: true, mountMethod: "press_fit_solder_pad", bestUse: "smd_board_permanent" },
};

const get = (t: PcbStandoffType) => DATA[t];

export const loadCapacity = (t: PcbStandoffType) => get(t).loadCapacity;
export const installEase = (t: PcbStandoffType) => get(t).installEase;
export const vibrationResist = (t: PcbStandoffType) => get(t).vibrationResist;
export const sizeCompact = (t: PcbStandoffType) => get(t).sizeCompact;
export const standoffCost = (t: PcbStandoffType) => get(t).standoffCost;
export const reusable = (t: PcbStandoffType) => get(t).reusable;
export const conductive = (t: PcbStandoffType) => get(t).conductive;
export const mountMethod = (t: PcbStandoffType) => get(t).mountMethod;
export const bestUse = (t: PcbStandoffType) => get(t).bestUse;
export const pcbStandoffs = (): PcbStandoffType[] => Object.keys(DATA) as PcbStandoffType[];
