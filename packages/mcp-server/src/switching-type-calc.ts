export type SwitchingType =
  | "circuit_tdm_legacy"
  | "packet_ip_router"
  | "label_mpls_tunnel"
  | "optical_cross_connect"
  | "software_defined_sdn";

const DATA: Record<SwitchingType, {
  throughput: number; latency: number; scalability: number;
  flexibility: number; swCost: number; programmable: boolean;
  forDataCenter: boolean; plane: string; bestUse: string;
}> = {
  circuit_tdm_legacy: {
    throughput: 4, latency: 10, scalability: 3,
    flexibility: 2, swCost: 2, programmable: false,
    forDataCenter: false, plane: "dedicated_timeslot_path",
    bestUse: "pstn_voice_circuit_legacy",
  },
  packet_ip_router: {
    throughput: 8, latency: 6, scalability: 9,
    flexibility: 8, swCost: 3, programmable: false,
    forDataCenter: true, plane: "ip_routing_table_lookup",
    bestUse: "enterprise_internet_edge_core",
  },
  label_mpls_tunnel: {
    throughput: 9, latency: 8, scalability: 8,
    flexibility: 7, swCost: 4, programmable: false,
    forDataCenter: false, plane: "label_push_swap_pop_path",
    bestUse: "carrier_vpn_traffic_engineering",
  },
  optical_cross_connect: {
    throughput: 10, latency: 9, scalability: 6,
    flexibility: 4, swCost: 5, programmable: false,
    forDataCenter: false, plane: "wavelength_fiber_switch_mems",
    bestUse: "long_haul_roadm_wavelength_route",
  },
  software_defined_sdn: {
    throughput: 8, latency: 7, scalability: 10,
    flexibility: 10, swCost: 3, programmable: true,
    forDataCenter: true, plane: "openflow_controller_flow_table",
    bestUse: "cloud_dc_fabric_automation",
  },
};

const get = (t: SwitchingType) => DATA[t];

export const throughput = (t: SwitchingType) => get(t).throughput;
export const latency = (t: SwitchingType) => get(t).latency;
export const scalability = (t: SwitchingType) => get(t).scalability;
export const flexibility = (t: SwitchingType) => get(t).flexibility;
export const swCost = (t: SwitchingType) => get(t).swCost;
export const programmable = (t: SwitchingType) => get(t).programmable;
export const forDataCenter = (t: SwitchingType) => get(t).forDataCenter;
export const plane = (t: SwitchingType) => get(t).plane;
export const bestUse = (t: SwitchingType) => get(t).bestUse;
export const switchingTypes = (): SwitchingType[] => Object.keys(DATA) as SwitchingType[];
