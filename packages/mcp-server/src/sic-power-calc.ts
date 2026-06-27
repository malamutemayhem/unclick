export type SicPower =
  | "sic_mosfet_1200v"
  | "sic_schottky_650v"
  | "sic_jfet_norm_on"
  | "sic_module_62mm"
  | "sic_cascode_hybrid";

const DATA: Record<SicPower, {
  voltageClass: number; switchLoss: number; thermalCond: number;
  avalanche: number; deviceCost: number; normallyOff: boolean;
  forEv: boolean; dieType: string; bestUse: string;
}> = {
  sic_mosfet_1200v: {
    voltageClass: 8, switchLoss: 9, thermalCond: 8,
    avalanche: 8, deviceCost: 7, normallyOff: true,
    forEv: true, dieType: "planar_dmosfet_4h",
    bestUse: "ev_traction_inverter",
  },
  sic_schottky_650v: {
    voltageClass: 5, switchLoss: 7, thermalCond: 7,
    avalanche: 4, deviceCost: 5, normallyOff: true,
    forEv: false, dieType: "junction_barrier_schottky",
    bestUse: "pfc_boost_diode",
  },
  sic_jfet_norm_on: {
    voltageClass: 9, switchLoss: 10, thermalCond: 9,
    avalanche: 9, deviceCost: 9, normallyOff: false,
    forEv: false, dieType: "vertical_trench_jfet",
    bestUse: "solid_state_transformer",
  },
  sic_module_62mm: {
    voltageClass: 10, switchLoss: 8, thermalCond: 7,
    avalanche: 7, deviceCost: 10, normallyOff: true,
    forEv: true, dieType: "multi_die_press_pack",
    bestUse: "rail_traction_converter",
  },
  sic_cascode_hybrid: {
    voltageClass: 7, switchLoss: 8, thermalCond: 6,
    avalanche: 6, deviceCost: 6, normallyOff: true,
    forEv: false, dieType: "sic_jfet_si_mosfet",
    bestUse: "solar_string_inverter",
  },
};

const get = (t: SicPower) => DATA[t];

export const voltageClass = (t: SicPower) => get(t).voltageClass;
export const switchLoss = (t: SicPower) => get(t).switchLoss;
export const thermalCond = (t: SicPower) => get(t).thermalCond;
export const avalanche = (t: SicPower) => get(t).avalanche;
export const deviceCost = (t: SicPower) => get(t).deviceCost;
export const normallyOff = (t: SicPower) => get(t).normallyOff;
export const forEv = (t: SicPower) => get(t).forEv;
export const dieType = (t: SicPower) => get(t).dieType;
export const bestUse = (t: SicPower) => get(t).bestUse;
export const sicPowers = (): SicPower[] => Object.keys(DATA) as SicPower[];
