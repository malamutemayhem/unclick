// pottery-rib-calc - pottery rib tool types

export type PotteryRib =
  | "wood_rib_smooth"
  | "metal_rib_scrape"
  | "rubber_rib_flex"
  | "silicone_rib_soft"
  | "plastic_rib_general";

const DATA: Record<PotteryRib, {
  smoothFinish: number; controlShape: number; durability: number; flexRange: number;
  cost: number; flexible: boolean; forThrowing: boolean; ribProfile: string; bestUse: string;
}> = {
  wood_rib_smooth:     { smoothFinish: 8, controlShape: 8, durability: 7, flexRange: 4, cost: 4, flexible: false, forThrowing: true, ribProfile: "curved_hardwood_edge", bestUse: "general_wheel_shape" },
  metal_rib_scrape:    { smoothFinish: 10, controlShape: 9, durability: 10, flexRange: 3, cost: 7, flexible: false, forThrowing: true, ribProfile: "thin_steel_blade", bestUse: "fine_surface_scrape" },
  rubber_rib_flex:     { smoothFinish: 7, controlShape: 7, durability: 6, flexRange: 9, cost: 5, flexible: true, forThrowing: true, ribProfile: "soft_rubber_curve", bestUse: "curved_form_shape" },
  silicone_rib_soft:   { smoothFinish: 9, controlShape: 6, durability: 8, flexRange: 10, cost: 6, flexible: true, forThrowing: false, ribProfile: "ultra_soft_silicone", bestUse: "gentle_smooth_finish" },
  plastic_rib_general: { smoothFinish: 6, controlShape: 7, durability: 5, flexRange: 6, cost: 2, flexible: false, forThrowing: true, ribProfile: "rigid_poly_shape", bestUse: "beginner_all_purpose" },
};

const get = (r: PotteryRib) => DATA[r];
export const smoothFinish = (r: PotteryRib) => get(r).smoothFinish;
export const controlShape = (r: PotteryRib) => get(r).controlShape;
export const durability = (r: PotteryRib) => get(r).durability;
export const flexRange = (r: PotteryRib) => get(r).flexRange;
export const ribCost = (r: PotteryRib) => get(r).cost;
export const flexible = (r: PotteryRib) => get(r).flexible;
export const forThrowing = (r: PotteryRib) => get(r).forThrowing;
export const ribProfile = (r: PotteryRib) => get(r).ribProfile;
export const bestUse = (r: PotteryRib) => get(r).bestUse;
export const potteryRibs = (): PotteryRib[] => Object.keys(DATA) as PotteryRib[];
