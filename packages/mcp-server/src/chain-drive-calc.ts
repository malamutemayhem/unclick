export type ChainDriveType =
  | "roller_single_strand"
  | "roller_multi_strand"
  | "silent_inverted_tooth"
  | "leaf_chain_lift"
  | "engineering_class_conveyor";

interface ChainDriveData {
  torque: number;
  speed: number;
  precision: number;
  life: number;
  cdCost: number;
  lubricated: boolean;
  forConveyor: boolean;
  link: string;
  bestUse: string;
}

const DATA: Record<ChainDriveType, ChainDriveData> = {
  roller_single_strand: {
    torque: 7, speed: 8, precision: 6, life: 7, cdCost: 4,
    lubricated: true, forConveyor: false,
    link: "ansi_roller_single_strand_steel",
    bestUse: "general_machine_motorcycle_drive",
  },
  roller_multi_strand: {
    torque: 10, speed: 7, precision: 6, life: 8, cdCost: 6,
    lubricated: true, forConveyor: false,
    link: "ansi_roller_duplex_triplex_steel",
    bestUse: "high_torque_crusher_mill_compressor",
  },
  silent_inverted_tooth: {
    torque: 7, speed: 10, precision: 9, life: 9, cdCost: 8,
    lubricated: true, forConveyor: false,
    link: "inverted_tooth_precision_meshing",
    bestUse: "high_speed_camshaft_print_register",
  },
  leaf_chain_lift: {
    torque: 9, speed: 4, precision: 5, life: 8, cdCost: 5,
    lubricated: false, forConveyor: false,
    link: "leaf_chain_pin_link_plate_stack",
    bestUse: "forklift_mast_counterweight_lift",
  },
  engineering_class_conveyor: {
    torque: 10, speed: 5, precision: 4, life: 9, cdCost: 7,
    lubricated: false, forConveyor: true,
    link: "cast_steel_attachment_apron_plate",
    bestUse: "bulk_material_apron_drag_conveyor",
  },
};

function get(t: ChainDriveType): ChainDriveData {
  return DATA[t];
}

export const torque = (t: ChainDriveType) => get(t).torque;
export const speed = (t: ChainDriveType) => get(t).speed;
export const precision = (t: ChainDriveType) => get(t).precision;
export const life = (t: ChainDriveType) => get(t).life;
export const cdCost = (t: ChainDriveType) => get(t).cdCost;
export const lubricated = (t: ChainDriveType) => get(t).lubricated;
export const forConveyor = (t: ChainDriveType) => get(t).forConveyor;
export const link = (t: ChainDriveType) => get(t).link;
export const bestUse = (t: ChainDriveType) => get(t).bestUse;
export const chainDriveTypes = (): ChainDriveType[] =>
  Object.keys(DATA) as ChainDriveType[];
