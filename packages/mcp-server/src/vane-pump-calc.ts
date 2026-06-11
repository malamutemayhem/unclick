export type VanePumpType =
  | "sliding_vane"
  | "flexible_vane"
  | "external_vane"
  | "variable_displace"
  | "balanced_vane";

interface VanePumpData {
  flowSmooth: number;
  throughput: number;
  pressureRange: number;
  wearResist: number;
  vpCost: number;
  selfCompensate: boolean;
  forHydraulic: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<VanePumpType, VanePumpData> = {
  sliding_vane: {
    flowSmooth: 8, throughput: 8, pressureRange: 7, wearResist: 7, vpCost: 5,
    selfCompensate: true, forHydraulic: false,
    pumpConfig: "sliding_vane_pump_radial_vane_spring_load_self_compensate_wear",
    bestUse: "fuel_transfer_sliding_vane_pump_self_compensate_steady_dispense",
  },
  flexible_vane: {
    flowSmooth: 7, throughput: 6, pressureRange: 4, wearResist: 5, vpCost: 3,
    selfCompensate: false, forHydraulic: false,
    pumpConfig: "flexible_vane_pump_elastomer_impeller_gentle_dry_run_tolerant",
    bestUse: "wine_transfer_flexible_vane_pump_gentle_dry_run_safe_portable",
  },
  external_vane: {
    flowSmooth: 8, throughput: 7, pressureRange: 6, wearResist: 6, vpCost: 5,
    selfCompensate: false, forHydraulic: false,
    pumpConfig: "external_vane_pump_vane_track_cam_ring_positive_displace_smooth",
    bestUse: "lpg_transfer_external_vane_pump_positive_displace_vapor_handle",
  },
  variable_displace: {
    flowSmooth: 8, throughput: 8, pressureRange: 9, wearResist: 8, vpCost: 8,
    selfCompensate: true, forHydraulic: true,
    pumpConfig: "variable_displace_vane_pump_cam_ring_shift_adjust_flow_pressure",
    bestUse: "hydraulic_press_variable_displace_vane_pump_adjust_flow_save_energy",
  },
  balanced_vane: {
    flowSmooth: 9, throughput: 8, pressureRange: 8, wearResist: 8, vpCost: 7,
    selfCompensate: true, forHydraulic: true,
    pumpConfig: "balanced_vane_pump_dual_cam_ring_oppose_force_long_bearing_life",
    bestUse: "machine_tool_balanced_vane_pump_low_noise_long_life_hydraulic",
  },
};

function get(t: VanePumpType): VanePumpData {
  return DATA[t];
}

export const flowSmooth = (t: VanePumpType) => get(t).flowSmooth;
export const throughput = (t: VanePumpType) => get(t).throughput;
export const pressureRange = (t: VanePumpType) => get(t).pressureRange;
export const wearResist = (t: VanePumpType) => get(t).wearResist;
export const vpCost = (t: VanePumpType) => get(t).vpCost;
export const selfCompensate = (t: VanePumpType) => get(t).selfCompensate;
export const forHydraulic = (t: VanePumpType) => get(t).forHydraulic;
export const pumpConfig = (t: VanePumpType) => get(t).pumpConfig;
export const bestUse = (t: VanePumpType) => get(t).bestUse;
export const vanePumpTypes = (): VanePumpType[] =>
  Object.keys(DATA) as VanePumpType[];
