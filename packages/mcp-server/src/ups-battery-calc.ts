export type UpsBatteryType =
  | "standby_offline"
  | "line_interactive"
  | "online_double_conv"
  | "rack_mount_1500va"
  | "lithium_ion_smart";

const DATA: Record<UpsBatteryType, {
  runtime: number; protection: number; efficiency: number;
  formFactor: number; upsCost: number; alwaysOn: boolean;
  rackMount: boolean; topology: string; bestUse: string;
}> = {
  standby_offline: { runtime: 4, protection: 4, efficiency: 9, formFactor: 8, upsCost: 2, alwaysOn: false, rackMount: false, topology: "standby_relay_switch", bestUse: "home_desktop_backup" },
  line_interactive: { runtime: 6, protection: 7, efficiency: 8, formFactor: 7, upsCost: 4, alwaysOn: false, rackMount: false, topology: "avr_buck_boost", bestUse: "small_office_server" },
  online_double_conv: { runtime: 7, protection: 10, efficiency: 6, formFactor: 5, upsCost: 8, alwaysOn: true, rackMount: false, topology: "double_conversion_ac", bestUse: "critical_server_clean_power" },
  rack_mount_1500va: { runtime: 6, protection: 8, efficiency: 7, formFactor: 6, upsCost: 6, alwaysOn: false, rackMount: true, topology: "line_interactive_rack", bestUse: "rack_network_gear_backup" },
  lithium_ion_smart: { runtime: 8, protection: 9, efficiency: 9, formFactor: 9, upsCost: 10, alwaysOn: true, rackMount: true, topology: "online_lithium_smart", bestUse: "edge_compute_long_runtime" },
};

const get = (t: UpsBatteryType) => DATA[t];

export const runtime = (t: UpsBatteryType) => get(t).runtime;
export const protection = (t: UpsBatteryType) => get(t).protection;
export const efficiency = (t: UpsBatteryType) => get(t).efficiency;
export const formFactor = (t: UpsBatteryType) => get(t).formFactor;
export const upsCost = (t: UpsBatteryType) => get(t).upsCost;
export const alwaysOn = (t: UpsBatteryType) => get(t).alwaysOn;
export const rackMount = (t: UpsBatteryType) => get(t).rackMount;
export const topology = (t: UpsBatteryType) => get(t).topology;
export const bestUse = (t: UpsBatteryType) => get(t).bestUse;
export const upsBatteries = (): UpsBatteryType[] => Object.keys(DATA) as UpsBatteryType[];
