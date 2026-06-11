export type RfAttenuator =
  | "fixed_pi_pad"
  | "fixed_t_pad"
  | "step_switched"
  | "digital_pin_diode"
  | "variable_voltage_ctrl";

const DATA: Record<RfAttenuator, {
  range: number; flatness: number; speed: number;
  powerHandle: number; attCost: number; continuous: boolean;
  forAgc: boolean; element: string; bestUse: string;
}> = {
  fixed_pi_pad: {
    range: 3, flatness: 9, speed: 10,
    powerHandle: 8, attCost: 1, continuous: false,
    forAgc: false, element: "thick_film_resistor_net",
    bestUse: "level_set_calibration",
  },
  fixed_t_pad: {
    range: 3, flatness: 9, speed: 10,
    powerHandle: 7, attCost: 1, continuous: false,
    forAgc: false, element: "thin_film_resistor_net",
    bestUse: "interstage_pad_isolation",
  },
  step_switched: {
    range: 8, flatness: 8, speed: 7,
    powerHandle: 7, attCost: 5, continuous: false,
    forAgc: false, element: "relay_mems_switched_bank",
    bestUse: "test_equipment_precision",
  },
  digital_pin_diode: {
    range: 9, flatness: 7, speed: 9,
    powerHandle: 6, attCost: 6, continuous: true,
    forAgc: true, element: "forward_bias_pin_junction",
    bestUse: "radar_receiver_protect",
  },
  variable_voltage_ctrl: {
    range: 10, flatness: 6, speed: 8,
    powerHandle: 5, attCost: 7, continuous: true,
    forAgc: true, element: "gaas_fet_cold_channel",
    bestUse: "agc_loop_dynamic_range",
  },
};

const get = (t: RfAttenuator) => DATA[t];

export const range = (t: RfAttenuator) => get(t).range;
export const flatness = (t: RfAttenuator) => get(t).flatness;
export const speed = (t: RfAttenuator) => get(t).speed;
export const powerHandle = (t: RfAttenuator) => get(t).powerHandle;
export const attCost = (t: RfAttenuator) => get(t).attCost;
export const continuous = (t: RfAttenuator) => get(t).continuous;
export const forAgc = (t: RfAttenuator) => get(t).forAgc;
export const element = (t: RfAttenuator) => get(t).element;
export const bestUse = (t: RfAttenuator) => get(t).bestUse;
export const rfAttenuators = (): RfAttenuator[] => Object.keys(DATA) as RfAttenuator[];
