export type CryoCooler =
  | "dilution_fridge"
  | "pulse_tube"
  | "gifford_mcmahon"
  | "stirling_mini"
  | "adr_demag";

const DATA: Record<CryoCooler, {
  baseTemp: number; coolingPower: number; reliability: number;
  vibration: number; cryoCost: number; continuous: boolean;
  forQuantum: boolean; cycle: string; bestUse: string;
}> = {
  dilution_fridge: {
    baseTemp: 10, coolingPower: 5, reliability: 7,
    vibration: 8, cryoCost: 10, continuous: true,
    forQuantum: true, cycle: "he3_he4_mixing",
    bestUse: "millikelvin_qubit_stage",
  },
  pulse_tube: {
    baseTemp: 6, coolingPower: 8, reliability: 9,
    vibration: 9, cryoCost: 6, continuous: true,
    forQuantum: true, cycle: "orifice_regen",
    bestUse: "4k_shield_precool",
  },
  gifford_mcmahon: {
    baseTemp: 5, coolingPower: 9, reliability: 8,
    vibration: 5, cryoCost: 5, continuous: true,
    forQuantum: false, cycle: "displacer_regen",
    bestUse: "mri_magnet_cooling",
  },
  stirling_mini: {
    baseTemp: 3, coolingPower: 6, reliability: 7,
    vibration: 6, cryoCost: 4, continuous: true,
    forQuantum: false, cycle: "free_piston_stirling",
    bestUse: "ir_detector_cooling",
  },
  adr_demag: {
    baseTemp: 9, coolingPower: 4, reliability: 6,
    vibration: 10, cryoCost: 7, continuous: false,
    forQuantum: true, cycle: "magnetic_entropy",
    bestUse: "sub_100mk_detector",
  },
};

const get = (t: CryoCooler) => DATA[t];

export const baseTemp = (t: CryoCooler) => get(t).baseTemp;
export const coolingPower = (t: CryoCooler) => get(t).coolingPower;
export const reliability = (t: CryoCooler) => get(t).reliability;
export const vibration = (t: CryoCooler) => get(t).vibration;
export const cryoCost = (t: CryoCooler) => get(t).cryoCost;
export const continuous = (t: CryoCooler) => get(t).continuous;
export const forQuantum = (t: CryoCooler) => get(t).forQuantum;
export const cycle = (t: CryoCooler) => get(t).cycle;
export const bestUse = (t: CryoCooler) => get(t).bestUse;
export const cryoCoolers = (): CryoCooler[] => Object.keys(DATA) as CryoCooler[];
