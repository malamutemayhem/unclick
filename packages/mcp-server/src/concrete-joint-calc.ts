export type ConcreteJointType =
  | "contraction_saw_cut_control"
  | "expansion_full_depth_filler"
  | "construction_bulkhead_day"
  | "isolation_column_pad_foam"
  | "doweled_load_transfer_bar";

interface ConcreteJointData {
  crackControl: number;
  loadTransfer: number;
  sealability: number;
  durability: number;
  cjCost: number;
  doweled: boolean;
  forSlab: boolean;
  filler: string;
  bestUse: string;
}

const DATA: Record<ConcreteJointType, ConcreteJointData> = {
  contraction_saw_cut_control: {
    crackControl: 9, loadTransfer: 4, sealability: 7, durability: 7, cjCost: 3,
    doweled: false, forSlab: true,
    filler: "polyurethane_sealant_self_level",
    bestUse: "floor_slab_parking_deck_crack_control",
  },
  expansion_full_depth_filler: {
    crackControl: 7, loadTransfer: 3, sealability: 8, durability: 8, cjCost: 6,
    doweled: false, forSlab: true,
    filler: "preformed_foam_strip_compressible",
    bestUse: "bridge_deck_building_thermal_move",
  },
  construction_bulkhead_day: {
    crackControl: 5, loadTransfer: 8, sealability: 5, durability: 9, cjCost: 4,
    doweled: true, forSlab: true,
    filler: "rebar_splice_through_bulkhead",
    bestUse: "large_pour_day_joint_continuous_slab",
  },
  isolation_column_pad_foam: {
    crackControl: 8, loadTransfer: 2, sealability: 6, durability: 7, cjCost: 2,
    doweled: false, forSlab: true,
    filler: "closed_cell_foam_wrap_pad",
    bestUse: "column_footing_separation_free_move",
  },
  doweled_load_transfer_bar: {
    crackControl: 8, loadTransfer: 10, sealability: 7, durability: 9, cjCost: 7,
    doweled: true, forSlab: true,
    filler: "smooth_round_bar_greased_sleeve",
    bestUse: "heavy_duty_warehouse_forklift_joint",
  },
};

function get(t: ConcreteJointType): ConcreteJointData {
  return DATA[t];
}

export const crackControl = (t: ConcreteJointType) => get(t).crackControl;
export const loadTransfer = (t: ConcreteJointType) => get(t).loadTransfer;
export const sealability = (t: ConcreteJointType) => get(t).sealability;
export const durability = (t: ConcreteJointType) => get(t).durability;
export const cjCost = (t: ConcreteJointType) => get(t).cjCost;
export const doweled = (t: ConcreteJointType) => get(t).doweled;
export const forSlab = (t: ConcreteJointType) => get(t).forSlab;
export const filler = (t: ConcreteJointType) => get(t).filler;
export const bestUse = (t: ConcreteJointType) => get(t).bestUse;
export const concreteJointTypes = (): ConcreteJointType[] =>
  Object.keys(DATA) as ConcreteJointType[];
