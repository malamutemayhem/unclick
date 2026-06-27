export type RootsBlowerType =
  | "two_lobe"
  | "three_lobe"
  | "twisted_lobe"
  | "coated_rotor"
  | "vacuum_booster";

interface RootsBlowerData {
  volumeFlow: number;
  throughput: number;
  pressureRatio: number;
  noiseLevel: number;
  rbCost: number;
  oilFree: boolean;
  forWastewater: boolean;
  blowerConfig: string;
  bestUse: string;
}

const DATA: Record<RootsBlowerType, RootsBlowerData> = {
  two_lobe: {
    volumeFlow: 8, throughput: 8, pressureRatio: 6, noiseLevel: 4, rbCost: 5,
    oilFree: true, forWastewater: true,
    blowerConfig: "two_lobe_roots_blower_figure_eight_rotor_positive_displace_air",
    bestUse: "aeration_tank_two_lobe_roots_blower_positive_displace_air_supply",
  },
  three_lobe: {
    volumeFlow: 8, throughput: 8, pressureRatio: 7, noiseLevel: 6, rbCost: 6,
    oilFree: true, forWastewater: true,
    blowerConfig: "three_lobe_roots_blower_tri_lobe_rotor_less_pulse_smoother_flow",
    bestUse: "pneumatic_convey_three_lobe_roots_blower_smooth_pulse_free_air",
  },
  twisted_lobe: {
    volumeFlow: 8, throughput: 8, pressureRatio: 7, noiseLevel: 8, rbCost: 8,
    oilFree: true, forWastewater: true,
    blowerConfig: "twisted_lobe_roots_blower_helical_rotor_low_noise_vibration_free",
    bestUse: "aquaculture_twisted_lobe_roots_blower_low_noise_fish_pond_aerate",
  },
  coated_rotor: {
    volumeFlow: 7, throughput: 7, pressureRatio: 7, noiseLevel: 7, rbCost: 7,
    oilFree: true, forWastewater: false,
    blowerConfig: "coated_rotor_roots_blower_ptfe_coat_chemical_resist_gas_boost",
    bestUse: "biogas_boost_coated_rotor_roots_blower_chemical_resist_gas_move",
  },
  vacuum_booster: {
    volumeFlow: 9, throughput: 7, pressureRatio: 5, noiseLevel: 5, rbCost: 7,
    oilFree: true, forWastewater: false,
    blowerConfig: "vacuum_booster_roots_blower_low_pressure_high_volume_evacuate",
    bestUse: "vacuum_furnace_vacuum_booster_roots_blower_fast_evacuate_chamber",
  },
};

function get(t: RootsBlowerType): RootsBlowerData {
  return DATA[t];
}

export const volumeFlow = (t: RootsBlowerType) => get(t).volumeFlow;
export const throughput = (t: RootsBlowerType) => get(t).throughput;
export const pressureRatio = (t: RootsBlowerType) => get(t).pressureRatio;
export const noiseLevel = (t: RootsBlowerType) => get(t).noiseLevel;
export const rbCost = (t: RootsBlowerType) => get(t).rbCost;
export const oilFree = (t: RootsBlowerType) => get(t).oilFree;
export const forWastewater = (t: RootsBlowerType) => get(t).forWastewater;
export const blowerConfig = (t: RootsBlowerType) => get(t).blowerConfig;
export const bestUse = (t: RootsBlowerType) => get(t).bestUse;
export const rootsBlowerTypes = (): RootsBlowerType[] =>
  Object.keys(DATA) as RootsBlowerType[];
