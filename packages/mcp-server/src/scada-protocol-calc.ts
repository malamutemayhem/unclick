export type ScadaProtocolType =
  | "modbus_rtu_serial"
  | "dnp3_distributed_network"
  | "iec_61850_substation"
  | "opc_ua_unified_arch"
  | "profinet_io_realtime";

const DATA: Record<ScadaProtocolType, {
  throughput: number; security: number; interop: number;
  determinism: number; spCost: number; encrypted: boolean;
  forUtility: boolean; transport: string; bestUse: string;
}> = {
  modbus_rtu_serial: {
    throughput: 3, security: 2, interop: 9,
    determinism: 6, spCost: 1, encrypted: false,
    forUtility: false, transport: "rs485_serial_master_slave",
    bestUse: "legacy_plc_simple_register_poll",
  },
  dnp3_distributed_network: {
    throughput: 6, security: 7, interop: 8,
    determinism: 7, spCost: 2, encrypted: true,
    forUtility: true, transport: "tcp_ip_unsolicited_response",
    bestUse: "electric_utility_water_scada",
  },
  iec_61850_substation: {
    throughput: 9, security: 8, interop: 7,
    determinism: 10, spCost: 4, encrypted: true,
    forUtility: true, transport: "goose_sampled_values_ethernet",
    bestUse: "substation_automation_protection",
  },
  opc_ua_unified_arch: {
    throughput: 8, security: 9, interop: 10,
    determinism: 5, spCost: 3, encrypted: true,
    forUtility: false, transport: "tcp_binary_soap_pubsub",
    bestUse: "industrial_iot_cloud_integration",
  },
  profinet_io_realtime: {
    throughput: 9, security: 6, interop: 6,
    determinism: 9, spCost: 3, encrypted: false,
    forUtility: false, transport: "ethernet_cyclic_isochronous_rt",
    bestUse: "factory_automation_motion_control",
  },
};

const get = (t: ScadaProtocolType) => DATA[t];

export const throughput = (t: ScadaProtocolType) => get(t).throughput;
export const security = (t: ScadaProtocolType) => get(t).security;
export const interop = (t: ScadaProtocolType) => get(t).interop;
export const determinism = (t: ScadaProtocolType) => get(t).determinism;
export const spCost = (t: ScadaProtocolType) => get(t).spCost;
export const encrypted = (t: ScadaProtocolType) => get(t).encrypted;
export const forUtility = (t: ScadaProtocolType) => get(t).forUtility;
export const transport = (t: ScadaProtocolType) => get(t).transport;
export const bestUse = (t: ScadaProtocolType) => get(t).bestUse;
export const scadaProtocolTypes = (): ScadaProtocolType[] => Object.keys(DATA) as ScadaProtocolType[];
