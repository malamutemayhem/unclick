export type JigSeparatorType =
  | "diaphragm_jig_standard"
  | "piston_jig_heavy"
  | "centrifugal_jig_fine"
  | "inline_pressure_jig"
  | "pan_american_plunger";

interface JigSeparatorData {
  recovery: number;
  capacity: number;
  selectivity: number;
  waterUse: number;
  jsCost: number;
  continuous: boolean;
  forHeavy: boolean;
  pulsion: string;
  bestUse: string;
}

const DATA: Record<JigSeparatorType, JigSeparatorData> = {
  diaphragm_jig_standard: {
    recovery: 7, capacity: 8, selectivity: 7, waterUse: 6, jsCost: 5,
    continuous: true, forHeavy: false,
    pulsion: "rubber_diaphragm_pulse_water_stroke",
    bestUse: "coal_wash_gravity_separation_standard",
  },
  piston_jig_heavy: {
    recovery: 8, capacity: 9, selectivity: 6, waterUse: 7, jsCost: 6,
    continuous: true, forHeavy: true,
    pulsion: "plunger_piston_direct_water_pulse",
    bestUse: "iron_ore_heavy_mineral_coarse_separate",
  },
  centrifugal_jig_fine: {
    recovery: 9, capacity: 4, selectivity: 9, waterUse: 5, jsCost: 8,
    continuous: true, forHeavy: false,
    pulsion: "centrifugal_enhanced_gravity_fine_jig",
    bestUse: "fine_gold_tin_tungsten_gravity_recover",
  },
  inline_pressure_jig: {
    recovery: 8, capacity: 10, selectivity: 7, waterUse: 4, jsCost: 7,
    continuous: true, forHeavy: true,
    pulsion: "inline_pressure_screen_pulse_enclosed",
    bestUse: "high_tonnage_preconcentrate_reject_waste",
  },
  pan_american_plunger: {
    recovery: 6, capacity: 7, selectivity: 8, waterUse: 8, jsCost: 4,
    continuous: true, forHeavy: false,
    pulsion: "eccentric_plunger_classic_pulse_bed",
    bestUse: "alluvial_tin_coltan_artisanal_mine",
  },
};

function get(t: JigSeparatorType): JigSeparatorData {
  return DATA[t];
}

export const recovery = (t: JigSeparatorType) => get(t).recovery;
export const capacity = (t: JigSeparatorType) => get(t).capacity;
export const selectivity = (t: JigSeparatorType) => get(t).selectivity;
export const waterUse = (t: JigSeparatorType) => get(t).waterUse;
export const jsCost = (t: JigSeparatorType) => get(t).jsCost;
export const continuous = (t: JigSeparatorType) => get(t).continuous;
export const forHeavy = (t: JigSeparatorType) => get(t).forHeavy;
export const pulsion = (t: JigSeparatorType) => get(t).pulsion;
export const bestUse = (t: JigSeparatorType) => get(t).bestUse;
export const jigSeparatorTypes = (): JigSeparatorType[] =>
  Object.keys(DATA) as JigSeparatorType[];
