export type OpcuaProfileType =
  | "nano_embedded"
  | "micro_server"
  | "standard_full"
  | "global_discovery"
  | "pubsub_tsn";

const DATA: Record<OpcuaProfileType, {
  dataModel: number; security: number; scalability: number;
  realTime: number; profileCost: number; pubsub: boolean;
  forCloud: boolean; transport: string; bestUse: string;
}> = {
  nano_embedded: { dataModel: 3, security: 4, scalability: 2, realTime: 7, profileCost: 1, pubsub: false, forCloud: false, transport: "binary_tcp_minimal", bestUse: "plc_sensor_direct_read" },
  micro_server: { dataModel: 5, security: 6, scalability: 4, realTime: 6, profileCost: 2, pubsub: false, forCloud: false, transport: "binary_tcp_reduced", bestUse: "gateway_aggregator_lite" },
  standard_full: { dataModel: 9, security: 9, scalability: 8, realTime: 5, profileCost: 5, pubsub: false, forCloud: true, transport: "binary_tcp_full", bestUse: "mes_erp_integration" },
  global_discovery: { dataModel: 8, security: 10, scalability: 10, realTime: 4, profileCost: 7, pubsub: false, forCloud: true, transport: "https_gds_cert", bestUse: "multi_site_discovery" },
  pubsub_tsn: { dataModel: 7, security: 7, scalability: 9, realTime: 10, profileCost: 8, pubsub: true, forCloud: false, transport: "udp_tsn_multicast", bestUse: "deterministic_motion_ctrl" },
};

const get = (t: OpcuaProfileType) => DATA[t];

export const dataModel = (t: OpcuaProfileType) => get(t).dataModel;
export const security = (t: OpcuaProfileType) => get(t).security;
export const scalability = (t: OpcuaProfileType) => get(t).scalability;
export const realTime = (t: OpcuaProfileType) => get(t).realTime;
export const profileCost = (t: OpcuaProfileType) => get(t).profileCost;
export const pubsub = (t: OpcuaProfileType) => get(t).pubsub;
export const forCloud = (t: OpcuaProfileType) => get(t).forCloud;
export const transport = (t: OpcuaProfileType) => get(t).transport;
export const bestUse = (t: OpcuaProfileType) => get(t).bestUse;
export const opcuaProfiles = (): OpcuaProfileType[] => Object.keys(DATA) as OpcuaProfileType[];
