// finger-loop-calc - finger loop braiding types

export type FingerLoop =
  | "five_loop_basic"
  | "seven_loop_standard"
  | "nine_loop_complex"
  | "bicolor_loop_pattern"
  | "spiral_loop_twist";

const DATA: Record<FingerLoop, {
  patternRange: number; complexityLevel: number; speedBraid: number; portability: number;
  cost: number; forSolo: boolean; forBeginner: boolean; loopSetup: string; bestUse: string;
}> = {
  five_loop_basic:       { patternRange: 4, complexityLevel: 3, speedBraid: 9, portability: 10, cost: 1, forSolo: true, forBeginner: true, loopSetup: "five_finger_hold", bestUse: "simple_flat_braid" },
  seven_loop_standard:   { patternRange: 6, complexityLevel: 5, speedBraid: 7, portability: 10, cost: 1, forSolo: true, forBeginner: true, loopSetup: "seven_finger_hold", bestUse: "general_round_braid" },
  nine_loop_complex:     { patternRange: 8, complexityLevel: 8, speedBraid: 5, portability: 10, cost: 1, forSolo: false, forBeginner: false, loopSetup: "nine_finger_partner", bestUse: "complex_pattern_braid" },
  bicolor_loop_pattern:  { patternRange: 9, complexityLevel: 7, speedBraid: 6, portability: 10, cost: 2, forSolo: true, forBeginner: false, loopSetup: "two_color_loop_set", bestUse: "patterned_color_braid" },
  spiral_loop_twist:     { patternRange: 7, complexityLevel: 6, speedBraid: 7, portability: 10, cost: 1, forSolo: true, forBeginner: false, loopSetup: "twisted_spiral_hold", bestUse: "spiral_texture_braid" },
};

const get = (l: FingerLoop) => DATA[l];
export const patternRange = (l: FingerLoop) => get(l).patternRange;
export const complexityLevel = (l: FingerLoop) => get(l).complexityLevel;
export const speedBraid = (l: FingerLoop) => get(l).speedBraid;
export const portability = (l: FingerLoop) => get(l).portability;
export const loopCost = (l: FingerLoop) => get(l).cost;
export const forSolo = (l: FingerLoop) => get(l).forSolo;
export const forBeginner = (l: FingerLoop) => get(l).forBeginner;
export const loopSetup = (l: FingerLoop) => get(l).loopSetup;
export const bestUse = (l: FingerLoop) => get(l).bestUse;
export const fingerLoops = (): FingerLoop[] => Object.keys(DATA) as FingerLoop[];
