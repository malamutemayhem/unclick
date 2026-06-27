export type DieAttach =
  | "epoxy_adhesive"
  | "solder_preform"
  | "sintered_silver"
  | "eutectic_ausi"
  | "flip_chip_bump";

const DATA: Record<DieAttach, {
  thermalCond: number; bondStrength: number; processTemp: number;
  reliability: number; attachCost: number; reworkable: boolean;
  forPower: boolean; material: string; bestUse: string;
}> = {
  epoxy_adhesive: {
    thermalCond: 3, bondStrength: 5, processTemp: 3,
    reliability: 5, attachCost: 2, reworkable: false,
    forPower: false, material: "silver_filled_epoxy",
    bestUse: "consumer_ic_assembly",
  },
  solder_preform: {
    thermalCond: 6, bondStrength: 7, processTemp: 6,
    reliability: 7, attachCost: 5, reworkable: true,
    forPower: true, material: "sn_ag_cu_preform",
    bestUse: "igbt_module_assembly",
  },
  sintered_silver: {
    thermalCond: 10, bondStrength: 9, processTemp: 5,
    reliability: 10, attachCost: 8, reworkable: false,
    forPower: true, material: "nano_silver_paste",
    bestUse: "sic_power_module",
  },
  eutectic_ausi: {
    thermalCond: 8, bondStrength: 8, processTemp: 9,
    reliability: 8, attachCost: 9, reworkable: false,
    forPower: true, material: "gold_silicon_eutectic",
    bestUse: "hermetic_mil_hybrid",
  },
  flip_chip_bump: {
    thermalCond: 7, bondStrength: 6, processTemp: 7,
    reliability: 6, attachCost: 7, reworkable: true,
    forPower: false, material: "copper_pillar_solder",
    bestUse: "high_io_processor_pkg",
  },
};

const get = (t: DieAttach) => DATA[t];

export const thermalCond = (t: DieAttach) => get(t).thermalCond;
export const bondStrength = (t: DieAttach) => get(t).bondStrength;
export const processTemp = (t: DieAttach) => get(t).processTemp;
export const reliability = (t: DieAttach) => get(t).reliability;
export const attachCost = (t: DieAttach) => get(t).attachCost;
export const reworkable = (t: DieAttach) => get(t).reworkable;
export const forPower = (t: DieAttach) => get(t).forPower;
export const material = (t: DieAttach) => get(t).material;
export const bestUse = (t: DieAttach) => get(t).bestUse;
export const dieAttachMethods = (): DieAttach[] => Object.keys(DATA) as DieAttach[];
