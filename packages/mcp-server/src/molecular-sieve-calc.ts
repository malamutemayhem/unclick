export type MolecularSieveType =
  | "zeolite_3a_water"
  | "zeolite_4a_general"
  | "zeolite_5a_branched"
  | "zeolite_13x_aromatic"
  | "carbon_molecular_sieve";

interface MolecularSieveData {
  selectivity: number;
  capacity: number;
  regeneration: number;
  lifetime: number;
  msCost: number;
  pressureSwing: boolean;
  forDehydration: boolean;
  poreSize: string;
  bestUse: string;
}

const DATA: Record<MolecularSieveType, MolecularSieveData> = {
  zeolite_3a_water: {
    selectivity: 10, capacity: 7, regeneration: 7, lifetime: 8, msCost: 6,
    pressureSwing: false, forDehydration: true,
    poreSize: "3_angstrom_excludes_molecules_larger_water",
    bestUse: "ethanol_dehydration_natural_gas_drying",
  },
  zeolite_4a_general: {
    selectivity: 7, capacity: 8, regeneration: 8, lifetime: 9, msCost: 5,
    pressureSwing: true, forDehydration: true,
    poreSize: "4_angstrom_admits_water_h2s_co2",
    bestUse: "general_gas_drying_co2_removal_air_sep",
  },
  zeolite_5a_branched: {
    selectivity: 8, capacity: 7, regeneration: 7, lifetime: 8, msCost: 6,
    pressureSwing: true, forDehydration: false,
    poreSize: "5_angstrom_separates_normal_iso_paraffin",
    bestUse: "n_paraffin_iso_paraffin_separation_psa_h2",
  },
  zeolite_13x_aromatic: {
    selectivity: 6, capacity: 9, regeneration: 6, lifetime: 7, msCost: 7,
    pressureSwing: true, forDehydration: false,
    poreSize: "10_angstrom_large_pore_aromatic_admit",
    bestUse: "xylene_separation_mercaptan_removal_large",
  },
  carbon_molecular_sieve: {
    selectivity: 9, capacity: 6, regeneration: 9, lifetime: 10, msCost: 8,
    pressureSwing: true, forDehydration: false,
    poreSize: "tunable_sub_angstrom_kinetic_separation",
    bestUse: "nitrogen_generation_psa_from_air_high_pur",
  },
};

function get(t: MolecularSieveType): MolecularSieveData {
  return DATA[t];
}

export const selectivity = (t: MolecularSieveType) => get(t).selectivity;
export const capacity = (t: MolecularSieveType) => get(t).capacity;
export const regeneration = (t: MolecularSieveType) => get(t).regeneration;
export const lifetime = (t: MolecularSieveType) => get(t).lifetime;
export const msCost = (t: MolecularSieveType) => get(t).msCost;
export const pressureSwing = (t: MolecularSieveType) => get(t).pressureSwing;
export const forDehydration = (t: MolecularSieveType) => get(t).forDehydration;
export const poreSize = (t: MolecularSieveType) => get(t).poreSize;
export const bestUse = (t: MolecularSieveType) => get(t).bestUse;
export const molecularSieveTypes = (): MolecularSieveType[] =>
  Object.keys(DATA) as MolecularSieveType[];
