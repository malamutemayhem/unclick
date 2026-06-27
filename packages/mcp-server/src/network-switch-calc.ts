export type NetworkSwitchType =
  | "unmanaged_desktop_8_port"
  | "managed_layer2_48_port"
  | "layer3_core_modular"
  | "poe_plus_access_switch"
  | "industrial_din_rail";

interface NetworkSwitchData {
  ports: number;
  throughput: number;
  management: number;
  reliability: number;
  nsCost: number;
  managed: boolean;
  forDataCenter: boolean;
  backplane: string;
  bestUse: string;
}

const DATA: Record<NetworkSwitchType, NetworkSwitchData> = {
  unmanaged_desktop_8_port: {
    ports: 3, throughput: 4, management: 1, reliability: 7, nsCost: 1,
    managed: false, forDataCenter: false,
    backplane: "8_port_gbe_plug_and_play",
    bestUse: "small_office_home_desk",
  },
  managed_layer2_48_port: {
    ports: 8, throughput: 7, management: 8, reliability: 9, nsCost: 6,
    managed: true, forDataCenter: false,
    backplane: "48_port_gbe_4_sfp_uplink",
    bestUse: "enterprise_access_layer_floor",
  },
  layer3_core_modular: {
    ports: 10, throughput: 10, management: 10, reliability: 10, nsCost: 10,
    managed: true, forDataCenter: true,
    backplane: "modular_chassis_100gbe_fabric",
    bestUse: "data_center_core_distribution",
  },
  poe_plus_access_switch: {
    ports: 7, throughput: 6, management: 7, reliability: 8, nsCost: 5,
    managed: true, forDataCenter: false,
    backplane: "24_port_poe_plus_30w_uplink",
    bestUse: "ip_camera_voip_phone_floor",
  },
  industrial_din_rail: {
    ports: 4, throughput: 5, management: 6, reliability: 10, nsCost: 7,
    managed: true, forDataCenter: false,
    backplane: "din_rail_ip67_wide_temp_ring",
    bestUse: "factory_floor_harsh_environ",
  },
};

function get(t: NetworkSwitchType): NetworkSwitchData {
  return DATA[t];
}

export const ports = (t: NetworkSwitchType) => get(t).ports;
export const throughput = (t: NetworkSwitchType) => get(t).throughput;
export const management = (t: NetworkSwitchType) => get(t).management;
export const reliability = (t: NetworkSwitchType) => get(t).reliability;
export const nsCost = (t: NetworkSwitchType) => get(t).nsCost;
export const managed = (t: NetworkSwitchType) => get(t).managed;
export const forDataCenter = (t: NetworkSwitchType) => get(t).forDataCenter;
export const backplane = (t: NetworkSwitchType) => get(t).backplane;
export const bestUse = (t: NetworkSwitchType) => get(t).bestUse;
export const networkSwitchTypes = (): NetworkSwitchType[] =>
  Object.keys(DATA) as NetworkSwitchType[];
