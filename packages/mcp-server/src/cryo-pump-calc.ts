export type CryoPumpType =
  | "gifford_mcmahon"
  | "joule_thomson"
  | "liquid_helium"
  | "pulse_tube"
  | "sorption_cryo";

interface CryoPumpData {
  pumpSpeed: number;
  throughput: number;
  ultimateVacuum: number;
  cooldownTime: number;
  cpCost: number;
  oilFree: boolean;
  forClean: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<CryoPumpType, CryoPumpData> = {
  gifford_mcmahon: {
    pumpSpeed: 8, throughput: 8, ultimateVacuum: 9, cooldownTime: 6, cpCost: 7,
    oilFree: true, forClean: true,
    pumpConfig: "gifford_mcmahon_cryo_pump_closed_cycle_two_stage_high_vacuum",
    bestUse: "semiconductor_gifford_mcmahon_cryo_pump_clean_high_speed_uhv",
  },
  joule_thomson: {
    pumpSpeed: 6, throughput: 6, ultimateVacuum: 7, cooldownTime: 9, cpCost: 4,
    oilFree: true, forClean: false,
    pumpConfig: "joule_thomson_cryo_pump_open_cycle_gas_expansion_rapid_cool",
    bestUse: "rapid_cool_joule_thomson_cryo_pump_open_cycle_fast_pumpdown",
  },
  liquid_helium: {
    pumpSpeed: 10, throughput: 7, ultimateVacuum: 10, cooldownTime: 5, cpCost: 10,
    oilFree: true, forClean: true,
    pumpConfig: "liquid_helium_cryo_pump_bath_lowest_temperature_ultimate_vacuum",
    bestUse: "research_uhv_liquid_helium_cryo_pump_lowest_base_pressure_lab",
  },
  pulse_tube: {
    pumpSpeed: 7, throughput: 7, ultimateVacuum: 8, cooldownTime: 7, cpCost: 8,
    oilFree: true, forClean: true,
    pumpConfig: "pulse_tube_cryo_pump_no_moving_cold_part_low_vibration_quiet",
    bestUse: "low_vibration_pulse_tube_cryo_pump_quiet_sensitive_instrument",
  },
  sorption_cryo: {
    pumpSpeed: 4, throughput: 4, ultimateVacuum: 6, cooldownTime: 8, cpCost: 2,
    oilFree: true, forClean: false,
    pumpConfig: "sorption_cryo_pump_zeolite_molecular_sieve_rough_pump_clean",
    bestUse: "clean_rough_pump_sorption_cryo_zeolite_sieve_oil_free_backing",
  },
};

function get(t: CryoPumpType): CryoPumpData {
  return DATA[t];
}

export const pumpSpeed = (t: CryoPumpType) => get(t).pumpSpeed;
export const throughput = (t: CryoPumpType) => get(t).throughput;
export const ultimateVacuum = (t: CryoPumpType) => get(t).ultimateVacuum;
export const cooldownTime = (t: CryoPumpType) => get(t).cooldownTime;
export const cpCost = (t: CryoPumpType) => get(t).cpCost;
export const oilFree = (t: CryoPumpType) => get(t).oilFree;
export const forClean = (t: CryoPumpType) => get(t).forClean;
export const pumpConfig = (t: CryoPumpType) => get(t).pumpConfig;
export const bestUse = (t: CryoPumpType) => get(t).bestUse;
export const cryoPumpTypes = (): CryoPumpType[] =>
  Object.keys(DATA) as CryoPumpType[];
