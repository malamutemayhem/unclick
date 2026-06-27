export type ThreadLockType =
  | "low_strength_purple"
  | "medium_strength_blue"
  | "high_strength_red"
  | "wicking_grade_green"
  | "high_temp_orange";

const DATA: Record<ThreadLockType, {
  holdStrength: number; removability: number; cureSpeed: number;
  tempResist: number; lockCost: number; permanent: boolean;
  forPreassembled: boolean; chemistryType: string; bestUse: string;
}> = {
  low_strength_purple: { holdStrength: 3, removability: 10, cureSpeed: 6, tempResist: 5, lockCost: 3, permanent: false, forPreassembled: false, chemistryType: "anaerobic_dimethacrylate", bestUse: "instrument_set_screw" },
  medium_strength_blue: { holdStrength: 6, removability: 7, cureSpeed: 7, tempResist: 6, lockCost: 3, permanent: false, forPreassembled: false, chemistryType: "anaerobic_methacrylate", bestUse: "general_bolt_lock" },
  high_strength_red: { holdStrength: 10, removability: 2, cureSpeed: 5, tempResist: 7, lockCost: 4, permanent: true, forPreassembled: false, chemistryType: "anaerobic_trimethacrylate", bestUse: "stud_permanent_lock" },
  wicking_grade_green: { holdStrength: 7, removability: 5, cureSpeed: 8, tempResist: 6, lockCost: 5, permanent: false, forPreassembled: true, chemistryType: "low_viscosity_wick", bestUse: "preassembled_retaining" },
  high_temp_orange: { holdStrength: 7, removability: 5, cureSpeed: 4, tempResist: 10, lockCost: 6, permanent: false, forPreassembled: false, chemistryType: "modified_acrylic_resist", bestUse: "exhaust_manifold_bolt" },
};

const get = (t: ThreadLockType) => DATA[t];

export const holdStrength = (t: ThreadLockType) => get(t).holdStrength;
export const removability = (t: ThreadLockType) => get(t).removability;
export const cureSpeed = (t: ThreadLockType) => get(t).cureSpeed;
export const tempResist = (t: ThreadLockType) => get(t).tempResist;
export const lockCost = (t: ThreadLockType) => get(t).lockCost;
export const permanent = (t: ThreadLockType) => get(t).permanent;
export const forPreassembled = (t: ThreadLockType) => get(t).forPreassembled;
export const chemistryType = (t: ThreadLockType) => get(t).chemistryType;
export const bestUse = (t: ThreadLockType) => get(t).bestUse;
export const threadLocks = (): ThreadLockType[] => Object.keys(DATA) as ThreadLockType[];
