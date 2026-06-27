// ply-split-calc - ply-split braiding tool types

export type PlySplit =
  | "metal_grip_fid"
  | "wood_point_fid"
  | "bent_tip_fid"
  | "loop_end_fid"
  | "ergonomic_handle_fid";

const DATA: Record<PlySplit, {
  splitEase: number; controlFine: number; durability: number; cordRange: number;
  cost: number; forThick: boolean; ergonomic: boolean; fidProfile: string; bestUse: string;
}> = {
  metal_grip_fid:       { splitEase: 8, controlFine: 8, durability: 10, cordRange: 8, cost: 6, forThick: true, ergonomic: false, fidProfile: "tapered_steel_point", bestUse: "general_ply_split" },
  wood_point_fid:       { splitEase: 6, controlFine: 7, durability: 5, cordRange: 6, cost: 3, forThick: false, ergonomic: false, fidProfile: "carved_hardwood_tip", bestUse: "light_cord_split" },
  bent_tip_fid:         { splitEase: 9, controlFine: 9, durability: 9, cordRange: 7, cost: 7, forThick: false, ergonomic: false, fidProfile: "angled_bent_steel", bestUse: "tight_angle_split" },
  loop_end_fid:         { splitEase: 7, controlFine: 6, durability: 8, cordRange: 9, cost: 5, forThick: true, ergonomic: false, fidProfile: "looped_wire_end", bestUse: "pull_through_split" },
  ergonomic_handle_fid: { splitEase: 8, controlFine: 8, durability: 9, cordRange: 8, cost: 8, forThick: true, ergonomic: true, fidProfile: "cushion_grip_steel", bestUse: "long_session_comfort" },
};

const get = (p: PlySplit) => DATA[p];
export const splitEase = (p: PlySplit) => get(p).splitEase;
export const controlFine = (p: PlySplit) => get(p).controlFine;
export const durability = (p: PlySplit) => get(p).durability;
export const cordRange = (p: PlySplit) => get(p).cordRange;
export const fidCost = (p: PlySplit) => get(p).cost;
export const forThick = (p: PlySplit) => get(p).forThick;
export const ergonomic = (p: PlySplit) => get(p).ergonomic;
export const fidProfile = (p: PlySplit) => get(p).fidProfile;
export const bestUse = (p: PlySplit) => get(p).bestUse;
export const plySplits = (): PlySplit[] => Object.keys(DATA) as PlySplit[];
