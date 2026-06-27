// mezzotint-calc - mezzotint rocker and tool types

export type Mezzotint =
  | "standard_rocker_medium"
  | "fine_rocker_detail"
  | "coarse_rocker_bold"
  | "roulette_mezzotint_texture"
  | "burnisher_smooth_tone";

const DATA: Record<Mezzotint, {
  toneRange: number; detailFine: number; speedPrep: number; durability: number;
  cost: number; forLarge: boolean; forSmoothing: boolean; toothPattern: string; bestUse: string;
}> = {
  standard_rocker_medium: { toneRange: 8, detailFine: 7, speedPrep: 6, durability: 8, cost: 8, forLarge: true, forSmoothing: false, toothPattern: "medium_pitch_teeth", bestUse: "general_mezzotint_ground" },
  fine_rocker_detail: { toneRange: 7, detailFine: 10, speedPrep: 4, durability: 7, cost: 10, forLarge: false, forSmoothing: false, toothPattern: "fine_pitch_teeth", bestUse: "detailed_portrait_ground" },
  coarse_rocker_bold: { toneRange: 9, detailFine: 4, speedPrep: 8, durability: 9, cost: 7, forLarge: true, forSmoothing: false, toothPattern: "coarse_pitch_teeth", bestUse: "bold_dark_ground" },
  roulette_mezzotint_texture: { toneRange: 6, detailFine: 6, speedPrep: 9, durability: 8, cost: 6, forLarge: false, forSmoothing: false, toothPattern: "dotted_wheel_pattern", bestUse: "partial_tone_texture" },
  burnisher_smooth_tone: { toneRange: 10, detailFine: 9, speedPrep: 5, durability: 10, cost: 9, forLarge: false, forSmoothing: true, toothPattern: "smooth_polished_face", bestUse: "highlight_smooth_area" },
};

const get = (m: Mezzotint) => DATA[m];
export const toneRange = (m: Mezzotint) => get(m).toneRange;
export const detailFine = (m: Mezzotint) => get(m).detailFine;
export const speedPrep = (m: Mezzotint) => get(m).speedPrep;
export const durability = (m: Mezzotint) => get(m).durability;
export const mezzCost = (m: Mezzotint) => get(m).cost;
export const forLarge = (m: Mezzotint) => get(m).forLarge;
export const forSmoothing = (m: Mezzotint) => get(m).forSmoothing;
export const toothPattern = (m: Mezzotint) => get(m).toothPattern;
export const bestUse = (m: Mezzotint) => get(m).bestUse;
export const mezzotints = (): Mezzotint[] => Object.keys(DATA) as Mezzotint[];
