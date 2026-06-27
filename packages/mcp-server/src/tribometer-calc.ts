export type TribometerType =
  | "pin_on_disc"
  | "ball_on_flat"
  | "block_on_ring"
  | "four_ball_test"
  | "fretting_trib";

interface TribometerData {
  loadRange: number;
  throughput: number;
  wearMeasure: number;
  frictionRes: number;
  trCost: number;
  reciprocating: boolean;
  forLubricant: boolean;
  tribConfig: string;
  bestUse: string;
}

const DATA: Record<TribometerType, TribometerData> = {
  pin_on_disc: {
    loadRange: 8, throughput: 7, wearMeasure: 9, frictionRes: 8, trCost: 5,
    reciprocating: false, forLubricant: false,
    tribConfig: "pin_on_disc_tribometer_rotating_disc_stationary_pin_wear_track",
    bestUse: "coating_wear_pin_on_disc_tribometer_standard_astm_g99_test",
  },
  ball_on_flat: {
    loadRange: 6, throughput: 8, wearMeasure: 8, frictionRes: 9, trCost: 4,
    reciprocating: true, forLubricant: true,
    tribConfig: "ball_on_flat_tribometer_reciprocating_linear_micro_nano_scale",
    bestUse: "thin_film_ball_on_flat_tribometer_reciprocating_scratch_nano",
  },
  block_on_ring: {
    loadRange: 10, throughput: 7, wearMeasure: 7, frictionRes: 7, trCost: 5,
    reciprocating: false, forLubricant: true,
    tribConfig: "block_on_ring_tribometer_high_load_conforming_contact_bearing",
    bestUse: "bearing_material_block_on_ring_tribometer_high_load_conforming",
  },
  four_ball_test: {
    loadRange: 9, throughput: 9, wearMeasure: 6, frictionRes: 6, trCost: 3,
    reciprocating: false, forLubricant: true,
    tribConfig: "four_ball_tribometer_lubricant_ep_aw_test_astm_d2266_standard",
    bestUse: "lubricant_test_four_ball_tribometer_ep_aw_performance_standard",
  },
  fretting_trib: {
    loadRange: 5, throughput: 5, wearMeasure: 10, frictionRes: 10, trCost: 8,
    reciprocating: true, forLubricant: false,
    tribConfig: "fretting_tribometer_micro_displacement_oscillating_fatigue_wear",
    bestUse: "fretting_fatigue_fretting_tribometer_micro_motion_contact_damage",
  },
};

function get(t: TribometerType): TribometerData {
  return DATA[t];
}

export const loadRange = (t: TribometerType) => get(t).loadRange;
export const throughput = (t: TribometerType) => get(t).throughput;
export const wearMeasure = (t: TribometerType) => get(t).wearMeasure;
export const frictionRes = (t: TribometerType) => get(t).frictionRes;
export const trCost = (t: TribometerType) => get(t).trCost;
export const reciprocating = (t: TribometerType) => get(t).reciprocating;
export const forLubricant = (t: TribometerType) => get(t).forLubricant;
export const tribConfig = (t: TribometerType) => get(t).tribConfig;
export const bestUse = (t: TribometerType) => get(t).bestUse;
export const tribometerTypes = (): TribometerType[] =>
  Object.keys(DATA) as TribometerType[];
