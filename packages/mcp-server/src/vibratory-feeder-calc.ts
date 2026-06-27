export type VibratoryFeederType =
  | "electromagnetic"
  | "electromechanical"
  | "grizzly_scalping"
  | "bowl_feeder"
  | "linear_tray";

interface VibratoryFeederData {
  feedRate: number;
  controlPrecision: number;
  durability: number;
  noiseLevel: number;
  vfCost: number;
  variableSpeed: boolean;
  forFineParticle: boolean;
  driveType: string;
  bestUse: string;
}

const DATA: Record<VibratoryFeederType, VibratoryFeederData> = {
  electromagnetic: {
    feedRate: 7, controlPrecision: 10, durability: 9, noiseLevel: 8, vfCost: 6,
    variableSpeed: true, forFineParticle: true,
    driveType: "ac_electromagnet_armature_spring_tuned_frequency_instant",
    bestUse: "weighing_dosing_packaging_precise_feed_rate_laboratory_batch",
  },
  electromechanical: {
    feedRate: 9, controlPrecision: 7, durability: 7, noiseLevel: 5, vfCost: 5,
    variableSpeed: true, forFineParticle: false,
    driveType: "eccentric_weight_motor_unbalanced_rotation_brute_force",
    bestUse: "mining_quarry_aggregate_heavy_duty_primary_crusher_feed",
  },
  grizzly_scalping: {
    feedRate: 10, controlPrecision: 4, durability: 10, noiseLevel: 3, vfCost: 7,
    variableSpeed: false, forFineParticle: false,
    driveType: "heavy_eccentric_motor_grizzly_bar_screen_scalp_oversize",
    bestUse: "quarry_primary_screen_rom_ore_scalp_fines_before_crusher",
  },
  bowl_feeder: {
    feedRate: 5, controlPrecision: 10, durability: 8, noiseLevel: 7, vfCost: 8,
    variableSpeed: true, forFineParticle: true,
    driveType: "base_mounted_electromagnet_spiral_bowl_orient_parts_inline",
    bestUse: "assembly_line_parts_feeding_orient_caps_screws_components",
  },
  linear_tray: {
    feedRate: 8, controlPrecision: 8, durability: 8, noiseLevel: 7, vfCost: 5,
    variableSpeed: true, forFineParticle: true,
    driveType: "electromagnetic_or_piezo_linear_tray_gentle_forward_motion",
    bestUse: "pharmaceutical_food_conveying_gentle_product_handling_clean",
  },
};

function get(t: VibratoryFeederType): VibratoryFeederData {
  return DATA[t];
}

export const feedRate = (t: VibratoryFeederType) => get(t).feedRate;
export const controlPrecision = (t: VibratoryFeederType) => get(t).controlPrecision;
export const durability = (t: VibratoryFeederType) => get(t).durability;
export const noiseLevel = (t: VibratoryFeederType) => get(t).noiseLevel;
export const vfCost = (t: VibratoryFeederType) => get(t).vfCost;
export const variableSpeed = (t: VibratoryFeederType) => get(t).variableSpeed;
export const forFineParticle = (t: VibratoryFeederType) => get(t).forFineParticle;
export const driveType = (t: VibratoryFeederType) => get(t).driveType;
export const bestUse = (t: VibratoryFeederType) => get(t).bestUse;
export const vibratoryFeederTypes = (): VibratoryFeederType[] =>
  Object.keys(DATA) as VibratoryFeederType[];
