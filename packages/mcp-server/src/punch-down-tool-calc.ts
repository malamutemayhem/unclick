export type PunchDownToolType =
  | "impact_110_blade"
  | "impact_66_blade"
  | "non_impact_manual"
  | "multi_pair_gang"
  | "krone_lsa_style";

const DATA: Record<PunchDownToolType, {
  termSpeed: number; consistency: number; wireRange: number;
  durability: number; toolCost: number; impactDrive: boolean;
  multiPair: boolean; bladeType: string; bestUse: string;
}> = {
  impact_110_blade: { termSpeed: 8, consistency: 9, wireRange: 7, durability: 8, toolCost: 5, impactDrive: true, multiPair: false, bladeType: "110_cut_seat", bestUse: "patch_panel_terminate" },
  impact_66_blade: { termSpeed: 8, consistency: 9, wireRange: 6, durability: 8, toolCost: 5, impactDrive: true, multiPair: false, bladeType: "66_block_seat", bestUse: "telephone_66_block" },
  non_impact_manual: { termSpeed: 5, consistency: 5, wireRange: 5, durability: 6, toolCost: 2, impactDrive: false, multiPair: false, bladeType: "flat_push_blade", bestUse: "occasional_single_pair" },
  multi_pair_gang: { termSpeed: 10, consistency: 8, wireRange: 8, durability: 7, toolCost: 8, impactDrive: true, multiPair: true, bladeType: "gang_5pair_110", bestUse: "high_count_mass_term" },
  krone_lsa_style: { termSpeed: 8, consistency: 9, wireRange: 6, durability: 8, toolCost: 6, impactDrive: true, multiPair: false, bladeType: "krone_lsa_insert", bestUse: "european_krone_block" },
};

const get = (t: PunchDownToolType) => DATA[t];

export const termSpeed = (t: PunchDownToolType) => get(t).termSpeed;
export const consistency = (t: PunchDownToolType) => get(t).consistency;
export const wireRange = (t: PunchDownToolType) => get(t).wireRange;
export const durability = (t: PunchDownToolType) => get(t).durability;
export const toolCost = (t: PunchDownToolType) => get(t).toolCost;
export const impactDrive = (t: PunchDownToolType) => get(t).impactDrive;
export const multiPair = (t: PunchDownToolType) => get(t).multiPair;
export const bladeType = (t: PunchDownToolType) => get(t).bladeType;
export const bestUse = (t: PunchDownToolType) => get(t).bestUse;
export const punchDownTools = (): PunchDownToolType[] => Object.keys(DATA) as PunchDownToolType[];
