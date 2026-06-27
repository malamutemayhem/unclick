// rotary-encoder-calc - rotary encoder types

export type RotaryEncoder =
  | "mechanical_click_basic"
  | "optical_high_res"
  | "magnetic_absolute"
  | "capacitive_touch_enc"
  | "incremental_quadrature";

const DATA: Record<RotaryEncoder, {
  resolution: number; accuracy: number; durability: number; responseSpeed: number;
  cost: number; absolute: boolean; withButton: boolean; sensingMethod: string; bestUse: string;
}> = {
  mechanical_click_basic:    { resolution: 4, accuracy: 5, durability: 5, responseSpeed: 6, cost: 1, absolute: false, withButton: true, sensingMethod: "detent_contact_switch", bestUse: "menu_scroll_select" },
  optical_high_res:          { resolution: 10, accuracy: 10, durability: 8, responseSpeed: 10, cost: 8, absolute: false, withButton: false, sensingMethod: "optical_disc_phototrans", bestUse: "precision_position_read" },
  magnetic_absolute:         { resolution: 8, accuracy: 9, durability: 10, responseSpeed: 9, cost: 7, absolute: true, withButton: false, sensingMethod: "hall_effect_magnet", bestUse: "absolute_angle_sense" },
  capacitive_touch_enc:      { resolution: 7, accuracy: 7, durability: 9, responseSpeed: 8, cost: 6, absolute: false, withButton: false, sensingMethod: "capacitive_pad_array", bestUse: "touch_dial_interface" },
  incremental_quadrature:    { resolution: 6, accuracy: 7, durability: 7, responseSpeed: 7, cost: 3, absolute: false, withButton: true, sensingMethod: "quadrature_a_b_pulse", bestUse: "general_knob_input" },
};

const get = (e: RotaryEncoder) => DATA[e];
export const resolution = (e: RotaryEncoder) => get(e).resolution;
export const accuracy = (e: RotaryEncoder) => get(e).accuracy;
export const durability = (e: RotaryEncoder) => get(e).durability;
export const responseSpeed = (e: RotaryEncoder) => get(e).responseSpeed;
export const encoderCost = (e: RotaryEncoder) => get(e).cost;
export const absolute = (e: RotaryEncoder) => get(e).absolute;
export const withButton = (e: RotaryEncoder) => get(e).withButton;
export const sensingMethod = (e: RotaryEncoder) => get(e).sensingMethod;
export const bestUse = (e: RotaryEncoder) => get(e).bestUse;
export const rotaryEncoders = (): RotaryEncoder[] => Object.keys(DATA) as RotaryEncoder[];
