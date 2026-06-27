export type OxyFuelCutType =
  | "oxy_acetylene_manual"
  | "oxy_propane_mechanized"
  | "oxy_natural_gas_heavy"
  | "multi_torch_plate_nest"
  | "shape_cutting_cnc_gantry";

interface OxyFuelCutData {
  thickness: number;
  speed: number;
  portability: number;
  operatingCost: number;
  ofCost: number;
  portable: boolean;
  forHeavyPlate: boolean;
  fuel: string;
  bestUse: string;
}

const DATA: Record<OxyFuelCutType, OxyFuelCutData> = {
  oxy_acetylene_manual: {
    thickness: 8, speed: 5, portability: 10, operatingCost: 6, ofCost: 3,
    portable: true, forHeavyPlate: false,
    fuel: "acetylene_c2h2_oxygen",
    bestUse: "field_repair_demolition_scrap",
  },
  oxy_propane_mechanized: {
    thickness: 9, speed: 7, portability: 5, operatingCost: 4, ofCost: 5,
    portable: false, forHeavyPlate: true,
    fuel: "propane_c3h8_oxygen",
    bestUse: "shipyard_plate_structural_cut",
  },
  oxy_natural_gas_heavy: {
    thickness: 10, speed: 6, portability: 3, operatingCost: 3, ofCost: 6,
    portable: false, forHeavyPlate: true,
    fuel: "natural_gas_methane_ch4_oxygen",
    bestUse: "slab_billet_bloom_steel_mill",
  },
  multi_torch_plate_nest: {
    thickness: 9, speed: 9, portability: 2, operatingCost: 5, ofCost: 8,
    portable: false, forHeavyPlate: true,
    fuel: "propane_multi_head_simultaneous",
    bestUse: "plate_nest_high_volume_batch",
  },
  shape_cutting_cnc_gantry: {
    thickness: 9, speed: 8, portability: 2, operatingCost: 5, ofCost: 7,
    portable: false, forHeavyPlate: true,
    fuel: "acetylene_propane_cnc_control",
    bestUse: "flange_base_plate_cnc_profile",
  },
};

function get(t: OxyFuelCutType): OxyFuelCutData {
  return DATA[t];
}

export const thickness = (t: OxyFuelCutType) => get(t).thickness;
export const speed = (t: OxyFuelCutType) => get(t).speed;
export const portability = (t: OxyFuelCutType) => get(t).portability;
export const operatingCost = (t: OxyFuelCutType) => get(t).operatingCost;
export const ofCost = (t: OxyFuelCutType) => get(t).ofCost;
export const portable = (t: OxyFuelCutType) => get(t).portable;
export const forHeavyPlate = (t: OxyFuelCutType) => get(t).forHeavyPlate;
export const fuel = (t: OxyFuelCutType) => get(t).fuel;
export const bestUse = (t: OxyFuelCutType) => get(t).bestUse;
export const oxyFuelCutTypes = (): OxyFuelCutType[] =>
  Object.keys(DATA) as OxyFuelCutType[];
