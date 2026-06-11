export type FieldbusProtocolType =
  | "hart_4_20ma_digital"
  | "foundation_fieldbus_h1"
  | "profibus_dp_pa"
  | "modbus_rtu_485"
  | "canopen_device_net";

interface FieldbusProtocolData {
  dataRate: number;
  deviceCount: number;
  diagnostics: number;
  interoperability: number;
  fpCost: number;
  busPowered: boolean;
  forProcessControl: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<FieldbusProtocolType, FieldbusProtocolData> = {
  hart_4_20ma_digital: {
    dataRate: 3, deviceCount: 5, diagnostics: 7, interoperability: 9, fpCost: 3,
    busPowered: true, forProcessControl: true,
    medium: "existing_4_20ma_wiring_fsk_digital_overlay_1200bps",
    bestUse: "retrofit_analog_loop_add_diagnostics_no_rewire",
  },
  foundation_fieldbus_h1: {
    dataRate: 4, deviceCount: 7, diagnostics: 10, interoperability: 8, fpCost: 8,
    busPowered: true, forProcessControl: true,
    medium: "twisted_pair_bus_31_25kbps_intrinsically_safe",
    bestUse: "process_plant_advanced_diagnostics_control_in_field",
  },
  profibus_dp_pa: {
    dataRate: 8, deviceCount: 8, diagnostics: 8, interoperability: 9, fpCost: 6,
    busPowered: false, forProcessControl: true,
    medium: "rs485_twisted_pair_dp_12mbps_pa_31_25kbps_coupler",
    bestUse: "factory_process_automation_mixed_dp_pa_segments",
  },
  modbus_rtu_485: {
    dataRate: 5, deviceCount: 6, diagnostics: 4, interoperability: 10, fpCost: 2,
    busPowered: false, forProcessControl: false,
    medium: "rs485_half_duplex_master_slave_register_based",
    bestUse: "building_automation_simple_plc_vfd_meter_integration",
  },
  canopen_device_net: {
    dataRate: 7, deviceCount: 7, diagnostics: 7, interoperability: 7, fpCost: 5,
    busPowered: false, forProcessControl: false,
    medium: "can_bus_trunk_drop_topology_device_profile_object",
    bestUse: "machine_control_motion_io_device_level_network",
  },
};

function get(t: FieldbusProtocolType): FieldbusProtocolData {
  return DATA[t];
}

export const dataRate = (t: FieldbusProtocolType) => get(t).dataRate;
export const deviceCount = (t: FieldbusProtocolType) => get(t).deviceCount;
export const diagnostics = (t: FieldbusProtocolType) => get(t).diagnostics;
export const interoperability = (t: FieldbusProtocolType) => get(t).interoperability;
export const fpCost = (t: FieldbusProtocolType) => get(t).fpCost;
export const busPowered = (t: FieldbusProtocolType) => get(t).busPowered;
export const forProcessControl = (t: FieldbusProtocolType) => get(t).forProcessControl;
export const medium = (t: FieldbusProtocolType) => get(t).medium;
export const bestUse = (t: FieldbusProtocolType) => get(t).bestUse;
export const fieldbusProtocolTypes = (): FieldbusProtocolType[] =>
  Object.keys(DATA) as FieldbusProtocolType[];
