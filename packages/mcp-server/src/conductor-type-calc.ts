export type ConductorType =
  | "copper_annealed_solid"
  | "aluminum_stranded_aac"
  | "acsr_steel_reinforced"
  | "copper_clad_aluminum_cca"
  | "htls_high_temp_low_sag";

interface ConductorData {
  conductivity: number;
  strength: number;
  weight: number;
  ampacity: number;
  cdCost: number;
  magnetic: boolean;
  forOverhead: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<ConductorType, ConductorData> = {
  copper_annealed_solid: {
    conductivity: 10, strength: 5, weight: 4, ampacity: 9, cdCost: 8,
    magnetic: false, forOverhead: false,
    construction: "solid_drawn_annealed_copper",
    bestUse: "building_wire_motor_winding",
  },
  aluminum_stranded_aac: {
    conductivity: 6, strength: 4, weight: 8, ampacity: 6, cdCost: 3,
    magnetic: false, forOverhead: true,
    construction: "concentric_stranded_aluminum",
    bestUse: "distribution_line_short_span",
  },
  acsr_steel_reinforced: {
    conductivity: 6, strength: 9, weight: 6, ampacity: 7, cdCost: 5,
    magnetic: true, forOverhead: true,
    construction: "aluminum_strand_steel_core",
    bestUse: "transmission_line_long_span_tower",
  },
  copper_clad_aluminum_cca: {
    conductivity: 7, strength: 5, weight: 7, ampacity: 7, cdCost: 5,
    magnetic: false, forOverhead: false,
    construction: "aluminum_core_copper_cladding",
    bestUse: "speaker_wire_patch_cable_cost",
  },
  htls_high_temp_low_sag: {
    conductivity: 7, strength: 10, weight: 7, ampacity: 10, cdCost: 10,
    magnetic: false, forOverhead: true,
    construction: "composite_core_aluminum_zirconium",
    bestUse: "uprate_existing_tower_capacity",
  },
};

function get(t: ConductorType): ConductorData {
  return DATA[t];
}

export const conductivity = (t: ConductorType) => get(t).conductivity;
export const strength = (t: ConductorType) => get(t).strength;
export const weight = (t: ConductorType) => get(t).weight;
export const ampacity = (t: ConductorType) => get(t).ampacity;
export const cdCost = (t: ConductorType) => get(t).cdCost;
export const magnetic = (t: ConductorType) => get(t).magnetic;
export const forOverhead = (t: ConductorType) => get(t).forOverhead;
export const construction = (t: ConductorType) => get(t).construction;
export const bestUse = (t: ConductorType) => get(t).bestUse;
export const conductorTypes = (): ConductorType[] =>
  Object.keys(DATA) as ConductorType[];
