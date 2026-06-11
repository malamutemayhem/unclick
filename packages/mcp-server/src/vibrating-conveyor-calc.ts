export type VibratingConveyorType =
  | "electromagnetic_drive"
  | "electromechanical_eccentric"
  | "natural_frequency_tuned"
  | "brute_force_unbalanced"
  | "linear_resonant_spring";

interface VibratingConveyorData {
  capacity: number;
  control: number;
  energyUse: number;
  dustFree: number;
  vcCost: number;
  screenCapable: boolean;
  forHot: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<VibratingConveyorType, VibratingConveyorData> = {
  electromagnetic_drive: {
    capacity: 5, control: 10, energyUse: 8, dustFree: 7, vcCost: 6,
    screenCapable: true, forHot: false,
    drive: "electromagnetic_coil_armature_pulse",
    bestUse: "precision_feed_weigh_batch_control",
  },
  electromechanical_eccentric: {
    capacity: 8, control: 6, energyUse: 5, dustFree: 6, vcCost: 4,
    screenCapable: true, forHot: true,
    drive: "eccentric_shaft_motor_direct_connect",
    bestUse: "heavy_duty_foundry_casting_hot_part",
  },
  natural_frequency_tuned: {
    capacity: 7, control: 7, energyUse: 10, dustFree: 7, vcCost: 7,
    screenCapable: true, forHot: false,
    drive: "tuned_spring_mass_natural_resonance",
    bestUse: "energy_efficient_continuous_bulk_feed",
  },
  brute_force_unbalanced: {
    capacity: 10, control: 4, energyUse: 3, dustFree: 5, vcCost: 3,
    screenCapable: false, forHot: true,
    drive: "unbalanced_motor_direct_force_apply",
    bestUse: "rugged_mining_quarry_heavy_lump_rock",
  },
  linear_resonant_spring: {
    capacity: 6, control: 8, energyUse: 9, dustFree: 8, vcCost: 5,
    screenCapable: true, forHot: false,
    drive: "linear_spring_drive_low_stroke_high_freq",
    bestUse: "food_pharma_sanitary_gentle_convey",
  },
};

function get(t: VibratingConveyorType): VibratingConveyorData {
  return DATA[t];
}

export const capacity = (t: VibratingConveyorType) => get(t).capacity;
export const control = (t: VibratingConveyorType) => get(t).control;
export const energyUse = (t: VibratingConveyorType) => get(t).energyUse;
export const dustFree = (t: VibratingConveyorType) => get(t).dustFree;
export const vcCost = (t: VibratingConveyorType) => get(t).vcCost;
export const screenCapable = (t: VibratingConveyorType) => get(t).screenCapable;
export const forHot = (t: VibratingConveyorType) => get(t).forHot;
export const drive = (t: VibratingConveyorType) => get(t).drive;
export const bestUse = (t: VibratingConveyorType) => get(t).bestUse;
export const vibratingConveyorTypes = (): VibratingConveyorType[] =>
  Object.keys(DATA) as VibratingConveyorType[];
