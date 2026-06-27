export type WirelessSensorType =
  | "wirelesshart_mesh"
  | "isa100_11a_mesh"
  | "lora_wan_long"
  | "zigbee_pro_mesh"
  | "bluetooth_5_le";

interface WirelessSensorData {
  range: number;
  batteryLife: number;
  reliability: number;
  dataRate: number;
  wsCost: number;
  meshCapable: boolean;
  forHazardous: boolean;
  protocol: string;
  bestUse: string;
}

const DATA: Record<WirelessSensorType, WirelessSensorData> = {
  wirelesshart_mesh: {
    range: 7, batteryLife: 7, reliability: 10, dataRate: 4, wsCost: 8,
    meshCapable: true, forHazardous: true,
    protocol: "ieee_802_15_4_tdma_frequency_hopping_self_healing",
    bestUse: "process_plant_retrofit_monitoring_hazardous_area",
  },
  isa100_11a_mesh: {
    range: 7, batteryLife: 7, reliability: 9, dataRate: 5, wsCost: 8,
    meshCapable: true, forHazardous: true,
    protocol: "ieee_802_15_4_ipv6_backbone_routing_graph_source",
    bestUse: "refinery_monitoring_asset_health_condition_based",
  },
  lora_wan_long: {
    range: 10, batteryLife: 10, reliability: 7, dataRate: 2, wsCost: 4,
    meshCapable: false, forHazardous: false,
    protocol: "chirp_spread_spectrum_star_topology_gateway_cloud",
    bestUse: "remote_tank_level_environmental_agriculture_wide_area",
  },
  zigbee_pro_mesh: {
    range: 5, batteryLife: 8, reliability: 7, dataRate: 5, wsCost: 3,
    meshCapable: true, forHazardous: false,
    protocol: "ieee_802_15_4_mesh_coordinator_router_end_device",
    bestUse: "building_automation_lighting_hvac_occupancy_sensor",
  },
  bluetooth_5_le: {
    range: 4, batteryLife: 9, reliability: 6, dataRate: 7, wsCost: 2,
    meshCapable: true, forHazardous: false,
    protocol: "ble_5_0_mesh_advertising_gatt_connection_oriented",
    bestUse: "asset_tracking_beacon_vibration_sensor_local_area",
  },
};

function get(t: WirelessSensorType): WirelessSensorData {
  return DATA[t];
}

export const range = (t: WirelessSensorType) => get(t).range;
export const batteryLife = (t: WirelessSensorType) => get(t).batteryLife;
export const reliability = (t: WirelessSensorType) => get(t).reliability;
export const dataRate = (t: WirelessSensorType) => get(t).dataRate;
export const wsCost = (t: WirelessSensorType) => get(t).wsCost;
export const meshCapable = (t: WirelessSensorType) => get(t).meshCapable;
export const forHazardous = (t: WirelessSensorType) => get(t).forHazardous;
export const protocol = (t: WirelessSensorType) => get(t).protocol;
export const bestUse = (t: WirelessSensorType) => get(t).bestUse;
export const wirelessSensorTypes = (): WirelessSensorType[] =>
  Object.keys(DATA) as WirelessSensorType[];
