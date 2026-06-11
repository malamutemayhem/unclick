export type GroutingMethodType =
  | "cement_slurry_permeation"
  | "chemical_sodium_silicate"
  | "jet_grouting_columnar"
  | "compaction_displacement_grout"
  | "epoxy_resin_structural";

const DATA: Record<GroutingMethodType, {
  penetration: number; strength: number; durability: number;
  controllability: number; grCost: number; chemical: boolean;
  forWaterStop: boolean; medium: string; bestUse: string;
}> = {
  cement_slurry_permeation: {
    penetration: 5, strength: 7, durability: 9,
    controllability: 6, grCost: 1, chemical: false,
    forWaterStop: true, medium: "portland_cement_water_slurry",
    bestUse: "coarse_soil_rock_fissure_seal",
  },
  chemical_sodium_silicate: {
    penetration: 9, strength: 4, durability: 5,
    controllability: 7, grCost: 3, chemical: true,
    forWaterStop: true, medium: "sodium_silicate_reactant_gel",
    bestUse: "fine_sand_permeation_cutoff_wall",
  },
  jet_grouting_columnar: {
    penetration: 8, strength: 8, durability: 8,
    controllability: 9, grCost: 4, chemical: false,
    forWaterStop: true, medium: "high_pressure_cement_jet_stream",
    bestUse: "soft_ground_underpinning_cutoff",
  },
  compaction_displacement_grout: {
    penetration: 3, strength: 6, durability: 8,
    controllability: 8, grCost: 2, chemical: false,
    forWaterStop: false, medium: "stiff_mortar_low_slump_pump",
    bestUse: "sinkhole_void_fill_densification",
  },
  epoxy_resin_structural: {
    penetration: 7, strength: 10, durability: 9,
    controllability: 8, grCost: 5, chemical: true,
    forWaterStop: false, medium: "two_part_epoxy_resin_injected",
    bestUse: "concrete_crack_repair_structural",
  },
};

const get = (t: GroutingMethodType) => DATA[t];

export const penetration = (t: GroutingMethodType) => get(t).penetration;
export const strength = (t: GroutingMethodType) => get(t).strength;
export const durability = (t: GroutingMethodType) => get(t).durability;
export const controllability = (t: GroutingMethodType) => get(t).controllability;
export const grCost = (t: GroutingMethodType) => get(t).grCost;
export const chemical = (t: GroutingMethodType) => get(t).chemical;
export const forWaterStop = (t: GroutingMethodType) => get(t).forWaterStop;
export const medium = (t: GroutingMethodType) => get(t).medium;
export const bestUse = (t: GroutingMethodType) => get(t).bestUse;
export const groutingMethodTypes = (): GroutingMethodType[] => Object.keys(DATA) as GroutingMethodType[];
