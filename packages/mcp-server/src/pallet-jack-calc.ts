export type PalletJackType =
  | "manual_hand_pump"
  | "electric_walkie_ride"
  | "high_lift_stacker"
  | "weigh_scale_built"
  | "low_profile_printer";

interface PalletJackData {
  liftCapacity: number;
  liftHeight: number;
  maneuverability: number;
  operatorEase: number;
  pjCost: number;
  powered: boolean;
  forLongDistance: boolean;
  frame: string;
  bestUse: string;
}

const DATA: Record<PalletJackType, PalletJackData> = {
  manual_hand_pump: {
    liftCapacity: 7, liftHeight: 2, maneuverability: 8, operatorEase: 7, pjCost: 2,
    powered: false, forLongDistance: false,
    frame: "steel_fork_hydraulic_pump_handle_nylon_wheel",
    bestUse: "short_distance_pallet_move_dock_to_staging_area",
  },
  electric_walkie_ride: {
    liftCapacity: 8, liftHeight: 2, maneuverability: 7, operatorEase: 9, pjCost: 6,
    powered: true, forLongDistance: true,
    frame: "electric_drive_motor_rider_platform_powered_lift",
    bestUse: "warehouse_long_horizontal_transport_pallet_shuttle",
  },
  high_lift_stacker: {
    liftCapacity: 5, liftHeight: 8, maneuverability: 6, operatorEase: 6, pjCost: 7,
    powered: true, forLongDistance: false,
    frame: "mast_straddle_or_counterbalance_electric_stacker",
    bestUse: "low_level_racking_truck_loading_single_high_stack",
  },
  weigh_scale_built: {
    liftCapacity: 7, liftHeight: 2, maneuverability: 7, operatorEase: 8, pjCost: 4,
    powered: false, forLongDistance: false,
    frame: "load_cell_integrated_fork_digital_display_tare",
    bestUse: "shipping_receiving_pallet_weight_check_inventory",
  },
  low_profile_printer: {
    liftCapacity: 6, liftHeight: 2, maneuverability: 8, operatorEase: 7, pjCost: 3,
    powered: false, forLongDistance: false,
    frame: "lowered_fork_entry_height_thin_pallet_access_pump",
    bestUse: "printing_industry_display_pallet_low_clearance_load",
  },
};

function get(t: PalletJackType): PalletJackData {
  return DATA[t];
}

export const liftCapacity = (t: PalletJackType) => get(t).liftCapacity;
export const liftHeight = (t: PalletJackType) => get(t).liftHeight;
export const maneuverability = (t: PalletJackType) => get(t).maneuverability;
export const operatorEase = (t: PalletJackType) => get(t).operatorEase;
export const pjCost = (t: PalletJackType) => get(t).pjCost;
export const powered = (t: PalletJackType) => get(t).powered;
export const forLongDistance = (t: PalletJackType) => get(t).forLongDistance;
export const frame = (t: PalletJackType) => get(t).frame;
export const bestUse = (t: PalletJackType) => get(t).bestUse;
export const palletJackTypes = (): PalletJackType[] =>
  Object.keys(DATA) as PalletJackType[];
