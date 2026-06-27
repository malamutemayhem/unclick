// box-joint-jig-calc - box joint jig types for woodworking

export type BoxJointJig =
  | "table_saw_sled"
  | "router_table_jig"
  | "dedicated_box_joint"
  | "micro_adjust_finger"
  | "hand_cut_guide";

const DATA: Record<BoxJointJig, {
  fitAccuracy: number; setupSpeed: number; sizeRange: number; durability: number;
  cost: number; powered: boolean; adjustable: boolean; cutMethod: string; bestUse: string;
}> = {
  table_saw_sled:       { fitAccuracy: 8, setupSpeed: 6, sizeRange: 8, durability: 9, cost: 4, powered: true, adjustable: true, cutMethod: "dado_blade_sled", bestUse: "general_box_joint" },
  router_table_jig:     { fitAccuracy: 9, setupSpeed: 5, sizeRange: 7, durability: 8, cost: 5, powered: true, adjustable: true, cutMethod: "straight_bit_index", bestUse: "clean_router_joint" },
  dedicated_box_joint:  { fitAccuracy: 10, setupSpeed: 9, sizeRange: 6, durability: 9, cost: 8, powered: true, adjustable: true, cutMethod: "precision_index_pin", bestUse: "production_box_joint" },
  micro_adjust_finger:  { fitAccuracy: 10, setupSpeed: 7, sizeRange: 10, durability: 8, cost: 9, powered: true, adjustable: true, cutMethod: "micro_dial_index", bestUse: "variable_finger_width" },
  hand_cut_guide:       { fitAccuracy: 7, setupSpeed: 4, sizeRange: 5, durability: 7, cost: 3, powered: false, adjustable: false, cutMethod: "saw_guide_block", bestUse: "traditional_hand_cut" },
};

const get = (j: BoxJointJig) => DATA[j];
export const fitAccuracy = (j: BoxJointJig) => get(j).fitAccuracy;
export const setupSpeed = (j: BoxJointJig) => get(j).setupSpeed;
export const sizeRange = (j: BoxJointJig) => get(j).sizeRange;
export const durability = (j: BoxJointJig) => get(j).durability;
export const jigCost = (j: BoxJointJig) => get(j).cost;
export const powered = (j: BoxJointJig) => get(j).powered;
export const adjustable = (j: BoxJointJig) => get(j).adjustable;
export const cutMethod = (j: BoxJointJig) => get(j).cutMethod;
export const bestUse = (j: BoxJointJig) => get(j).bestUse;
export const boxJointJigs = (): BoxJointJig[] => Object.keys(DATA) as BoxJointJig[];
