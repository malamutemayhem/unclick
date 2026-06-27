export type MeshProtocol =
  | "thread_openthread"
  | "matter_over_thread"
  | "wifi_mesh_easymesh"
  | "bluetooth_mesh_1_1"
  | "wirepas_massive";

const DATA: Record<MeshProtocol, {
  scalability: number; latency: number; powerEff: number;
  interop: number; meshCost: number; selfHealing: boolean;
  forSmartHome: boolean; transport: string; bestUse: string;
}> = {
  thread_openthread: {
    scalability: 7, latency: 8, powerEff: 9,
    interop: 8, meshCost: 3, selfHealing: true,
    forSmartHome: true, transport: "ieee_802154_ipv6",
    bestUse: "smart_home_iot_backbone",
  },
  matter_over_thread: {
    scalability: 6, latency: 7, powerEff: 8,
    interop: 10, meshCost: 4, selfHealing: true,
    forSmartHome: true, transport: "thread_matter_fabric",
    bestUse: "multi_vendor_smart_home",
  },
  wifi_mesh_easymesh: {
    scalability: 5, latency: 9, powerEff: 3,
    interop: 7, meshCost: 6, selfHealing: true,
    forSmartHome: true, transport: "wifi_6_backhaul_steering",
    bestUse: "whole_home_wifi_coverage",
  },
  bluetooth_mesh_1_1: {
    scalability: 9, latency: 5, powerEff: 7,
    interop: 6, meshCost: 2, selfHealing: true,
    forSmartHome: false, transport: "ble_managed_flooding",
    bestUse: "commercial_lighting_control",
  },
  wirepas_massive: {
    scalability: 10, latency: 6, powerEff: 8,
    interop: 4, meshCost: 5, selfHealing: true,
    forSmartHome: false, transport: "tdma_csma_hybrid",
    bestUse: "industrial_sensor_10k_node",
  },
};

const get = (t: MeshProtocol) => DATA[t];

export const scalability = (t: MeshProtocol) => get(t).scalability;
export const latency = (t: MeshProtocol) => get(t).latency;
export const powerEff = (t: MeshProtocol) => get(t).powerEff;
export const interop = (t: MeshProtocol) => get(t).interop;
export const meshCost = (t: MeshProtocol) => get(t).meshCost;
export const selfHealing = (t: MeshProtocol) => get(t).selfHealing;
export const forSmartHome = (t: MeshProtocol) => get(t).forSmartHome;
export const transport = (t: MeshProtocol) => get(t).transport;
export const bestUse = (t: MeshProtocol) => get(t).bestUse;
export const meshProtocols = (): MeshProtocol[] => Object.keys(DATA) as MeshProtocol[];
