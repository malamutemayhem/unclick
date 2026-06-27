export type DilutionFridge =
  | "wet_bath_cryostat"
  | "dry_cryofree_pulse"
  | "continuous_cycle_flow"
  | "single_shot_demagnet"
  | "nuclear_demagnet_copper";

const DATA: Record<DilutionFridge, {
  baseTemp: number; coolingPower: number; holdTime: number;
  wiring: number; dfCost: number; cryoFree: boolean;
  forQubit: boolean; coolant: string; bestUse: string;
}> = {
  wet_bath_cryostat: {
    baseTemp: 8, coolingPower: 9, holdTime: 10,
    wiring: 6, dfCost: 3, cryoFree: false,
    forQubit: true, coolant: "liquid_helium_4_bath",
    bestUse: "legacy_lab_continuous_run",
  },
  dry_cryofree_pulse: {
    baseTemp: 9, coolingPower: 8, holdTime: 9,
    wiring: 8, dfCost: 5, cryoFree: true,
    forQubit: true, coolant: "helium_3_4_mixture_closed",
    bestUse: "quantum_processor_multi_qubit",
  },
  continuous_cycle_flow: {
    baseTemp: 7, coolingPower: 10, holdTime: 10,
    wiring: 5, dfCost: 4, cryoFree: false,
    forQubit: false, coolant: "helium_3_circulating_pump",
    bestUse: "neutron_scattering_sample_stage",
  },
  single_shot_demagnet: {
    baseTemp: 10, coolingPower: 4, holdTime: 3,
    wiring: 7, dfCost: 2, cryoFree: true,
    forQubit: false, coolant: "paramagnetic_pill_single",
    bestUse: "detector_array_brief_cool",
  },
  nuclear_demagnet_copper: {
    baseTemp: 10, coolingPower: 2, holdTime: 5,
    wiring: 4, dfCost: 6, cryoFree: false,
    forQubit: false, coolant: "copper_nuclear_spin_stage",
    bestUse: "sub_millikelvin_research",
  },
};

const get = (t: DilutionFridge) => DATA[t];

export const baseTemp = (t: DilutionFridge) => get(t).baseTemp;
export const coolingPower = (t: DilutionFridge) => get(t).coolingPower;
export const holdTime = (t: DilutionFridge) => get(t).holdTime;
export const wiring = (t: DilutionFridge) => get(t).wiring;
export const dfCost = (t: DilutionFridge) => get(t).dfCost;
export const cryoFree = (t: DilutionFridge) => get(t).cryoFree;
export const forQubit = (t: DilutionFridge) => get(t).forQubit;
export const coolant = (t: DilutionFridge) => get(t).coolant;
export const bestUse = (t: DilutionFridge) => get(t).bestUse;
export const dilutionFridges = (): DilutionFridge[] => Object.keys(DATA) as DilutionFridge[];
