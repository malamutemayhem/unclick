export type ChargePump =
  | "dickson_cascade"
  | "cockcroft_walton"
  | "fibonacci_switched"
  | "regulated_ldo_cp"
  | "cross_coupled_cmos";

const DATA: Record<ChargePump, {
  voltageGain: number; efficiency: number; ripple: number;
  loadCapacity: number; pumpCost: number; regulated: boolean;
  forFlash: boolean; topology: string; bestUse: string;
}> = {
  dickson_cascade: {
    voltageGain: 7, efficiency: 5, ripple: 4,
    loadCapacity: 5, pumpCost: 3, regulated: false,
    forFlash: true, topology: "diode_cap_ladder",
    bestUse: "flash_memory_program",
  },
  cockcroft_walton: {
    voltageGain: 10, efficiency: 3, ripple: 3,
    loadCapacity: 3, pumpCost: 4, regulated: false,
    forFlash: false, topology: "voltage_multiplier_ac",
    bestUse: "high_voltage_bias_pmt",
  },
  fibonacci_switched: {
    voltageGain: 8, efficiency: 7, ripple: 5,
    loadCapacity: 4, pumpCost: 5, regulated: false,
    forFlash: false, topology: "fibonacci_cap_switch",
    bestUse: "mems_electrostatic_drive",
  },
  regulated_ldo_cp: {
    voltageGain: 4, efficiency: 8, ripple: 9,
    loadCapacity: 8, pumpCost: 6, regulated: true,
    forFlash: false, topology: "inverting_plus_ldo",
    bestUse: "lcd_gate_driver_neg",
  },
  cross_coupled_cmos: {
    voltageGain: 5, efficiency: 9, ripple: 7,
    loadCapacity: 7, pumpCost: 2, regulated: false,
    forFlash: true, topology: "cmos_voltage_doubler",
    bestUse: "sram_word_line_boost",
  },
};

const get = (t: ChargePump) => DATA[t];

export const voltageGain = (t: ChargePump) => get(t).voltageGain;
export const efficiency = (t: ChargePump) => get(t).efficiency;
export const ripple = (t: ChargePump) => get(t).ripple;
export const loadCapacity = (t: ChargePump) => get(t).loadCapacity;
export const pumpCost = (t: ChargePump) => get(t).pumpCost;
export const regulated = (t: ChargePump) => get(t).regulated;
export const forFlash = (t: ChargePump) => get(t).forFlash;
export const topology = (t: ChargePump) => get(t).topology;
export const bestUse = (t: ChargePump) => get(t).bestUse;
export const chargePumps = (): ChargePump[] => Object.keys(DATA) as ChargePump[];
