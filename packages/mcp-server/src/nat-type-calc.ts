export type NatType =
  | "full_cone_static"
  | "restricted_cone"
  | "port_restricted_cone"
  | "symmetric_random"
  | "cgnat_carrier_grade";

const DATA: Record<NatType, {
  connectivity: number; security: number; p2pCompat: number;
  scalability: number; ntCost: number; hairpin: boolean;
  forVoip: boolean; mapping: string; bestUse: string;
}> = {
  full_cone_static: {
    connectivity: 10, security: 3, p2pCompat: 10,
    scalability: 4, ntCost: 5, hairpin: true,
    forVoip: true, mapping: "endpoint_independent_filter",
    bestUse: "game_server_host_direct",
  },
  restricted_cone: {
    connectivity: 7, security: 6, p2pCompat: 7,
    scalability: 5, ntCost: 3, hairpin: true,
    forVoip: true, mapping: "address_dependent_filter",
    bestUse: "home_router_upnp_stun",
  },
  port_restricted_cone: {
    connectivity: 5, security: 8, p2pCompat: 5,
    scalability: 6, ntCost: 2, hairpin: false,
    forVoip: false, mapping: "address_port_dependent_filter",
    bestUse: "enterprise_firewall_nat_policy",
  },
  symmetric_random: {
    connectivity: 3, security: 10, p2pCompat: 2,
    scalability: 7, ntCost: 4, hairpin: false,
    forVoip: false, mapping: "connection_dependent_random_port",
    bestUse: "high_security_outbound_only",
  },
  cgnat_carrier_grade: {
    connectivity: 4, security: 7, p2pCompat: 3,
    scalability: 10, ntCost: 6, hairpin: false,
    forVoip: false, mapping: "deterministic_pool_block_alloc",
    bestUse: "isp_ipv4_address_exhaustion",
  },
};

const get = (t: NatType) => DATA[t];

export const connectivity = (t: NatType) => get(t).connectivity;
export const security = (t: NatType) => get(t).security;
export const p2pCompat = (t: NatType) => get(t).p2pCompat;
export const scalability = (t: NatType) => get(t).scalability;
export const ntCost = (t: NatType) => get(t).ntCost;
export const hairpin = (t: NatType) => get(t).hairpin;
export const forVoip = (t: NatType) => get(t).forVoip;
export const mapping = (t: NatType) => get(t).mapping;
export const bestUse = (t: NatType) => get(t).bestUse;
export const natTypes = (): NatType[] => Object.keys(DATA) as NatType[];
