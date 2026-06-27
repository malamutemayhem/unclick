export type PvdCoatingType =
  | "sputtering_magnetron_dc"
  | "evaporation_e_beam"
  | "arc_cathodic_tin"
  | "ion_plating_ibad"
  | "hipims_high_power";

interface PvdCoatingData {
  adhesion: number;
  hardness: number;
  uniformity: number;
  temperature: number;
  pvCost: number;
  lowTemp: boolean;
  forCuttingTool: boolean;
  target: string;
  bestUse: string;
}

const DATA: Record<PvdCoatingType, PvdCoatingData> = {
  sputtering_magnetron_dc: {
    adhesion: 8, hardness: 8, uniformity: 9, temperature: 8, pvCost: 7,
    lowTemp: true, forCuttingTool: true,
    target: "titanium_chromium_metallic_target",
    bestUse: "decorative_hard_coat_drill_bit",
  },
  evaporation_e_beam: {
    adhesion: 6, hardness: 6, uniformity: 7, temperature: 7, pvCost: 6,
    lowTemp: true, forCuttingTool: false,
    target: "crucible_melt_evaporant_source",
    bestUse: "optical_lens_mirror_anti_reflect",
  },
  arc_cathodic_tin: {
    adhesion: 10, hardness: 10, uniformity: 7, temperature: 6, pvCost: 7,
    lowTemp: false, forCuttingTool: true,
    target: "titanium_cathode_arc_source",
    bestUse: "end_mill_insert_tin_tialn_coat",
  },
  ion_plating_ibad: {
    adhesion: 9, hardness: 9, uniformity: 8, temperature: 7, pvCost: 9,
    lowTemp: false, forCuttingTool: true,
    target: "ion_beam_assisted_dual_source",
    bestUse: "turbine_blade_erosion_barrier",
  },
  hipims_high_power: {
    adhesion: 10, hardness: 10, uniformity: 10, temperature: 8, pvCost: 10,
    lowTemp: true, forCuttingTool: true,
    target: "high_power_pulse_magnetron",
    bestUse: "aerospace_medical_implant_dlc",
  },
};

function get(t: PvdCoatingType): PvdCoatingData {
  return DATA[t];
}

export const adhesion = (t: PvdCoatingType) => get(t).adhesion;
export const hardness = (t: PvdCoatingType) => get(t).hardness;
export const uniformity = (t: PvdCoatingType) => get(t).uniformity;
export const temperature = (t: PvdCoatingType) => get(t).temperature;
export const pvCost = (t: PvdCoatingType) => get(t).pvCost;
export const lowTemp = (t: PvdCoatingType) => get(t).lowTemp;
export const forCuttingTool = (t: PvdCoatingType) => get(t).forCuttingTool;
export const target = (t: PvdCoatingType) => get(t).target;
export const bestUse = (t: PvdCoatingType) => get(t).bestUse;
export const pvdCoatingTypes = (): PvdCoatingType[] =>
  Object.keys(DATA) as PvdCoatingType[];
