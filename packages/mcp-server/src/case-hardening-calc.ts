export type CaseHardeningType =
  | "carburizing_gas_furnace"
  | "nitriding_gas_ammonia"
  | "carbonitriding_mixed_gas"
  | "induction_hardening_coil"
  | "flame_hardening_torch";

interface CaseHardeningData {
  caseDepth: number;
  hardness: number;
  distortion: number;
  throughput: number;
  chCost: number;
  selective: boolean;
  forGear: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<CaseHardeningType, CaseHardeningData> = {
  carburizing_gas_furnace: {
    caseDepth: 9, hardness: 9, distortion: 5, throughput: 8, chCost: 6,
    selective: false, forGear: true,
    medium: "endothermic_gas_carbon_diffuse",
    bestUse: "gear_bearing_race_camshaft",
  },
  nitriding_gas_ammonia: {
    caseDepth: 4, hardness: 10, distortion: 9, throughput: 5, chCost: 8,
    selective: false, forGear: true,
    medium: "ammonia_cracked_nitrogen_diffuse",
    bestUse: "crankshaft_die_mold_wear_surface",
  },
  carbonitriding_mixed_gas: {
    caseDepth: 6, hardness: 8, distortion: 6, throughput: 8, chCost: 5,
    selective: false, forGear: false,
    medium: "endothermic_ammonia_mix_gas",
    bestUse: "fastener_pin_low_alloy_small_part",
  },
  induction_hardening_coil: {
    caseDepth: 8, hardness: 9, distortion: 7, throughput: 10, chCost: 7,
    selective: true, forGear: true,
    medium: "electromagnetic_induction_coil",
    bestUse: "axle_shaft_bearing_journal",
  },
  flame_hardening_torch: {
    caseDepth: 10, hardness: 8, distortion: 4, throughput: 6, chCost: 4,
    selective: true, forGear: false,
    medium: "oxy_acetylene_flame_quench",
    bestUse: "large_casting_guideway_track_rail",
  },
};

function get(t: CaseHardeningType): CaseHardeningData {
  return DATA[t];
}

export const caseDepth = (t: CaseHardeningType) => get(t).caseDepth;
export const hardness = (t: CaseHardeningType) => get(t).hardness;
export const distortion = (t: CaseHardeningType) => get(t).distortion;
export const throughput = (t: CaseHardeningType) => get(t).throughput;
export const chCost = (t: CaseHardeningType) => get(t).chCost;
export const selective = (t: CaseHardeningType) => get(t).selective;
export const forGear = (t: CaseHardeningType) => get(t).forGear;
export const medium = (t: CaseHardeningType) => get(t).medium;
export const bestUse = (t: CaseHardeningType) => get(t).bestUse;
export const caseHardeningTypes = (): CaseHardeningType[] =>
  Object.keys(DATA) as CaseHardeningType[];
