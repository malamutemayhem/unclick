export type ArcSprayType =
  | "twin_wire_standard"
  | "cored_wire_alloy"
  | "high_velocity_arc"
  | "ceramic_rod_flame"
  | "cold_spray_kinetic";

interface ArcSprayData {
  deposition: number;
  adhesion: number;
  portability: number;
  oxidation: number;
  asCost: number;
  portable: boolean;
  forLargeArea: boolean;
  feedstock: string;
  bestUse: string;
}

const DATA: Record<ArcSprayType, ArcSprayData> = {
  twin_wire_standard: {
    deposition: 9, adhesion: 7, portability: 8, oxidation: 4, asCost: 3,
    portable: true, forLargeArea: true,
    feedstock: "twin_solid_wire_zinc_aluminum_steel",
    bestUse: "bridge_steel_structure_corrosion_zinc",
  },
  cored_wire_alloy: {
    deposition: 8, adhesion: 8, portability: 7, oxidation: 5, asCost: 5,
    portable: true, forLargeArea: true,
    feedstock: "flux_cored_wire_carbide_alloy_fill",
    bestUse: "wear_plate_hardfacing_crusher_chute",
  },
  high_velocity_arc: {
    deposition: 8, adhesion: 9, portability: 5, oxidation: 7, asCost: 6,
    portable: false, forLargeArea: true,
    feedstock: "twin_wire_high_atomize_gas_velocity",
    bestUse: "boiler_tube_erosion_shield_dense_coat",
  },
  ceramic_rod_flame: {
    deposition: 4, adhesion: 6, portability: 9, oxidation: 3, asCost: 2,
    portable: true, forLargeArea: false,
    feedstock: "ceramic_rod_oxyacetylene_flame_melt",
    bestUse: "small_repair_bearing_journal_field_work",
  },
  cold_spray_kinetic: {
    deposition: 7, adhesion: 10, portability: 4, oxidation: 10, asCost: 9,
    portable: false, forLargeArea: false,
    feedstock: "powder_supersonic_gas_jet_no_melt",
    bestUse: "copper_aluminum_repair_no_heat_sensitive",
  },
};

function get(t: ArcSprayType): ArcSprayData {
  return DATA[t];
}

export const deposition = (t: ArcSprayType) => get(t).deposition;
export const adhesion = (t: ArcSprayType) => get(t).adhesion;
export const portability = (t: ArcSprayType) => get(t).portability;
export const oxidation = (t: ArcSprayType) => get(t).oxidation;
export const asCost = (t: ArcSprayType) => get(t).asCost;
export const portable = (t: ArcSprayType) => get(t).portable;
export const forLargeArea = (t: ArcSprayType) => get(t).forLargeArea;
export const feedstock = (t: ArcSprayType) => get(t).feedstock;
export const bestUse = (t: ArcSprayType) => get(t).bestUse;
export const arcSprayTypes = (): ArcSprayType[] =>
  Object.keys(DATA) as ArcSprayType[];
