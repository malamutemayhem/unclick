export type MembraneGasType =
  | "polymeric_hollow_fiber"
  | "ceramic_tubular_high_temp"
  | "palladium_hydrogen_select"
  | "carbon_molecular_sieve"
  | "facilitated_transport";

interface MembraneGasData {
  selectivity: number;
  permeability: number;
  durability: number;
  scalability: number;
  mgCost: number;
  continuous: boolean;
  forH2: boolean;
  membrane: string;
  bestUse: string;
}

const DATA: Record<MembraneGasType, MembraneGasData> = {
  polymeric_hollow_fiber: {
    selectivity: 6, permeability: 8, durability: 7, scalability: 10, mgCost: 4,
    continuous: true, forH2: false,
    membrane: "polyimide_polysulfone_hollow_fiber_mod",
    bestUse: "natural_gas_co2_remove_biogas_upgrade",
  },
  ceramic_tubular_high_temp: {
    selectivity: 8, permeability: 7, durability: 10, scalability: 6, mgCost: 8,
    continuous: true, forH2: true,
    membrane: "alumina_zirconia_tube_high_temp_stable",
    bestUse: "syngas_separate_high_temp_harsh_chem",
  },
  palladium_hydrogen_select: {
    selectivity: 10, permeability: 6, durability: 5, scalability: 3, mgCost: 10,
    continuous: true, forH2: true,
    membrane: "palladium_alloy_foil_tube_h2_infinite",
    bestUse: "ultra_pure_h2_fuel_cell_semicond_feed",
  },
  carbon_molecular_sieve: {
    selectivity: 9, permeability: 7, durability: 6, scalability: 5, mgCost: 7,
    continuous: true, forH2: false,
    membrane: "pyrolyzed_polymer_carbon_pore_sieve",
    bestUse: "olefin_paraffin_separate_propylene",
  },
  facilitated_transport: {
    selectivity: 10, permeability: 9, durability: 4, scalability: 4, mgCost: 9,
    continuous: true, forH2: false,
    membrane: "carrier_agent_reactive_polymer_matrix",
    bestUse: "co2_capture_flue_gas_enhanced_select",
  },
};

function get(t: MembraneGasType): MembraneGasData {
  return DATA[t];
}

export const selectivity = (t: MembraneGasType) => get(t).selectivity;
export const permeability = (t: MembraneGasType) => get(t).permeability;
export const durability = (t: MembraneGasType) => get(t).durability;
export const scalability = (t: MembraneGasType) => get(t).scalability;
export const mgCost = (t: MembraneGasType) => get(t).mgCost;
export const continuous = (t: MembraneGasType) => get(t).continuous;
export const forH2 = (t: MembraneGasType) => get(t).forH2;
export const membrane = (t: MembraneGasType) => get(t).membrane;
export const bestUse = (t: MembraneGasType) => get(t).bestUse;
export const membraneGasTypes = (): MembraneGasType[] =>
  Object.keys(DATA) as MembraneGasType[];
