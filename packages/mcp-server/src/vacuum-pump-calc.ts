export type VacuumPumpType =
  | "rotary_vane_oil"
  | "liquid_ring_seal"
  | "dry_scroll_clean"
  | "roots_booster_lobe"
  | "turbo_molecular_uhv";

interface VacuumPumpData {
  ultimateVacuum: number;
  pumpingSpeed: number;
  oilFree: number;
  reliability: number;
  vpCost: number;
  dryOperation: boolean;
  forCleanroom: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<VacuumPumpType, VacuumPumpData> = {
  rotary_vane_oil: {
    ultimateVacuum: 7, pumpingSpeed: 7, oilFree: 2, reliability: 9, vpCost: 4,
    dryOperation: false, forCleanroom: false,
    principle: "oil_sealed_sliding_vane_rotary_positive_disp",
    bestUse: "general_industrial_vacuum_packaging_degassing",
  },
  liquid_ring_seal: {
    ultimateVacuum: 5, pumpingSpeed: 8, oilFree: 7, reliability: 9, vpCost: 5,
    dryOperation: false, forCleanroom: false,
    principle: "liquid_ring_sealant_isothermal_compression",
    bestUse: "wet_gas_vapor_extraction_chemical_process",
  },
  dry_scroll_clean: {
    ultimateVacuum: 8, pumpingSpeed: 5, oilFree: 10, reliability: 7, vpCost: 7,
    dryOperation: true, forCleanroom: true,
    principle: "orbiting_scroll_pair_oil_free_compression",
    bestUse: "lab_analytical_instrument_clean_vacuum_source",
  },
  roots_booster_lobe: {
    ultimateVacuum: 6, pumpingSpeed: 10, oilFree: 9, reliability: 8, vpCost: 6,
    dryOperation: true, forCleanroom: false,
    principle: "twin_lobe_rotor_booster_stage_high_throughput",
    bestUse: "vacuum_furnace_metallurgy_large_chamber_evac",
  },
  turbo_molecular_uhv: {
    ultimateVacuum: 10, pumpingSpeed: 6, oilFree: 10, reliability: 6, vpCost: 10,
    dryOperation: true, forCleanroom: true,
    principle: "high_speed_rotor_molecular_drag_uhv_stage",
    bestUse: "semiconductor_fab_mass_spectrometer_uhv_system",
  },
};

function get(t: VacuumPumpType): VacuumPumpData {
  return DATA[t];
}

export const ultimateVacuum = (t: VacuumPumpType) => get(t).ultimateVacuum;
export const pumpingSpeed = (t: VacuumPumpType) => get(t).pumpingSpeed;
export const oilFree = (t: VacuumPumpType) => get(t).oilFree;
export const reliability = (t: VacuumPumpType) => get(t).reliability;
export const vpCost = (t: VacuumPumpType) => get(t).vpCost;
export const dryOperation = (t: VacuumPumpType) => get(t).dryOperation;
export const forCleanroom = (t: VacuumPumpType) => get(t).forCleanroom;
export const principle = (t: VacuumPumpType) => get(t).principle;
export const bestUse = (t: VacuumPumpType) => get(t).bestUse;
export const vacuumPumpTypes = (): VacuumPumpType[] =>
  Object.keys(DATA) as VacuumPumpType[];
