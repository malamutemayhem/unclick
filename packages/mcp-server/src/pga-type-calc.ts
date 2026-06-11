export type PgaType =
  | "resistor_mux_pga"
  | "capacitor_array_pga"
  | "vga_exponential"
  | "digital_step_atten"
  | "current_feedback_pga";

const DATA: Record<PgaType, {
  gainRange: number; bandwidth: number; noise: number;
  settlingTime: number; pgaCost: number; digital: boolean;
  forMedical: boolean; gainMethod: string; bestUse: string;
}> = {
  resistor_mux_pga: {
    gainRange: 6, bandwidth: 5, noise: 6,
    settlingTime: 5, pgaCost: 3, digital: true,
    forMedical: true, gainMethod: "switched_resistor_net",
    bestUse: "ecg_eeg_frontend",
  },
  capacitor_array_pga: {
    gainRange: 7, bandwidth: 7, noise: 8,
    settlingTime: 7, pgaCost: 5, digital: true,
    forMedical: false, gainMethod: "binary_cap_dac",
    bestUse: "cmos_image_column",
  },
  vga_exponential: {
    gainRange: 10, bandwidth: 9, noise: 5,
    settlingTime: 8, pgaCost: 7, digital: false,
    forMedical: false, gainMethod: "exponential_db_linear",
    bestUse: "agc_rf_receiver",
  },
  digital_step_atten: {
    gainRange: 8, bandwidth: 10, noise: 7,
    settlingTime: 10, pgaCost: 8, digital: true,
    forMedical: false, gainMethod: "pi_tee_switched_pad",
    bestUse: "5g_beamformer_chain",
  },
  current_feedback_pga: {
    gainRange: 5, bandwidth: 8, noise: 6,
    settlingTime: 9, pgaCost: 4, digital: false,
    forMedical: true, gainMethod: "cfb_gain_resistor",
    bestUse: "ultrasound_tgc",
  },
};

const get = (t: PgaType) => DATA[t];

export const gainRange = (t: PgaType) => get(t).gainRange;
export const bandwidth = (t: PgaType) => get(t).bandwidth;
export const noise = (t: PgaType) => get(t).noise;
export const settlingTime = (t: PgaType) => get(t).settlingTime;
export const pgaCost = (t: PgaType) => get(t).pgaCost;
export const digital = (t: PgaType) => get(t).digital;
export const forMedical = (t: PgaType) => get(t).forMedical;
export const gainMethod = (t: PgaType) => get(t).gainMethod;
export const bestUse = (t: PgaType) => get(t).bestUse;
export const pgaTypes = (): PgaType[] => Object.keys(DATA) as PgaType[];
