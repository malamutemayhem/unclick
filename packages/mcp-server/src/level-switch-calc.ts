export type LevelSwitchType =
  | "float_mechanical_reed"
  | "vibrating_fork_tuning"
  | "capacitance_rf_admit"
  | "paddle_rotary_bin"
  | "thermal_dispersion_flow";

interface LevelSwitchData {
  reliability: number;
  suitability: number;
  noMovingParts: number;
  tempRange: number;
  lsCost_: number;
  pointLevel: boolean;
  forSolids: boolean;
  sensing: string;
  bestUse: string;
}

const DATA: Record<LevelSwitchType, LevelSwitchData> = {
  float_mechanical_reed: {
    reliability: 6, suitability: 7, noMovingParts: 2, tempRange: 5, lsCost_: 2,
    pointLevel: true, forSolids: false,
    sensing: "float_rise_magnet_reed_switch_trigger",
    bestUse: "clean_liquid_tank_pump_control_alarm",
  },
  vibrating_fork_tuning: {
    reliability: 9, suitability: 9, noMovingParts: 9, tempRange: 8, lsCost_: 5,
    pointLevel: true, forSolids: true,
    sensing: "piezo_vibrate_fork_frequency_shift",
    bestUse: "liquid_solid_universal_high_low_alarm",
  },
  capacitance_rf_admit: {
    reliability: 8, suitability: 8, noMovingParts: 10, tempRange: 9, lsCost_: 4,
    pointLevel: true, forSolids: true,
    sensing: "rf_capacitance_admittance_probe_rod",
    bestUse: "sticky_coating_buildup_immune_detect",
  },
  paddle_rotary_bin: {
    reliability: 7, suitability: 5, noMovingParts: 3, tempRange: 6, lsCost_: 2,
    pointLevel: true, forSolids: true,
    sensing: "rotating_paddle_torque_stall_detect",
    bestUse: "bin_silo_powder_granule_full_alarm",
  },
  thermal_dispersion_flow: {
    reliability: 8, suitability: 6, noMovingParts: 10, tempRange: 7, lsCost_: 6,
    pointLevel: true, forSolids: false,
    sensing: "heated_element_thermal_loss_liquid_air",
    bestUse: "interface_detect_liquid_presence_pump",
  },
};

function get(t: LevelSwitchType): LevelSwitchData {
  return DATA[t];
}

export const reliability = (t: LevelSwitchType) => get(t).reliability;
export const suitability = (t: LevelSwitchType) => get(t).suitability;
export const noMovingParts = (t: LevelSwitchType) => get(t).noMovingParts;
export const tempRange = (t: LevelSwitchType) => get(t).tempRange;
export const lsCost_ = (t: LevelSwitchType) => get(t).lsCost_;
export const pointLevel = (t: LevelSwitchType) => get(t).pointLevel;
export const forSolids = (t: LevelSwitchType) => get(t).forSolids;
export const sensing = (t: LevelSwitchType) => get(t).sensing;
export const bestUse = (t: LevelSwitchType) => get(t).bestUse;
export const levelSwitchTypes = (): LevelSwitchType[] =>
  Object.keys(DATA) as LevelSwitchType[];
