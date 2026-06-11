export type CombustionChamberType =
  | "can_tubular_individual"
  | "cannular_can_annular"
  | "annular_full_ring"
  | "reverse_flow_compact"
  | "rich_burn_quick_quench";

const DATA: Record<CombustionChamberType, {
  efficiency: number; emissions: number; durability: number;
  uniformity: number; ccCost: number; dryLowNox: boolean;
  forAero: boolean; geometry: string; bestUse: string;
}> = {
  can_tubular_individual: {
    efficiency: 6, emissions: 4, durability: 8,
    uniformity: 5, ccCost: 2, dryLowNox: false,
    forAero: false, geometry: "discrete_tube_individual_flame",
    bestUse: "industrial_gas_turbine_legacy",
  },
  cannular_can_annular: {
    efficiency: 7, emissions: 6, durability: 7,
    uniformity: 7, ccCost: 3, dryLowNox: false,
    forAero: true, geometry: "can_tubes_in_annular_casing",
    bestUse: "older_aero_engine_easy_service",
  },
  annular_full_ring: {
    efficiency: 9, emissions: 7, durability: 8,
    uniformity: 9, ccCost: 4, dryLowNox: false,
    forAero: true, geometry: "continuous_ring_liner_dome",
    bestUse: "modern_aero_engine_compact_light",
  },
  reverse_flow_compact: {
    efficiency: 7, emissions: 5, durability: 7,
    uniformity: 6, ccCost: 3, dryLowNox: false,
    forAero: false, geometry: "folded_flow_path_short_engine",
    bestUse: "small_turboshaft_helicopter_apu",
  },
  rich_burn_quick_quench: {
    efficiency: 8, emissions: 9, durability: 6,
    uniformity: 8, ccCost: 5, dryLowNox: true,
    forAero: false, geometry: "staged_rich_zone_lean_burnout",
    bestUse: "low_nox_industrial_power_gen",
  },
};

const get = (t: CombustionChamberType) => DATA[t];

export const efficiency = (t: CombustionChamberType) => get(t).efficiency;
export const emissions = (t: CombustionChamberType) => get(t).emissions;
export const durability = (t: CombustionChamberType) => get(t).durability;
export const uniformity = (t: CombustionChamberType) => get(t).uniformity;
export const ccCost = (t: CombustionChamberType) => get(t).ccCost;
export const dryLowNox = (t: CombustionChamberType) => get(t).dryLowNox;
export const forAero = (t: CombustionChamberType) => get(t).forAero;
export const geometry = (t: CombustionChamberType) => get(t).geometry;
export const bestUse = (t: CombustionChamberType) => get(t).bestUse;
export const combustionChamberTypes = (): CombustionChamberType[] => Object.keys(DATA) as CombustionChamberType[];
