export type PinMillType =
  | "single_rotor_pin"
  | "counter_rotate_pin"
  | "disc_pin"
  | "turbo_pin"
  | "fine_impact_pin";

interface PinMillData {
  fineness: number;
  throughput: number;
  heatGeneration: number;
  energyEfficiency: number;
  pnCost: number;
  counterRotate: boolean;
  forSugar: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<PinMillType, PinMillData> = {
  single_rotor_pin: {
    fineness: 6, throughput: 8, heatGeneration: 6, energyEfficiency: 7, pnCost: 4,
    counterRotate: false, forSugar: true,
    millConfig: "single_rotor_pin_mill_fixed_stator_pin_impact_shatter_grind",
    bestUse: "sugar_grind_single_rotor_pin_mill_impact_shatter_icing_powder",
  },
  counter_rotate_pin: {
    fineness: 8, throughput: 7, heatGeneration: 7, energyEfficiency: 8, pnCost: 7,
    counterRotate: true, forSugar: true,
    millConfig: "counter_rotate_pin_mill_dual_disc_oppose_spin_high_impact_fine",
    bestUse: "spice_grind_counter_rotate_pin_mill_high_impact_fine_aromatic",
  },
  disc_pin: {
    fineness: 7, throughput: 9, heatGeneration: 5, energyEfficiency: 7, pnCost: 5,
    counterRotate: false, forSugar: false,
    millConfig: "disc_pin_mill_flat_disc_radial_pin_centrifugal_throw_impact",
    bestUse: "starch_modify_disc_pin_mill_centrifugal_impact_deagglomerate",
  },
  turbo_pin: {
    fineness: 9, throughput: 6, heatGeneration: 8, energyEfficiency: 6, pnCost: 8,
    counterRotate: false, forSugar: false,
    millConfig: "turbo_pin_mill_high_speed_rotor_multi_row_pin_ultra_fine_grind",
    bestUse: "toner_grind_turbo_pin_mill_ultra_fine_narrow_distribution_powder",
  },
  fine_impact_pin: {
    fineness: 8, throughput: 7, heatGeneration: 7, energyEfficiency: 7, pnCost: 6,
    counterRotate: false, forSugar: true,
    millConfig: "fine_impact_pin_mill_classifier_wheel_recirculate_oversize_grind",
    bestUse: "cocoa_grind_fine_impact_pin_mill_classify_recirculate_uniform",
  },
};

function get(t: PinMillType): PinMillData {
  return DATA[t];
}

export const fineness = (t: PinMillType) => get(t).fineness;
export const throughput = (t: PinMillType) => get(t).throughput;
export const heatGeneration = (t: PinMillType) => get(t).heatGeneration;
export const energyEfficiency = (t: PinMillType) => get(t).energyEfficiency;
export const pnCost = (t: PinMillType) => get(t).pnCost;
export const counterRotate = (t: PinMillType) => get(t).counterRotate;
export const forSugar = (t: PinMillType) => get(t).forSugar;
export const millConfig = (t: PinMillType) => get(t).millConfig;
export const bestUse = (t: PinMillType) => get(t).bestUse;
export const pinMillTypes = (): PinMillType[] =>
  Object.keys(DATA) as PinMillType[];
