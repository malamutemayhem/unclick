export type CryogenicInsulationType =
  | "perlite_fill_vacuum"
  | "polyurethane_foam_spray"
  | "multi_layer_mli"
  | "cellular_glass_cryo"
  | "evacuated_powder_jacket";

interface CryogenicInsulationData {
  thermalPerf: number;
  vacuumRequired: number;
  installEase: number;
  durability: number;
  crCost: number;
  needsVacuum: boolean;
  forLng: boolean;
  system: string;
  bestUse: string;
}

const DATA: Record<CryogenicInsulationType, CryogenicInsulationData> = {
  perlite_fill_vacuum: {
    thermalPerf: 8, vacuumRequired: 7, installEase: 6, durability: 8, crCost: 6,
    needsVacuum: true, forLng: true,
    system: "expanded_perlite_fill_annular_vacuum_space",
    bestUse: "lng_storage_tank_double_wall_annular_fill",
  },
  polyurethane_foam_spray: {
    thermalPerf: 7, vacuumRequired: 3, installEase: 9, durability: 6, crCost: 4,
    needsVacuum: false, forLng: false,
    system: "closed_cell_pu_foam_spray_applied_in_situ",
    bestUse: "industrial_cold_pipe_vessel_ambient_pressure",
  },
  multi_layer_mli: {
    thermalPerf: 10, vacuumRequired: 10, installEase: 3, durability: 7, crCost: 9,
    needsVacuum: true, forLng: false,
    system: "aluminized_mylar_dacron_spacer_high_vacuum",
    bestUse: "liquid_helium_hydrogen_space_cryostat_dewar",
  },
  cellular_glass_cryo: {
    thermalPerf: 7, vacuumRequired: 2, installEase: 7, durability: 9, crCost: 7,
    needsVacuum: false, forLng: true,
    system: "closed_cell_foam_glass_block_vapor_barrier",
    bestUse: "lng_pipe_support_cold_foundation_load_bearing",
  },
  evacuated_powder_jacket: {
    thermalPerf: 9, vacuumRequired: 8, installEase: 4, durability: 8, crCost: 8,
    needsVacuum: true, forLng: false,
    system: "fine_powder_perlite_opacifier_vacuum_annulus",
    bestUse: "liquid_oxygen_nitrogen_transport_dewar_vessel",
  },
};

function get(t: CryogenicInsulationType): CryogenicInsulationData {
  return DATA[t];
}

export const thermalPerf = (t: CryogenicInsulationType) => get(t).thermalPerf;
export const vacuumRequired = (t: CryogenicInsulationType) => get(t).vacuumRequired;
export const installEase = (t: CryogenicInsulationType) => get(t).installEase;
export const durability = (t: CryogenicInsulationType) => get(t).durability;
export const crCost = (t: CryogenicInsulationType) => get(t).crCost;
export const needsVacuum = (t: CryogenicInsulationType) => get(t).needsVacuum;
export const forLng = (t: CryogenicInsulationType) => get(t).forLng;
export const system = (t: CryogenicInsulationType) => get(t).system;
export const bestUse = (t: CryogenicInsulationType) => get(t).bestUse;
export const cryogenicInsulationTypes = (): CryogenicInsulationType[] =>
  Object.keys(DATA) as CryogenicInsulationType[];
