export type IndustrialGatewayType =
  | "protocol_converter_serial"
  | "iot_edge_gateway"
  | "remote_io_gateway"
  | "firewall_dmz_gateway"
  | "cloud_historian_bridge";

interface IndustrialGatewayData {
  protocolSupport: number;
  throughput: number;
  security: number;
  manageability: number;
  igCost: number;
  edgeCompute: boolean;
  forCloudConnect: boolean;
  architecture: string;
  bestUse: string;
}

const DATA: Record<IndustrialGatewayType, IndustrialGatewayData> = {
  protocol_converter_serial: {
    protocolSupport: 8, throughput: 5, security: 4, manageability: 5, igCost: 3,
    edgeCompute: false, forCloudConnect: false,
    architecture: "serial_to_ethernet_modbus_profibus_hart_converter",
    bestUse: "legacy_plc_integration_serial_to_ethernet_bridge",
  },
  iot_edge_gateway: {
    protocolSupport: 9, throughput: 8, security: 7, manageability: 9, igCost: 7,
    edgeCompute: true, forCloudConnect: true,
    architecture: "linux_edge_runtime_mqtt_opc_ua_container_support",
    bestUse: "iiot_data_aggregation_edge_analytics_cloud_publish",
  },
  remote_io_gateway: {
    protocolSupport: 6, throughput: 9, security: 6, manageability: 7, igCost: 5,
    edgeCompute: false, forCloudConnect: false,
    architecture: "distributed_io_rack_fieldbus_to_ethernet_backbone",
    bestUse: "remote_io_cabinet_reducing_home_run_cable_count",
  },
  firewall_dmz_gateway: {
    protocolSupport: 7, throughput: 7, security: 10, manageability: 8, igCost: 9,
    edgeCompute: false, forCloudConnect: true,
    architecture: "industrial_firewall_dmz_data_diode_ot_it_boundary",
    bestUse: "ot_it_network_segmentation_secure_data_extraction",
  },
  cloud_historian_bridge: {
    protocolSupport: 8, throughput: 8, security: 8, manageability: 9, igCost: 7,
    edgeCompute: true, forCloudConnect: true,
    architecture: "store_forward_buffer_historian_api_cloud_upload",
    bestUse: "historian_cloud_replication_multi_site_data_lake",
  },
};

function get(t: IndustrialGatewayType): IndustrialGatewayData {
  return DATA[t];
}

export const protocolSupport = (t: IndustrialGatewayType) => get(t).protocolSupport;
export const throughput = (t: IndustrialGatewayType) => get(t).throughput;
export const security = (t: IndustrialGatewayType) => get(t).security;
export const manageability = (t: IndustrialGatewayType) => get(t).manageability;
export const igCost = (t: IndustrialGatewayType) => get(t).igCost;
export const edgeCompute = (t: IndustrialGatewayType) => get(t).edgeCompute;
export const forCloudConnect = (t: IndustrialGatewayType) => get(t).forCloudConnect;
export const architecture = (t: IndustrialGatewayType) => get(t).architecture;
export const bestUse = (t: IndustrialGatewayType) => get(t).bestUse;
export const industrialGatewayTypes = (): IndustrialGatewayType[] =>
  Object.keys(DATA) as IndustrialGatewayType[];
