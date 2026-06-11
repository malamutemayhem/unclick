export type PumpType =
  | "centrifugal_radial_impeller"
  | "positive_disp_gear"
  | "positive_disp_peristaltic"
  | "submersible_deep_well"
  | "diaphragm_air_operated";

const DATA: Record<PumpType, {
  flow: number; pressure: number; efficiency: number;
  selfPriming: number; pmCost: number; sealless: boolean;
  forViscous: boolean; mechanism: string; bestUse: string;
}> = {
  centrifugal_radial_impeller: {
    flow: 10, pressure: 6, efficiency: 8,
    selfPriming: 3, pmCost: 2, sealless: false,
    forViscous: false, mechanism: "rotating_impeller_volute",
    bestUse: "water_supply_main_distribution",
  },
  positive_disp_gear: {
    flow: 5, pressure: 9, efficiency: 7,
    selfPriming: 9, pmCost: 3, sealless: false,
    forViscous: true, mechanism: "meshing_gear_pair_trap",
    bestUse: "hydraulic_oil_lubrication_circuit",
  },
  positive_disp_peristaltic: {
    flow: 3, pressure: 5, efficiency: 4,
    selfPriming: 10, pmCost: 2, sealless: true,
    forViscous: true, mechanism: "roller_squeeze_flexible_tube",
    bestUse: "chemical_dosing_sterile_transfer",
  },
  submersible_deep_well: {
    flow: 7, pressure: 10, efficiency: 7,
    selfPriming: 10, pmCost: 3, sealless: false,
    forViscous: false, mechanism: "multi_stage_impeller_submerged",
    bestUse: "borehole_groundwater_extract",
  },
  diaphragm_air_operated: {
    flow: 4, pressure: 4, efficiency: 3,
    selfPriming: 8, pmCost: 1, sealless: true,
    forViscous: true, mechanism: "flexing_diaphragm_check_valve",
    bestUse: "slurry_transfer_hazardous_area",
  },
};

const get = (t: PumpType) => DATA[t];

export const flow = (t: PumpType) => get(t).flow;
export const pressure = (t: PumpType) => get(t).pressure;
export const efficiency = (t: PumpType) => get(t).efficiency;
export const selfPriming = (t: PumpType) => get(t).selfPriming;
export const pmCost = (t: PumpType) => get(t).pmCost;
export const sealless = (t: PumpType) => get(t).sealless;
export const forViscous = (t: PumpType) => get(t).forViscous;
export const mechanism = (t: PumpType) => get(t).mechanism;
export const bestUse = (t: PumpType) => get(t).bestUse;
export const pumpTypes = (): PumpType[] => Object.keys(DATA) as PumpType[];
