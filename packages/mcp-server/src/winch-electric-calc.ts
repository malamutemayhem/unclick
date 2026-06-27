export type WinchElectricType =
  | "capstan_vertical_drum"
  | "planetary_gear_compact"
  | "worm_gear_self_lock"
  | "hydraulic_power_heavy"
  | "traction_elevator_rope";

interface WinchElectricData {
  pullForce: number;
  lineSpeed: number;
  controlPrecision: number;
  dutyRating: number;
  weCost: number;
  selfLocking: boolean;
  forMarine: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<WinchElectricType, WinchElectricData> = {
  capstan_vertical_drum: {
    pullForce: 6, lineSpeed: 7, controlPrecision: 6, dutyRating: 7, weCost: 5,
    selfLocking: false, forMarine: true,
    mechanism: "vertical_drum_friction_wrap_rope_capstan",
    bestUse: "mooring_dock_line_tensioning_ship_warping",
  },
  planetary_gear_compact: {
    pullForce: 9, lineSpeed: 8, controlPrecision: 8, dutyRating: 9, weCost: 8,
    selfLocking: false, forMarine: false,
    mechanism: "planetary_gear_train_high_ratio_compact_drum",
    bestUse: "crane_hoist_duty_construction_site_heavy_pull",
  },
  worm_gear_self_lock: {
    pullForce: 7, lineSpeed: 4, controlPrecision: 9, dutyRating: 8, weCost: 5,
    selfLocking: true, forMarine: false,
    mechanism: "worm_wheel_irreversible_gear_holding_brake",
    bestUse: "positioning_stage_rigging_theater_scenery_lift",
  },
  hydraulic_power_heavy: {
    pullForce: 10, lineSpeed: 6, controlPrecision: 7, dutyRating: 10, weCost: 9,
    selfLocking: true, forMarine: true,
    mechanism: "hydraulic_motor_planetary_gear_band_brake_drum",
    bestUse: "offshore_anchor_handling_towing_heavy_marine",
  },
  traction_elevator_rope: {
    pullForce: 8, lineSpeed: 9, controlPrecision: 10, dutyRating: 9, weCost: 9,
    selfLocking: false, forMarine: false,
    mechanism: "traction_sheave_counterweight_vfd_gearless_motor",
    bestUse: "elevator_vertical_transport_precision_floor_stop",
  },
};

function get(t: WinchElectricType): WinchElectricData {
  return DATA[t];
}

export const pullForce = (t: WinchElectricType) => get(t).pullForce;
export const lineSpeed = (t: WinchElectricType) => get(t).lineSpeed;
export const controlPrecision = (t: WinchElectricType) => get(t).controlPrecision;
export const dutyRating = (t: WinchElectricType) => get(t).dutyRating;
export const weCost = (t: WinchElectricType) => get(t).weCost;
export const selfLocking = (t: WinchElectricType) => get(t).selfLocking;
export const forMarine = (t: WinchElectricType) => get(t).forMarine;
export const mechanism = (t: WinchElectricType) => get(t).mechanism;
export const bestUse = (t: WinchElectricType) => get(t).bestUse;
export const winchElectricTypes = (): WinchElectricType[] =>
  Object.keys(DATA) as WinchElectricType[];
