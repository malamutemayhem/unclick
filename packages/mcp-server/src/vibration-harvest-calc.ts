export type VibrationHarvest =
  | "electromagnetic_coil"
  | "electrostatic_comb"
  | "piezoelectric_beam"
  | "magnetostrictive_rod"
  | "triboelectric_contact";

const DATA: Record<VibrationHarvest, {
  powerOutput: number; bandwidth: number; size: number;
  durability: number; vhCost: number; noMagnet: boolean;
  forBridge: boolean; transduction: string; bestUse: string;
}> = {
  electromagnetic_coil: {
    powerOutput: 8, bandwidth: 6, size: 4,
    durability: 8, vhCost: 5, noMagnet: false,
    forBridge: true, transduction: "faraday_moving_coil",
    bestUse: "machine_health_monitor",
  },
  electrostatic_comb: {
    powerOutput: 4, bandwidth: 7, size: 9,
    durability: 9, vhCost: 6, noMagnet: true,
    forBridge: false, transduction: "variable_capacitor_gap",
    bestUse: "mems_on_chip_scavenge",
  },
  piezoelectric_beam: {
    powerOutput: 7, bandwidth: 5, size: 7,
    durability: 7, vhCost: 4, noMagnet: true,
    forBridge: true, transduction: "stress_charge_couple",
    bestUse: "tire_pressure_self_power",
  },
  magnetostrictive_rod: {
    powerOutput: 9, bandwidth: 4, size: 3,
    durability: 10, vhCost: 7, noMagnet: false,
    forBridge: true, transduction: "villari_effect_flux",
    bestUse: "rail_track_vibration_node",
  },
  triboelectric_contact: {
    powerOutput: 5, bandwidth: 9, size: 8,
    durability: 5, vhCost: 2, noMagnet: true,
    forBridge: false, transduction: "contact_electrification",
    bestUse: "wearable_motion_nanogen",
  },
};

const get = (t: VibrationHarvest) => DATA[t];

export const powerOutput = (t: VibrationHarvest) => get(t).powerOutput;
export const bandwidth = (t: VibrationHarvest) => get(t).bandwidth;
export const size = (t: VibrationHarvest) => get(t).size;
export const durability = (t: VibrationHarvest) => get(t).durability;
export const vhCost = (t: VibrationHarvest) => get(t).vhCost;
export const noMagnet = (t: VibrationHarvest) => get(t).noMagnet;
export const forBridge = (t: VibrationHarvest) => get(t).forBridge;
export const transduction = (t: VibrationHarvest) => get(t).transduction;
export const bestUse = (t: VibrationHarvest) => get(t).bestUse;
export const vibrationHarvests = (): VibrationHarvest[] => Object.keys(DATA) as VibrationHarvest[];
