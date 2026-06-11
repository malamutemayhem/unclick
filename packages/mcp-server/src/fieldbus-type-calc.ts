export type FieldbusType =
  | "profibus_dp"
  | "modbus_rtu_485"
  | "canopen_cia"
  | "ethercat_realtime"
  | "profinet_irt";

const DATA: Record<FieldbusType, {
  speed: number; latency: number; nodeCount: number;
  cableLength: number; fbCost: number; deterministic: boolean;
  forMotion: boolean; physical: string; bestUse: string;
}> = {
  profibus_dp: {
    speed: 6, latency: 6, nodeCount: 7,
    cableLength: 8, fbCost: 5, deterministic: true,
    forMotion: false, physical: "rs485_shielded_twisted",
    bestUse: "process_automation_dcs_io",
  },
  modbus_rtu_485: {
    speed: 4, latency: 4, nodeCount: 5,
    cableLength: 7, fbCost: 1, deterministic: false,
    forMotion: false, physical: "rs485_half_duplex",
    bestUse: "building_hvac_meter_poll",
  },
  canopen_cia: {
    speed: 5, latency: 7, nodeCount: 6,
    cableLength: 6, fbCost: 3, deterministic: true,
    forMotion: true, physical: "can_differential_pair",
    bestUse: "mobile_machine_vehicle_ctrl",
  },
  ethercat_realtime: {
    speed: 10, latency: 10, nodeCount: 10,
    cableLength: 9, fbCost: 7, deterministic: true,
    forMotion: true, physical: "ethernet_100base_tx",
    bestUse: "cnc_servo_multi_axis_sync",
  },
  profinet_irt: {
    speed: 9, latency: 9, nodeCount: 9,
    cableLength: 10, fbCost: 8, deterministic: true,
    forMotion: true, physical: "ethernet_switched_irt",
    bestUse: "factory_line_robot_coord",
  },
};

const get = (t: FieldbusType) => DATA[t];

export const speed = (t: FieldbusType) => get(t).speed;
export const latency = (t: FieldbusType) => get(t).latency;
export const nodeCount = (t: FieldbusType) => get(t).nodeCount;
export const cableLength = (t: FieldbusType) => get(t).cableLength;
export const fbCost = (t: FieldbusType) => get(t).fbCost;
export const deterministic = (t: FieldbusType) => get(t).deterministic;
export const forMotion = (t: FieldbusType) => get(t).forMotion;
export const physical = (t: FieldbusType) => get(t).physical;
export const bestUse = (t: FieldbusType) => get(t).bestUse;
export const fieldbusTypes = (): FieldbusType[] => Object.keys(DATA) as FieldbusType[];
