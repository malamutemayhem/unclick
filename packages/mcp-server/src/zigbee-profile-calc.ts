export type ZigbeeProfile =
  | "zigbee_3_0"
  | "zigbee_pro_green"
  | "zigbee_ip_thread"
  | "zigbee_rf4ce"
  | "zigbee_direct_ble";

const DATA: Record<ZigbeeProfile, {
  meshSize: number; range: number; powerEff: number;
  reliability: number; zbCost: number; ipNative: boolean;
  forLighting: boolean; routing: string; bestUse: string;
}> = {
  zigbee_3_0: {
    meshSize: 8, range: 6, powerEff: 7,
    reliability: 8, zbCost: 3, ipNative: false,
    forLighting: true, routing: "aodv_table_mesh",
    bestUse: "smart_home_unified",
  },
  zigbee_pro_green: {
    meshSize: 10, range: 7, powerEff: 9,
    reliability: 9, zbCost: 3, ipNative: false,
    forLighting: true, routing: "many_to_one_tree",
    bestUse: "building_automation_hvac",
  },
  zigbee_ip_thread: {
    meshSize: 7, range: 6, powerEff: 6,
    reliability: 7, zbCost: 4, ipNative: true,
    forLighting: false, routing: "ipv6_border_router",
    bestUse: "matter_thread_bridge",
  },
  zigbee_rf4ce: {
    meshSize: 2, range: 5, powerEff: 8,
    reliability: 6, zbCost: 2, ipNative: false,
    forLighting: false, routing: "star_point_to_point",
    bestUse: "tv_remote_control",
  },
  zigbee_direct_ble: {
    meshSize: 5, range: 5, powerEff: 7,
    reliability: 7, zbCost: 4, ipNative: false,
    forLighting: true, routing: "ble_proxy_commissioning",
    bestUse: "phone_direct_commissioning",
  },
};

const get = (t: ZigbeeProfile) => DATA[t];

export const meshSize = (t: ZigbeeProfile) => get(t).meshSize;
export const range = (t: ZigbeeProfile) => get(t).range;
export const powerEff = (t: ZigbeeProfile) => get(t).powerEff;
export const reliability = (t: ZigbeeProfile) => get(t).reliability;
export const zbCost = (t: ZigbeeProfile) => get(t).zbCost;
export const ipNative = (t: ZigbeeProfile) => get(t).ipNative;
export const forLighting = (t: ZigbeeProfile) => get(t).forLighting;
export const routing = (t: ZigbeeProfile) => get(t).routing;
export const bestUse = (t: ZigbeeProfile) => get(t).bestUse;
export const zigbeeProfiles = (): ZigbeeProfile[] => Object.keys(DATA) as ZigbeeProfile[];
