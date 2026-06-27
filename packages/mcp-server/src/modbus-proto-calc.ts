export type ModbusProtoType =
  | "modbus_rtu_serial"
  | "modbus_ascii_text"
  | "modbus_tcp_ip"
  | "modbus_plus_token"
  | "modbus_udp_fast";

const DATA: Record<ModbusProtoType, {
  throughput: number; deviceCount: number; reliability: number;
  latency: number; protoCost: number; ethernet: boolean;
  forPlc: boolean; transport: string; bestUse: string;
}> = {
  modbus_rtu_serial: { throughput: 4, deviceCount: 7, reliability: 8, latency: 5, protoCost: 1, ethernet: false, forPlc: true, transport: "rs485_binary_frame", bestUse: "legacy_plc_sensor_poll" },
  modbus_ascii_text: { throughput: 3, deviceCount: 7, reliability: 7, latency: 4, protoCost: 1, ethernet: false, forPlc: true, transport: "rs232_ascii_hex", bestUse: "debug_human_readable_log" },
  modbus_tcp_ip: { throughput: 8, deviceCount: 10, reliability: 7, latency: 7, protoCost: 3, ethernet: true, forPlc: true, transport: "tcp_port_502", bestUse: "scada_ethernet_gateway" },
  modbus_plus_token: { throughput: 6, deviceCount: 8, reliability: 9, latency: 6, protoCost: 5, ethernet: false, forPlc: true, transport: "token_pass_peer", bestUse: "schneider_plc_network" },
  modbus_udp_fast: { throughput: 9, deviceCount: 10, reliability: 5, latency: 9, protoCost: 3, ethernet: true, forPlc: false, transport: "udp_multicast_fast", bestUse: "real_time_monitoring" },
};

const get = (t: ModbusProtoType) => DATA[t];

export const throughput = (t: ModbusProtoType) => get(t).throughput;
export const deviceCount = (t: ModbusProtoType) => get(t).deviceCount;
export const reliability = (t: ModbusProtoType) => get(t).reliability;
export const latency = (t: ModbusProtoType) => get(t).latency;
export const protoCost = (t: ModbusProtoType) => get(t).protoCost;
export const ethernet = (t: ModbusProtoType) => get(t).ethernet;
export const forPlc = (t: ModbusProtoType) => get(t).forPlc;
export const transport = (t: ModbusProtoType) => get(t).transport;
export const bestUse = (t: ModbusProtoType) => get(t).bestUse;
export const modbusProtos = (): ModbusProtoType[] => Object.keys(DATA) as ModbusProtoType[];
