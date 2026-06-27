export type PlasmaSprayType =
  | "atmospheric_plasma_aps"
  | "vacuum_plasma_vps"
  | "suspension_plasma_sps"
  | "solution_precursor_spps"
  | "wire_arc_plasma";

interface PlasmaSprayData {
  density: number;
  adhesion: number;
  thickness: number;
  deposition: number;
  psCost: number;
  inert: boolean;
  forCeramics: boolean;
  feedstock: string;
  bestUse: string;
}

const DATA: Record<PlasmaSprayType, PlasmaSprayData> = {
  atmospheric_plasma_aps: {
    density: 7, adhesion: 7, thickness: 9, deposition: 8, psCost: 5,
    inert: false, forCeramics: true,
    feedstock: "powder_feed_20_100um_carrier_gas",
    bestUse: "thermal_barrier_coating_turbine_blade",
  },
  vacuum_plasma_vps: {
    density: 10, adhesion: 10, thickness: 7, deposition: 6, psCost: 9,
    inert: true, forCeramics: true,
    feedstock: "powder_feed_vacuum_chamber_inert_atmo",
    bestUse: "aerospace_implant_oxide_free_dense_coat",
  },
  suspension_plasma_sps: {
    density: 8, adhesion: 8, thickness: 5, deposition: 5, psCost: 7,
    inert: false, forCeramics: true,
    feedstock: "nano_particle_liquid_suspension_inject",
    bestUse: "columnar_tbc_strain_tolerant_fine_struct",
  },
  solution_precursor_spps: {
    density: 7, adhesion: 7, thickness: 4, deposition: 4, psCost: 6,
    inert: false, forCeramics: true,
    feedstock: "chemical_solution_precursor_atomize",
    bestUse: "functional_coating_catalyst_sofc_layer",
  },
  wire_arc_plasma: {
    density: 6, adhesion: 6, thickness: 10, deposition: 10, psCost: 4,
    inert: false, forCeramics: false,
    feedstock: "metal_wire_feed_arc_melt_atomize",
    bestUse: "large_area_corrosion_zinc_aluminum_steel",
  },
};

function get(t: PlasmaSprayType): PlasmaSprayData {
  return DATA[t];
}

export const density = (t: PlasmaSprayType) => get(t).density;
export const adhesion = (t: PlasmaSprayType) => get(t).adhesion;
export const thickness = (t: PlasmaSprayType) => get(t).thickness;
export const deposition = (t: PlasmaSprayType) => get(t).deposition;
export const psCost = (t: PlasmaSprayType) => get(t).psCost;
export const inert = (t: PlasmaSprayType) => get(t).inert;
export const forCeramics = (t: PlasmaSprayType) => get(t).forCeramics;
export const feedstock = (t: PlasmaSprayType) => get(t).feedstock;
export const bestUse = (t: PlasmaSprayType) => get(t).bestUse;
export const plasmaSprayTypes = (): PlasmaSprayType[] =>
  Object.keys(DATA) as PlasmaSprayType[];
