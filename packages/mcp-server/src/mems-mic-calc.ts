export type MemsMic =
  | "capacitive_condenser"
  | "piezoelectric_pzt"
  | "optical_fabry_perot"
  | "bone_conduction"
  | "digital_pdm_mems";

const DATA: Record<MemsMic, {
  snr: number; sensitivity: number; bandwidth: number;
  aop: number; micCost: number; waterproof: boolean;
  forAi: boolean; transduction: string; bestUse: string;
}> = {
  capacitive_condenser: {
    snr: 9, sensitivity: 8, bandwidth: 8,
    aop: 7, micCost: 4, waterproof: false,
    forAi: true, transduction: "backplate_diaphragm_gap",
    bestUse: "studio_voice_recording",
  },
  piezoelectric_pzt: {
    snr: 6, sensitivity: 7, bandwidth: 7,
    aop: 10, micCost: 5, waterproof: true,
    forAi: false, transduction: "stress_charge_cantilever",
    bestUse: "industrial_ultrasonic_ndt",
  },
  optical_fabry_perot: {
    snr: 10, sensitivity: 10, bandwidth: 9,
    aop: 6, micCost: 9, waterproof: false,
    forAi: false, transduction: "interference_fringe_shift",
    bestUse: "photoacoustic_gas_detect",
  },
  bone_conduction: {
    snr: 5, sensitivity: 6, bandwidth: 4,
    aop: 8, micCost: 3, waterproof: true,
    forAi: true, transduction: "vibration_pickup_contact",
    bestUse: "noisy_env_voice_comm",
  },
  digital_pdm_mems: {
    snr: 8, sensitivity: 7, bandwidth: 7,
    aop: 8, micCost: 2, waterproof: false,
    forAi: true, transduction: "sigma_delta_modulated_bit",
    bestUse: "smart_speaker_far_field",
  },
};

const get = (t: MemsMic) => DATA[t];

export const snr = (t: MemsMic) => get(t).snr;
export const sensitivity = (t: MemsMic) => get(t).sensitivity;
export const bandwidth = (t: MemsMic) => get(t).bandwidth;
export const aop = (t: MemsMic) => get(t).aop;
export const micCost = (t: MemsMic) => get(t).micCost;
export const waterproof = (t: MemsMic) => get(t).waterproof;
export const forAi = (t: MemsMic) => get(t).forAi;
export const transduction = (t: MemsMic) => get(t).transduction;
export const bestUse = (t: MemsMic) => get(t).bestUse;
export const memsMics = (): MemsMic[] => Object.keys(DATA) as MemsMic[];
