export type RoutingProtocol =
  | "ospf_link_state"
  | "bgp_path_vector"
  | "rip_distance_vector"
  | "eigrp_hybrid_cisco"
  | "is_is_link_state";

const DATA: Record<RoutingProtocol, {
  convergence: number; scalability: number; stability: number;
  complexity: number; rpCost: number; classless: boolean;
  forIsp: boolean; metric: string; bestUse: string;
}> = {
  ospf_link_state: {
    convergence: 8, scalability: 7, stability: 8,
    complexity: 7, rpCost: 3, classless: true,
    forIsp: false, metric: "spf_dijkstra_cost_bandwidth",
    bestUse: "enterprise_campus_backbone",
  },
  bgp_path_vector: {
    convergence: 4, scalability: 10, stability: 10,
    complexity: 10, rpCost: 5, classless: true,
    forIsp: true, metric: "path_attribute_policy_based",
    bestUse: "internet_as_interdomain_route",
  },
  rip_distance_vector: {
    convergence: 3, scalability: 3, stability: 4,
    complexity: 2, rpCost: 1, classless: false,
    forIsp: false, metric: "hop_count_max_15",
    bestUse: "small_office_legacy_simple",
  },
  eigrp_hybrid_cisco: {
    convergence: 9, scalability: 8, stability: 9,
    complexity: 6, rpCost: 4, classless: true,
    forIsp: false, metric: "dual_composite_bandwidth_delay",
    bestUse: "cisco_shop_fast_failover",
  },
  is_is_link_state: {
    convergence: 8, scalability: 9, stability: 9,
    complexity: 8, rpCost: 4, classless: true,
    forIsp: true, metric: "spf_iso_clns_te_extensions",
    bestUse: "isp_core_mpls_underlay",
  },
};

const get = (t: RoutingProtocol) => DATA[t];

export const convergence = (t: RoutingProtocol) => get(t).convergence;
export const scalability = (t: RoutingProtocol) => get(t).scalability;
export const stability = (t: RoutingProtocol) => get(t).stability;
export const complexity = (t: RoutingProtocol) => get(t).complexity;
export const rpCost = (t: RoutingProtocol) => get(t).rpCost;
export const classless = (t: RoutingProtocol) => get(t).classless;
export const forIsp = (t: RoutingProtocol) => get(t).forIsp;
export const metric = (t: RoutingProtocol) => get(t).metric;
export const bestUse = (t: RoutingProtocol) => get(t).bestUse;
export const routingProtocols = (): RoutingProtocol[] => Object.keys(DATA) as RoutingProtocol[];
