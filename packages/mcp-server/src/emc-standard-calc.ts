export type EmcStandard =
  | "cispr_32_emission"
  | "iec_61000_immunity"
  | "mil_std_461g"
  | "fcc_part_15"
  | "automotive_cispr_25";

const DATA: Record<EmcStandard, {
  stringency: number; freqRange: number; testComplexity: number;
  marketAccess: number; emcCost: number; radiated: boolean;
  forAutomotive: boolean; scope: string; bestUse: string;
}> = {
  cispr_32_emission: {
    stringency: 7, freqRange: 7, testComplexity: 6,
    marketAccess: 9, emcCost: 5, radiated: true,
    forAutomotive: false, scope: "ite_multimedia_class_a_b",
    bestUse: "ce_mark_eu_market_entry",
  },
  iec_61000_immunity: {
    stringency: 8, freqRange: 8, testComplexity: 8,
    marketAccess: 8, emcCost: 7, radiated: true,
    forAutomotive: false, scope: "esd_eft_surge_dip_conducted",
    bestUse: "industrial_equipment_immunity",
  },
  mil_std_461g: {
    stringency: 10, freqRange: 10, testComplexity: 10,
    marketAccess: 4, emcCost: 10, radiated: true,
    forAutomotive: false, scope: "defense_platform_subsystem",
    bestUse: "military_avionics_radar",
  },
  fcc_part_15: {
    stringency: 6, freqRange: 6, testComplexity: 5,
    marketAccess: 10, emcCost: 4, radiated: true,
    forAutomotive: false, scope: "intentional_unintentional_emitter",
    bestUse: "us_consumer_electronics",
  },
  automotive_cispr_25: {
    stringency: 9, freqRange: 9, testComplexity: 9,
    marketAccess: 7, emcCost: 8, radiated: true,
    forAutomotive: true, scope: "vehicle_component_narrowband",
    bestUse: "ecu_onboard_charger_ev",
  },
};

const get = (t: EmcStandard) => DATA[t];

export const stringency = (t: EmcStandard) => get(t).stringency;
export const freqRange = (t: EmcStandard) => get(t).freqRange;
export const testComplexity = (t: EmcStandard) => get(t).testComplexity;
export const marketAccess = (t: EmcStandard) => get(t).marketAccess;
export const emcCost = (t: EmcStandard) => get(t).emcCost;
export const radiated = (t: EmcStandard) => get(t).radiated;
export const forAutomotive = (t: EmcStandard) => get(t).forAutomotive;
export const scope = (t: EmcStandard) => get(t).scope;
export const bestUse = (t: EmcStandard) => get(t).bestUse;
export const emcStandards = (): EmcStandard[] => Object.keys(DATA) as EmcStandard[];
