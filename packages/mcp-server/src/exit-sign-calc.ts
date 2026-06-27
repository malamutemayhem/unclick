export type ExitSignType =
  | "led_battery_backup"
  | "photoluminescent_glow"
  | "edge_lit_acrylic"
  | "self_luminous_tritium"
  | "combo_exit_emergency";

interface ExitSignData {
  visibility: number;
  duration: number;
  aesthetic: number;
  maintenance: number;
  esCost: number;
  powered: boolean;
  forExterior: boolean;
  illumination: string;
  bestUse: string;
}

const DATA: Record<ExitSignType, ExitSignData> = {
  led_battery_backup: {
    visibility: 8, duration: 7, aesthetic: 6, maintenance: 8, esCost: 3,
    powered: true, forExterior: false,
    illumination: "led_array_battery_90_min",
    bestUse: "standard_commercial_code",
  },
  photoluminescent_glow: {
    visibility: 6, duration: 10, aesthetic: 7, maintenance: 10, esCost: 4,
    powered: false, forExterior: false,
    illumination: "strontium_aluminate_glow_charge",
    bestUse: "high_rise_stairwell_no_power",
  },
  edge_lit_acrylic: {
    visibility: 7, duration: 7, aesthetic: 10, maintenance: 7, esCost: 6,
    powered: true, forExterior: false,
    illumination: "led_edge_lit_clear_acrylic",
    bestUse: "hotel_lobby_upscale_interior",
  },
  self_luminous_tritium: {
    visibility: 5, duration: 10, aesthetic: 5, maintenance: 10, esCost: 8,
    powered: false, forExterior: true,
    illumination: "tritium_gas_tube_self_glow",
    bestUse: "remote_tunnel_no_power_source",
  },
  combo_exit_emergency: {
    visibility: 8, duration: 7, aesthetic: 5, maintenance: 7, esCost: 5,
    powered: true, forExterior: false,
    illumination: "led_sign_twin_head_combo",
    bestUse: "standard_dual_purpose_code",
  },
};

function get(t: ExitSignType): ExitSignData {
  return DATA[t];
}

export const visibility = (t: ExitSignType) => get(t).visibility;
export const duration = (t: ExitSignType) => get(t).duration;
export const aesthetic = (t: ExitSignType) => get(t).aesthetic;
export const maintenance = (t: ExitSignType) => get(t).maintenance;
export const esCost = (t: ExitSignType) => get(t).esCost;
export const powered = (t: ExitSignType) => get(t).powered;
export const forExterior = (t: ExitSignType) => get(t).forExterior;
export const illumination = (t: ExitSignType) => get(t).illumination;
export const bestUse = (t: ExitSignType) => get(t).bestUse;
export const exitSignTypes = (): ExitSignType[] =>
  Object.keys(DATA) as ExitSignType[];
