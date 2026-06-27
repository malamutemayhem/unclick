export type MemsValve =
  | "normally_closed_seat"
  | "normally_open_diaphragm"
  | "bistable_toggle"
  | "proportional_spool"
  | "check_passive_flap";

const DATA: Record<MemsValve, {
  flowRate: number; leakage: number; responseTime: number;
  powerConsume: number; mvCost: number; proportional: boolean;
  forMedical: boolean; mechanism: string; bestUse: string;
}> = {
  normally_closed_seat: {
    flowRate: 6, leakage: 9, responseTime: 7,
    powerConsume: 5, mvCost: 4, proportional: false,
    forMedical: true, mechanism: "piezo_stack_lift_seat",
    bestUse: "drug_delivery_micropump",
  },
  normally_open_diaphragm: {
    flowRate: 8, leakage: 7, responseTime: 6,
    powerConsume: 6, mvCost: 3, proportional: false,
    forMedical: false, mechanism: "thermal_bimorph_close",
    bestUse: "gas_chromatograph_inject",
  },
  bistable_toggle: {
    flowRate: 7, leakage: 8, responseTime: 5,
    powerConsume: 10, mvCost: 6, proportional: false,
    forMedical: true, mechanism: "magnetic_snap_through",
    bestUse: "implant_zero_hold_power",
  },
  proportional_spool: {
    flowRate: 9, leakage: 5, responseTime: 8,
    powerConsume: 4, mvCost: 7, proportional: true,
    forMedical: false, mechanism: "electrostatic_spool_slide",
    bestUse: "pneumatic_soft_robot_ctrl",
  },
  check_passive_flap: {
    flowRate: 5, leakage: 6, responseTime: 10,
    powerConsume: 10, mvCost: 1, proportional: false,
    forMedical: true, mechanism: "pressure_diff_flap_lift",
    bestUse: "micropump_rectifier_pair",
  },
};

const get = (t: MemsValve) => DATA[t];

export const flowRate = (t: MemsValve) => get(t).flowRate;
export const leakage = (t: MemsValve) => get(t).leakage;
export const responseTime = (t: MemsValve) => get(t).responseTime;
export const powerConsume = (t: MemsValve) => get(t).powerConsume;
export const mvCost = (t: MemsValve) => get(t).mvCost;
export const proportional = (t: MemsValve) => get(t).proportional;
export const forMedical = (t: MemsValve) => get(t).forMedical;
export const mechanism = (t: MemsValve) => get(t).mechanism;
export const bestUse = (t: MemsValve) => get(t).bestUse;
export const memsValves = (): MemsValve[] => Object.keys(DATA) as MemsValve[];
