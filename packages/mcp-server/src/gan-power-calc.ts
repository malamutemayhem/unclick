export type GanPower =
  | "emode_650v"
  | "dmode_cascode"
  | "gan_on_si_200v"
  | "gan_on_sic_sub"
  | "gan_ic_driver";

const DATA: Record<GanPower, {
  switchFreq: number; efficiency: number; thermalPerf: number;
  costPerAmp: number; reliability: number; normallyOff: boolean;
  forServer: boolean; substrate: string; bestUse: string;
}> = {
  emode_650v: {
    switchFreq: 8, efficiency: 9, thermalPerf: 6,
    costPerAmp: 7, reliability: 7, normallyOff: true,
    forServer: true, substrate: "gan_on_silicon_bv650",
    bestUse: "totem_pole_pfc",
  },
  dmode_cascode: {
    switchFreq: 7, efficiency: 8, thermalPerf: 5,
    costPerAmp: 6, reliability: 8, normallyOff: true,
    forServer: true, substrate: "gan_hemt_si_cascode",
    bestUse: "llc_resonant_primary",
  },
  gan_on_si_200v: {
    switchFreq: 10, efficiency: 8, thermalPerf: 7,
    costPerAmp: 5, reliability: 6, normallyOff: true,
    forServer: false, substrate: "gan_on_si_low_voltage",
    bestUse: "48v_bus_converter",
  },
  gan_on_sic_sub: {
    switchFreq: 9, efficiency: 10, thermalPerf: 9,
    costPerAmp: 10, reliability: 9, normallyOff: true,
    forServer: false, substrate: "gan_on_sic_premium",
    bestUse: "rf_pa_base_station",
  },
  gan_ic_driver: {
    switchFreq: 9, efficiency: 7, thermalPerf: 8,
    costPerAmp: 4, reliability: 7, normallyOff: true,
    forServer: false, substrate: "monolithic_gan_ic",
    bestUse: "usb_pd_fast_charger",
  },
};

const get = (t: GanPower) => DATA[t];

export const switchFreq = (t: GanPower) => get(t).switchFreq;
export const efficiency = (t: GanPower) => get(t).efficiency;
export const thermalPerf = (t: GanPower) => get(t).thermalPerf;
export const costPerAmp = (t: GanPower) => get(t).costPerAmp;
export const reliability = (t: GanPower) => get(t).reliability;
export const normallyOff = (t: GanPower) => get(t).normallyOff;
export const forServer = (t: GanPower) => get(t).forServer;
export const substrate = (t: GanPower) => get(t).substrate;
export const bestUse = (t: GanPower) => get(t).bestUse;
export const ganPowers = (): GanPower[] => Object.keys(DATA) as GanPower[];
