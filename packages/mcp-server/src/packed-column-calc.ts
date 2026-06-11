export type PackedColumnType =
  | "random_packing_raschig"
  | "structured_packing_sheet"
  | "grid_packing_heavy"
  | "ceramic_saddle_corrosive"
  | "gauze_packing_vacuum";

interface PackedColumnData {
  efficiency: number;
  capacity: number;
  pressureDrop: number;
  wettability: number;
  pcCost: number;
  structured: boolean;
  forVacuum: boolean;
  packing: string;
  bestUse: string;
}

const DATA: Record<PackedColumnType, PackedColumnData> = {
  random_packing_raschig: {
    efficiency: 6, capacity: 7, pressureDrop: 5, wettability: 7, pcCost: 3,
    structured: false, forVacuum: false,
    packing: "ring_saddle_random_dump_metal_plastic",
    bestUse: "scrubber_absorber_low_cost_general",
  },
  structured_packing_sheet: {
    efficiency: 9, capacity: 9, pressureDrop: 9, wettability: 8, pcCost: 7,
    structured: true, forVacuum: true,
    packing: "corrugated_sheet_metal_crimp_channel",
    bestUse: "vacuum_distill_high_purity_low_hetp",
  },
  grid_packing_heavy: {
    efficiency: 4, capacity: 10, pressureDrop: 10, wettability: 5, pcCost: 4,
    structured: true, forVacuum: false,
    packing: "open_grid_lattice_heavy_liquid_pass",
    bestUse: "wash_tower_fouling_high_liquid_load",
  },
  ceramic_saddle_corrosive: {
    efficiency: 7, capacity: 7, pressureDrop: 6, wettability: 9, pcCost: 5,
    structured: false, forVacuum: false,
    packing: "ceramic_intalox_saddle_acid_alkali",
    bestUse: "acid_gas_scrub_corrosive_high_temp",
  },
  gauze_packing_vacuum: {
    efficiency: 10, capacity: 6, pressureDrop: 10, wettability: 10, pcCost: 9,
    structured: true, forVacuum: true,
    packing: "wire_gauze_mesh_capillary_spread_thin",
    bestUse: "fine_chem_pharma_deep_vacuum_distill",
  },
};

function get(t: PackedColumnType): PackedColumnData {
  return DATA[t];
}

export const efficiency = (t: PackedColumnType) => get(t).efficiency;
export const capacity = (t: PackedColumnType) => get(t).capacity;
export const pressureDrop = (t: PackedColumnType) => get(t).pressureDrop;
export const wettability = (t: PackedColumnType) => get(t).wettability;
export const pcCost = (t: PackedColumnType) => get(t).pcCost;
export const structured = (t: PackedColumnType) => get(t).structured;
export const forVacuum = (t: PackedColumnType) => get(t).forVacuum;
export const packing = (t: PackedColumnType) => get(t).packing;
export const bestUse = (t: PackedColumnType) => get(t).bestUse;
export const packedColumnTypes = (): PackedColumnType[] =>
  Object.keys(DATA) as PackedColumnType[];
