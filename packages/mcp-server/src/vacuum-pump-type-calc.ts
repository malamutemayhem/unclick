export type VacuumPumpType =
  | "rotary_vane_oil_sealed"
  | "scroll_dry_oil_free"
  | "diaphragm_dry_chemical"
  | "liquid_ring_water_sealed"
  | "turbomolecular_high_vacuum";

interface VacuumPumpData {
  vacuum: number;
  flow: number;
  reliability: number;
  cleanness: number;
  vpCost: number;
  oilFree: boolean;
  forLab: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<VacuumPumpType, VacuumPumpData> = {
  rotary_vane_oil_sealed: {
    vacuum: 7, flow: 8, reliability: 9, cleanness: 4, vpCost: 5,
    oilFree: false, forLab: false,
    mechanism: "sliding_vane_oil_lubricated_rotor",
    bestUse: "industrial_general_vacuum_hold_pack",
  },
  scroll_dry_oil_free: {
    vacuum: 6, flow: 5, reliability: 8, cleanness: 9, vpCost: 7,
    oilFree: true, forLab: true,
    mechanism: "orbiting_scroll_dry_compress",
    bestUse: "lab_analytical_clean_sample_prep",
  },
  diaphragm_dry_chemical: {
    vacuum: 4, flow: 3, reliability: 7, cleanness: 10, vpCost: 4,
    oilFree: true, forLab: true,
    mechanism: "flexing_diaphragm_ptfe_head",
    bestUse: "chemistry_solvent_evap_filtration",
  },
  liquid_ring_water_sealed: {
    vacuum: 6, flow: 9, reliability: 9, cleanness: 5, vpCost: 6,
    oilFree: true, forLab: false,
    mechanism: "impeller_water_ring_seal_compress",
    bestUse: "wet_gas_vapor_recovery_process",
  },
  turbomolecular_high_vacuum: {
    vacuum: 10, flow: 2, reliability: 6, cleanness: 10, vpCost: 10,
    oilFree: true, forLab: true,
    mechanism: "high_speed_rotor_molecular_drag",
    bestUse: "uhv_semiconductor_mass_spec_coat",
  },
};

function get(t: VacuumPumpType): VacuumPumpData {
  return DATA[t];
}

export const vacuum = (t: VacuumPumpType) => get(t).vacuum;
export const flow = (t: VacuumPumpType) => get(t).flow;
export const reliability = (t: VacuumPumpType) => get(t).reliability;
export const cleanness = (t: VacuumPumpType) => get(t).cleanness;
export const vpCost = (t: VacuumPumpType) => get(t).vpCost;
export const oilFree = (t: VacuumPumpType) => get(t).oilFree;
export const forLab = (t: VacuumPumpType) => get(t).forLab;
export const mechanism = (t: VacuumPumpType) => get(t).mechanism;
export const bestUse = (t: VacuumPumpType) => get(t).bestUse;
export const vacuumPumpTypes = (): VacuumPumpType[] =>
  Object.keys(DATA) as VacuumPumpType[];
