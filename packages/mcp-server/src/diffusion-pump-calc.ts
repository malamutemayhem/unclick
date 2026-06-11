export type DiffusionPumpType =
  | "oil_diffusion"
  | "mercury_diffusion"
  | "fractionating"
  | "vapor_booster"
  | "self_purifying";

interface DiffusionPumpData {
  ultimateVacuum: number;
  throughput: number;
  pumpingSpeed: number;
  backstreaming: number;
  dfCost: number;
  oilFree: boolean;
  forHighVacuum: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<DiffusionPumpType, DiffusionPumpData> = {
  oil_diffusion: {
    ultimateVacuum: 8, throughput: 8, pumpingSpeed: 9, backstreaming: 5, dfCost: 5,
    oilFree: false, forHighVacuum: true,
    pumpConfig: "oil_diffusion_pump_boil_oil_vapor_jet_entrain_gas_molecule_down",
    bestUse: "vacuum_coating_oil_diffusion_pump_high_speed_large_chamber_evap",
  },
  mercury_diffusion: {
    ultimateVacuum: 9, throughput: 6, pumpingSpeed: 7, backstreaming: 7, dfCost: 7,
    oilFree: true, forHighVacuum: true,
    pumpConfig: "mercury_diffusion_pump_mercury_vapor_jet_clean_ultra_high_vacuum",
    bestUse: "research_lab_mercury_diffusion_pump_ultra_clean_vacuum_analysis",
  },
  fractionating: {
    ultimateVacuum: 9, throughput: 7, pumpingSpeed: 8, backstreaming: 8, dfCost: 7,
    oilFree: false, forHighVacuum: true,
    pumpConfig: "fractionating_diffusion_pump_cold_cap_condense_trap_back_stream",
    bestUse: "electron_micro_fractionating_diffusion_pump_low_backstream_clean",
  },
  vapor_booster: {
    ultimateVacuum: 5, throughput: 9, pumpingSpeed: 10, backstreaming: 4, dfCost: 6,
    oilFree: false, forHighVacuum: false,
    pumpConfig: "vapor_booster_diffusion_pump_high_throughput_rough_to_high_bridge",
    bestUse: "metallurgy_vapor_booster_diffusion_pump_bridge_rough_high_vacuum",
  },
  self_purifying: {
    ultimateVacuum: 9, throughput: 7, pumpingSpeed: 8, backstreaming: 9, dfCost: 8,
    oilFree: false, forHighVacuum: true,
    pumpConfig: "self_purifying_diffusion_pump_ejector_stage_trap_contaminant_oil",
    bestUse: "semiconductor_self_purifying_diffusion_pump_clean_oil_trap_pure",
  },
};

function get(t: DiffusionPumpType): DiffusionPumpData {
  return DATA[t];
}

export const ultimateVacuum = (t: DiffusionPumpType) => get(t).ultimateVacuum;
export const throughput = (t: DiffusionPumpType) => get(t).throughput;
export const pumpingSpeed = (t: DiffusionPumpType) => get(t).pumpingSpeed;
export const backstreaming = (t: DiffusionPumpType) => get(t).backstreaming;
export const dfCost = (t: DiffusionPumpType) => get(t).dfCost;
export const oilFree = (t: DiffusionPumpType) => get(t).oilFree;
export const forHighVacuum = (t: DiffusionPumpType) => get(t).forHighVacuum;
export const pumpConfig = (t: DiffusionPumpType) => get(t).pumpConfig;
export const bestUse = (t: DiffusionPumpType) => get(t).bestUse;
export const diffusionPumpTypes = (): DiffusionPumpType[] =>
  Object.keys(DATA) as DiffusionPumpType[];
