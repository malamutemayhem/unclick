// biscuit-joiner-calc - biscuit joiner tool types

export type BiscuitJoiner =
  | "standard_plate_joiner"
  | "mini_biscuit_detail"
  | "heavy_duty_joiner"
  | "cordless_biscuit_port"
  | "laminate_trim_biscuit";

const DATA: Record<BiscuitJoiner, {
  cutAccuracy: number; alignStrength: number; setupSpeed: number; portability: number;
  cost: number; cordless: boolean; forThick: boolean; bladeType: string; bestUse: string;
}> = {
  standard_plate_joiner:  { cutAccuracy: 8, alignStrength: 8, setupSpeed: 8, portability: 7, cost: 5, cordless: false, forThick: true, bladeType: "4_inch_carbide", bestUse: "general_edge_joint" },
  mini_biscuit_detail:    { cutAccuracy: 9, alignStrength: 6, setupSpeed: 7, portability: 8, cost: 4, cordless: false, forThick: false, bladeType: "small_detail_blade", bestUse: "small_frame_joint" },
  heavy_duty_joiner:      { cutAccuracy: 8, alignStrength: 10, setupSpeed: 6, portability: 4, cost: 8, cordless: false, forThick: true, bladeType: "heavy_carbide_disc", bestUse: "thick_panel_join" },
  cordless_biscuit_port:  { cutAccuracy: 7, alignStrength: 7, setupSpeed: 9, portability: 10, cost: 7, cordless: true, forThick: false, bladeType: "compact_carbide", bestUse: "site_work_joint" },
  laminate_trim_biscuit:  { cutAccuracy: 10, alignStrength: 5, setupSpeed: 8, portability: 6, cost: 6, cordless: false, forThick: false, bladeType: "flush_trim_blade", bestUse: "laminate_align_join" },
};

const get = (b: BiscuitJoiner) => DATA[b];
export const cutAccuracy = (b: BiscuitJoiner) => get(b).cutAccuracy;
export const alignStrength = (b: BiscuitJoiner) => get(b).alignStrength;
export const setupSpeed = (b: BiscuitJoiner) => get(b).setupSpeed;
export const portability = (b: BiscuitJoiner) => get(b).portability;
export const joinerCost = (b: BiscuitJoiner) => get(b).cost;
export const cordless = (b: BiscuitJoiner) => get(b).cordless;
export const forThick = (b: BiscuitJoiner) => get(b).forThick;
export const bladeType = (b: BiscuitJoiner) => get(b).bladeType;
export const bestUse = (b: BiscuitJoiner) => get(b).bestUse;
export const biscuitJoiners = (): BiscuitJoiner[] => Object.keys(DATA) as BiscuitJoiner[];
