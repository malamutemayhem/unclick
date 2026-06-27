export type BasePlateType =
  | "column_base_welded_gusset"
  | "leveling_nut_anchor_rod"
  | "grouted_shim_pack_wedge"
  | "moment_base_stiffened_rib"
  | "pinned_base_single_bolt";

interface BasePlateData {
  moment: number;
  shear: number;
  adjustability: number;
  stiffness: number;
  bpCost: number;
  stiffened: boolean;
  forMoment: boolean;
  connection: string;
  bestUse: string;
}

const DATA: Record<BasePlateType, BasePlateData> = {
  column_base_welded_gusset: {
    moment: 8, shear: 8, adjustability: 3, stiffness: 9, bpCost: 7,
    stiffened: true, forMoment: true,
    connection: "fillet_weld_gusset_plate_anchor",
    bestUse: "steel_frame_column_fixed_base",
  },
  leveling_nut_anchor_rod: {
    moment: 5, shear: 6, adjustability: 10, stiffness: 5, bpCost: 4,
    stiffened: false, forMoment: false,
    connection: "double_nut_leveling_anchor_rod",
    bestUse: "equipment_skid_machine_level_mount",
  },
  grouted_shim_pack_wedge: {
    moment: 6, shear: 7, adjustability: 7, stiffness: 7, bpCost: 5,
    stiffened: false, forMoment: false,
    connection: "shim_pack_grout_pour_under_plate",
    bestUse: "general_column_gravity_load_base",
  },
  moment_base_stiffened_rib: {
    moment: 10, shear: 9, adjustability: 2, stiffness: 10, bpCost: 10,
    stiffened: true, forMoment: true,
    connection: "rib_stiffener_thick_plate_embed",
    bestUse: "moment_frame_seismic_rigid_base",
  },
  pinned_base_single_bolt: {
    moment: 2, shear: 5, adjustability: 8, stiffness: 3, bpCost: 2,
    stiffened: false, forMoment: false,
    connection: "single_anchor_bolt_center_pin",
    bestUse: "braced_frame_pinned_column_base",
  },
};

function get(t: BasePlateType): BasePlateData {
  return DATA[t];
}

export const moment = (t: BasePlateType) => get(t).moment;
export const shear = (t: BasePlateType) => get(t).shear;
export const adjustability = (t: BasePlateType) => get(t).adjustability;
export const stiffness = (t: BasePlateType) => get(t).stiffness;
export const bpCost = (t: BasePlateType) => get(t).bpCost;
export const stiffened = (t: BasePlateType) => get(t).stiffened;
export const forMoment = (t: BasePlateType) => get(t).forMoment;
export const connection = (t: BasePlateType) => get(t).connection;
export const bestUse = (t: BasePlateType) => get(t).bestUse;
export const basePlateTypes = (): BasePlateType[] =>
  Object.keys(DATA) as BasePlateType[];
