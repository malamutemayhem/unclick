export type CryogenicCool =
  | "pulse_tube_regenerative"
  | "gifford_mcmahon_displacer"
  | "stirling_free_piston"
  | "joule_thomson_expansion"
  | "adiabatic_demagnetization";

const DATA: Record<CryogenicCool, {
  baseTemp: number; coolingPower: number; efficiency: number;
  vibration: number; ccCost: number; cryoFree: boolean;
  forQuantum: boolean; cycle: string; bestUse: string;
}> = {
  pulse_tube_regenerative: {
    baseTemp: 7, coolingPower: 8, efficiency: 8,
    vibration: 9, ccCost: 4, cryoFree: true,
    forQuantum: true, cycle: "oscillating_gas_regenerator",
    bestUse: "squid_detector_low_vibration",
  },
  gifford_mcmahon_displacer: {
    baseTemp: 6, coolingPower: 9, efficiency: 6,
    vibration: 5, ccCost: 3, cryoFree: true,
    forQuantum: false, cycle: "displacer_piston_helium",
    bestUse: "mri_magnet_recondenser",
  },
  stirling_free_piston: {
    baseTemp: 5, coolingPower: 7, efficiency: 9,
    vibration: 6, ccCost: 3, cryoFree: true,
    forQuantum: false, cycle: "isothermal_compress_expand",
    bestUse: "infrared_sensor_tactical_cool",
  },
  joule_thomson_expansion: {
    baseTemp: 8, coolingPower: 6, efficiency: 4,
    vibration: 10, ccCost: 2, cryoFree: false,
    forQuantum: false, cycle: "isenthalpic_expansion_valve",
    bestUse: "satellite_detector_rapid_cool",
  },
  adiabatic_demagnetization: {
    baseTemp: 10, coolingPower: 3, efficiency: 5,
    vibration: 10, ccCost: 5, cryoFree: false,
    forQuantum: true, cycle: "paramagnetic_salt_entropy",
    bestUse: "millikelvin_bolometer_stage",
  },
};

const get = (t: CryogenicCool) => DATA[t];

export const baseTemp = (t: CryogenicCool) => get(t).baseTemp;
export const coolingPower = (t: CryogenicCool) => get(t).coolingPower;
export const efficiency = (t: CryogenicCool) => get(t).efficiency;
export const vibration = (t: CryogenicCool) => get(t).vibration;
export const ccCost = (t: CryogenicCool) => get(t).ccCost;
export const cryoFree = (t: CryogenicCool) => get(t).cryoFree;
export const forQuantum = (t: CryogenicCool) => get(t).forQuantum;
export const cycle = (t: CryogenicCool) => get(t).cycle;
export const bestUse = (t: CryogenicCool) => get(t).bestUse;
export const cryogenicCools = (): CryogenicCool[] => Object.keys(DATA) as CryogenicCool[];
