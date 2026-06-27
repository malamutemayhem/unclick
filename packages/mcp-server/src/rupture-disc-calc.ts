export type RuptureDiscType =
  | "forward_acting_tension"
  | "reverse_acting_buckle"
  | "scored_tension_pre_cut"
  | "graphite_composite_mono"
  | "sanitary_clamp_pharma";

interface RuptureDiscData {
  burstAccuracy: number;
  capacity: number;
  fatigue: number;
  corrosionResist: number;
  rdCost: number;
  reusable: boolean;
  forVacuum: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<RuptureDiscType, RuptureDiscData> = {
  forward_acting_tension: {
    burstAccuracy: 7, capacity: 9, fatigue: 5, corrosionResist: 7, rdCost: 4,
    reusable: false, forVacuum: false,
    material: "stainless_inconel_domed_prebulge",
    bestUse: "vessel_reactor_general_overpressure",
  },
  reverse_acting_buckle: {
    burstAccuracy: 9, capacity: 10, fatigue: 9, corrosionResist: 8, rdCost: 6,
    reusable: false, forVacuum: true,
    material: "stainless_reverse_dome_knife_blade",
    bestUse: "high_cycle_pulsating_pressure_service",
  },
  scored_tension_pre_cut: {
    burstAccuracy: 10, capacity: 7, fatigue: 7, corrosionResist: 7, rdCost: 5,
    reusable: false, forVacuum: false,
    material: "laser_scored_metal_controlled_tear",
    bestUse: "low_pressure_precise_burst_point",
  },
  graphite_composite_mono: {
    burstAccuracy: 8, capacity: 8, fatigue: 6, corrosionResist: 10, rdCost: 7,
    reusable: false, forVacuum: false,
    material: "graphite_ptfe_fluoropolymer_layered",
    bestUse: "corrosive_acid_chemical_process",
  },
  sanitary_clamp_pharma: {
    burstAccuracy: 9, capacity: 6, fatigue: 7, corrosionResist: 9, rdCost: 8,
    reusable: false, forVacuum: true,
    material: "polished_316l_tri_clamp_sterile",
    bestUse: "pharma_biotech_food_sanitary_system",
  },
};

function get(t: RuptureDiscType): RuptureDiscData {
  return DATA[t];
}

export const burstAccuracy = (t: RuptureDiscType) => get(t).burstAccuracy;
export const capacity = (t: RuptureDiscType) => get(t).capacity;
export const fatigue = (t: RuptureDiscType) => get(t).fatigue;
export const corrosionResist = (t: RuptureDiscType) => get(t).corrosionResist;
export const rdCost = (t: RuptureDiscType) => get(t).rdCost;
export const reusable = (t: RuptureDiscType) => get(t).reusable;
export const forVacuum = (t: RuptureDiscType) => get(t).forVacuum;
export const material = (t: RuptureDiscType) => get(t).material;
export const bestUse = (t: RuptureDiscType) => get(t).bestUse;
export const ruptureDiscTypes = (): RuptureDiscType[] =>
  Object.keys(DATA) as RuptureDiscType[];
