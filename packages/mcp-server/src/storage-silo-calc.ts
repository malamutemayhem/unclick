export type StorageSiloType =
  | "concrete_slip_form"
  | "bolted_steel_panel"
  | "welded_steel_flat"
  | "fabric_flexible_bag"
  | "steel_hopper_bottom";

interface StorageSiloData {
  capacity: number;
  flowReliability: number;
  weatherResist: number;
  installSpeed: number;
  ssCost: number;
  massFlow: boolean;
  forGrain: boolean;
  structure: string;
  bestUse: string;
}

const DATA: Record<StorageSiloType, StorageSiloData> = {
  concrete_slip_form: {
    capacity: 10, flowReliability: 6, weatherResist: 10, installSpeed: 3, ssCost: 9,
    massFlow: false, forGrain: true,
    structure: "reinforced_concrete_slip_formed_cylindrical",
    bestUse: "large_grain_elevator_cement_bulk_terminal",
  },
  bolted_steel_panel: {
    capacity: 7, flowReliability: 7, weatherResist: 8, installSpeed: 9, ssCost: 5,
    massFlow: false, forGrain: true,
    structure: "corrugated_galvanized_bolted_panel_assembly",
    bestUse: "farm_grain_storage_rapid_erect_modular_bin",
  },
  welded_steel_flat: {
    capacity: 9, flowReliability: 5, weatherResist: 9, installSpeed: 5, ssCost: 7,
    massFlow: false, forGrain: false,
    structure: "field_welded_steel_flat_bottom_cylindrical",
    bestUse: "powder_mineral_cement_large_bulk_storage",
  },
  fabric_flexible_bag: {
    capacity: 3, flowReliability: 4, weatherResist: 4, installSpeed: 10, ssCost: 2,
    massFlow: false, forGrain: false,
    structure: "woven_polyester_fabric_frame_supported_bag",
    bestUse: "temporary_bulk_storage_portable_surge_hopper",
  },
  steel_hopper_bottom: {
    capacity: 6, flowReliability: 10, weatherResist: 8, installSpeed: 6, ssCost: 8,
    massFlow: true, forGrain: true,
    structure: "welded_steel_cone_hopper_mass_flow_design",
    bestUse: "cohesive_powder_mass_flow_reliable_discharge",
  },
};

function get(t: StorageSiloType): StorageSiloData {
  return DATA[t];
}

export const capacity = (t: StorageSiloType) => get(t).capacity;
export const flowReliability = (t: StorageSiloType) => get(t).flowReliability;
export const weatherResist = (t: StorageSiloType) => get(t).weatherResist;
export const installSpeed = (t: StorageSiloType) => get(t).installSpeed;
export const ssCost = (t: StorageSiloType) => get(t).ssCost;
export const massFlow = (t: StorageSiloType) => get(t).massFlow;
export const forGrain = (t: StorageSiloType) => get(t).forGrain;
export const structure = (t: StorageSiloType) => get(t).structure;
export const bestUse = (t: StorageSiloType) => get(t).bestUse;
export const storageSiloTypes = (): StorageSiloType[] =>
  Object.keys(DATA) as StorageSiloType[];
