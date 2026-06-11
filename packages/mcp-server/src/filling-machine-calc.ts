export type FillingMachineType =
  | "gravity_fill_liquid"
  | "piston_fill_viscous"
  | "auger_fill_powder"
  | "net_weight_scale"
  | "vacuum_fill_bottle";

interface FillingMachineData {
  accuracy: number;
  speed: number;
  versatility: number;
  cleanability: number;
  fmCost: number;
  aseptic: boolean;
  forViscous: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<FillingMachineType, FillingMachineData> = {
  gravity_fill_liquid: {
    accuracy: 7, speed: 9, versatility: 6, cleanability: 8, fmCost: 4,
    aseptic: false, forViscous: false,
    mechanism: "gravity_overflow_nozzle_tank",
    bestUse: "water_juice_thin_liquid_bottle",
  },
  piston_fill_viscous: {
    accuracy: 9, speed: 7, versatility: 9, cleanability: 7, fmCost: 6,
    aseptic: false, forViscous: true,
    mechanism: "piston_cylinder_volumetric",
    bestUse: "sauce_cream_paste_chunky_fill",
  },
  auger_fill_powder: {
    accuracy: 8, speed: 7, versatility: 7, cleanability: 6, fmCost: 5,
    aseptic: false, forViscous: false,
    mechanism: "auger_screw_dose_funnel",
    bestUse: "flour_spice_powder_sachet",
  },
  net_weight_scale: {
    accuracy: 10, speed: 8, versatility: 10, cleanability: 9, fmCost: 8,
    aseptic: false, forViscous: true,
    mechanism: "load_cell_weigh_bucket",
    bestUse: "nut_candy_granule_multi_head",
  },
  vacuum_fill_bottle: {
    accuracy: 7, speed: 8, versatility: 5, cleanability: 9, fmCost: 7,
    aseptic: true, forViscous: false,
    mechanism: "vacuum_suction_level_fill",
    bestUse: "pharma_perfume_aseptic_vial",
  },
};

function get(t: FillingMachineType): FillingMachineData {
  return DATA[t];
}

export const accuracy = (t: FillingMachineType) => get(t).accuracy;
export const speed = (t: FillingMachineType) => get(t).speed;
export const versatility = (t: FillingMachineType) => get(t).versatility;
export const cleanability = (t: FillingMachineType) => get(t).cleanability;
export const fmCost = (t: FillingMachineType) => get(t).fmCost;
export const aseptic = (t: FillingMachineType) => get(t).aseptic;
export const forViscous = (t: FillingMachineType) => get(t).forViscous;
export const mechanism = (t: FillingMachineType) => get(t).mechanism;
export const bestUse = (t: FillingMachineType) => get(t).bestUse;
export const fillingMachineTypes = (): FillingMachineType[] =>
  Object.keys(DATA) as FillingMachineType[];
