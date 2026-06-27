export type IndustrialEthernetType =
  | "profinet_rt_irt"
  | "ethercat_distributed"
  | "ethernet_ip_cip"
  | "modbus_tcp_ip"
  | "opc_ua_tsn";

interface IndustrialEthernetData {
  dataRate: number;
  determinism: number;
  deviceCount: number;
  itConvergence: number;
  ieCost: number;
  realTime: boolean;
  forMotionControl: boolean;
  transport: string;
  bestUse: string;
}

const DATA: Record<IndustrialEthernetType, IndustrialEthernetData> = {
  profinet_rt_irt: {
    dataRate: 9, determinism: 9, deviceCount: 9, itConvergence: 7, ieCost: 7,
    realTime: true, forMotionControl: true,
    transport: "standard_ethernet_rt_software_irt_hardware_cycle",
    bestUse: "siemens_plc_ecosystem_factory_drive_io_integration",
  },
  ethercat_distributed: {
    dataRate: 10, determinism: 10, deviceCount: 8, itConvergence: 5, ieCost: 6,
    realTime: true, forMotionControl: true,
    transport: "processing_on_fly_slave_fmmu_distributed_clock",
    bestUse: "high_speed_motion_control_cnc_robotics_packaging",
  },
  ethernet_ip_cip: {
    dataRate: 8, determinism: 7, deviceCount: 10, itConvergence: 9, ieCost: 6,
    realTime: true, forMotionControl: false,
    transport: "standard_tcp_udp_cip_object_model_unmodified_switch",
    bestUse: "rockwell_ecosystem_mixed_process_discrete_plant_wide",
  },
  modbus_tcp_ip: {
    dataRate: 7, determinism: 4, deviceCount: 8, itConvergence: 10, ieCost: 3,
    realTime: false, forMotionControl: false,
    transport: "standard_tcp_ip_register_based_client_server_simple",
    bestUse: "building_bms_simple_scada_energy_meter_integration",
  },
  opc_ua_tsn: {
    dataRate: 9, determinism: 9, deviceCount: 9, itConvergence: 10, ieCost: 8,
    realTime: true, forMotionControl: true,
    transport: "opc_ua_pub_sub_ieee_802_1_tsn_converged_network",
    bestUse: "industry_4_0_vendor_neutral_it_ot_converged_network",
  },
};

function get(t: IndustrialEthernetType): IndustrialEthernetData {
  return DATA[t];
}

export const dataRate = (t: IndustrialEthernetType) => get(t).dataRate;
export const determinism = (t: IndustrialEthernetType) => get(t).determinism;
export const deviceCount = (t: IndustrialEthernetType) => get(t).deviceCount;
export const itConvergence = (t: IndustrialEthernetType) => get(t).itConvergence;
export const ieCost = (t: IndustrialEthernetType) => get(t).ieCost;
export const realTime = (t: IndustrialEthernetType) => get(t).realTime;
export const forMotionControl = (t: IndustrialEthernetType) => get(t).forMotionControl;
export const transport = (t: IndustrialEthernetType) => get(t).transport;
export const bestUse = (t: IndustrialEthernetType) => get(t).bestUse;
export const industrialEthernetTypes = (): IndustrialEthernetType[] =>
  Object.keys(DATA) as IndustrialEthernetType[];
