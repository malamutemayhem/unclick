// dowel-jig-calc - dowel jig types for woodworking

export type DowelJig =
  | "self_centering_clamp"
  | "doweling_plate_fixed"
  | "precision_guide_bore"
  | "pocket_dowel_angled"
  | "loose_bushing_basic";

const DATA: Record<DowelJig, {
  alignAccuracy: number; setupSpeed: number; sizeRange: number; durability: number;
  cost: number; selfCentering: boolean; forAngled: boolean; guideMethod: string; bestUse: string;
}> = {
  self_centering_clamp:  { alignAccuracy: 9, setupSpeed: 9, sizeRange: 7, durability: 8, cost: 6, selfCentering: true, forAngled: false, guideMethod: "v_clamp_center", bestUse: "general_edge_dowel" },
  doweling_plate_fixed:  { alignAccuracy: 7, setupSpeed: 7, sizeRange: 5, durability: 10, cost: 3, selfCentering: false, forAngled: false, guideMethod: "fixed_hole_plate", bestUse: "simple_dowel_hole" },
  precision_guide_bore:  { alignAccuracy: 10, setupSpeed: 6, sizeRange: 9, durability: 9, cost: 8, selfCentering: true, forAngled: false, guideMethod: "precision_bushing_bore", bestUse: "exact_alignment_dowel" },
  pocket_dowel_angled:   { alignAccuracy: 8, setupSpeed: 8, sizeRange: 6, durability: 7, cost: 7, selfCentering: false, forAngled: true, guideMethod: "angled_bore_guide", bestUse: "angled_joint_dowel" },
  loose_bushing_basic:   { alignAccuracy: 6, setupSpeed: 5, sizeRange: 8, durability: 6, cost: 2, selfCentering: false, forAngled: false, guideMethod: "removable_bushing", bestUse: "budget_dowel_joint" },
};

const get = (j: DowelJig) => DATA[j];
export const alignAccuracy = (j: DowelJig) => get(j).alignAccuracy;
export const setupSpeed = (j: DowelJig) => get(j).setupSpeed;
export const sizeRange = (j: DowelJig) => get(j).sizeRange;
export const durability = (j: DowelJig) => get(j).durability;
export const jigCost = (j: DowelJig) => get(j).cost;
export const selfCentering = (j: DowelJig) => get(j).selfCentering;
export const forAngled = (j: DowelJig) => get(j).forAngled;
export const guideMethod = (j: DowelJig) => get(j).guideMethod;
export const bestUse = (j: DowelJig) => get(j).bestUse;
export const dowelJigs = (): DowelJig[] => Object.keys(DATA) as DowelJig[];
