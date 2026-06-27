export type ProgrammableGain =
  | "resistor_ladder_mux"
  | "r2r_dac_feedback"
  | "capacitor_switched_pga"
  | "digital_pot_wiper"
  | "vga_exponential_db";

const DATA: Record<ProgrammableGain, {
  gainRange: number; bandwidth: number; accuracy: number;
  settling: number; pgCost: number; continuous: boolean;
  forSensor: boolean; gainControl: string; bestUse: string;
}> = {
  resistor_ladder_mux: {
    gainRange: 6, bandwidth: 8, accuracy: 8,
    settling: 7, pgCost: 3, continuous: false,
    forSensor: true, gainControl: "binary_weighted_mux_select",
    bestUse: "strain_gauge_bridge_amp",
  },
  r2r_dac_feedback: {
    gainRange: 9, bandwidth: 7, accuracy: 7,
    settling: 6, pgCost: 5, continuous: true,
    forSensor: false, gainControl: "dac_driven_feedback_resistor",
    bestUse: "agc_loop_audio_leveling",
  },
  capacitor_switched_pga: {
    gainRange: 7, bandwidth: 5, accuracy: 10,
    settling: 5, pgCost: 6, continuous: false,
    forSensor: true, gainControl: "charge_redistribution_cap_array",
    bestUse: "delta_sigma_adc_frontend",
  },
  digital_pot_wiper: {
    gainRange: 5, bandwidth: 4, accuracy: 4,
    settling: 8, pgCost: 2, continuous: true,
    forSensor: false, gainControl: "resistive_wiper_tap_select",
    bestUse: "user_adjustable_volume_trim",
  },
  vga_exponential_db: {
    gainRange: 10, bandwidth: 10, accuracy: 6,
    settling: 10, pgCost: 7, continuous: true,
    forSensor: false, gainControl: "translinear_exponential_cell",
    bestUse: "radar_if_gain_control",
  },
};

const get = (t: ProgrammableGain) => DATA[t];

export const gainRange = (t: ProgrammableGain) => get(t).gainRange;
export const bandwidth = (t: ProgrammableGain) => get(t).bandwidth;
export const accuracy = (t: ProgrammableGain) => get(t).accuracy;
export const settling = (t: ProgrammableGain) => get(t).settling;
export const pgCost = (t: ProgrammableGain) => get(t).pgCost;
export const continuous = (t: ProgrammableGain) => get(t).continuous;
export const forSensor = (t: ProgrammableGain) => get(t).forSensor;
export const gainControl = (t: ProgrammableGain) => get(t).gainControl;
export const bestUse = (t: ProgrammableGain) => get(t).bestUse;
export const programmableGains = (): ProgrammableGain[] => Object.keys(DATA) as ProgrammableGain[];
