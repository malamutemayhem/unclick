export type PanicBarType =
  | "rim_exit_surface_mount"
  | "mortise_lock_exit_device"
  | "vertical_rod_multi_point"
  | "concealed_vertical_rod"
  | "crossbar_touchpad_wide";

interface PanicBarData {
  security: number;
  egressSpeed: number;
  durability: number;
  aesthetic: number;
  pbCost: number;
  fireListed: boolean;
  forDouble: boolean;
  latchType: string;
  bestUse: string;
}

const DATA: Record<PanicBarType, PanicBarData> = {
  rim_exit_surface_mount: {
    security: 7, egressSpeed: 9, durability: 8, aesthetic: 5, pbCost: 4,
    fireListed: true, forDouble: false,
    latchType: "rim_strike_surface_latch",
    bestUse: "standard_single_egress_door",
  },
  mortise_lock_exit_device: {
    security: 9, egressSpeed: 8, durability: 9, aesthetic: 7, pbCost: 7,
    fireListed: true, forDouble: false,
    latchType: "mortise_deadbolt_latch_combo",
    bestUse: "exterior_door_after_hours_lock",
  },
  vertical_rod_multi_point: {
    security: 8, egressSpeed: 8, durability: 7, aesthetic: 5, pbCost: 6,
    fireListed: true, forDouble: true,
    latchType: "top_bottom_vertical_rod_bolt",
    bestUse: "double_door_fire_exit_pair",
  },
  concealed_vertical_rod: {
    security: 8, egressSpeed: 8, durability: 7, aesthetic: 9, pbCost: 8,
    fireListed: true, forDouble: true,
    latchType: "concealed_rod_flush_bolt",
    bestUse: "architectural_clean_double_door",
  },
  crossbar_touchpad_wide: {
    security: 7, egressSpeed: 10, durability: 8, aesthetic: 6, pbCost: 5,
    fireListed: true, forDouble: false,
    latchType: "wide_touchpad_full_width",
    bestUse: "high_traffic_push_bar_egress",
  },
};

function get(t: PanicBarType): PanicBarData {
  return DATA[t];
}

export const security = (t: PanicBarType) => get(t).security;
export const egressSpeed = (t: PanicBarType) => get(t).egressSpeed;
export const durability = (t: PanicBarType) => get(t).durability;
export const aesthetic = (t: PanicBarType) => get(t).aesthetic;
export const pbCost = (t: PanicBarType) => get(t).pbCost;
export const fireListed = (t: PanicBarType) => get(t).fireListed;
export const forDouble = (t: PanicBarType) => get(t).forDouble;
export const latchType = (t: PanicBarType) => get(t).latchType;
export const bestUse = (t: PanicBarType) => get(t).bestUse;
export const panicBarTypes = (): PanicBarType[] =>
  Object.keys(DATA) as PanicBarType[];
