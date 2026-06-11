export type UartConfigType =
  | "rs232_standard"
  | "rs485_differential"
  | "rs422_full_duplex"
  | "ttl_logic_level"
  | "usb_to_uart_bridge";

const DATA: Record<UartConfigType, {
  maxSpeed: number; maxDistance: number; noiseImmunity: number;
  multiDrop: number; configCost: number; differential: boolean;
  forIndustrial: boolean; signalLevel: string; bestUse: string;
}> = {
  rs232_standard: { maxSpeed: 4, maxDistance: 3, noiseImmunity: 3, multiDrop: 1, configCost: 2, differential: false, forIndustrial: false, signalLevel: "bipolar_12v_swing", bestUse: "legacy_serial_device" },
  rs485_differential: { maxSpeed: 7, maxDistance: 10, noiseImmunity: 9, multiDrop: 10, configCost: 3, differential: true, forIndustrial: true, signalLevel: "differential_5v_pair", bestUse: "industrial_bus_modbus" },
  rs422_full_duplex: { maxSpeed: 7, maxDistance: 9, noiseImmunity: 9, multiDrop: 5, configCost: 4, differential: true, forIndustrial: true, signalLevel: "differential_full_dup", bestUse: "long_distance_point_link" },
  ttl_logic_level: { maxSpeed: 6, maxDistance: 1, noiseImmunity: 2, multiDrop: 1, configCost: 1, differential: false, forIndustrial: false, signalLevel: "logic_3v3_or_5v", bestUse: "mcu_to_mcu_short_wire" },
  usb_to_uart_bridge: { maxSpeed: 8, maxDistance: 4, noiseImmunity: 5, multiDrop: 1, configCost: 3, differential: false, forIndustrial: false, signalLevel: "usb_converted_ttl", bestUse: "pc_debug_console_port" },
};

const get = (t: UartConfigType) => DATA[t];

export const maxSpeed = (t: UartConfigType) => get(t).maxSpeed;
export const maxDistance = (t: UartConfigType) => get(t).maxDistance;
export const noiseImmunity = (t: UartConfigType) => get(t).noiseImmunity;
export const multiDrop = (t: UartConfigType) => get(t).multiDrop;
export const configCost = (t: UartConfigType) => get(t).configCost;
export const differential = (t: UartConfigType) => get(t).differential;
export const forIndustrial = (t: UartConfigType) => get(t).forIndustrial;
export const signalLevel = (t: UartConfigType) => get(t).signalLevel;
export const bestUse = (t: UartConfigType) => get(t).bestUse;
export const uartConfigs = (): UartConfigType[] => Object.keys(DATA) as UartConfigType[];
