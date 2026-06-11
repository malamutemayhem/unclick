export type AccessPanelType =
  | "single_door_controller"
  | "multi_door_4_reader"
  | "ip_based_poe_panel"
  | "wireless_cloud_managed"
  | "elevator_floor_control";

interface AccessPanelData {
  capacity: number;
  reliability: number;
  scalability: number;
  integration: number;
  apCost: number;
  cloudManaged: boolean;
  forEnterprise: boolean;
  protocol: string;
  bestUse: string;
}

const DATA: Record<AccessPanelType, AccessPanelData> = {
  single_door_controller: {
    capacity: 3, reliability: 8, scalability: 3, integration: 5, apCost: 2,
    cloudManaged: false, forEnterprise: false,
    protocol: "wiegand_26_34_bit_local",
    bestUse: "single_door_standalone_basic",
  },
  multi_door_4_reader: {
    capacity: 7, reliability: 9, scalability: 7, integration: 7, apCost: 5,
    cloudManaged: false, forEnterprise: true,
    protocol: "osdp_v2_rs485_encrypted",
    bestUse: "office_building_floor_zone",
  },
  ip_based_poe_panel: {
    capacity: 8, reliability: 9, scalability: 9, integration: 9, apCost: 7,
    cloudManaged: false, forEnterprise: true,
    protocol: "ip_ethernet_tls_encrypted",
    bestUse: "campus_distributed_ip_network",
  },
  wireless_cloud_managed: {
    capacity: 5, reliability: 7, scalability: 10, integration: 8, apCost: 6,
    cloudManaged: true, forEnterprise: false,
    protocol: "wifi_ble_cloud_api_managed",
    bestUse: "coworking_multi_tenant_flex",
  },
  elevator_floor_control: {
    capacity: 6, reliability: 9, scalability: 5, integration: 6, apCost: 6,
    cloudManaged: false, forEnterprise: true,
    protocol: "relay_output_floor_enable",
    bestUse: "high_rise_elevator_floor_lock",
  },
};

function get(t: AccessPanelType): AccessPanelData {
  return DATA[t];
}

export const capacity = (t: AccessPanelType) => get(t).capacity;
export const reliability = (t: AccessPanelType) => get(t).reliability;
export const scalability = (t: AccessPanelType) => get(t).scalability;
export const integration = (t: AccessPanelType) => get(t).integration;
export const apCost = (t: AccessPanelType) => get(t).apCost;
export const cloudManaged = (t: AccessPanelType) => get(t).cloudManaged;
export const forEnterprise = (t: AccessPanelType) => get(t).forEnterprise;
export const protocol = (t: AccessPanelType) => get(t).protocol;
export const bestUse = (t: AccessPanelType) => get(t).bestUse;
export const accessPanelTypes = (): AccessPanelType[] =>
  Object.keys(DATA) as AccessPanelType[];
