export type AttritorMillType =
  | "batch_attritor"
  | "continuous_attritor"
  | "circulation_attritor"
  | "cryogenic_attritor"
  | "high_energy_attritor";

interface AttritorMillData {
  grindFineness: number;
  throughput: number;
  energyEfficiency: number;
  mediaWear: number;
  amCost: number;
  forNanoGrind: boolean;
  forMechanicalAlloy: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<AttritorMillType, AttritorMillData> = {
  batch_attritor: {
    grindFineness: 8, throughput: 5, energyEfficiency: 7, mediaWear: 6, amCost: 5,
    forNanoGrind: false, forMechanicalAlloy: false,
    millConfig: "batch_attritor_mill_stirred_media_vertical_shaft_fine_grind",
    bestUse: "fine_grind_batch_attritor_mill_stirred_media_ceramic_pigment",
  },
  continuous_attritor: {
    grindFineness: 7, throughput: 9, energyEfficiency: 8, mediaWear: 7, amCost: 7,
    forNanoGrind: false, forMechanicalAlloy: false,
    millConfig: "continuous_attritor_mill_pass_through_high_volume_production",
    bestUse: "production_grind_continuous_attritor_mill_high_volume_mineral",
  },
  circulation_attritor: {
    grindFineness: 9, throughput: 8, energyEfficiency: 8, mediaWear: 7, amCost: 8,
    forNanoGrind: true, forMechanicalAlloy: false,
    millConfig: "circulation_attritor_mill_recirculate_slurry_narrow_particle",
    bestUse: "ink_paint_circulation_attritor_mill_narrow_distribution_disperse",
  },
  cryogenic_attritor: {
    grindFineness: 9, throughput: 4, energyEfficiency: 5, mediaWear: 5, amCost: 9,
    forNanoGrind: false, forMechanicalAlloy: true,
    millConfig: "cryogenic_attritor_mill_liquid_nitrogen_cool_brittle_grind",
    bestUse: "polymer_grind_cryogenic_attritor_mill_embrittle_tough_material",
  },
  high_energy_attritor: {
    grindFineness: 10, throughput: 4, energyEfficiency: 5, mediaWear: 4, amCost: 8,
    forNanoGrind: true, forMechanicalAlloy: true,
    millConfig: "high_energy_attritor_mill_fast_shaft_nano_particle_alloy_synth",
    bestUse: "nano_powder_high_energy_attritor_mill_mechanical_alloy_react",
  },
};

function get(t: AttritorMillType): AttritorMillData {
  return DATA[t];
}

export const grindFineness = (t: AttritorMillType) => get(t).grindFineness;
export const throughput = (t: AttritorMillType) => get(t).throughput;
export const energyEfficiency = (t: AttritorMillType) => get(t).energyEfficiency;
export const mediaWear = (t: AttritorMillType) => get(t).mediaWear;
export const amCost = (t: AttritorMillType) => get(t).amCost;
export const forNanoGrind = (t: AttritorMillType) => get(t).forNanoGrind;
export const forMechanicalAlloy = (t: AttritorMillType) => get(t).forMechanicalAlloy;
export const millConfig = (t: AttritorMillType) => get(t).millConfig;
export const bestUse = (t: AttritorMillType) => get(t).bestUse;
export const attritorMillTypes = (): AttritorMillType[] =>
  Object.keys(DATA) as AttritorMillType[];
