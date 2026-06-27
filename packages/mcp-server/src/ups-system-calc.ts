export type UpsSystemType =
  | "online_double"
  | "line_interactive"
  | "standby_offline"
  | "rotary_ups"
  | "modular_scalable";

interface UpsSystemData {
  protection: number;
  throughput: number;
  efficiency: number;
  transferTime: number;
  usCost: number;
  trueOnline: boolean;
  forDataCenter: boolean;
  systemConfig: string;
  bestUse: string;
}

const DATA: Record<UpsSystemType, UpsSystemData> = {
  online_double: {
    protection: 10, throughput: 8, efficiency: 7, transferTime: 10, usCost: 8,
    trueOnline: true, forDataCenter: true,
    systemConfig: "online_double_ups_system_rectify_invert_zero_transfer_isolate",
    bestUse: "server_room_online_double_ups_system_zero_transfer_full_isolate",
  },
  line_interactive: {
    protection: 7, throughput: 8, efficiency: 9, transferTime: 7, usCost: 5,
    trueOnline: false, forDataCenter: false,
    systemConfig: "line_interactive_ups_system_avr_tap_boost_buck_battery_backup",
    bestUse: "office_network_line_interactive_ups_system_avr_regulate_protect",
  },
  standby_offline: {
    protection: 5, throughput: 9, efficiency: 10, transferTime: 5, usCost: 3,
    trueOnline: false, forDataCenter: false,
    systemConfig: "standby_offline_ups_system_switch_to_battery_on_fail_simple",
    bestUse: "desktop_pc_standby_offline_ups_system_basic_outage_protect_cheap",
  },
  rotary_ups: {
    protection: 9, throughput: 9, efficiency: 8, transferTime: 9, usCost: 10,
    trueOnline: true, forDataCenter: true,
    systemConfig: "rotary_ups_system_flywheel_motor_generator_kinetic_energy_store",
    bestUse: "industrial_plant_rotary_ups_system_flywheel_no_battery_long_life",
  },
  modular_scalable: {
    protection: 9, throughput: 8, efficiency: 8, transferTime: 10, usCost: 8,
    trueOnline: true, forDataCenter: true,
    systemConfig: "modular_scalable_ups_system_hot_swap_module_grow_redundant_n_plus",
    bestUse: "cloud_dc_modular_scalable_ups_system_hot_swap_grow_as_needed",
  },
};

function get(t: UpsSystemType): UpsSystemData {
  return DATA[t];
}

export const protection = (t: UpsSystemType) => get(t).protection;
export const throughput = (t: UpsSystemType) => get(t).throughput;
export const efficiency = (t: UpsSystemType) => get(t).efficiency;
export const transferTime = (t: UpsSystemType) => get(t).transferTime;
export const usCost = (t: UpsSystemType) => get(t).usCost;
export const trueOnline = (t: UpsSystemType) => get(t).trueOnline;
export const forDataCenter = (t: UpsSystemType) => get(t).forDataCenter;
export const systemConfig = (t: UpsSystemType) => get(t).systemConfig;
export const bestUse = (t: UpsSystemType) => get(t).bestUse;
export const upsSystemTypes = (): UpsSystemType[] =>
  Object.keys(DATA) as UpsSystemType[];
