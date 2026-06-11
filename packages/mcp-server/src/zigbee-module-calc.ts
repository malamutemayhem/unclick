export type ZigbeeModuleType =
  | "zigbee_3_0_mesh"
  | "thread_border_router"
  | "matter_over_thread"
  | "green_power_harvest"
  | "coordinator_hub";

const DATA: Record<ZigbeeModuleType, {
  meshSize: number; range: number; powerDraw: number;
  interop: number; moduleCost: number; batteryOpt: boolean;
  forSmartHome: boolean; protocol: string; bestUse: string;
}> = {
  zigbee_3_0_mesh: { meshSize: 9, range: 6, powerDraw: 8, interop: 7, moduleCost: 3, batteryOpt: true, forSmartHome: true, protocol: "zigbee_3_0_cluster", bestUse: "sensor_switch_mesh" },
  thread_border_router: { meshSize: 8, range: 6, powerDraw: 4, interop: 9, moduleCost: 5, batteryOpt: false, forSmartHome: true, protocol: "thread_1_3_ipv6", bestUse: "ip_native_mesh_bridge" },
  matter_over_thread: { meshSize: 8, range: 6, powerDraw: 6, interop: 10, moduleCost: 5, batteryOpt: true, forSmartHome: true, protocol: "matter_1_0_thread", bestUse: "cross_ecosystem_device" },
  green_power_harvest: { meshSize: 5, range: 3, powerDraw: 10, interop: 5, moduleCost: 4, batteryOpt: true, forSmartHome: true, protocol: "zigbee_green_power", bestUse: "energy_harvest_switch" },
  coordinator_hub: { meshSize: 10, range: 7, powerDraw: 2, interop: 8, moduleCost: 6, batteryOpt: false, forSmartHome: true, protocol: "zigbee_coordinator", bestUse: "central_smart_home_hub" },
};

const get = (t: ZigbeeModuleType) => DATA[t];

export const meshSize = (t: ZigbeeModuleType) => get(t).meshSize;
export const range = (t: ZigbeeModuleType) => get(t).range;
export const powerDraw = (t: ZigbeeModuleType) => get(t).powerDraw;
export const interop = (t: ZigbeeModuleType) => get(t).interop;
export const moduleCost = (t: ZigbeeModuleType) => get(t).moduleCost;
export const batteryOpt = (t: ZigbeeModuleType) => get(t).batteryOpt;
export const forSmartHome = (t: ZigbeeModuleType) => get(t).forSmartHome;
export const protocol = (t: ZigbeeModuleType) => get(t).protocol;
export const bestUse = (t: ZigbeeModuleType) => get(t).bestUse;
export const zigbeeModules = (): ZigbeeModuleType[] => Object.keys(DATA) as ZigbeeModuleType[];
